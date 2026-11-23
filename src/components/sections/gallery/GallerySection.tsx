import { useCallback, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { WarpedWordmark } from '@/components/ui/WarpedWordmark';
import { GALLERY_ITEMS } from '@/content/gallery';
import { PROFILE } from '@/content/profile';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { GalleryCarousel } from './GalleryCarousel';
import { GalleryDial } from './GalleryDial';
import { GalleryFan } from './GalleryFan';

const CYBER_EYE_EMBLEM = (
  <svg viewBox="0 0 44 44" className="h-9 w-9 text-ink motion-safe:animate-spin-slow" aria-hidden="true">
    <path
      d="M22 4 C27 4 31 8 31 12 C36 12 40 16 40 22 C40 28 36 32 31 32 C31 36 27 40 22 40 C17 40 13 36 13 32 C8 32 4 28 4 22 C4 16 8 12 13 12 C13 8 17 4 22 4 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
    />
    <path
      d="M12 22 C16 16 28 16 32 22 C28 28 16 28 12 22 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <circle cx="22" cy="22" r="2.8" fill="currentColor" />
  </svg>
);

const CROSSHAIR_COLS = ['left-0', 'left-[32%]', 'left-[68%]', 'right-0'] as const;

export function GallerySection() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeIndex, setActiveIndex] = useState(Math.floor(GALLERY_ITEMS.length / 2));

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  }, []);

  const activeItem = GALLERY_ITEMS[activeIndex] ?? GALLERY_ITEMS[0];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden border-b border-line py-10 lg:py-14"
    >
      <Container className="relative z-10">
        <div className="relative w-full py-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 w-32 -translate-x-1/2 bg-signal sm:w-48"
          />

          <div aria-hidden="true" className="pointer-events-none relative h-4 select-none">
            {CROSSHAIR_COLS.map((pos) => (
              <span key={`top-${pos}`} className={`absolute top-0 font-mono text-xs leading-none text-ink/40 ${pos}`}>
                +
              </span>
            ))}
          </div>

          <div className="relative z-10 mt-2 flex items-start justify-between px-1 sm:px-2">
            <p className="font-sans text-base leading-[1.05] font-black tracking-tight text-ink uppercase sm:text-xl">
              WELCOME
              <br />
              TO MY
            </p>
            {CYBER_EYE_EMBLEM}
          </div>

          <h2 id="gallery-title" className="sr-only">
            Tech Stack Interactive Showcase
          </h2>

          <div className="relative z-10 my-3 flex items-center">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Rotate tech stack left"
              className="absolute -left-2 z-20 hidden min-h-11 min-w-8 cursor-pointer items-center justify-center text-xs text-ink/70 transition-colors hover:text-signal lg:-left-6 lg:inline-flex"
            >
              ▶
            </button>

            <div className="w-full text-ink">
              <WarpedWordmark />
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Rotate tech stack right"
              className="absolute -right-2 z-20 hidden min-h-11 min-w-8 cursor-pointer items-center justify-center text-xs text-ink/70 transition-colors hover:text-signal lg:-right-6 lg:inline-flex"
            >
              ◀
            </button>
          </div>

          <div className="relative z-10 mb-2 flex items-center justify-between px-1 text-[10px] font-medium tracking-[0.2em] text-muted uppercase sm:px-2 sm:text-[11px]">
            <span>{PROFILE.name}</span>
            <span>{PROFILE.role}</span>
          </div>

          <div aria-hidden="true" className="pointer-events-none relative h-4 select-none">
            {CROSSHAIR_COLS.map((pos) => (
              <span key={`bot-${pos}`} className={`absolute bottom-0 font-mono text-xs leading-none text-ink/40 ${pos}`}>
                +
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          {isDesktop ? (
            <GalleryFan
              items={GALLERY_ITEMS}
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
            />
          ) : (
            <GalleryCarousel items={GALLERY_ITEMS} />
          )}
        </div>

        <GalleryDial
          activeIndex={activeIndex}
          total={GALLERY_ITEMS.length}
          activeLabel={activeItem ? activeItem.label : 'TECH STACK'}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Container>
    </section>
  );
}
