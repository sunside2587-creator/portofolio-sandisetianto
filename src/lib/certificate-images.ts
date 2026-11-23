import manifest from '@/assets/certificates/manifest.json';
import type { CertificateImage } from '@/types/certificate';

interface SizeEntry {
  readonly w: number;
  readonly h: number;
}

interface ManifestEntry {
  readonly thumb: SizeEntry;
  readonly full: SizeEntry;
}

const imageUrls = import.meta.glob<string>('../assets/certificates/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const manifestMap: Readonly<Record<string, ManifestEntry>> = manifest;

export function getCertificateImage(slug: string, alt: string): CertificateImage | undefined {
  const thumb = imageUrls[`../assets/certificates/${slug}-thumb.webp`];
  const full = imageUrls[`../assets/certificates/${slug}-full.webp`];
  const meta = manifestMap[slug];

  if (!thumb || !full || !meta) {
    return undefined;
  }

  return {
    thumb,
    full,
    alt,
    width: meta.full.w,
    height: meta.full.h,
  };
}
