import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  readonly value: number;
  readonly suffix?: string;
  readonly className?: string;
}

export function CountUp({ value, suffix = '', className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || shouldReduceMotion) {
      return;
    }

    const controls = animate(0, value, {
      duration: 0.85,
      ease: 'easeOut',
      onUpdate: (latest) => {
        el.textContent = `${Math.round(latest)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, shouldReduceMotion, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {`${value}${suffix}`}
    </span>
  );
}
