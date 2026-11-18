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
      if (disposed || preference.matches) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed || preference.matches) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia(root);
      const context = gsap.context(() => {
        if (window.scrollY < 100) {
          gsap.timeline({ defaults: { duration: .66, ease: 'power3.out' } })
            .from('[data-royal-hero-copy]', { opacity: .72, y: 14, stagger: .085, clearProps: 'opacity,transform' });
        }

        gsap.utils.toArray<HTMLElement>('[data-royal-image]', root).forEach((image) => {
          gsap.from(image, {
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
          const story = root.querySelector<HTMLElement>('[data-royal-story]');
          const frame = story?.querySelector<HTMLElement>('[data-royal-story-frame]');
          if (story && frame) {
            ScrollTrigger.create({ trigger: frame, start: 'top 23%', end: '+=96', pin: true, pinSpacing: false });
          }
        });
      }, root);
      cleanup = () => {
        media.revert();
        context.revert();
      };
    }

    const refresh = () => { void activate().catch(() => undefined); };
    refresh();
    preference.addEventListener('change', refresh);
    return () => {
      disposed = true;
      preference.removeEventListener('change', refresh);
      cleanup?.();
    };
  }, []);

  return null;
}
