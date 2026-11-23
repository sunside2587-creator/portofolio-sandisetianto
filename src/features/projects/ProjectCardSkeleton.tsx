export function ProjectCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col justify-between border border-line bg-paper p-6 motion-safe:animate-pulse"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="h-8 w-10 bg-ink/10" />
          <div className="h-4 w-24 bg-ink/10" />
        </div>
        <div className="mt-4 h-8 w-3/4 bg-ink/10" />
        <div className="mt-5 aspect-[16/10] w-full bg-ink/10" />
        <div className="mt-4 space-y-2">
          <div className="h-3.5 w-full bg-ink/10" />
          <div className="h-3.5 w-5/6 bg-ink/10" />
        </div>
      </div>
      <div className="mt-6 flex gap-2 border-t border-line pt-4">
        <div className="h-5 w-14 bg-ink/10" />
        <div className="h-5 w-16 bg-ink/10" />
      </div>
    </div>
  );
}
