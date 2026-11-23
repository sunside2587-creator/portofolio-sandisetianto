interface MarqueeProps {
  readonly items: readonly string[];
  readonly className?: string;
}

export function Marquee({ items, className = '' }: MarqueeProps) {
  const track = items.map((item) => `${item}  ✦`).join('   ');

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y border-line bg-ink py-3 text-paper select-none ${className}`}
    >
      <div className="flex w-max motion-safe:animate-marquee">
        <span className="shrink-0 pr-8 font-display text-xl tracking-[0.14em] uppercase sm:text-2xl">
          {track}
        </span>
        <span className="shrink-0 pr-8 font-display text-xl tracking-[0.14em] uppercase sm:text-2xl">
          {track}
        </span>
      </div>
    </div>
  );
}
