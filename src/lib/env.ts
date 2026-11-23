import type { CmsConfig } from '@/types/cms';

export const IS_DEV = import.meta.env.DEV;

export function getCmsConfig(): CmsConfig | null {
  const projectId = import.meta.env.VITE_CMS_PROJECT_ID?.trim();
  if (!projectId) {
    return null;
  }

  const dataset = import.meta.env.VITE_CMS_DATASET?.trim() || 'production';
  const apiVersion = import.meta.env.VITE_CMS_API_VERSION?.trim() || '2025-02-19';
  const token = import.meta.env.VITE_CMS_TOKEN?.trim() || null;

  return {
    projectId,
    dataset,
    apiVersion,
    token,
  };
}
