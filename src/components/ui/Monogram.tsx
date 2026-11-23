interface MonogramProps {
  readonly label?: string;
  readonly size?: 'sm' | 'lg';
  readonly tone?: 'ink' | 'paper';
  readonly className?: string;
}

export function Monogram({
  label = 'SS',
  size = 'sm',
  tone = 'ink',
  className = '',
}: MonogramProps) {
  const sizeClass = size === 'lg' ? 'h-16 w-16 text-2xl' : 'h-10 w-10 text-xs';
  const toneClass =
    tone === 'paper'
      ? 'border-paper text-paper'
      : 'border-ink text-ink bg-paper/90';

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border font-display tracking-wider uppercase ${sizeClass} ${toneClass} ${className}`}
    >
      {label}
    </span>
  );
}
