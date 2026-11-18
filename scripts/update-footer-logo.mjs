import fs from 'fs';

let content = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

const target = `<Link href={locale === 'en' ? '/' : \`/\${locale}\`} className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#C5A15D]/40 flex items-center justify-center shadow-xs shrink-0 bg-[#101827]">
                <Image
                  src="/icon-192.png"
                  alt="Duyuf Alrahman VIP"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-start">
                <span className="font-serif font-bold text-lg md:text-xl uppercase tracking-wide text-white">
                  {t.tagline}
                </span>
                <span className="text-[10px] font-bold text-gold tracking-[0.16em] uppercase">
                  {t.subTagline}
                </span>
              </div>
            </Link>`;

const replacement = `<Link href={locale === 'en' ? '/' : \`/\${locale}\`} className="inline-flex items-center">
              <Image
                src="/assets/brand/logo-royal-crest-gold.svg"
                alt="Duyuf Alrahman VIP"
                width={220}
                height={50}
                className="h-11 w-auto object-contain"
              />
            </Link>`;

if (content.includes('/icon-192.png')) {
  // normalize newlines for replacement
  const isCrlf = content.includes('\r\n');
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const normalizedTarget = target.replace(/\r\n/g, '\n');
  const normalizedReplacement = replacement.replace(/\r\n/g, '\n');
  
  if (normalizedContent.includes(normalizedTarget)) {
    let replaced = normalizedContent.replace(normalizedTarget, normalizedReplacement);
    if (isCrlf) replaced = replaced.replace(/\n/g, '\r\n');
    fs.writeFileSync('src/components/layout/Footer.tsx', replaced, 'utf8');
    console.log('Successfully replaced footer logo!');
  } else {
    console.log('Target string not found in normalized content');
  }
} else {
  console.log('No /icon-192.png found in footer');
}
