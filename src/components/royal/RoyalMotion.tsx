'use client';

import {useEffect} from 'react';

/**
 * Royal Immersion — deliberate, minimal GSAP motion.
 * ScrollTriggers are scoped to the review homepage. No pinned sections or
 * blocking transitions: booking must stay immediate and accessible.
 * Honors the user's reduced-motion preference and always cleans up.
 */
export function RoyalMotion(){
 useEffect(()=>{
  let disposed=false;
  let cleanup:undefined|(()=>void);
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets=[
   '#royal-process-title','#fusion-story-title','#fusion-fleet-title',
   '#royal-services-title','#royal-ziyarat-title','#royal-chauffeur-title',
   '#fusion-routes-title','#royal-reviews-title','#royal-faq-title'
  ];
  async function activate(){
   cleanup?.();
   cleanup=undefined;
   if(disposed||media.matches)return;
   const [{gsap},{ScrollTrigger}]=await Promise.all([
    import('gsap'),import('gsap/ScrollTrigger')
   ]);
   if(disposed||media.matches)return;
   gsap.registerPlugin(ScrollTrigger);
   const context=gsap.context(()=>{
    targets.forEach(selector=>{
     const heading=document.querySelector<HTMLElement>(selector);
     if(!heading)return;
     gsap.fromTo(heading,{autoAlpha:0,y:18},{
      autoAlpha:1,y:0,duration:.75,ease:'power2.out',
      scrollTrigger:{trigger:heading,start:'top 90%',once:true},
      clearProps:'transform,visibility,opacity'
     });
    });
   });
   cleanup=()=>{context.revert();};
  }
  const onChange=()=>{void activate().catch(()=>{});};
  void activate().catch(()=>{});
  media.addEventListener('change',onChange);
  return()=>{disposed=true;media.removeEventListener('change',onChange);cleanup?.();};
 },[]);
 return null;
}
