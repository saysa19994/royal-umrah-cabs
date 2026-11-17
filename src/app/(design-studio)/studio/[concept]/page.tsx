import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {CONCEPTS,SignatureStudioConcept,type ConceptKey} from '@/components/design-studio/SignatureStudioConcepts';

type Props={params:Promise<{concept:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return CONCEPTS.map(c=>({concept:c.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {concept}=await params;
 const item=CONCEPTS.find(c=>c.slug===concept);
 if(!item)return {robots:{index:false,follow:false}};
 return {title:item.title+' — Duyuf VIP Design Preview',description:'Interactive, unpublished art direction: '+item.description,robots:{index:false,follow:false}};
}
export default async function ConceptPreview({params}:Props){
 const {concept}=await params;
 if(!CONCEPTS.some(x=>x.slug===concept))notFound();
 return <SignatureStudioConcept concept={concept as ConceptKey}/>;
}
