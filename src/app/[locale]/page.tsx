import React from 'react';
import {Locale} from '@/i18n/config';
import {getDictionary} from '@/i18n/get-dictionary';
import {HomepageFaqJsonLd} from '@/components/seo/JsonLd';
import {JourneyArchitectHomepage} from '@/components/home/JourneyArchitectHomepage';

interface HomePageProps {params:Promise<{locale:Locale}>}
export default async function HomePage({params}:HomePageProps){
 const {locale}=await params;
 const dict=getDictionary(locale);
 return <>
  <HomepageFaqJsonLd dict={dict}/>
  <JourneyArchitectHomepage locale={locale} dict={dict}/>
 </>;
}
