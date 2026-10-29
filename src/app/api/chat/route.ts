import { NextResponse } from 'next/server';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { getSystemPromptGrounding } from '@/lib/chat/knowledge-base';
import { getDbPricesCached } from '@/lib/pricing-db';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { PAYMENT_INTENT_TERMS, PAYMENT_INTENT_REGEX, LOCALIZED_PAYMENT_REPLIES } from '@/lib/chat/payment-intent';
import { CHAT_TOOLS_DEFINITIONS, executeChatTool } from '@/lib/chat/chat-tools';
import { getChatSettings, logChatSession } from '@/lib/chat-settings';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const chatSettings = getChatSettings();
    if (!chatSettings.enabled) {
      return NextResponse.json(
        { error: 'AI Assistant is currently offline. Please contact via WhatsApp.' },
        { status: 503 }
      );
    }
    const rl = await rateLimit(`ai_chat:${clientIp}`, 20, 60);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please pause a moment.' },
        { status: 429 }
      );
    }

    const { messages, locale = 'en' } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Sanitize user inputs & guard against prompt injection
    const sanitizedMessages = messages.map((m: any) => {
      const content = String(m.content || '')
        .slice(0, 1500)
        .replace(/<\|.*?\|>/g, '');
      return {
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content,
      };
    });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022';
    const systemPrompt = getSystemPromptGrounding(locale);

    // If Anthropic API key is available, stream via Anthropic API
    if (apiKey) {
      try {
        const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model,
            max_tokens: 1024,
            system: systemPrompt,
            messages: sanitizedMessages,
            stream: true,
          }),
        });

        if (anthropicRes.ok && anthropicRes.body) {
          // Stream Server-Sent Events to client
          const stream = new ReadableStream({
            async start(controller) {
              const reader = anthropicRes.body!.getReader();
              const decoder = new TextDecoder();
              let buffer = '';

              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  buffer += decoder.decode(value, { stream: true });

                  const lines = buffer.split('\n');
                  buffer = lines.pop() || '';

                  for (const line of lines) {
                    if (line.startsWith('data: ')) {
                      const dataStr = line.slice(6).trim();
                      if (dataStr === '[DONE]') continue;
                      try {
                        const parsed = JSON.parse(dataStr);
                        if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                          controller.enqueue(new TextEncoder().encode(parsed.delta.text));
                        }
                      } catch {}
                    }
                  }
                }
              } catch (streamErr) {
                controller.error(streamErr);
              } finally {
                controller.close();
              }
            },
          });

          return new Response(stream, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'no-cache, no-transform',
            },
          });
        }
      } catch (apiErr) {
        console.warn('Notice from Anthropic API streaming, falling back to local grounded response:', apiErr);
      }
    }

    // Grounded Fallback Engine when API key is pending configuration in Vercel
    const lastUserMessage = sanitizedMessages[sanitizedMessages.length - 1]?.content || '';

    let reply = '';
    const isAr = locale === 'ar';
    const isId = locale === 'id';

    // 1. VAT & Taxes Inclusions (Word-boundary safe: will NEVER match "private")
    if (/(^|[^\p{L}\p{N}])(vat|tax|taxes|taxation|ضريب[ةه]|الضرائب|شامل\s*الضريب[ةه]|pajak|vergiler)([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      if (isAr) {
        reply = `نعم بالتأكيد! جميع أسعار رحلات ضيوف الرحمن VIP هي أسعار ثابتة ومضمونة لكل سيارة (وليست لكل راكب)، وتشمل ضريبة القيمة المضافة (VAT)، وتكاليف الوقود، ورسوم الطرق السريعة (طريق الحرمين)، ورسوم مواقف وصالات المطار دون أي رسوم خفية أو زيادات مفاجئة.`;
      } else if (isId) {
        reply = `Ya, tentu saja! Semua tarif yang kami tampilkan adalah tarif pasti per kendaraan (bukan per penumpang). Tarif sudah all-inclusive mencakup pajak (PPN/VAT), biaya bahan bakar, tarif jalan tol, dan biaya parkir bandara tanpa biaya tambahan tersembunyi.`;
      } else {
        reply = `Yes, absolutely! All our displayed fares are 100% all-inclusive fixed rates per vehicle (not per passenger). Prices include applicable taxes (VAT), fuel expenses, highway expressway tolls (Haramain Expressway), and airport parking fees with zero hidden charges or surge pricing.`;
      }
    }
    // 2. Complimentary Airport Waiting Buffer & Live Flight Tracking
    else if (/(^|[^\p{L}\p{N}])(waiting|wait|انتظار|وقت\s*الانتظار|menunggu|waktu\s*tunggu|bekleme|flight\s*tracking|radar|تتبع\s*الرحلات?)([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      if (isAr) {
        reply = `تشمل كافة حجوزات الاستقبال من المطار خدمة تتبع رحلات الطيران لحظة بلحظة عبر الرادار الملاحي الدولي، مع فترة انتظار مجانية لمدة 60 دقيقة تبدأ بعد هبوط الطائرة الفعلي على المدرج (مع إمكانية تمديد الانتظار حتى 90 دقيقة في حال تأخر استلام الأمتعة أو طوابير الجوازات). في حال تأخر الرحلة أو إعادة جدولتها، يتم تحديث موعد وصول السائق تلقائياً وبشكل مجاني بالكامل.`;
      } else if (isId) {
        reply = `Semua penjemputan bandara mencakup pelacakan radar penerbangan langsung dan waktu tunggu gratis selama 60 menit sejak roda pesawat menyentuh landasan (dengan buffer hingga 90 menit jika terjadi antrean bagasi atau imigrasi). Jika penerbangan tertunda, jadwal sopir diperbarui secara otomatis tanpa biaya tambahan.`;
      } else {
        reply = `All airport pickups include live flight tracking via international aviation radar and 60 minutes of complimentary waiting time starting from when your aircraft officially touches down on the tarmac (with an extended buffer up to 90 minutes when baggage reclaim or customs procedures take longer). If your flight is delayed or rescheduled, your chauffeur's arrival is automatically updated with zero penalty.`;
      }
    }
    // 3. Complimentary Miqat Stopover & Duration
    else if (/(^|[^\p{L}\p{N}])(miqat|meeqat|ميقات|آبار\s*علي|أبيار\s*علي|bir\s*ali|dhu\s*al-?hulayfah|ذو\s*الحليف[ةه])([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      if (isAr) {
        reply = `نعم بالتأكيد! التوقف في ميقات ذي الحليفة (مسجد آبار علي) مشمول ومجاني 100% لجميع الرحلات الخاصة المتجهة من المدينة المنورة إلى مكة المكرمة. يتوقف السائق الخاص لمدة 30 إلى 45 دقيقة كاملة تتيح لكم ولعائلتكم الاغتسال، وارتداء ملابس الإحرام، وأداء ركعتي سنة الإحرام وعقد النية، بينما تظل أمتعتكم مؤمنة ومغلقة تماماً داخل السيارة.`;
      } else if (isId) {
        reply = `Ya, tentu saja! Singgah di Masjid Dhu al-Hulayfah (Miqat Bir Ali) 100% gratis dan sudah termasuk dalam layanan transfer privat dari Madinah ke Makkah. Sopir pribadi Anda akan menunggu selama 30 hingga 45 menit untuk memberi waktu mandi sunnah, mengenakan kain ihram, salat sunnah, dan berniat ihram, sementara koper Anda tetap aman terkunci di dalam kendaraan.`;
      } else {
        reply = `Yes, absolutely! The stop at Masjid Dhu al-Hulayfah (Miqat Bir Ali) is 100% complimentary and included in our private transfers from Madinah to Makkah. Your chauffeur pauses for 30 to 45 minutes, allowing you and your family ample time for Ghusl, wearing Ihram, Sunnah prayer, and making Niyyah, while your luggage remains securely locked in the vehicle.`;
      }
    }
    // 4. 24/7 Operations & Service Hours
    else if (/(^|[^\p{L}\p{N}])(24\/7|24\s*hours?|24\s*saat|24\s*ساعة|ساعات\s*العمل|operating\s*hours?|working\s*hours?|round\s*the\s*clock)([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      if (isAr) {
        reply = `نعم، خدمات ضيوف الرحمن VIP، وغرفة العمليات والمتابعة الميدانية، والكباتن متاحون على مدار الساعة طوال أيام الأسبوع (24/7) في جدة، ومكة المكرمة، والمدينة المنورة لاستقبال وتوديع الرحلات في أي وقت.`;
      } else if (isId) {
        reply = `Ya, layanan operasional, koordinasi dispatch, dan sopir pribadi Duyuf Al Rahman VIP beroperasi 24 jam sehari, 7 hari seminggu (24/7) di Jeddah, Makkah, dan Madinah untuk melayani kedatangan dan keberangkatan Anda kapan pun.`;
      } else {
        reply = `Yes, Duyuf Al Rahman VIP operations, dispatch coordinators, and private chauffeurs are available 24 hours a day, 7 days a week (24/7) across Jeddah, Makkah, and Madinah for round-the-clock arrivals and departures.`;
      }
    }
    // 5. Complimentary Child Seats
    else if (/(^|[^\p{L}\p{N}])(child\s*seats?|infant\s*seats?|baby\s*seats?|booster\s*seats?|مقاعد?\s*أطفال|كرسي\s*أطفال|kursi\s*bayi|kursi\s*anak|çocuk\s*koltuğu)([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      if (isAr) {
        reply = `نعم، تتوفر مقاعد أمان الأطفال والرضع مجاناً عند الحجز المسبق. يُرجى توضيح ذلك في ملاحظات نموذج الحجز أو إشعار فريق العمليات عبر الواتساب (+966567588261) لترتيب المقعد المناسب في سيارتكم قبل الوصول.`;
      } else if (isId) {
        reply = `Ya, kursi keselamatan bayi dan anak-anak tersedia gratis dengan permintaan terlebih dahulu saat reservasi. Silakan cantumkan dalam catatan pemesanan atau beri tahu tim kami via WhatsApp (+966567588261).`;
      } else {
        reply = `Yes, complimentary infant and child safety booster seats are available upon advance reservation. Please specify this requirement in your booking form notes or notify our dispatch team on WhatsApp (+966567588261) so your private vehicle arrives properly fitted.`;
      }
    }
    // 6. In-Vehicle Wi-Fi Availability
    else if (/(^|[^\p{L}\p{N}])(wi-?fi|واي\s*فاي|internet\s*in\s*car)([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      if (isAr) {
        reply = `تتوفر شبكة الواي فاي داخل السيارة في فئات محددة من أسطولنا الفاخر (مثل سيارات مرسيدس مايباخ وجولات الـ VIP الخاصة). يُرجى التنسيق مع مشرف العمليات عبر الواتساب (+966567588261) لتأكيد توفر خدمة الإنترنت لطراز سيارتكم.`;
      } else if (isId) {
        reply = `Fasilitas Wi-Fi dalam kendaraan tersedia pada armada eksekutif tertentu (seperti Mercedes-Maybach dan sewa VIP). Silakan hubungi supervisor kami via WhatsApp (+966567588261) untuk memastikan ketersediaan Wi-Fi pada kendaraan pilihan Anda.`;
      } else {
        reply = `In-vehicle Wi-Fi is available on select executive fleet tiers (such as Mercedes-Maybach and VIP SUV charters). Please connect directly with our operations supervisor on WhatsApp (+966567588261) to confirm Wi-Fi provision for your preferred vehicle.`;
      }
    }
    // 7. Route Journey Duration Intent (with dynamic origin/destination resolution)
    else if (/(^|[^\p{L}\p{N}])(duration|how\s+long|travel\s+time|driving\s+time|كم\s*تستغرق|كم\s*الوقت|كم\s*المدة|كم\s*ساعة|waktu\s*tempuh|durasi|süresi|ne\s*kadar\s*sürer|kitna\s*time|کتنا\s*وقت)([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      const lowerMsg = lastUserMessage.toLowerCase();
      const isMkkMed = (lowerMsg.includes('madinah') || lowerMsg.includes('المدينة')) && (lowerMsg.includes('makkah') || lowerMsg.includes('مكة'));
      const isJeddahMed = (lowerMsg.includes('jeddah') || lowerMsg.includes('جدة')) && (lowerMsg.includes('madinah') || lowerMsg.includes('المدينة'));
      const isMedAirport = (lowerMsg.includes('med') || lowerMsg.includes('مطار المدينة')) && (lowerMsg.includes('hotel') || lowerMsg.includes('فندق') || lowerMsg.includes('haram') || lowerMsg.includes('الحرم'));
      const isTaif = lowerMsg.includes('taif') || lowerMsg.includes('طائف') || lowerMsg.includes('الطائف');

      if (isMkkMed) {
        reply = isAr
          ? `تستغرق الرحلة بين مكة المكرمة والمدينة المنورة عبر طريق الهجرة السريع (طريق 15) ما بين 4.0 إلى 4.5 ساعات (المسافة حوالي 440 كم). وفي حال التوقف في ميقات آبار علي للإحرام تكون المدة الإجمالية حوالي 4.5 إلى 5.0 ساعات تشمل فترة التوقف الكافية.`
          : isId
          ? `Waktu tempuh antara Makkah dan Madinah melalui Jalan Tol Al Hijrah (Rute 15) adalah sekitar 4,0 hingga 4,5 jam (~440 km). Jika termasuk singgah di Miqat Bir Ali untuk ihram, total durasi adalah sekitar 4,5 hingga 5,0 jam.`
          : `The travel time between Makkah and Madinah via Route 15 (Al Hijrah Highway) is approximately 4.0 to 4.5 hours (~440 km). For transfers including the complimentary Miqat Bir Ali stopover for Ihram, the total journey is approximately 4.5 to 5.0 hours.`;
      } else if (isJeddahMed) {
        reply = isAr
          ? `تستغرق الرحلة المباشرة بالسيارة من مطار جدة (KAIA) إلى المدينة المنورة حوالي 4.0 إلى 4.5 ساعات (المسافة حوالي 410 كم عبر طريق الهجرة السريع).`
          : `The direct driving time from King Abdulaziz International Airport (KAIA) in Jeddah to Madinah is approximately 4.0 to 4.5 hours (~410 km via Route 15 Expressway).`;
      } else if (isMedAirport) {
        reply = isAr
          ? `يستغرق التوصيل الخاص من مطار الأمير محمد بن عبدالعزيز بالمدينة المنورة (MED) إلى فنادق المنطقة المركزية المحيطة بالمسجد النبوي حوالي 20 إلى 25 دقيقة (المسافة 25 كم).`
          : `The private transfer from Prince Mohammad Bin Abdulaziz International Airport (MED) to central Madinah / Markaziyah hotels takes approximately 20 to 25 minutes (~25 km).`;
      } else if (isTaif) {
        reply = isAr
          ? `تستغرق الرحلة بين مكة المكرمة ومدينة الطائف حوالي ساعة ونصف إلى ساعتين (المسافة 90 كم عبر طريق عقبة الهدا السريع).`
          : `The journey between Makkah and Taif takes approximately 1.5 to 2.0 hours (~90 km via the Al Hada mountain expressway).`;
      } else {
        // Default: Jeddah Airport to Makkah
        reply = isAr
          ? `تستغرق الرحلة بالسيارة الخاصة بين مطار الملك عبدالعزيز الدولي بجدة (KAIA) وفندقكم بمكة المكرمة عادةً من 60 إلى 75 دقيقة (المسافة حوالي 95 كم عبر طريق مكة - جدة السريع المباشر / طريق 40)، وذلك بحسب صالة الوصول وحركة السير.`
          : isId
          ? `Waktu tempuh berkendara normal dari Bandara Internasional King Abdulaziz (KAIA) Jeddah ke hotel Makkah adalah sekitar 60 hingga 75 menit (~95 km melalui Jalan Tol Rute 40), tergantung pada terminal kedatangan dan kondisi lalu lintas.`
          : `The typical driving time between King Abdulaziz International Airport (KAIA) in Jeddah and Makkah is approximately 60 to 75 minutes (~95 km via Route 40 Expressway), depending on your arrival terminal and highway traffic.`;
      }
    }
    // 8. Authoritative Pricing Queries (Grounded in Database & Constants without Hardcoded Fallbacks)
    else if (/(^|[^\p{L}\p{N}])(price|cost|fare|rates?|tarif|سعر|اسعار|أسعار|بكم|كم|fiyat|fiyatlar|fiyatı|harga|tarif|tarifler|قیمت|کرایہ|दर|मूल्य)([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      const liveRates = await getDbPricesCached();
      const jkaRates = liveRates['jeddah-airport-to-makkah'] || AUTHORITATIVE_TRANSFER_RATES['jeddah-airport-to-makkah'];
      const mkkMedRates = liveRates['makkah-to-madinah'] || AUTHORITATIVE_TRANSFER_RATES['makkah-to-madinah'];

      const jkaMakkahCamry = jkaRates?.camry;
      const jkaMakkahStaria = jkaRates?.staria;
      const jkaMakkahYukon = jkaRates?.yukon;
      const jkaMakkahHiace = jkaRates?.hiace;
      const jkaMakkahCoaster = jkaRates?.coaster;

      const mkkMedCamry = mkkMedRates?.camry;
      const mkkMedStaria = mkkMedRates?.staria;
      const mkkMedYukon = mkkMedRates?.yukon;
      const mkkMedHiace = mkkMedRates?.hiace;

      const bookingUrl = `/${locale}/booking`;

      if (isAr) {
        reply = `أسعارنا الثابتة والمضمونة لرحلات العمرة عبر أسطول ضيوف الرحمن VIP (مستخرجة مباشرة من قاعدة بيانات الأسعار الرسمية):\n\n• **مطار جدة (KAIA) ← مكة المكرمة:**\n  - كامري (4 ركاب): ${jkaMakkahCamry} ريال\n  - هيونداي ستاريا VIP (7 ركاب): ${jkaMakkahStaria} ريال\n  - جي إم سي يوكون XL (7 ركاب فاخر): ${jkaMakkahYukon} ريال\n  - تويوتا هايس (10 ركاب): ${jkaMakkahHiace} ريال\n  - تويوتا كوستر (21 راكب): ${jkaMakkahCoaster} ريال\n\n• **مكة المكرمة ⇄ المدينة المنورة (تشمل التوقف بميقات آبار علي):**\n  - كامري: ${mkkMedCamry} ريال | ستاريا VIP: ${mkkMedStaria} ريال | يوكون XL: ${mkkMedYukon} ريال | هايس: ${mkkMedHiace} ريال\n\n✨ الأسعار شاملة الوقود، الضريبة (VAT)، ورسوم الطرق السريعة ومواقف المطار. الدفع نقداً عند الوصول للسائق.\n🔗 **لحساب السعر الفوري لرحلتك وحجز سيارتك مباشرة:** [${bookingUrl}](${bookingUrl})`;
      } else if (isId) {
        reply = `Berikut tarif pasti terjamin Duyuf Alrahman VIP (disinkronkan langsung dari basis data tarif resmi):\n\n• **Bandara Jeddah (KAIA) → Hotel Makkah:**\n  - Toyota Camry (4 Penumpang): SAR ${jkaMakkahCamry}\n  - Hyundai Staria VIP (7 Penumpang): SAR ${jkaMakkahStaria}\n  - GMC Yukon XL VIP (7 Penumpang): SAR ${jkaMakkahYukon}\n  - Toyota HiAce (10 Penumpang): SAR ${jkaMakkahHiace}\n  - Toyota Coaster VIP (21 Penumpang): SAR ${jkaMakkahCoaster}\n\n• **Makkah ⇄ Madinah (Termasuk singgah di Miqat Bir Ali):**\n  - Camry: SAR ${mkkMedCamry} | Staria VIP: SAR ${mkkMedStaria} | Yukon XL: SAR ${mkkMedYukon} | HiAce: SAR ${mkkMedHiace}\n\n✨ Semua tarif sudah all-inclusive (pajak VAT, BBM, biaya tol, dan parkir bandara). Pembayaran tunai saat tiba ke sopir.\n🔗 **Cek tarif langsung dan pesan kendaraan:** [${bookingUrl}](${bookingUrl})`;
      } else {
        reply = `Here are our guaranteed fixed fares for Duyuf Alrahman VIP transfers (synced live from our official database):\n\n• **Jeddah Airport (KAIA) → Makkah Hotel:**\n  - Toyota Camry (4 Pax): SAR ${jkaMakkahCamry}\n  - Hyundai Staria VIP (7 Pax): SAR ${jkaMakkahStaria}\n  - GMC Yukon XL VIP (7 Pax): SAR ${jkaMakkahYukon}\n  - Toyota HiAce (10 Pax): SAR ${jkaMakkahHiace}\n  - Toyota Coaster VIP (21 Pax): SAR ${jkaMakkahCoaster}\n\n• **Makkah ⇄ Madinah (Includes stop at Miqat Bir Ali upon request):**\n  - Camry: SAR ${mkkMedCamry} | Staria VIP: SAR ${mkkMedStaria} | Yukon XL: SAR ${mkkMedYukon} | HiAce: SAR ${mkkMedHiace}\n\n✨ All fares are all-inclusive (fuel, highway expressway tolls, airport parking fees, and applicable taxes). Zero deposit — pay cash to chauffeur upon arrival.\n🔗 **Calculate instant fares & book online:** [${bookingUrl}](${bookingUrl})`;
      }
    }
    // 9. Strict Cash-Only Payment Intent
    else if (PAYMENT_INTENT_REGEX.test(lastUserMessage)) {
      reply = LOCALIZED_PAYMENT_REPLIES[locale] || LOCALIZED_PAYMENT_REPLIES.en;
    }
    // 10. Zamzam Water Policy
    else if (lastUserMessage.toLowerCase().includes('zamzam') || lastUserMessage.includes('زمزم')) {
      reply = isAr
        ? `بخصوص ماء زمزم المبارك:\n\nجميع سيارات أسطولنا مجهزة بصندوق أمتعة واسع يتسع لحمل عبوات زمزم الرسمية سعة 5 لتر مع حقائبكم بأمان تام.\n\n⚠️ **تنبيه هام للرحلات الجوية:** تنص تعليمات الطيران المدني (GACA) على شراء ماء زمزم من نقاط البيع المعتمدة في المطار وشحنه بشكل مستقل عبر مسارات زمزم، ويُمنع منعاً باتاً وضعه داخل حقائب السفر العادية.`
        : `Regarding blessed Zamzam water:\n\nAll our vehicles safely accommodate standard 5-liter factory-sealed Zamzam canisters in the luggage compartment.\n\n⚠️ **Important Flight Note:** GACA regulations require purchasing Zamzam only at designated airport outlets and checking it separately. Never pack liquid containers inside checked suitcases.`;
    }
    // 11. Free Cancellation Policy
    else if (lastUserMessage.toLowerCase().includes('cancel') || lastUserMessage.includes('الغاء') || lastUserMessage.includes('إلغاء')) {
      reply = isAr
        ? `سياسة الإلغاء لدى ضيوف الرحمن VIP مرنة وسهلة:\n\n• يمكنك إلغاء أو تعديل موعد رحلتك مجاناً بالكامل حتى 24 ساعة قبل موعد الاستقبال المحدد دون أي غرامات.\n• في حال تأخر أو تغيير موعد رحلة الطيران، يرجى إشعارنا عبر الواتساب مع رقم حجزكم وسنقوم بتحديث موعد الاستقبال تلقائياً دون أي رسوم إضافية.`
        : `Our cancellation and adjustment policy is completely traveler-friendly:\n\n• 100% free cancellation up to 24 hours prior to scheduled pickup time.\n• If your airline reschedules or delays your flight, simply message us on WhatsApp with your reference code and updated flight time; we update your pickup automatically with zero penalty.`;
    }
    // 12. Fleet & Luggage Capacities
    else if (/(^|[^\p{L}\p{N}])(fleet|vehicles?|capacit(y|ies)|سيارات|الأسطول|سعة\s*الحقائب|مايباخ|maybach|h1|staria|yukon|hiace|coaster|luggage)([^\p{L}\p{N}]|$)/iu.test(lastUserMessage)) {
      reply = isAr
        ? `أسطول ضيوف الرحمن VIP المعتمد وسعات الركاب والأمتعة:\n\n• **تويوتا كامري سيدان:** حتى 4 ركاب • 3 حقائب كبيرة\n• **مرسيدس مايباخ VIP:** حتى 3 ركاب • 3 حقائب (فخامة رئاسية مطلقة)\n• **هيونداي ستاريا VIP:** حتى 7 ركاب • 6 حقائب (مقاعد كابتن مريحة)\n• **هيونداي H1 رويال:** حتى 7 ركاب • 6 إلى 7 حقائب\n• **جي إم سي يوكون XL:** حتى 7 ركاب • 8 حقائب كبيرة مع عبوات زمزم\n• **تويوتا هايس باص:** حتى 10 ركاب • 10 إلى 12 حقيبة\n• **تويوتا كوستر VIP:** حتى 21 راكب • 20 حقيبة (حافلة فاخرة للمجموعات)\n\nجميع السيارات مكيفة بالكامل ومجهزة لرحلات الحرمين الطويلة.`
        : `Duyuf Al Rahman VIP Fleet Specifications & Luggage Capacities:\n\n• **Toyota Camry Executive:** Up to 4 Passengers • 3 Large Bags\n• **Mercedes-Maybach VIP:** Up to 3 Passengers • 3 Bags (Ultra-luxury executive chauffeur)\n• **Hyundai Staria VIP:** Up to 7 Passengers • 6 Bags (Captain seats for families)\n• **Hyundai H1 Royal:** Up to 7 Passengers • 6-7 Bags\n• **GMC Yukon XL VIP:** Up to 7 Passengers • 8 Large Bags (Massive luggage space)\n• **Toyota HiAce Minibus:** Up to 10 Passengers • 10-12 Bags\n• **Toyota Coaster Coach:** Up to 21 Passengers • 20 Bags (Group VIP coach)\n\nAll vehicles feature multi-zone climate control and accommodate official 5L Zamzam canisters.`;
    }
    // 13. Direct Booking & WhatsApp Dispatch
    else if (lastUserMessage.toLowerCase().includes('book') || lastUserMessage.includes('حجز') || lastUserMessage.includes('احجز') || lastUserMessage.includes('اريد') || lastUserMessage.toLowerCase().includes('want')) {
      const waUrl = 'https://wa.me/966567588261?text=' + encodeURIComponent(isAr ? 'السلام عليكم، أود تأكيد حجز رحلة خاصة مع ضيوف الرحمن VIP' : 'Assalamu Alaikum, I would like to book a private VIP transfer with Duyuf Alrahman VIP');
      reply = isAr
        ? `نسعد جداً بخدمتكم في رحلتكم المباركة! يمكنك إتمام الحجز بإحدى الطريقتين:\n\n1. **الحجز المباشر عبر الموقع:** من خلال صفحة الحجز السريع واختيار السيارة ومسار الرحلة.\n2. **التواصل الفوري عبر الواتساب:** يمكنك الضغط على الرابط التالي لمراسلة مشرف الحجوزات مباشرة على الرقم:\n👉 [اضغط هنا للمحادثة المباشرة على الواتساب](${waUrl})\n\nسيسعد فريقنا بتأكيد حجزكم وتزويدكم ببيانات السائق فوراً.`
        : `We would be honored to serve you on your sacred journey! You can reserve your transfer in two ways:\n\n1. **Direct Online Booking:** Use our instant booking engine on the site to select your route and vehicle.\n2. **Instant WhatsApp Dispatch:** Connect with our on-duty coordinator directly at:\n👉 [Click here to chat directly on WhatsApp](${waUrl})\n\nOur team will confirm your vehicle and driver details in minutes.`;
    }
    // 14. Friendly Default Greeting
    else {
      reply = isAr
        ? `أهلاً ومرحباً بكم ضيفنا الكريم في **ضيوف الرحمن VIP** لخدمات النقل الخاص والعمرة 🕋✨\n\nأنا "رفيق"، مساعدكم الآلي الخاص. كيف يمكنني مساعدتكم اليوم؟\n\n• الاستفسار عن أسعار المسارات (جدة، مكة، والمدينة)\n• استعراض مواصفات وسعة سيارات الأسطول (يوكون XL، ستاريا، مايباخ، كامري، هايس، كوستر)\n• معرفة إرشادات الاستقبال في صالات مطار الملك عبدالعزيز ومطار المدينة\n• التوقف في ميقات آبار علي أو زيارة معالم ومزارات مكة والمدينة\n\nكما يمكنك في أي وقت التحدث مباشرة مع مشرف العمليات الميداني عبر الواتساب.`
        : `Welcome to **Duyuf Alrahman VIP** Private Umrah & Chauffeur Services 🕋✨\n\nI am "Rafeeq", your dedicated pilgrimage assistant. How may I assist you today?\n\n• Fixed fares for transfers (Jeddah, Makkah, and Madinah)\n• Fleet capacities (GMC Yukon XL, Hyundai Staria, Mercedes-Maybach, Camry, HiAce, Coaster)\n• Terminal meeting points at KAIA Jeddah and MED Madinah\n• Miqat Bir Ali stops and historic Ziyarat tours\n\nFeel free to ask any question or tap below to connect with a live supervisor on WhatsApp.`;
    }
    
    // Log session for admin review safely
    try {
      const isHandoff = reply.includes('wa.me') || reply.includes('الواتساب') || reply.includes('WhatsApp');
      logChatSession({
        id: `sess-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
        locale,
        messagesCount: sanitizedMessages.length,
        lastUserMessage,
        lastAssistantMessage: reply.slice(0, 300),
        handoffOccurred: isHandoff,
        handoffRef: isHandoff ? `VIP-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
        ipMasked: clientIp ? clientIp.replace(/(\d+)\.(\d+)\..*/, '$1.$2.***.***') : undefined,
      });
    } catch (logErr) {
      console.warn('Non-blocking chat log notice:', logErr);
    }

    // Stream the text reply with chunks for smooth UX
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = reply.split(' ');
        for (let i = 0; i < words.length; i += 3) {
          const chunk = words.slice(i, i + 3).join(' ') + ' ';
          controller.enqueue(encoder.encode(chunk));
          await new Promise((res) => setTimeout(res, 30));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    });
  } catch (err: any) {
    console.error('Chat endpoint error:', err);
    return NextResponse.json({ error: 'Chat service error' }, { status: 500 });
  }
}
