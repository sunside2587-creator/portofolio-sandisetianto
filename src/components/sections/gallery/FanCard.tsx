import { motion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { GalleryItem } from '@/types/content';
import { GalleryCard } from './GalleryCard';

export const FAN_ANGLE_STEP = 16;

interface FanCardProps {
  readonly item: GalleryItem;
  readonly index: number;
  readonly centerIndex: number;
  readonly isActive: boolean;
  readonly baseRotation: MotionValue<number>;
  readonly idleWave: MotionValue<number>;
  readonly reducedMotion: boolean;
  readonly onSelect: () => void;
}

export function FanCard({
  item,
  index,
  centerIndex,
  isActive,
  baseRotation,
  idleWave,
  reducedMotion,
  onSelect,
}: FanCardProps) {
  const offsetAngle = (index - centerIndex) * FAN_ANGLE_STEP;
  const rotate = useTransform(() => baseRotation.get() + idleWave.get() + offsetAngle);

  return (
    <motion.div
      style={{
        rotate,
        transformOrigin: '50% 195%',
        zIndex: isActive ? 30 : 20 - Math.abs(index - centerIndex),
      }}
      className="absolute bottom-14 left-1/2 -ml-[114px] aspect-[3/4] w-[228px] lg:-ml-[126px] lg:w-[252px]"
    >
      <motion.button
        type="button"
        onClick={onSelect}
        aria-label={`Select ${item.label} card`}
        animate={
          isActive && !reducedMotion
            ? { y: -18, scale: 1.06 }
            : { y: 0, scale: 1 }
        }
        {...(reducedMotion ? {} : { whileHover: { y: -22 } })}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="h-full w-full cursor-pointer rounded-3xl text-left focus-visible:outline-2"
      >
        <GalleryCard item={item} index={index} isActive={isActive} />
      </motion.button>
    </motion.div>
  );
}
