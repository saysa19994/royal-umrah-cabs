import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/src/data/comprehensive-guides.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Update guide 4 subtitle
const targetSub = "'مقارنة سعة الركاب والأمتعة بين كامري، وهيونداي ستاريا، وجي إم سي يوكون XL، وتويوتا هايس.',";
const replaceSub = "'مقارنة سعة الركاب والأمتعة بين كامري، وهيونداي ستاريا، وجي إم سي يوكون XL، وتويوتا هايس، وتويوتا كوستر.',";

// Update guide 4 breakdown
const targetBody = "'1. تويوتا كامري: مثالية لشخصين أو 3 بحقيبتين كبيرتين.\\n2. هيونداي ستاريا VIP: أنسب خيار للعائلات (4-6 ركاب مع 5 حقائب كبيرة).\\n3. يوكون XL: للفخامة والمساحة الهائلة مع 7 ركاب و8 حقائب.\\n4. تويوتا هايس: المجموعات والعائلات الكبيرة حتى 10 ركاب مع 10 حقائب.',";
const replaceBody = "'1. تويوتا كامري: مثالية لشخصين أو 3 بحقيبتين كبيرتين.\\n2. هيونداي ستاريا VIP: أنسب خيار للعائلات (4-6 ركاب مع 5 حقائب كبيرة).\\n3. يوكون XL: للفخامة والمساحة الهائلة مع 7 ركاب و8 حقائب.\\n4. تويوتا هايس: المجموعات والعائلات الكبيرة حتى 10 ركاب مع 10 حقائب.\\n5. تويوتا كوستر VIP: الوفود والمجموعات الكبيرة حتى 18 راكباً مع 18 حقيبة سفر.',";

const targetBodyEn = "'1. Toyota Camry: Perfect for 1–3 passengers with 2 standard suitcases.\\n2. Hyundai Staria VIP: Ideal for families of 4–6 with 5–6 suitcases.\\n3. GMC Yukon XL: Ultimate luxury and deep cargo for up to 7 VIPs with 8 bags.\\n4. Toyota HiAce: Extended families and groups up to 10 with 10 suitcases.'";
const replaceBodyEn = "'1. Toyota Camry: Perfect for 1–3 passengers with 2 standard suitcases.\\n2. Hyundai Staria VIP: Ideal for families of 4–6 with 5–6 suitcases.\\n3. GMC Yukon XL: Ultimate luxury and deep cargo for up to 7 VIPs with 8 bags.\\n4. Toyota HiAce: Extended families and groups up to 10 with 10 suitcases.\\n5. Toyota Coaster VIP: Large Umrah groups and delegations up to 18 with 18 suitcases.'";

if (content.includes(targetSub)) {
  content = content.replace(targetSub, replaceSub);
}
if (content.includes(targetBody)) {
  content = content.replace(targetBody, replaceBody);
}
if (content.includes(targetBodyEn)) {
  content = content.replace(targetBodyEn, replaceBodyEn);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated comprehensive-guides.ts with Toyota Coaster');
