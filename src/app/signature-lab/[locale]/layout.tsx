import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
export const dynamicParams=false;
export function generateStaticParams(){return [{locale:'ar'},{locale:'en'}];}
export default async function SignatureLabLocaleLayout({children,params}:{children:ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(locale!=='ar'&&locale!=='en')notFound();
 return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'} suppressHydrationWarning><body style={{margin:0,backgroundColor:'#fbf9f4'}}>{children}</body></html>;
}
