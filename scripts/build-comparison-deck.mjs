import fs from 'fs';
import path from 'path';

const outPath = 'd:\\royal-umrah-cabs\\design-concepts\\index.html';

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DUYUF ALRAHMAN VIP — THE SIGNATURE EXPERIENCE | لوحة التوجيه الإبداعي</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #161513;
      color: #F3EFE5;
      font-family: 'Plus Jakarta Sans', 'IBM Plex Sans Arabic', sans-serif;
    }
    .font-luxury { font-family: 'Cinzel', serif; }
    .font-arabic-title { font-family: 'IBM Plex Sans Arabic', 'Amiri', serif; }
  </style>
</head>
<body class="min-h-screen antialiased selection:bg-[#B77C4D] selection:text-white">

  <!-- ===================================================================
       1. HERO HEADER: CREATIVE DIRECTOR PRESENTATION
  ==================================================================== -->
  <header class="border-b border-white/10 bg-[#1D1B18] px-8 py-12">
    <div class="max-w-7xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#B77C4D]/20 text-[#B77C4D] border border-[#B77C4D]/40 mb-4">
        THE SIGNATURE EXPERIENCE • PHASE 01 CREATIVE DIRECTION
      </div>
      <h1 class="font-arabic-title font-bold text-4xl lg:text-5xl text-[#FBF9F4] leading-tight mb-4">
        ضيوف الرحمن VIP — الهوية البصرية الفاخرة الجديدة
      </h1>
      <p class="text-slate-300 text-sm lg:text-base max-w-3xl leading-relaxed font-light">
        تنفيذاً للقرار الإبداعي الحاسم بالابتعاد التام عن الأزرق الداكن (Navy Blue) وقوالب المواقع المكررة، نقدم ثلاثة اتجاهات إبداعية أصلية ذات طابع معماري سعودي وتاريخي فاخر.
      </p>

      <!-- Recommendation Callout Banner -->
      <div class="mt-8 p-6 rounded-2xl bg-[#34483B]/40 border-2 border-[#B77C4D] backdrop-blur-md">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-[#B77C4D] text-[#1D1B18] flex items-center justify-center font-black text-xl shrink-0">
            ★
          </div>
          <div>
            <span class="text-xs font-extrabold uppercase tracking-widest text-[#B77C4D] block mb-1">
              توصية الإدارة الإبداعية (CREATIVE DIRECTOR RECOMMENDATION)
            </span>
            <strong class="text-lg font-bold text-[#FBF9F4] block mb-1">
              المفهوم الموصى به رسمياً: Concept A — Desert Modernism (الحداثة الصحراوية المعمارية)
            </strong>
            <p class="text-xs text-slate-200 leading-relaxed">
              يمثل هذا المفهوم الهوية الأقوى والأكثر تفرداً لعلامة ضيافة وتنقل سعودية فاخرة؛ حيث يمزج دفء الحجر الجيري (Limestone #F3EFE5) مع فخامة الزيتوني الداكن (#34483B) والنحاس العتيق (#B77C4D)، متفادياً برودة الأزرق المستهلك، ويعزز الثقة العالية، وضوح الأسعار، وسهولة الحجز الفوري.
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- ===================================================================
       2. THREE CONCEPTS COMPARISON MATRIX
  ==================================================================== -->
  <main class="max-w-7xl mx-auto px-8 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

      <!-- ==================== CONCEPT A ==================== -->
      <div class="bg-[#1D1B18] rounded-3xl border-2 border-[#B77C4D] p-8 flex flex-col justify-between relative shadow-2xl">
        <div class="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B77C4D] text-white">
          RECOMMENDED PRIMARY
        </div>
        <div>
          <!-- Brand Emblem -->
          <div class="bg-[#292821] p-4 rounded-2xl border border-[#B77C4D]/30 mb-6 flex items-center justify-center min-h-[100px]">
            <img src="/assets/brand/logo-concept-a-reverse.svg" alt="Concept A Logo" class="h-16 w-auto object-contain">
          </div>

          <span class="text-xs font-bold text-[#B77C4D] uppercase tracking-widest">DIRECTION 01</span>
          <h2 class="font-arabic-title font-bold text-2xl text-[#FBF9F4] mt-1 mb-2">
            الحداثة الصحراوية المعمارية
          </h2>
          <span class="text-xs font-luxury text-slate-400 block mb-4">CONCEPT A — DESERT MODERNISM</span>
          
          <p class="text-xs text-slate-300 leading-relaxed mb-6 font-light">
            مستوحى من الهندسة المعمارية السعودية المعاصرة في الدرعية والعلا، الحجر الجيري الطبيعي، خشب النخيل والظلال الوارفة.
          </p>

          <!-- Palette Swatches -->
          <div class="mb-6">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">لوحة الألوان الرسمية:</span>
            <div class="grid grid-cols-6 gap-1.5 h-10 rounded-lg overflow-hidden border border-white/10">
              <div class="bg-[#F3EFE5]" title="Limestone Ivory: #F3EFE5"></div>
              <div class="bg-[#34483B]" title="Deep Olive: #34483B"></div>
              <div class="bg-[#B77C4D]" title="Aged Copper: #B77C4D"></div>
              <div class="bg-[#292821]" title="Warm Charcoal: #292821"></div>
              <div class="bg-[#DCCDB6]" title="Soft Sand: #DCCDB6"></div>
              <div class="bg-[#FBF9F4]" title="Pure Cream: #FBF9F4"></div>
            </div>
            <div class="flex justify-between text-[9px] text-slate-400 mt-1 font-mono">
              <span>#F3EFE5</span>
              <span>#34483B</span>
              <span>#B77C4D</span>
              <span>#292821</span>
            </div>
          </div>

          <!-- Key Pillars -->
          <ul class="text-xs text-slate-300 space-y-2 mb-8">
            <li class="flex items-center gap-2">✓ <strong>خلفيات حجرية دافئة</strong> بدلاً من الأبيض البارد</li>
            <li class="flex items-center gap-2">✓ <strong>أخضر زيتوني ملكي</strong> يمنح هيبة وطمأنينة روحانية</li>
            <li class="flex items-center gap-2">✓ <strong>نحاس عتيق</strong> يعكس الضيافة النبيلة</li>
            <li class="flex items-center gap-2">✓ <strong>عزل تام للأسود الحاد</strong> والأزرق الداكن المستهلك</li>
          </ul>
        </div>

        <div class="space-y-2 pt-4 border-t border-white/10">
          <a href="concept-a-desktop.html" target="_blank" 
             class="block w-full py-3 rounded-xl bg-[#B77C4D] hover:bg-[#a66e41] text-white text-center font-extrabold text-xs transition-colors shadow-md">
            معاينة سطح المكتب (1440px) ←
          </a>
          <a href="concept-a-mobile.html" target="_blank" 
             class="block w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-center font-bold text-xs transition-colors">
            معاينة الجوال (390px)
          </a>
        </div>
      </div>

      <!-- ==================== CONCEPT B ==================== -->
      <div class="bg-[#1D1B18] rounded-3xl border border-white/15 p-8 flex flex-col justify-between relative shadow-xl hover:border-[#B38B62]/60 transition-colors">
        <div>
          <!-- Brand Emblem -->
          <div class="bg-[#302825] p-4 rounded-2xl border border-[#B38B62]/30 mb-6 flex items-center justify-center min-h-[100px]">
            <img src="/assets/brand/logo-concept-b-reverse.svg" alt="Concept B Logo" class="h-16 w-auto object-contain">
          </div>

          <span class="text-xs font-bold text-[#B38B62] uppercase tracking-widest">DIRECTION 02</span>
          <h2 class="font-arabic-title font-bold text-2xl text-[#FBF9F4] mt-1 mb-2">
            الصالون الملكي التحريري
          </h2>
          <span class="text-xs font-luxury text-slate-400 block mb-4">CONCEPT B — ROYAL EDITORIAL</span>
          
          <p class="text-xs text-slate-300 leading-relaxed mb-6 font-light">
            مستوحى من صالونات الطيران الخاص الفاخرة، المطبوعات التحريرية الرفيعة، العنابي الملكي والبرونز العتيق.
          </p>

          <!-- Palette Swatches -->
          <div class="mb-6">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">لوحة الألوان الرسمية:</span>
            <div class="grid grid-cols-5 gap-1.5 h-10 rounded-lg overflow-hidden border border-white/10">
              <div class="bg-[#F8F4EC]" title="Warm Ivory: #F8F4EC"></div>
              <div class="bg-[#542E32]" title="Royal Burgundy: #542E32"></div>
              <div class="bg-[#B38B62]" title="Antique Bronze: #B38B62"></div>
              <div class="bg-[#302825]" title="Espresso: #302825"></div>
              <div class="bg-[#E8DDCF]" title="Champagne Cream: #E8DDCF"></div>
            </div>
            <div class="flex justify-between text-[9px] text-slate-400 mt-1 font-mono">
              <span>#F8F4EC</span>
              <span>#542E32</span>
              <span>#B38B62</span>
              <span>#302825</span>
            </div>
          </div>

          <!-- Key Pillars -->
          <ul class="text-xs text-slate-300 space-y-2 mb-8">
            <li class="flex items-center gap-2">✓ <strong>عنابي ملكي عميق (#542E32)</strong> بروتوكولي راقي</li>
            <li class="flex items-center gap-2">✓ <strong>برونز كلاسيكي (#B38B62)</strong> للخطوط والفواصل</li>
            <li class="flex items-center gap-2">✓ <strong>إسبريسو دافئ</strong> كبديل عن الأسود الكربوني</li>
            <li class="flex items-center gap-2">✓ طابع مجلات السفر والنشر العالمي الفاخر</li>
          </ul>
        </div>

        <div class="space-y-2 pt-4 border-t border-white/10">
          <a href="concept-b-desktop.html" target="_blank" 
             class="block w-full py-3 rounded-xl bg-[#542E32] hover:bg-[#6b3a3f] text-white text-center font-extrabold text-xs transition-colors shadow-md">
            معاينة سطح المكتب (1440px) ←
          </a>
          <a href="concept-b-mobile.html" target="_blank" 
             class="block w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-center font-bold text-xs transition-colors">
            معاينة الجوال (390px)
          </a>
        </div>
      </div>

      <!-- ==================== CONCEPT C ==================== -->
      <div class="bg-[#1D1B18] rounded-3xl border border-white/15 p-8 flex flex-col justify-between relative shadow-xl hover:border-[#B96746]/60 transition-colors">
        <div>
          <!-- Brand Emblem -->
          <div class="bg-[#29251F] p-4 rounded-2xl border border-[#B96746]/30 mb-6 flex items-center justify-center min-h-[100px]">
            <img src="/assets/brand/logo-concept-c-reverse.svg" alt="Concept C Logo" class="h-16 w-auto object-contain">
          </div>

          <span class="text-xs font-bold text-[#B96746] uppercase tracking-widest">DIRECTION 03</span>
          <h2 class="font-arabic-title font-bold text-2xl text-[#FBF9F4] mt-1 mb-2">
            الأفق الصحراوي السينمائي
          </h2>
          <span class="text-xs font-luxury text-slate-400 block mb-4">CONCEPT C — CINEMATIC SANDSTONE</span>
          
          <p class="text-xs text-slate-300 leading-relaxed mb-6 font-light">
            مستوحى من ألوان السفر الدرامية عند ساعة الغروب، تدرجات الحجر الرملي، الطين المحروق (Terracotta)، وحرارة الضيافة النجدية والحجازية.
          </p>

          <!-- Palette Swatches -->
          <div class="mb-6">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">لوحة الألوان الرسمية:</span>
            <div class="grid grid-cols-5 gap-1.5 h-10 rounded-lg overflow-hidden border border-white/10">
              <div class="bg-[#E8DCC9]" title="Sandstone: #E8DCC9"></div>
              <div class="bg-[#29251F]" title="Deep Espresso: #29251F"></div>
              <div class="bg-[#B96746]" title="Burnt Terracotta: #B96746"></div>
              <div class="bg-[#78806A]" title="Muted Olive: #78806A"></div>
              <div class="bg-[#F8F5EF]" title="Warm White: #F8F5EF"></div>
            </div>
            <div class="flex justify-between text-[9px] text-slate-400 mt-1 font-mono">
              <span>#E8DCC9</span>
              <span>#29251F</span>
              <span>#B96746</span>
              <span>#78806A</span>
            </div>
          </div>

          <!-- Key Pillars -->
          <ul class="text-xs text-slate-300 space-y-2 mb-8">
            <li class="flex items-center gap-2">✓ <strong>تراكوتا محروق (#B96746)</strong> نابض بالحيوية والجاذبية</li>
            <li class="flex items-center gap-2">✓ <strong>حجر رملي دافئ (#E8DCC9)</strong> مريح للبصر</li>
            <li class="flex items-center gap-2">✓ <strong>زيتوني هادئ (#78806A)</strong> يوازن ألوان الأرض</li>
            <li class="flex items-center gap-2">✓ تجربة سفر سينمائية غامرة</li>
          </ul>
        </div>

        <div class="space-y-2 pt-4 border-t border-white/10">
          <a href="concept-c-desktop.html" target="_blank" 
             class="block w-full py-3 rounded-xl bg-[#B96746] hover:bg-[#a55a3c] text-white text-center font-extrabold text-xs transition-colors shadow-md">
            معاينة سطح المكتب (1440px) ←
          </a>
          <a href="concept-c-mobile.html" target="_blank" 
             class="block w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-center font-bold text-xs transition-colors">
            معاينة الجوال (390px)
          </a>
        </div>
      </div>

    </div>

    <!-- ===================================================================
         3. COMPARATIVE ARCHITECTURAL AUDIT TABLE
    ==================================================================== -->
    <div class="bg-[#1D1B18] rounded-3xl border border-white/10 p-8 shadow-xl">
      <h3 class="font-arabic-title font-bold text-2xl text-[#FBF9F4] mb-4">
        مقارنة المعايير التصميمية والتجارية للمفاهيم الثلاثة
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-start text-xs border-collapse">
          <thead>
            <tr class="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[11px]">
              <th class="py-3 px-4 text-start">المعيار الإبداعي والتجاري</th>
              <th class="py-3 px-4 text-start text-[#B77C4D] font-bold">Concept A (الحداثة الصحراوية)</th>
              <th class="py-3 px-4 text-start text-[#B38B62]">Concept B (الصالون التحريري)</th>
              <th class="py-3 px-4 text-start text-[#B96746]">Concept C (الأفق السينمائي)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-slate-300">
            <tr>
              <td class="py-3.5 px-4 font-bold text-white">الطابع العام (Atmosphere)</td>
              <td class="py-3.5 px-4 text-[#F3EFE5]">معماري، هادئ، واثق، يجسد الضيافة السعودية المعاصرة</td>
              <td class="py-3.5 px-4">كلاسيكي راقي، صالون ملكي، طيران خاص</td>
              <td class="py-3.5 px-4">مغامرة سفر درامية، ضوء غروب، حيوية ترابية</td>
            </tr>
            <tr>
              <td class="py-3.5 px-4 font-bold text-white">اللون الأساسي (Primary)</td>
              <td class="py-3.5 px-4 font-mono text-[#B77C4D]">أخضر زيتوني #34483B ونحاس #B77C4D</td>
              <td class="py-3.5 px-4 font-mono text-[#B38B62]">عنابي ملكي #542E32 وبرونز #B38B62</td>
              <td class="py-3.5 px-4 font-mono text-[#B96746]">تراكوتا #B96746 وزيتوني #78806A</td>
            </tr>
            <tr>
              <td class="py-3.5 px-4 font-bold text-white">قوة تحويل الحجز (Conversion)</td>
              <td class="py-3.5 px-4 font-bold text-emerald-400">ممتازة جداً (تباين مريح، أزرار واضحة)</td>
              <td class="py-3.5 px-4">عالية (تعتمد على الفخامة المفرطة)</td>
              <td class="py-3.5 px-4">عالية جداً (التراكوتا لون محفز بصرياً)</td>
            </tr>
            <tr>
              <td class="py-3.5 px-4 font-bold text-white">الرمز والشعار (Emblem)</td>
              <td class="py-3.5 px-4">المحراب المعماري والسبيل (قوس إسلامي + مسار)</td>
              <td class="py-3.5 px-4">الخاتم الملكي المثمن (Monogram D)</td>
              <td class="py-3.5 px-4">أفق الشمس وبوابة السفر الصحراوي</td>
            </tr>
            <tr>
              <td class="py-3.5 px-4 font-bold text-white">التوافق مع أسطول المركبات</td>
              <td class="py-3.5 px-4">توافق استثنائي مع الأسود والرمادي والأبيض للأسطول</td>
              <td class="py-3.5 px-4">مناسب جداً للسيارات السوداء الفارهة</td>
              <td class="py-3.5 px-4">ممتاز في صور الطرق السريعة والمناظر الطبيعية</td>
            </tr>
            <tr>
              <td class="py-3.5 px-4 font-bold text-white">الاستدامة وعدم التقادم</td>
              <td class="py-3.5 px-4 font-bold text-emerald-400">طويلة الأمد جداً (ألوان العمارة والطبيعة لا تتقادم)</td>
              <td class="py-3.5 px-4">طويلة الأمد</td>
              <td class="py-3.5 px-4">متوسطة إلى طويلة الأمد</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <footer class="border-t border-white/10 py-8 text-center text-xs text-slate-500">
    DUYUF ALRAHMAN VIP • WORLD-CLASS LUXURY BRAND &amp; DIGITAL EXPERIENCE • 2026
  </footer>

</body>
</html>`;

fs.writeFileSync(outPath, html);
console.log('Successfully generated master comparison deck at design-concepts/index.html!');
