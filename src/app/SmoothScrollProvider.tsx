import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';
import { useLayoutEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SmoothScrollContext, type SmoothScrollApi } from '@/lib/smooth-scroll-context';

export function SmoothScrollProvider({ children }: { readonly children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useLayoutEffect(() => {
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const tick = (timeSeconds: number) => {
      lenis.raf(timeSeconds * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      stop: () => {
        lenisRef.current?.stop();
      },
      start: () => {
        lenisRef.current?.start();
      },
      scrollTo: (target: string) => {
        const instance = lenisRef.current;
        if (instance) {
          instance.scrollTo(target, { offset: 0 });
          return;
        }
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      },
    }),
    [reducedMotion],
  );

  return <SmoothScrollContext value={api}>{children}</SmoothScrollContext>;
}
