import { useCallback } from 'react';
import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from './useGsapContext';

export function useScrollReveal(scopeRef: RefObject<HTMLElement | null>): void {
  const setupAnimations = useCallback(() => {
    const heroLines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
    if (heroLines.length > 0) {
      gsap.from(heroLines, {
        yPercent: 110,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }

    const parallaxEls = gsap.utils.toArray<HTMLElement>('[data-parallax]');
    for (const el of parallaxEls) {
      gsap.to(el, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    const revealEls = gsap.utils.toArray<HTMLElement>('[data-reveal]');
    for (const el of revealEls) {
      gsap.from(el, {
        y: 44,
        autoAlpha: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          once: true,
        },
      });
    }
  }, []);

  useGsapContext(scopeRef, setupAnimations);
}
