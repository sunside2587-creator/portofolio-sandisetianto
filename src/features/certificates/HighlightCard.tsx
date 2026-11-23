import { motion } from 'motion/react';
import { assertNever } from '@/lib/assert';
import { formatIssuedDate } from '@/lib/formatters';
import type { Certificate } from '@/types/certificate';
import type { CardSurfaceVariant } from '@/types/common';

interface HighlightCardProps {
  readonly certificate: Certificate;
  readonly index: number;
  readonly variant: CardSurfaceVariant;
  readonly onSelect: (id: string) => void;
}

function getVariantClasses(variant: CardSurfaceVariant): {
  readonly card: string;
  readonly rank: string;
  readonly meta: string;
} {
  switch (variant) {
    case 'ink':
      return {
        card: 'bg-ink text-paper border border-ink hover:border-signal',
        rank: 'text-signal',
        meta: 'text-paper/70',
      };
    case 'signal':
      return {
        card: 'bg-signal text-paper border border-signal hover:bg-ink hover:border-ink',
        rank: 'text-paper',
        meta: 'text-paper/85',
      };
    case 'paper':
      return {
        card: 'bg-paper text-ink border border-line hover:border-signal',
        rank: 'text-signal',
        meta: 'text-muted',
      };
    default:
      return assertNever(variant);
  }
}

export function HighlightCard({
  certificate,
  index,
  variant,
  onSelect,
}: HighlightCardProps) {
  const num = String(index + 1).padStart(2, '0');
  const styles = getVariantClasses(variant);
  const yearLabel = formatIssuedDate(certificate.issuedAt);

  return (
    <div data-reveal>
      <motion.button
        type="button"
        onClick={() => onSelect(certificate.id)}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`flex h-full w-full cursor-pointer flex-col justify-between p-6 text-left transition-colors ${styles.card}`}
      >
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-2xl leading-none">{num}</span>
            <span className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${styles.meta}`}>
              {yearLabel}
            </span>
          </div>

          <p className={`mt-5 font-display text-4xl leading-none tracking-tight uppercase ${styles.rank}`}>
            {certificate.rank ?? certificate.category.toUpperCase()}
          </p>

          <h3 className="mt-3 text-base font-semibold leading-snug">
            {certificate.title}
          </h3>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-current/15 pt-3">
          <span className={`text-[11px] font-medium tracking-[0.14em] uppercase ${styles.meta}`}>
            {certificate.issuer}
          </span>
          <span aria-hidden="true" className="text-xs font-semibold tracking-[0.16em]">
            VIEW ⟶
          </span>
        </div>
      </motion.button>
    </div>
  );
}
