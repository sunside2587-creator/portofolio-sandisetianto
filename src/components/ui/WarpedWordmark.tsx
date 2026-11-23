import { useAnimationFrame, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

interface LetterSpec {
  readonly char: string;
  readonly x: number;
  readonly isSolidFront: boolean;
}

const PORTFOLIO_LETTERS: readonly LetterSpec[] = [
  { char: 'P', x: 56, isSolidFront: false },
  { char: 'O', x: 170, isSolidFront: false },
  { char: 'R', x: 284, isSolidFront: false },
  { char: 'T', x: 396, isSolidFront: false },
  { char: 'F', x: 504, isSolidFront: true },
  { char: 'O', x: 616, isSolidFront: true },
  { char: 'L', x: 726, isSolidFront: true },
  { char: 'I', x: 810, isSolidFront: true },
  { char: 'O', x: 924, isSolidFront: true },
];

function buildTransform(x: number, y: number, skewX: number, scaleY: number, rot: number): string {
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(2)}) skewX(${skewX.toFixed(2)}) scale(1.58 ${scaleY.toFixed(3)})`;
}

export function WarpedWordmark({ className = '' }: { readonly className?: string }) {
  const reducedMotion = Boolean(useReducedMotion());
  const frontRefs = useRef<Array<SVGGElement | null>>([]);
  const backRefs = useRef<Array<SVGGElement | null>>([]);

  useAnimationFrame((timeMs) => {
    const t = reducedMotion ? 0 : timeMs / 1000;

    for (let i = 0; i < PORTFOLIO_LETTERS.length; i += 1) {
      const spec = PORTFOLIO_LETTERS[i];
      if (!spec) {
        continue;
      }
      const phase = i * 0.62 - t * 1.45;
      const wave = Math.sin(phase);
      const slope = Math.cos(phase);

      const frontEl = frontRefs.current[i];
      if (frontEl) {
        frontEl.setAttribute(
          'transform',
          buildTransform(spec.x, 118 + wave * 11, -14 + slope * 13, 0.74 + slope * 0.08, slope * 2.8),
        );
      }

      const backEl = backRefs.current[i];
      if (backEl) {
        backEl.setAttribute(
          'transform',
          buildTransform(
            spec.x - 18 + slope * 12,
            138 + wave * 15,
            -28 + slope * 18,
            0.42 + Math.abs(wave) * 0.18,
            wave * 3.8,
          ),
        );
      }
    }
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 220"
      className={`pointer-events-none w-full overflow-visible select-none ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="opacity-90">
        {PORTFOLIO_LETTERS.map((spec, i) => (
          <g
            key={`back-${spec.char}-${i}`}
            ref={(el) => {
              backRefs.current[i] = el;
            }}
            transform={buildTransform(spec.x - 18, 138 + Math.sin(i * 0.62) * 15, -26, 0.48, 0)}
          >
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fill={spec.isSolidFront ? 'none' : 'currentColor'}
              stroke={spec.isSolidFront ? 'currentColor' : 'none'}
              strokeWidth={spec.isSolidFront ? 1.8 : 0}
              className="font-display text-[142px] uppercase"
            >
              {spec.char}
            </text>
          </g>
        ))}
      </g>

      <g>
        {PORTFOLIO_LETTERS.map((spec, i) => (
          <g
            key={`front-${spec.char}-${i}`}
            ref={(el) => {
              frontRefs.current[i] = el;
            }}
            transform={buildTransform(spec.x, 118 + Math.sin(i * 0.62) * 11, -14, 0.74, 0)}
          >
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fill={spec.isSolidFront ? 'currentColor' : 'none'}
              stroke={spec.isSolidFront ? 'none' : 'currentColor'}
              strokeWidth={spec.isSolidFront ? 0 : 2.1}
              className="font-display text-[148px] uppercase"
            >
              {spec.char}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
