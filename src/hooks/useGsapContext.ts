import { useReducedMotion } from 'motion/react';
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';

export function useGsapContext(
  scopeRef: RefObject<HTMLElement | null>,
  setup: () => void,
): void {
  const reducedMotion = Boolean(useReducedMotion());

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (reducedMotion || !scope) {
      return;
    }

    const ctx = gsap.context(setup, scope);
    return () => {
      ctx.revert();
    };
  }, [reducedMotion, scopeRef, setup]);
}
