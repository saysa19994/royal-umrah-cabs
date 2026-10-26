import fs from 'fs';

const filePath = 'D:/royal-umrah-cabs/src/components/home/HomeSections.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add import
if (!code.includes('FaqSection')) {
  code = code.replace(
    "import { EXECUTIVE_ROUTES_DATA } from '@/data/executive-routes-data';",
    "import { EXECUTIVE_ROUTES_DATA } from '@/data/executive-routes-data';\nimport { FaqSection } from '@/components/faq/FaqSection';"
  );
  console.log('Added FaqSection import');
}

// 2. Remove openFaq state and toggleFaq
code = code.replace(/\r?\n\s*const \[openFaq, setOpenFaq\] = useState<number \| null>\(0\);/, '');
code = code.replace(/\r?\n\s*const toggleFaq = \(index: number\) => \{\r?\n\s*setOpenFaq\(openFaq === index \? null : index\);\r?\n\s*\};/, '');
console.log('Removed openFaq state');

// 3. Remove FAQS array
const faqMarker = '// Section 9: FAQs';
const faqStart = code.indexOf(faqMarker);
if (faqStart !== -1) {
  const returnMarker = 'return (';
  const faqEnd = code.indexOf(returnMarker, faqStart);
  if (faqEnd !== -1) {
    code = code.slice(0, faqStart) + code.slice(faqEnd);
    console.log('Removed FAQS array');
  }
}

// 4. Replace section 9 JSX
const sec9Comment = '{/* SECTION 9: VERIFIED TESTIMONIALS & COMPREHENSIVE FAQS';
const sec9Start = code.indexOf(sec9Comment);
if (sec9Start !== -1) {
  const sec9TagStart = code.lastIndexOf('<section', sec9Start);
  const sec9EndTag = code.indexOf('</section>', sec9Start);
  if (sec9TagStart !== -1 && sec9EndTag !== -1) {
    const replacement = `      {/* SECTION 9: ACCESSIBLE MULTILINGUAL FAQ & CONVERSION CTA */}\n      <FaqSection locale={locale} dict={dict} settings={settings} />\n\n`;
    code = code.slice(0, sec9TagStart) + replacement + code.slice(sec9EndTag + '</section>'.length);
    console.log('Replaced Section 9 with FaqSection component');
  }
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Saved HomeSections.tsx successfully');
