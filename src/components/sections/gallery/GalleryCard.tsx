import { assertNever } from '@/lib/assert';
import type { CardSurfaceVariant } from '@/types/common';
import type { GalleryItem } from '@/types/content';
import { TechStackGlyph } from './TechStackGlyph';

interface GalleryCardProps {
  readonly item: GalleryItem;
  readonly index?: number;
  readonly isActive?: boolean;
}

const STAR_4PT = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
    <path d="M12 1 L14.5 9.5 L23 12 L14.5 14.5 L12 23 L9.5 14.5 L1 12 L9.5 9.5 Z" fill="currentColor" />
  </svg>
);

const BARCODE_STRIPE = (
  <svg viewBox="0 0 46 14" className="h-3 w-11 shrink-0" aria-hidden="true">
    <rect x="0" y="1" width="2" height="12" fill="currentColor" />
    <rect x="4" y="1" width="1" height="12" fill="currentColor" />
    <rect x="7" y="1" width="3" height="12" fill="currentColor" />
    <rect x="12" y="1" width="1.5" height="12" fill="currentColor" />
    <rect x="16" y="1" width="2.5" height="12" fill="currentColor" />
    <rect x="21" y="1" width="1" height="12" fill="currentColor" />
    <rect x="24" y="1" width="3.5" height="12" fill="currentColor" />
    <rect x="30" y="1" width="1.5" height="12" fill="currentColor" />
    <rect x="34" y="1" width="2" height="12" fill="currentColor" />
    <rect x="38" y="1" width="1" height="12" fill="currentColor" />
    <rect x="41" y="1" width="3" height="12" fill="currentColor" />
  </svg>
);

function getCardStyles(variant: CardSurfaceVariant) {
  switch (variant) {
    case 'ink':
      return {
        container: 'bg-ink text-paper',
        muted: 'text-paper/65',
        accent: 'text-signal',
        pill: 'border-paper/25 bg-paper/10 text-paper',
      };
    case 'signal':
      return {
        container: 'bg-signal text-paper',
        muted: 'text-paper/80',
        accent: 'text-ink',
        pill: 'border-paper/35 bg-ink/20 text-paper',
      };
    case 'paper':
      return {
        container: 'bg-paper text-ink',
        muted: 'text-muted',
        accent: 'text-signal',
        pill: 'border-ink/25 bg-ink/5 text-ink',
      };
    default:
      return assertNever(variant);
  }
}

export function GalleryCard({ item, index = 0, isActive = false }: GalleryCardProps) {
  const cardCode = String(index + 1).padStart(2, '0');
  const styles = getCardStyles(item.variant);
  const activeRing = isActive
    ? 'ring-2 ring-signal ring-offset-2 ring-offset-paper'
    : 'border border-line';

  return (
    <div
      className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl p-5 shadow-2xl ${styles.container} ${activeRing}`}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className={`flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.18em] ${styles.accent}`}>
          {STAR_4PT}
          <span className="text-current">{cardCode}</span>
        </div>
        <div className={`text-right font-mono text-[8px] leading-tight font-semibold tracking-[0.18em] uppercase ${styles.muted}`}>
          <p>{item.category}</p>
          <p>1:1</p>
        </div>
      </div>

      <div className="relative z-10 my-auto flex flex-col items-center text-center">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <TechStackGlyph kind={item.glyph} accentClass={styles.accent} />
        </div>
        <h3 className="mt-4 font-display text-2xl leading-[0.95] tracking-tight uppercase">
          {item.title}
        </h3>
      </div>

      <div className="relative z-10 space-y-2.5 border-t border-current/15 pt-3">
        <ul className="grid grid-cols-2 gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className={`truncate rounded-md border px-1.5 py-1 text-center font-mono text-[9px] font-semibold tracking-[0.08em] uppercase ${styles.pill}`}
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className={`flex items-center justify-between font-mono text-[9px] tracking-[0.16em] uppercase ${styles.muted}`}>
          {BARCODE_STRIPE}
          <span>{item.label}</span>
        </div>
      </div>
    </div>
  );
}
