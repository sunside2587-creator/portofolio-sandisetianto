import type { GalleryItem } from '@/types/content';
import { GalleryCard } from './GalleryCard';

interface GalleryCarouselProps {
  readonly items: readonly GalleryItem[];
}

export function GalleryCarousel({ items }: GalleryCarouselProps) {
  return (
    <div
      role="region"
      aria-label="Portfolio gallery"
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="aspect-[3/4] w-[220px] shrink-0 snap-center"
        >
          <GalleryCard item={item} />
        </div>
      ))}
    </div>
  );
}
