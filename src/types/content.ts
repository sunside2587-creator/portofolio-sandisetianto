import type { CardSurfaceVariant, SectionId } from './common';

export type GeometricIconKind = 'half-circle' | 'squares' | 'target' | 'quad';

export type TechGlyphKind =
  | 'vue-vite'
  | 'node-express'
  | 'sql-db'
  | 'react-core'
  | 'aws-git'
  | 'dbeaver-tools'
  | 'python-iot';

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: GeometricIconKind;
  readonly tools: readonly string[];
  readonly href?: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: `#${SectionId}`;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export interface ResponsiveImage {
  readonly src: string;
  readonly srcSet: string;
  readonly sizes: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface GalleryItem {
  readonly id: string;
  readonly label: string;
  readonly category: string;
  readonly title: string;
  readonly specCode: string;
  readonly glyph: TechGlyphKind;
  readonly variant: CardSurfaceVariant;
  readonly tags: readonly string[];
}
