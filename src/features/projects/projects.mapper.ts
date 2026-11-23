import type { CmsCoverImageDto, CmsProjectDto } from '@/types/cms';
import type { ImageAsset } from '@/types/common';
import type { Project } from '@/types/project';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isOptionalString(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === 'string';
}

function isOptionalNumber(value: unknown): value is number | null | undefined {
  return value === undefined || value === null || (typeof value === 'number' && Number.isFinite(value));
}

function isOptionalStringArray(value: unknown): value is readonly string[] | null | undefined {
  if (value === undefined || value === null) {
    return true;
  }
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isCoverImageDto(value: unknown): value is CmsCoverImageDto {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value['url'] === 'string' &&
    value['url'].length > 0 &&
    isOptionalString(value['alt']) &&
    isOptionalNumber(value['width']) &&
    isOptionalNumber(value['height'])
  );
}

export function isCmsResponse(value: unknown): value is { readonly result: readonly unknown[] } {
  return isRecord(value) && Array.isArray(value['result']);
}

export function isCmsProjectDto(value: unknown): value is CmsProjectDto {
  if (!isRecord(value)) {
    return false;
  }

  const cover = value['coverImage'];
  const validCover = cover === undefined || cover === null || isCoverImageDto(cover);

  return (
    typeof value['id'] === 'string' &&
    typeof value['slug'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['category'] === 'string' &&
    typeof value['year'] === 'number' &&
    Number.isFinite(value['year']) &&
    typeof value['summary'] === 'string' &&
    validCover &&
    isOptionalStringArray(value['tags']) &&
    isOptionalString(value['liveUrl']) &&
    isOptionalString(value['repoUrl']) &&
    (value['featured'] === undefined ||
      value['featured'] === null ||
      typeof value['featured'] === 'boolean') &&
    isOptionalNumber(value['order'])
  );
}

function mapCoverImage(dto: CmsProjectDto): ImageAsset | undefined {
  if (!dto.coverImage) {
    return undefined;
  }
  return {
    url: dto.coverImage.url,
    alt: dto.coverImage.alt?.trim() || `${dto.title} preview`,
    width: dto.coverImage.width ?? 1280,
    height: dto.coverImage.height ?? 800,
  };
}

export function mapDtoToProject(dto: CmsProjectDto): Project {
  const coverImage = mapCoverImage(dto);
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    category: dto.category,
    year: dto.year,
    summary: dto.summary,
    tags: dto.tags ? [...dto.tags] : [],
    featured: dto.featured ?? false,
    order: dto.order ?? 999,
    ...(coverImage ? { coverImage } : {}),
    ...(dto.liveUrl ? { liveUrl: dto.liveUrl } : {}),
    ...(dto.repoUrl ? { repoUrl: dto.repoUrl } : {}),
  };
}
