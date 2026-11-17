import type {Metadata} from 'next';
import styles from './studio-layout.module.css';

export const metadata:Metadata={
 title:'Signature Design Studio | Duyuf Alrahman VIP — Private Review',
 description:'Three private luxury art-direction prototypes for review only.',
 robots:{index:false,follow:false,googleBot:{index:false,follow:false}},
};
export default function StudioLayout({children}:{children:React.ReactNode}){
 return <html lang="ar" dir="rtl"><body className={styles.studioBody}>{children}</body></html>;
}
