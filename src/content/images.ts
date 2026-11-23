import about480 from '@/assets/images/about-480.webp';
import about720 from '@/assets/images/about-720.webp';
import about900 from '@/assets/images/about-900.webp';
import heroAnime from '@/assets/images/hero-anime.webp';
import type { ResponsiveImage } from '@/types/content';

export const ABOUT_PORTRAIT: ResponsiveImage = {
  src: about720,
  srcSet: `${about480} 480w, ${about720} 720w, ${about900} 900w`,
  sizes: '(max-width: 767px) 90vw, 28vw',
  width: 720,
  height: 900,
  alt: 'Side profile portrait of Sandi Setianto in low-key lighting',
};

export const HERO_ANIME_IMAGE = {
  src: heroAnime,
  width: 373,
  height: 569,
  alt: 'Y2K anime style illustration of a developer in a red hoodie carrying a laptop',
} as const;
