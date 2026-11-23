export interface CmsConfig {
  readonly projectId: string;
  readonly dataset: string;
  readonly apiVersion: string;
  readonly token: string | null;
}

export interface CmsCoverImageDto {
  readonly url: string;
  readonly alt?: string | null;
  readonly width?: number | null;
  readonly height?: number | null;
}

export interface CmsProjectDto {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly year: number;
  readonly summary: string;
  readonly coverImage?: CmsCoverImageDto | null;
  readonly tags?: readonly string[] | null;
  readonly liveUrl?: string | null;
  readonly repoUrl?: string | null;
  readonly featured?: boolean | null;
  readonly order?: number | null;
}
