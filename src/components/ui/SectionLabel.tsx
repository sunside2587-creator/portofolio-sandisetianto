interface SectionLabelProps {
  readonly label: string;
  readonly tone?: 'ink' | 'paper';
  readonly className?: string;
}

export function SectionLabel({ label, tone = 'ink', className = '' }: SectionLabelProps) {
  const textClass = tone === 'paper' ? 'text-paper/80' : 'text-muted';
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <span aria-hidden="true" className="block h-[2px] w-8 bg-signal" />
      <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${textClass}`}>
        {label}
      </span>
    </div>
  );
}
