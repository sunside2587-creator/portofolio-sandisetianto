import about480 from '@/assets/images/about-480.webp';
import about720 from '@/assets/images/about-720.webp';
import about900 from '@/assets/images/about-900.webp';
import cutout400 from '@/assets/images/cutout-400.webp';
import hero480 from '@/assets/images/hero-480.webp';
import hero720 from '@/assets/images/hero-720.webp';
import hero900 from '@/assets/images/hero-900.webp';
import heroAnime from '@/assets/images/hero-anime.webp';
import type { ResponsiveImage } from '@/types/content';

export const HERO_PORTRAIT: ResponsiveImage = {
  src: hero720,
  srcSet: `${hero480} 480w, ${hero720} 720w, ${hero900} 900w`,
  sizes: '(max-width: 767px) 90vw, (max-width: 1279px) 42vw, 460px',
  width: 720,
  height: 900,
  alt: 'Portrait of Sandi Setianto wearing a crimson jacket and bucket hat against a dark backdrop',
};

export const ABOUT_PORTRAIT: ResponsiveImage = {
  src: about720,
  srcSet: `${about480} 480w, ${about720} 720w, ${about900} 900w`,
  sizes: '(max-width: 767px) 90vw, 28vw',
  width: 720,
  height: 900,
  alt: 'Side profile portrait of Sandi Setianto in low-key lighting',
};

export const CUTOUT_IMAGE = {
  src: cutout400,
  width: 400,
  height: 568,
  alt: 'Back view silhouette of Sandi Setianto carrying a backpack',
} as const;

export const HERO_ANIME_IMAGE = {
  src: heroAnime,
  width: 373,
  height: 569,
  alt: 'Y2K anime style illustration of a developer in a red hoodie carrying a laptop',
} as const;
