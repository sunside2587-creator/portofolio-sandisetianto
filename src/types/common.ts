export type SectionId =
  | 'hero'
  | 'about'
  | 'gallery'
  | 'work'
  | 'services'
  | 'certificates'
  | 'contact';

export type CardSurfaceVariant = 'ink' | 'signal' | 'paper';

export interface ImageAsset {
  readonly url: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly srcSet?: string;
}

export interface AppError {
  readonly code: 'CMS_NOT_CONFIGURED' | 'NETWORK_ERROR' | 'VALIDATION_ERROR' | 'UNKNOWN_ERROR';
  readonly message: string;
}

export type AsyncDataState<T> =
  | { readonly status: 'idle'; readonly data: readonly T[]; readonly isFallback: true }
  | { readonly status: 'loading'; readonly data: readonly T[]; readonly isFallback: true }
  | { readonly status: 'success'; readonly data: readonly T[]; readonly isFallback: boolean }
  | {
      readonly status: 'error';
      readonly data: readonly T[];
      readonly isFallback: true;
      readonly error: AppError;
    };
