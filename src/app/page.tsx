import { Metadata } from 'next';
import LocaleLayout, { generateMetadata as generateLocaleMetadata } from './[locale]/layout';
import HomePage from './[locale]/page';
import { DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  return generateLocaleMetadata({ params: Promise.resolve({ locale: DEFAULT_LOCALE }) });
}

export default async function RootPage() {
  const params = Promise.resolve({ locale: DEFAULT_LOCALE });
  return (
    <LocaleLayout params={params}>
      <HomePage params={params} />
    </LocaleLayout>
  );
}
