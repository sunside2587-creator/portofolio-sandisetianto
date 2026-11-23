import type { CmsConfig } from '@/types/cms';

export async function fetchSanityQuery(
  config: CmsConfig,
  query: string,
  signal: AbortSignal,
): Promise<unknown> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://${config.projectId}.apicdn.sanity.io/v${config.apiVersion}/data/query/${config.dataset}?query=${encodedQuery}`;

  const headers: HeadersInit = {};
  if (config.token) {
    headers['Authorization'] = `Bearer ${config.token}`;
  }

  const response = await fetch(url, { headers, signal });
  if (!response.ok) {
    throw new Error(`CMS request failed with status ${response.status}`);
  }

  const payload: unknown = await response.json();
  return payload;
}
