'use client';

import { useEffect } from 'react';

export function RoyalMotion() {
  useEffect(() => {
    const element = document.querySelector('[data-signature-fusion]');
    if (!element) return;
    const root = element;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

    async function activate() {
      cleanup?.();
      cleanup = undefined;
      if (disposed || preference.matches || document.documentElement.dataset.comfortMode === 'on') return;

      try {
        // @ts-ignore
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          // @ts-ignore
          import('gsap'),
          // @ts-ignore
          import('gsap/ScrollTrigger'),
        ]);
        if (disposed || preference.matches || document.documentElement.dataset.comfortMode === 'on') return;

        (gsap as any).registerPlugin(ScrollTrigger);
        const media = (gsap as any).matchMedia(root);
        const context = (gsap as any).context(() => {
          if (window.scrollY < 100) {
            (gsap as any).timeline({ defaults: { duration: .66, ease: 'power3.out' } })
              .from('[data-royal-hero-copy]', { opacity: .72, y: 14, stagger: .085, clearProps: 'opacity,transform' });
          }

          ((gsap as any).utils.toArray('[data-royal-image]', root) as any[]).forEach((image: any) => {
            (gsap as any).from(image, {
              clipPath: 'inset(5% 0 5% 0)',
              duration: .85,
              ease: 'power2.out',
              scrollTrigger: { trigger: image, start: 'top 89%', once: true },
              clearProps: 'clipPath',
            });
          });

        const path = root.querySelector<SVGPathElement>('[data-royal-route-path]');
        if (path) {
          gsap.fromTo(path, { strokeDashoffset: 1 }, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: '#fusion-routes', start: 'top 90%', end: 'top 34%', scrub: .45 },
          });
        }

        media.add('(min-width: 1024px) and (pointer: fine)', () => {
          gsap.to('[data-royal-hero-film] video', {
            yPercent: 7,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: { trigger: '#fusion-top', start: 'top top', end: 'bottom top', scrub: .55 },
          });
          // Do not pin image panels: pinned frames caused uneven full-page captures and scroll jumps.
        });
      }, root);
      cleanup = () => {
        media.revert();
        context.revert();
      };
      } catch {
        // Fallback gracefully if motion library is unavailable
      }
    }

    const refresh = () => { void activate().catch(() => undefined); };
    refresh();
    preference.addEventListener('change', refresh);
    const comfortObserver = new MutationObserver(refresh);
    comfortObserver.observe(document.documentElement, { attributes:true, attributeFilter:['data-comfort-mode'] });
    return () => {
      disposed = true;
      preference.removeEventListener('change', refresh);
      comfortObserver.disconnect();
      cleanup?.();
    };
  }, []);

  return null;
}
