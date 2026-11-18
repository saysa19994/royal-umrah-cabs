import React from 'react';
import {Locale} from '@/i18n/config';
import {getDictionary} from '@/i18n/get-dictionary';
import {HomepageFaqJsonLd} from '@/components/seo/JsonLd';
import {JourneyArchitectHomepage} from '@/components/home/JourneyArchitectHomepage';
import SignatureFusionHomepage from '@/components/fusion/SignatureFusionHomepage';
import {getDbPricesCached} from '@/lib/pricing-db';

interface HomePageProps {params:Promise<{locale:Locale}>}
export default async function HomePage({params}:HomePageProps){
 const {locale}=await params;
 const dict=getDictionary(locale);
 // Signature Fusion is restricted to the Arabic/English design review branch.
 // Other eight localizations retain their complete canonical homepage as-is.
 // Production must not receive this change until owner acceptance.
 if(locale==='ar'||locale==='en'){
   const rates=await getDbPricesCached();
   return <><HomepageFaqJsonLd dict={dict}/><SignatureFusionHomepage locale={locale} rates={rates} dict={dict}/></>;
 }
 return <>
   <HomepageFaqJsonLd dict={dict}/>
   <JourneyArchitectHomepage locale={locale} dict={dict}/>
 </>;
}
