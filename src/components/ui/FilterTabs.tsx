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
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
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
            className={`min-h-11 cursor-pointer border px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${activeClasses}`}
          >
            {option.label} ({option.count})
          </button>
        );
      })}
    </div>
  );
}
