import { useId } from 'react';
import type { ReactNode } from 'react';

interface RotatingBadgeProps {
  readonly text: string;
  readonly tone?: 'ink' | 'paper';
  readonly children: ReactNode;
  readonly className?: string;
}

export function RotatingBadge({
  text,
  tone = 'ink',
  children,
  className = '',
}: RotatingBadgeProps) {
  const pathId = useId();
  const textFill = tone === 'paper' ? 'fill-paper' : 'fill-ink';

  return (
    <div
      aria-hidden="true"
      className={`relative inline-flex h-28 w-28 shrink-0 items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full motion-safe:animate-spin-slow"
      >
        <defs>
          <path
            id={pathId}
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text
          className={`text-[10px] font-semibold tracking-[0.22em] uppercase ${textFill}`}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
