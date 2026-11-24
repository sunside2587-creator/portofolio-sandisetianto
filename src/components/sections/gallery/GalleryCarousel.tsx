import { useEffect, useRef } from 'react';
import type { GalleryItem } from '@/types/content';
import { GalleryCard } from './GalleryCard';

interface GalleryCarouselProps {
  readonly items: readonly GalleryItem[];
  readonly activeIndex: number;
  readonly onSelectIndex: (index: number) => void;
}

export function GalleryCarousel({ items, activeIndex, onSelectIndex }: GalleryCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const programmaticScrollRef = useRef(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current[activeIndex];
    if (!track || !card) {
      return;
    }

    const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    if (Math.abs(track.scrollLeft - targetLeft) < 6) {
      return;
    }

    programmaticScrollRef.current = true;
    track.scrollTo({ left: targetLeft, behavior: 'smooth' });

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = false;
    }, 420);

    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, [activeIndex]);

  function handleScroll() {
    if (programmaticScrollRef.current) {
      return;
    }
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = activeIndex;
    let closestDist = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((el, idx) => {
      if (!el) {
        return;
      }
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      onSelectIndex(closestIndex);
    }
  }

  return (
    <div
      ref={trackRef}
      role="region"
      aria-label="Tech stack cards"
      onScroll={handleScroll}
      className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-115px)] pt-2 pb-5"
    >
      {items.map((item, idx) => (
        <button
          key={item.id}
          ref={(el) => {
            cardRefs.current[idx] = el;
          }}
          type="button"
          onClick={() => onSelectIndex(idx)}
          aria-label={`Select ${item.title}`}
          aria-pressed={idx === activeIndex}
          className="aspect-[3/4] w-[230px] shrink-0 cursor-pointer snap-center text-left transition-transform duration-200"
        >
          <GalleryCard item={item} index={idx} isActive={idx === activeIndex} />
        </button>
      ))}
    </div>
  );
}
