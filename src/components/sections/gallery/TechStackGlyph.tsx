import { assertNever } from '@/lib/assert';
import type { TechGlyphKind } from '@/types/content';

interface TechStackGlyphProps {
  readonly kind: TechGlyphKind;
  readonly accentClass: string;
}

export function TechStackGlyph({ kind, accentClass }: TechStackGlyphProps) {
  switch (kind) {
    case 'vue-vite':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" className="opacity-35" />
          <polygon points="16,22 84,22 50,82" fill="none" stroke="currentColor" strokeWidth="4" />
          <polygon points="32,22 68,22 50,56" fill="none" stroke="currentColor" strokeWidth="3.5" className={accentClass} />
          <path d="M56 16 L43 44 H54 L45 68 L66 38 H54 Z" fill="currentColor" className={accentClass} />
        </svg>
      );

    case 'node-express':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
          <polygon points="50,8 88,29 88,71 50,92 12,71 12,29" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-55" />
          <path d="M35 50 H65 M55 39 L67 50 L55 61" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
        </svg>
      );

    case 'sql-db':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
          <ellipse cx="50" cy="24" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <path d="M20 24 V74 C20 80 33 84 50 84 C67 84 80 80 80 74 V24" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <path d="M20 41 C20 47 33 51 50 51 C67 51 80 47 80 41" fill="none" stroke="currentColor" strokeWidth="2.5" className={accentClass} />
          <path d="M20 58 C20 64 33 68 50 68 C67 68 80 64 80 58" fill="none" stroke="currentColor" strokeWidth="2.5" className={accentClass} />
          <circle cx="68" cy="72" r="4" fill="currentColor" className={accentClass} />
        </svg>
      );

    case 'react-core':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
          <g style={{ transformOrigin: '50px 50px' }} className="motion-safe:animate-spin-slow">
            <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="currentColor" strokeWidth="3" />
            <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(120 50 50)" />
          </g>
          <circle cx="50" cy="50" r="8" fill="currentColor" className={accentClass} />
        </svg>
      );

    case 'aws-git':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
          <path d="M28 62 H74 C82 62 87 56 87 49 C87 42 81 37 74 37 C72 25 61 18 49 18 C36 18 26 27 25 39 C18 40 13 46 13 53 C13 59 20 62 28 62 Z" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <path d="M24 72 C38 84 62 84 78 72" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <polyline points="71,71 79,72 76,80" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="40" cy="46" r="4.5" fill="currentColor" />
          <circle cx="60" cy="46" r="4.5" fill="currentColor" />
          <line x1="40" y1="46" x2="60" y2="46" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );

    case 'dbeaver-tools':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
          <rect x="14" y="16" width="72" height="68" rx="10" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <line x1="14" y1="34" x2="86" y2="34" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="25" r="2.5" fill="currentColor" className={accentClass} />
          <circle cx="33" cy="25" r="2.5" fill="currentColor" />
          <line x1="42" y1="34" x2="42" y2="84" stroke="currentColor" strokeWidth="2" className="opacity-45" />
          <path d="M52 50 H76 M52 62 H70 M52 74 H74" stroke="currentColor" strokeWidth="3" className={accentClass} />
        </svg>
      );

    case 'python-iot':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
          <rect x="28" y="28" width="44" height="44" rx="6" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <rect x="40" y="40" width="20" height="20" fill="currentColor" className={accentClass} />
          <path d="M38 14 V28 M50 14 V28 M62 14 V28 M38 72 V86 M50 72 V86 M62 72 V86 M14 38 H28 M14 50 H28 M14 62 H28 M72 38 H86 M72 50 H86 M72 62 H86" stroke="currentColor" strokeWidth="3" />
        </svg>
      );

    default:
      return assertNever(kind);
  }
}
