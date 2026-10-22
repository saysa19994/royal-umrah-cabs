import { NextResponse } from 'next/server';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { getSystemPromptGrounding } from '@/lib/chat/knowledge-base';
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
    const lastLower = lastUserMessage.toLowerCase();

    let reply = '';
    const isAr = locale === 'ar';

    if (lastLower.includes('price') || lastLower.includes('cost') || lastLower.includes('سعر') || lastLower.includes('كم') || lastLower.includes('بكم') || lastLower.includes('tarif')) {
      reply = isAr
        ? `أسعارنا الثابتة والمضمونة لرحلات العمرة عبر أسطول ضيوف الرحمن VIP:\n\n• **مطار جدة (KAIA) إلى مكة المكرمة:**\n  - كامري (4 ركاب): 200 ريال\n  - هيونداي ستاريا VIP (7 ركاب): 260 ريال\n  - جي إم سي يوكون XL (7 ركاب فاخر): 380 ريال\n  - تويوتا هايس (10 ركاب): 340 ريال\n  - تويوتا كوستر (21 راكب): 650 ريال\n\n• **مكة المكرمة إلى المدينة المنورة (أو العكس مع ميقات آبار علي):**\n  - كامري: 450 ريال | ستاريا VIP: 500 ريال | يوكون XL: 750 ريال | هايس: 650 ريال\n\n✨ كافة الأسعار شاملة الوقود، الضرائب، ورسوم الطرق، والدفع عند الوصول إلى فندقكم بدون أي عربون مسبق.`
        : `Here are our guaranteed fixed fares for Duyuf Alrahman VIP private transfers:\n\n• **Jeddah Airport (KAIA) → Makkah Hotel:**\n  - Toyota Camry (4 Pax): SAR 200\n  - Hyundai Staria VIP (7 Pax): SAR 260\n  - GMC Yukon XL VIP (7 Pax): SAR 380\n  - Toyota HiAce (10 Pax): SAR 340\n  - Toyota Coaster VIP (21 Pax): SAR 650\n\n• **Makkah ⇄ Madinah (includes complimentary Miqat Bir Ali stop):**\n  - Camry: SAR 450 | Staria VIP: SAR 500 | Yukon XL: SAR 750 | HiAce: SAR 650\n\n✨ All fares are 100% all-inclusive (tolls, fuel, VAT). Zero upfront deposit — pay upon arrival to your chauffeur.`;
    } else if (lastLower.includes('zamzam') || lastLower.includes('زمزم')) {
      reply = isAr
        ? `بخصوص ماء زمزم المبارك:\n\nجميع سيارات أسطولنا مجهزة بصندوق أمتعة واسع يتسع لحمل عبوات زمزم الرسمية سعة 5 لتر مع حقائبكم بأمان تام.\n\n⚠️ **تنبيه هام للرحلات الجوية:** تنص تعليمات الطيران المدني (GACA) على شراء ماء زمزم من نقاط البيع المعتمدة في المطار وشحنه بشكل مستقل عبر مسارات زمزم، ويُمنع منعاً باتاً وضعه داخل حقائب السفر العادية.`
        : `Regarding blessed Zamzam water:\n\nAll our vehicles safely accommodate standard 5-liter factory-sealed Zamzam canisters in the luggage compartment.\n\n⚠️ **Important Flight Note:** GACA regulations require purchasing Zamzam only at designated airport outlets and checking it separately. Never pack liquid containers inside checked suitcases.`;
    } else if (lastLower.includes('miqat') || lastLower.includes('ميقات') || lastLower.includes('بير علي') || lastLower.includes('bir ali')) {
      reply = isAr
        ? `نعم بالتأكيد! التوقف في ميقات ذي الحليفة (مسجد آبار علي) مشمول ومجاني 100% لجميع الرحلات المنطلقة من المدينة المنورة إلى مكة المكرمة.\n\nيتوقف السائق لمدة 30 إلى 45 دقيقة كاملة تتيح للعائلة الاغتسال، وارتداء ملابس الإحرام، وصلاة ركعتين، وعقد النية، بينما تظل حقائبكم مؤمنة ومغلقة تماماً داخل السيارة.`
        : `Yes, absolutely! The stop at Masjid Dhu al-Hulayfah (Miqat Bir Ali) is 100% complimentary and included in all transfers from Madinah to Makkah.\n\nWe pause for 30 to 45 minutes allowing you and your family ample time for Ghusl, wearing Ihram, Sunnah prayer, and making Niyyah, while your luggage remains securely locked in the vehicle.`;
    } else if (lastLower.includes('cancel') || lastLower.includes('الغاء') || lastLower.includes('إلغاء')) {
      reply = isAr
        ? `سياسة الإلغاء لدى ضيوف الرحمن VIP مرنة وسهلة:\n\n• يمكنك إلغاء أو تعديل موعد رحلتك مجاناً بالكامل حتى 24 ساعة قبل موعد الاستقبال المحدد.\n• في حال تأخر أو تغيير موعد رحلة الطيران، يرجى فقط إشعارنا عبر الواتساب مع رقم حجزكم المرجعي وسنقوم بتحديث الموعد تلقائياً دون أي رسوم إضافية.`
        : `Our cancellation and adjustment policy is completely traveler-friendly:\n\n• 100% free cancellation up to 24 hours prior to scheduled pickup.\n• If your airline reschedules or delays your flight, simply message us on WhatsApp with your reference code and updated flight time; we update your pickup automatically with zero penalty.`;
    } else if (lastLower.includes('book') || lastLower.includes('حجز') || lastLower.includes('احجز') || lastLower.includes('اريد') || lastLower.includes('want')) {
      const waUrl = 'https://wa.me/966567588261?text=' + encodeURIComponent(isAr ? 'السلام عليكم، أود تأكيد حجز رحلة خاصة مع ضيوف الرحمن VIP' : 'Assalamu Alaikum, I would like to book a private VIP transfer with Duyuf Alrahman VIP');
      reply = isAr
        ? `نسعد جداً بخدمتكم في رحلتكم المباركة! يمكنك إتمام الحجز بإحدى الطريقتين:\n\n1. **الحجز المباشر عبر الموقع:** من خلال صفحة الحجز السريع واختيار السيارة ومسار الرحلة.\n2. **التواصل الفوري عبر الواتساب:** يمكنك الضغط على الرابط التالي لمراسلة مشرف الحجوزات مباشرة على الرقم:\n👉 [اضغط هنا للمحادثة المباشرة على الواتساب](${waUrl})\n\nسيسعد فريقنا بتأكيد حجزكم وتزويدكم ببيانات السائق فوراً.`
        : `We would be honored to serve you on your sacred journey! You can reserve your transfer in two ways:\n\n1. **Direct Online Booking:** Use our instant booking engine on the site to select your route and vehicle.\n2. **Instant WhatsApp Dispatch:** Connect with our on-duty coordinator directly at:\n👉 [Click here to chat directly on WhatsApp](${waUrl})\n\nOur team will confirm your vehicle and driver details in minutes.`;
    } else {
      reply = isAr
        ? `أهلاً ومرحباً بكم ضيفنا الكريم في **ضيوف الرحمن VIP** لخدمات النقل الخاص والعمرة 🕋✨\n\nأنا "رفيق"، مساعدكم الآلي الخاص. كيف يمكنني مساعدتكم اليوم؟\n\n• الاستفسار عن أسعار المسارات (جدة، مكة، والمدينة)\n• استعراض مواصفات وسعة سيارات الأسطول (يوكون XL، ستاريا، كامري، هايس، كوستر)\n• معرفة إرشادات الاستقبال في صالات مطار الملك عبدالعزيز ومطار المدينة\n• التوقف في ميقات آبار علي أو زيارة معالم ومزارات مكة والمدينة\n\nكما يمكنك في أي وقت التحدث مباشرة مع مشرف العمليات الميداني عبر الواتساب.`
        : `Welcome to **Duyuf Alrahman VIP** Private Umrah & Chauffeur Services 🕋✨\n\nI am "Rafeeq", your dedicated pilgrimage assistant. How may I assist you today?\n\n• Fixed fares for transfers (Jeddah, Makkah, and Madinah)\n• Fleet capacities (GMC Yukon XL, Hyundai Staria, Camry, HiAce, Coaster)\n• Terminal meeting points at KAIA Jeddah and MED Madinah\n• Miqat Bir Ali stops and historic Ziyarat tours\n\nFeel free to ask any question or tap below to connect with a live supervisor on WhatsApp.`;
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
