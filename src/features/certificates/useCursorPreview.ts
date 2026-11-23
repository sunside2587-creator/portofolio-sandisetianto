import { useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useCallback, useState } from 'react';
import type { PointerEvent } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { Certificate } from '@/types/certificate';

const SPRING_CONFIG = { stiffness: 300, damping: 30 } as const;

export function useCursorPreview() {
  const [hoveredCert, setHoveredCert] = useState<Certificate | null>(null);
  const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = Boolean(useReducedMotion());
  const enabled = hasFinePointer && !reducedMotion;

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, SPRING_CONFIG);
  const smoothY = useSpring(cursorY, SPRING_CONFIG);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLOListElement>) => {
      if (!enabled) {
        return;
      }
      cursorX.set(event.clientX + 24);
      cursorY.set(event.clientY - 80);
    },
    [cursorX, cursorY, enabled],
  );

  const handleHoverStart = useCallback(
    (cert: Certificate) => {
      if (enabled) {
        setHoveredCert(cert);
      }
    },
    [enabled],
  );

  const handleHoverEnd = useCallback(() => {
    setHoveredCert(null);
  }, []);

  return {
    hoveredCert,
    enabled,
    smoothX,
    smoothY,
    handlePointerMove,
    handleHoverStart,
    handleHoverEnd,
  };
}
