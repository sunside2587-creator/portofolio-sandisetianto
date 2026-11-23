interface CrosshairGridProps {
  readonly tone?: 'ink' | 'paper';
}

const POSITIONS = [
  'top-3 left-3',
  'top-3 right-3',
  'bottom-3 left-3',
  'bottom-3 right-3',
] as const;

export function CrosshairGrid({ tone = 'ink' }: CrosshairGridProps) {
  const colorClass = tone === 'paper' ? 'text-paper/35' : 'text-ink/30';

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {POSITIONS.map((pos) => (
        <span
          key={pos}
          className={`absolute font-mono text-xs leading-none select-none ${pos} ${colorClass}`}
        >
          +
        </span>
      ))}
    </div>
  );
}
