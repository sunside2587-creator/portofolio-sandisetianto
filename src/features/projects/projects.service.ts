import { fetchSanityQuery } from '@/lib/cms-client';
import type { CmsConfig } from '@/types/cms';
import type { AppError } from '@/types/common';
import type { Project } from '@/types/project';
import { FALLBACK_PROJECTS, PINNED_PROJECTS } from './projects.fallback';
import { isCmsProjectDto, isCmsResponse, mapDtoToProject } from './projects.mapper';

function mergeWithPinnedProjects(cmsProjects: readonly Project[]): readonly Project[] {
  const cmsIds = new Set(cmsProjects.map((p) => p.id));
  const cmsSlugs = new Set(cmsProjects.map((p) => p.slug));
  const missingPinned = PINNED_PROJECTS.filter(
    (p) => !cmsIds.has(p.id) && !cmsSlugs.has(p.slug),
  );
  return [...cmsProjects, ...missingPinned].toSorted((a, b) => a.order - b.order);
}

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, year desc) {
  "id": _id,
  "slug": slug.current,
  title,
  category,
  year,
  summary,
  "coverImage": select(
    defined(coverImage.asset) => {
      "url": coverImage.asset->url,
      "alt": coalesce(coverImage.alt, title),
      "width": coverImage.asset->metadata.dimensions.width,
      "height": coverImage.asset->metadata.dimensions.height
    },
    null
  ),
  tags,
  liveUrl,
  repoUrl,
  featured,
  order
}`;

export interface LoadProjectsResult {
  readonly projects: readonly Project[];
  readonly isFallback: boolean;
  readonly error?: AppError;
}

export async function loadProjects(
  config: CmsConfig | null,
  signal: AbortSignal,
): Promise<LoadProjectsResult> {
  if (!config) {
    return {
      projects: FALLBACK_PROJECTS,
      isFallback: true,
      error: {
        code: 'CMS_NOT_CONFIGURED',
        message: 'CMS project ID is not configured.',
      },
    };
  }

  try {
    const raw = await fetchSanityQuery(config, PROJECTS_QUERY, signal);
    if (!isCmsResponse(raw)) {
      return {
        projects: FALLBACK_PROJECTS,
        isFallback: true,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Unexpected CMS response shape.',
        },
      };
    }

    const mapped = raw.result
      .filter(isCmsProjectDto)
      .map(mapDtoToProject)
      .toSorted((a, b) => a.order - b.order);

    if (mapped.length === 0) {
      return {
        projects: FALLBACK_PROJECTS,
        isFallback: true,
        ...(raw.result.length > 0
          ? {
              error: {
                code: 'VALIDATION_ERROR',
                message: 'No valid projects found in CMS payload.',
              },
            }
          : {}),
      };
    }

    return {
      projects: mergeWithPinnedProjects(mapped),
      isFallback: false,
    };
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }
    return {
      projects: FALLBACK_PROJECTS,
      isFallback: true,
      error: {
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Network error loading projects.',
      },
    };
  }
}
