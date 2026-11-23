import { Container } from '@/components/layout/Container';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { CrosshairGrid } from '@/components/ui/CrosshairGrid';
import { Monogram } from '@/components/ui/Monogram';
import { HERO_ANIME_IMAGE } from '@/content/images';
import { PROFILE } from '@/content/profile';

const HERO_FRAME_RADAR = (
  <svg
    viewBox="0 0 240 240"
    className="pointer-events-none absolute inset-0 m-auto h-56 w-56 text-paper/10"
    aria-hidden="true"
  >
    <circle cx="120" cy="120" r="108" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
    <circle cx="120" cy="120" r="76" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="120" y1="0" x2="120" y2="240" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="120" x2="240" y2="120" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export function HeroSection() {
  const [firstLine, ...restLines] = PROFILE.taglineLines;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="bg-y2k-grid relative overflow-hidden border-b border-line pt-8 pb-10 sm:pt-12 lg:pt-16 lg:pb-14"
    >
      <CrosshairGrid />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 hidden -translate-y-1/2 text-[10px] text-ink/45 lg:block"
      >
        ▶
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 text-[10px] text-ink/45 lg:block"
      >
        ◀
      </span>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1
              id="hero-title"
              className="font-display text-[clamp(4.5rem,14.5vw,13.25rem)] leading-[0.83] tracking-[-0.02em] uppercase"
            >
              <span className="sr-only">{`${PROFILE.name}, ${PROFILE.role} — `}</span>

              {firstLine ? (
                <span className="flex flex-wrap items-center gap-4 sm:gap-7">
                  <span className="block overflow-hidden">
                    <span data-hero-line className="block text-ink">
                      {firstLine.text}
                    </span>
                  </span>
                  <span className="mb-1 inline-flex">
                    <Monogram label={PROFILE.monogram} size="lg" tone="ink" />
                  </span>
                </span>
              ) : null}

              {restLines.map((line, idx) => (
                <span
                  key={line.text}
                  className={`block overflow-hidden ${idx === restLines.length - 1 ? 'relative z-20' : ''}`}
                >
                  <span
                    data-hero-line
                    className={`block ${line.tone === 'signal' ? 'text-signal' : 'text-ink'}`}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto mt-4 w-full max-w-[400px] sm:max-w-[420px] lg:ml-auto lg:mr-4">
              <div aria-hidden="true" className="absolute top-5 -right-3 -bottom-3 left-5 bg-signal" />
              <div className="relative border border-ink bg-ink px-7 pt-5 pb-7 text-paper sm:px-9 sm:pt-6 sm:pb-8">
                {HERO_FRAME_RADAR}
                <div className="relative z-10 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-paper/65 uppercase">
                  <span>Tech Wizard</span>
                  <span>+</span>
                </div>
                <div className="relative z-20 mt-4 mb-2 flex items-center justify-center">
                  <img
                    src={HERO_ANIME_IMAGE.src}
                    width={HERO_ANIME_IMAGE.width}
                    height={HERO_ANIME_IMAGE.height}
                    alt={HERO_ANIME_IMAGE.alt}
                    fetchPriority="high"
                    loading="eager"
                    className="h-[360px] w-auto object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.55)] sm:h-[395px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <ArrowLink label="SCROLL TO EXPLORE" href="#about" tone="ink" />
          <span className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
            {PROFILE.name}
          </span>
        </div>
      </Container>
    </section>
  );
}
