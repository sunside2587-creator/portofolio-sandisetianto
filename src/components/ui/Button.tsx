import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

type ButtonVariant = 'outline' | 'solid' | 'text';
type ButtonTone = 'ink' | 'paper' | 'signal';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly tone?: ButtonTone;
  readonly children: ReactNode;
  readonly ref?: Ref<HTMLButtonElement>;
}

const VARIANT_CLASSES: Record<ButtonVariant, Record<ButtonTone, string>> = {
  outline: {
    ink: 'border border-ink/30 text-ink hover:border-signal hover:text-signal px-4 py-2.5',
    paper: 'border border-paper/35 text-paper hover:border-signal hover:text-signal px-4 py-2.5',
    signal: 'border border-signal text-signal hover:bg-signal hover:text-paper px-4 py-2.5',
  },
  solid: {
    ink: 'bg-ink text-paper hover:bg-signal px-5 py-2.5',
    paper: 'bg-paper text-ink hover:bg-signal hover:text-paper px-5 py-2.5',
    signal: 'bg-signal text-paper hover:bg-ink px-5 py-2.5',
  },
  text: {
    ink: 'text-ink hover:text-signal px-1 py-2 border-b border-ink/25',
    paper: 'text-paper hover:text-signal px-1 py-2 border-b border-paper/30',
    signal: 'text-signal hover:text-ink px-1 py-2 border-b border-signal/40',
  },
};

export function Button({
  variant = 'outline',
  tone = 'ink',
  type = 'button',
  className = '',
  children,
  ref,
  ...rest
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${VARIANT_CLASSES[variant][tone]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
