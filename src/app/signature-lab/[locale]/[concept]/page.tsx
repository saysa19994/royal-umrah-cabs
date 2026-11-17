import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import SignatureConceptExperience from '@/components/signature-studio/SignatureConceptExperience';
import {APPROVED_5_FLEET} from '@/data/approved-fleet-homepage';
import {getDbPricesCached} from '@/lib/pricing-db';
const CONCEPTS=['desert','editorial','cinematic'] as const;
const NAMES={desert:'Desert Modernism',editorial:'Royal Editorial',cinematic:'Cinematic Sandstone'} as const;
export const dynamicParams=false;
export function generateStaticParams(){return ['ar','en'].flatMap(locale=>CONCEPTS.map(concept=>({locale,concept})));}
export async function generateMetadata({params}:{params:Promise<{locale:string;concept:string}>}):Promise<Metadata>{
 const {concept}=await params;
 if(!CONCEPTS.includes(concept as typeof CONCEPTS[number]))return {robots:{index:false,follow:false}};
 return {
  title:NAMES[concept as typeof CONCEPTS[number]]+' | Duyuf VIP design exploration',
  description:'An unapproved creative direction. Not the live Duyuf Alrahman VIP booking site.',
  robots:{index:false,follow:false,noarchive:true},
  other:{'x-design-stage':'phase-one-unapproved-preview'},
 };
}
export default async function SignatureLabConceptPage({params}:{params:Promise<{locale:string;concept:string}>}){
 const {locale,concept}=await params;
 if((locale!=='ar'&&locale!=='en')||!CONCEPTS.includes(concept as typeof CONCEPTS[number]))notFound();
 const rates=await getDbPricesCached();
 return <SignatureConceptExperience locale={locale as 'ar'|'en'} concept={concept as typeof CONCEPTS[number]} fleet={APPROVED_5_FLEET} rates={rates}/>;
}
