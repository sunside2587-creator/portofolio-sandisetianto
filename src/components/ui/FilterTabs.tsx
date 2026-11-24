export interface FilterOption<T extends string> {
  readonly value: T;
  readonly label: string;
  readonly count: number;
}

interface FilterTabsProps<T extends string> {
  readonly options: readonly FilterOption<T>[];
  readonly value: T;
  readonly onChange: (nextValue: T) => void;
  readonly ariaLabel: string;
}

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: FilterTabsProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="no-scrollbar -mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        const activeClasses = isActive
          ? 'bg-ink text-paper border-ink'
          : 'bg-transparent text-ink border-ink/25 hover:border-signal hover:text-signal';

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`min-h-11 shrink-0 cursor-pointer border px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors sm:px-4 sm:text-xs ${activeClasses}`}
          >
            {option.label} ({option.count})
          </button>
        );
      })}
    </div>
  );
}
