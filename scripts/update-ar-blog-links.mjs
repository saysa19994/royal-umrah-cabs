import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/src/data/blog-content/transport-planning/ar.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Riyadh-to-Makkah route link
const target1 = "'4. مسافات الطريق وأوقات القيادة: احسب المسافة بدقة (جدة - مكة: ~85 كم، مكة - المدينة: ~430 كم، المدينة - جدة: ~420 كم) وزمن الرحلة التقديري على الطريق السريع.',";
const replace1 = "'4. مسافات الطريق وأوقات القيادة: احسب المسافة بدقة (جدة - مكة: ~85 كم، مكة - المدينة: ~430 كم، المدينة - جدة: ~420 كم) وزمن الرحلة التقديري على الطريق السريع. وللقادمين عبر العاصمة، يوفر [مسار الرياض إلى مكة المكرمة VIP](/ar/routes/riyadh-to-makkah) رحلة برية فاخرة لمسافة 870 كم حتى باب الفندق بمكة مباشرة.',";

if (content.includes(target1)) {
  content = content.replace(target1, replace1);
}

// 2. Add Makkah-to-Madinah route link
const target2 = "'توفر الانتقال المباشر من باب فندقك في مكة إلى باب فندقك في المدينة دون الحاجة لنقل الحقائب إلى محطات. تمنحك حرية تحديد موعد الانطلاق، والتوقف في الاستراحات للصلاة وتناول الطعام، مع الحفاظ على الخصوصية التامة للعائلة. لمزيد من التفاصيل، راجع [دليل الانتقال بسيارة خاصة من مكة إلى المدينة](/ar/blog/private-transfer-makkah-to-madinah) وتعرف على خيارات [سيارة VIP مع سائق في السعودية](/ar/blog/vip-car-with-driver-saudi-arabia).',";
const replace2 = "'توفر الانتقال المباشر من باب فندقك في مكة إلى باب فندقك في المدينة دون الحاجة لنقل الحقائب إلى محطات. تمنحك حرية تحديد موعد الانطلاق، والتوقف في الاستراحات للصلاة وتناول الطعام، مع الحفاظ على الخصوصية التامة للعائلة. لمزيد من التفاصيل، اطلع على [مسار مكة إلى المدينة المنورة VIP](/ar/routes/makkah-to-madinah) و[دليل الانتقال بسيارة خاصة من مكة إلى المدينة](/ar/blog/private-transfer-makkah-to-madinah).',";

if (content.includes(target2)) {
  content = content.replace(target2, replace2);
}

// 3. Add Toyota HiAce and Toyota Coaster distinct links
const target3 = "'• المجموعات الكبيرة (10–14 راكباً): تناسبهم حافلات تويوتا هايس وتويوتا كوستر للتنقل معاً في مركبة واحدة.',";
const replace3 = "'• المجموعات الكبيرة (10–14 راكباً): تناسبهم حافلات [تويوتا هايس VIP](/ar/fleet/toyota-hiace)، وللوفود والمجموعات الكبيرة حتى 18 راكباً تتوفر حافلات [تويوتا كوستر VIP](/ar/fleet/toyota-coaster) للتنقل براحة تامة وتكييف مركزي ممتاز.',";

if (content.includes(target3)) {
  content = content.replace(target3, replace3);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated transport-planning ar.ts internal links');
