import { AnimatePresence, motion } from 'motion/react';
import type { PointerEventHandler } from 'react';
import type { Certificate } from '@/types/certificate';
import { CertificateRow } from './CertificateRow';

interface CertificateListProps {
  readonly items: readonly Certificate[];
  readonly showInlineThumbs: boolean;
  readonly onOpen: (id: string) => void;
  readonly onHoverStart: (certificate: Certificate) => void;
  readonly onHoverEnd: () => void;
  readonly onPointerMove?: PointerEventHandler<HTMLOListElement>;
}

export function CertificateList({
  items,
  showInlineThumbs,
  onOpen,
  onHoverStart,
  onHoverEnd,
  onPointerMove,
}: CertificateListProps) {
  return (
    <ol
      onPointerMove={onPointerMove}
      onPointerLeave={onHoverEnd}
      className="relative mt-8 border-t border-line"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((cert, index) => (
          <motion.li
            key={cert.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <CertificateRow
              certificate={cert}
              index={index}
              showInlineThumb={showInlineThumbs}
              onOpen={onOpen}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  );
}
