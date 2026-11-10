import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/src/app/[locale]/guides/[slug]/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetUnix = `  return {
    title: \`\${title} | Duyuf Alrahman VIP\`,
    description,
    alternates: getLocalizedAlternates(locale, \`/guides/\${slug}\`),
    openGraph: {`;

const targetCrlf = targetUnix.replace(/\n/g, '\r\n');

const replacementUnix = `  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const isFullyLocalized = locale === 'ar' || locale === 'en';
  const alternates = isFullyLocalized
    ? {
        canonical: \`\${baseUrl}/\${locale}/guides/\${slug}\`,
        languages: {
          ar: \`\${baseUrl}/ar/guides/\${slug}\`,
          en: \`\${baseUrl}/en/guides/\${slug}\`,
          'x-default': \`\${baseUrl}/en/guides/\${slug}\`,
        },
      }
    : {
        canonical: \`\${baseUrl}/en/guides/\${slug}\`,
      };

  return {
    title: \`\${title} | Duyuf Alrahman VIP\`,
    description,
    robots: isFullyLocalized
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates,
    openGraph: {`;

const replacementCrlf = replacementUnix.replace(/\n/g, '\r\n');

if (content.includes(targetCrlf)) {
  content = content.replace(targetCrlf, replacementCrlf);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated guides/[slug]/page.tsx with CRLF');
} else if (content.includes(targetUnix)) {
  content = content.replace(targetUnix, replacementUnix);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated guides/[slug]/page.tsx with Unix');
} else {
  console.error('Could not find target block in file');
}
