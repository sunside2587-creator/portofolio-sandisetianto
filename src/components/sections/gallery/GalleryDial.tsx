import { useId } from 'react';

interface GalleryDialProps {
  readonly activeIndex: number;
  readonly total: number;
  readonly activeLabel: string;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}

export function GalleryDial({
  activeIndex,
  total,
  activeLabel,
  onPrev,
  onNext,
}: GalleryDialProps) {
  const pathId = useId();
  const formattedIndex = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <div className="relative mx-auto mt-1 flex max-w-xl flex-col items-center md:-mt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none relative h-32 w-full max-w-[380px] overflow-hidden select-none sm:h-44 sm:max-w-[460px]"
      >
        <svg viewBox="0 0 400 220" className="h-full w-full overflow-visible">
          <defs>
            <path id={pathId} d="M 35 200 A 165 165 0 1 1 365 200" />
          </defs>

          <g style={{ transformOrigin: '200px 200px' }} className="motion-safe:animate-spin-slow">
            <circle
              cx="200"
              cy="200"
              r="185"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 8"
              className="text-ink/25"
            />
          </g>

          <g
            style={{ transformOrigin: '200px 200px' }}
            className="motion-safe:animate-spin-reverse"
          >
            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 10"
              className="text-signal/45"
            />
          </g>

          <text className="fill-muted text-[10px] font-semibold tracking-[0.28em] uppercase">
            <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
              TECH STACK • FRONTEND • BACKEND • DATABASE • CLOUD •
            </textPath>
          </text>
        </svg>

        <div className="absolute inset-x-0 bottom-2 flex flex-col items-center gap-1 sm:bottom-3">
          <span className="font-mono text-[11px] font-bold tracking-[0.22em] text-signal uppercase sm:text-xs">
            ▲ TECH STACK
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            {`${formattedIndex} / ${formattedTotal} — ${activeLabel}`}
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-2 grid w-full max-w-[280px] grid-cols-2 gap-3 sm:flex sm:w-auto sm:max-w-none sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous gallery card"
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-line bg-paper px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:border-signal hover:text-signal active:bg-ink active:text-paper"
        >
          <span aria-hidden="true">◀</span>
          <span>PREV</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next gallery card"
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-line bg-paper px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:border-signal hover:text-signal active:bg-ink active:text-paper"
        >
          <span>NEXT</span>
          <span aria-hidden="true">▶</span>
        </button>
      </div>
    </div>
  );
}
