import type { ImageAsset } from './common';

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly year: number;
  readonly summary: string;
  readonly coverImage?: ImageAsset;
  readonly tags: readonly string[];
  readonly liveUrl?: string;
  readonly repoUrl?: string;
  readonly featured: boolean;
  readonly order: number;
}
