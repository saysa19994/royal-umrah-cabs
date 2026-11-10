import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/src/data/blog-content/transport-planning/tr.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Riyadh-to-Makkah route link in section 1
const target1 = "'4. Şehirlerarası Mesafeler ve Sürüş Süreleri: Karayolu mesafelerini (Cidde - Mekke: ~85 km, Mekke - Medine: ~430 km, Medine - Cidde: ~420 km) ve otoyoldaki ortalama seyir sürelerini hesaba katın.',";
const replace1 = "'4. Şehirlerarası Mesafeler ve Sürüş Süreleri: Karayolu mesafelerini (Cidde - Mekke: ~85 km, Mekke - Medine: ~430 km, Medine - Cidde: ~420 km) ve otoyoldaki ortalama seyir sürelerini hesaba katın. Riyad üzerinden gelen yolcularımız için [Riyad - Mekke VIP Transfer](/tr/routes/riyadh-to-makkah) güzergahımız 870 km olup doğrudan otel kapısına ulaşım sağlar.',";

if (content.includes(target1)) {
  content = content.replace(target1, replace1);
}

// 2. Add Makkah-to-Madinah route link in section 3
const target2 = "'Mekke’deki otel kapısından Medine’deki otel kapısına doğrudan transfer (Door-to-Door) sağlar. Ailenin uyanma saatine göre serbest hareket imkanı, otoyol dinlenme tesislerinde namaz ve yemek molası verme özgürlüğü, tam mahremiyet ve varışta ödeme kolaylığı sunar. Detaylar için [Mekke’den Medine’ye Özel Transfer Rehberi](/tr/blog/private-transfer-makkah-to-madinah) sayfamıza göz atın ve [Suudi Arabistan’da Şoförlü VIP Araç](/tr/blog/vip-car-with-driver-saudi-arabia) seçeneklerimizi inceleyin.',";
const replace2 = "'Mekke’deki otel kapısından Medine’deki otel kapısına doğrudan transfer (Door-to-Door) sağlar. Ailenin uyanma saatine göre serbest hareket imkanı, otoyol dinlenme tesislerinde namaz ve yemek molası verme özgürlüğü, tam mahremiyet ve varışta ödeme kolaylığı sunar. Detaylar için [Mekke - Medine VIP Güzergahı](/tr/routes/makkah-to-madinah) sayfamızı ve [Mekke’den Medine’ye Özel Transfer Rehberi](/tr/blog/private-transfer-makkah-to-madinah) yazımızı inceleyebilirsiniz.',";

if (content.includes(target2)) {
  content = content.replace(target2, replace2);
}

// 3. Add Toyota HiAce and Toyota Coaster specific links in fleet section
const target3 = "'• Kalabalık Gruplar (10–14 yolcu): Toyota HiAce ve Toyota Coaster minibüsleri tüm kafilenin tek araçta klimalı şekilde seyahat etmesini sağlar.',";
const replace3 = "'• Kalabalık Gruplar (10–14 yolcu): [Toyota HiAce VIP](/tr/fleet/toyota-hiace) ve büyük kafileler (18 yolcuya kadar) için [Toyota Coaster VIP](/tr/fleet/toyota-coaster) minibüsleri tüm kafilenin tek araçta klimalı şekilde seyahat etmesini sağlar.',";

if (content.includes(target3)) {
  content = content.replace(target3, replace3);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated transport-planning tr.ts internal links');
