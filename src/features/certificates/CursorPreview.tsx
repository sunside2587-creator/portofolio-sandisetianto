import { AnimatePresence, motion } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { Certificate } from '@/types/certificate';

interface CursorPreviewProps {
  readonly certificate: Certificate | null;
  readonly enabled: boolean;
  readonly x: MotionValue<number>;
  readonly y: MotionValue<number>;
}

export function CursorPreview({ certificate, enabled, x, y }: CursorPreviewProps) {
  const image = certificate?.image;

  return (
    <AnimatePresence>
      {enabled && image ? (
        <motion.img
          key={certificate.id}
          src={image.thumb}
          width={240}
          height={180}
          alt=""
          aria-hidden="true"
          style={{ x, y, rotate: -4 }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="pointer-events-none fixed top-0 left-0 z-40 w-60 rounded-2xl border border-line bg-paper object-cover shadow-2xl"
        />
      ) : null}
    </AnimatePresence>
  );
}
