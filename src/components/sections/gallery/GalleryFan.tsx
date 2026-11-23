import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import { useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import type { GalleryItem } from '@/types/content';
import { FAN_ANGLE_STEP, FanCard } from './FanCard';

const FAN_GUIDE_SVG = (
  <svg
    aria-hidden="true"
    viewBox="0 0 960 440"
    className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-full w-full max-w-5xl text-ink/20 select-none"
    preserveAspectRatio="xMidYMax meet"
  >
    <path d="M 122 252 L 126 264 L 138 268 L 126 272 L 122 284 L 118 272 L 106 268 L 118 264 Z" fill="currentColor" className="text-signal/70" />
    <path d="M 838 252 L 842 264 L 854 268 L 842 272 L 838 284 L 834 272 L 822 268 L 834 264 Z" fill="currentColor" className="text-ink/55" />
    <text x="32" y="34" fontSize="12" fontFamily="monospace" fill="currentColor">+</text>
    <text x="920" y="34" fontSize="12" fontFamily="monospace" fill="currentColor">+</text>
  </svg>
);

interface GalleryFanProps {
  readonly items: readonly GalleryItem[];
  readonly activeIndex: number;
  readonly onSelectIndex: (index: number) => void;
}

export function GalleryFan({ items, activeIndex, onSelectIndex }: GalleryFanProps) {
  const centerIndex = Math.floor(items.length / 2);
  const baseRotation = useMotionValue((centerIndex - activeIndex) * FAN_ANGLE_STEP);
  const idleWave = useMotionValue(0);
  const isInteractingRef = useRef(false);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const targetAngle = (centerIndex - activeIndex) * FAN_ANGLE_STEP;
    if (reducedMotion) {
      baseRotation.set(targetAngle);
      return;
    }
    const controls = animate(baseRotation, targetAngle, {
      type: 'spring',
      stiffness: 220,
      damping: 26,
    });
    return () => controls.stop();
  }, [activeIndex, baseRotation, centerIndex, reducedMotion]);

  useAnimationFrame((time) => {
    if (reducedMotion || isInteractingRef.current) {
      idleWave.set(0);
      return;
    }
    idleWave.set(Math.sin(time / 1200) * 3.5);
  });

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onSelectIndex(Math.max(0, activeIndex - 1));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      onSelectIndex(Math.min(items.length - 1, activeIndex + 1));
    }
  }

  return (
    <motion.div
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Gallery — click cards or use left and right arrow keys to rotate"
      onKeyDown={handleKeyDown}
      onPointerEnter={() => {
        isInteractingRef.current = true;
      }}
      onPointerLeave={() => {
        isInteractingRef.current = false;
      }}
      onPanStart={() => {
        isInteractingRef.current = true;
      }}
      onPan={(_, info) => {
        if (reducedMotion) {
          return;
        }
        const limit = centerIndex * FAN_ANGLE_STEP + 10;
        const next = Math.max(-limit, Math.min(limit, baseRotation.get() + info.delta.x * 0.16));
        baseRotation.set(next);
      }}
      onPanEnd={() => {
        isInteractingRef.current = false;
        const nearest = Math.round(centerIndex - baseRotation.get() / FAN_ANGLE_STEP);
        onSelectIndex(Math.max(0, Math.min(items.length - 1, nearest)));
      }}
      className="relative h-[520px] cursor-grab overflow-hidden active:cursor-grabbing focus-visible:outline-2"
    >
      {FAN_GUIDE_SVG}

      {items.map((item, index) => (
        <FanCard
          key={item.id}
          item={item}
          index={index}
          centerIndex={centerIndex}
          isActive={index === activeIndex}
          baseRotation={baseRotation}
          idleWave={idleWave}
          reducedMotion={reducedMotion}
          onSelect={() => onSelectIndex(index)}
        />
      ))}
    </motion.div>
  );
}
