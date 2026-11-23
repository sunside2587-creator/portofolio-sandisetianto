import { assertNever } from '@/lib/assert';
import type { GeometricIconKind } from '@/types/content';

interface GeometricIconProps {
  readonly kind: GeometricIconKind;
  readonly className?: string;
}

const HALF_CIRCLE_SVG = (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
    <circle cx="20" cy="20" r="16" fill="#0E0E0E" />
    <path d="M 20 4 A 16 16 0 0 1 36 20 L 20 20 Z" fill="#C21415" />
  </svg>
);

const SQUARES_SVG = (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
    <rect x="6" y="6" width="14" height="14" fill="#C21415" />
    <rect x="20" y="20" width="14" height="14" fill="#0E0E0E" />
    <rect x="6" y="20" width="14" height="14" fill="none" stroke="#0E0E0E" strokeWidth="1.5" />
  </svg>
);

const TARGET_SVG = (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
    <circle cx="20" cy="20" r="16" fill="#0E0E0E" />
    <circle cx="20" cy="20" r="7" fill="#C21415" />
    <circle cx="20" cy="20" r="2.5" fill="#F4ECE3" />
  </svg>
);

const QUAD_SVG = (
  <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
    <circle cx="13" cy="13" r="6" fill="#0E0E0E" />
    <circle cx="27" cy="13" r="6" fill="#C21415" />
    <circle cx="13" cy="27" r="6" fill="#0E0E0E" />
    <circle cx="27" cy="27" r="6" fill="#0E0E0E" />
  </svg>
);

export function GeometricIcon({ kind, className = '' }: GeometricIconProps) {
  let glyph: React.JSX.Element;
  switch (kind) {
    case 'half-circle':
      glyph = HALF_CIRCLE_SVG;
      break;
    case 'squares':
      glyph = SQUARES_SVG;
      break;
    case 'target':
      glyph = TARGET_SVG;
      break;
    case 'quad':
      glyph = QUAD_SVG;
      break;
    default:
      return assertNever(kind);
  }

  return <span className={`inline-block shrink-0 ${className}`}>{glyph}</span>;
}
