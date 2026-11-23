import { afterEach, describe, expect, it, vi } from 'vitest';
import type { CmsConfig } from '@/types/cms';
import { FALLBACK_PROJECTS } from './projects.fallback';
import { isCmsProjectDto, mapDtoToProject } from './projects.mapper';
import { loadProjects } from './projects.service';

const MOCK_CONFIG: CmsConfig = {
  projectId: 'demo-proj',
  dataset: 'production',
  apiVersion: '2025-02-19',
  token: null,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('projects mapper & service ACL', () => {
  it('validates and maps a valid CMS project DTO', () => {
    const raw: unknown = {
      id: 'p1',
      slug: 'my-app',
      title: 'My App',
      category: 'Fullstack',
      year: 2026,
      summary: 'A fullstack application.',
      coverImage: { url: 'https://cdn.example.com/a.webp', alt: null, width: 1200, height: 750 },
      tags: ['React', 'Node.js'],
      liveUrl: 'https://example.com',
      repoUrl: null,
      featured: true,
      order: 1,
    };

    expect(isCmsProjectDto(raw)).toBe(true);
    if (isCmsProjectDto(raw)) {
      const mapped = mapDtoToProject(raw);
      expect(mapped.coverImage?.alt).toBe('My App preview');
      expect(mapped.repoUrl).toBeUndefined();
      expect(mapped.tags).toEqual(['React', 'Node.js']);
    }
  });

  it('rejects malformed CMS project DTOs', () => {
    expect(isCmsProjectDto(null)).toBe(false);
    expect(isCmsProjectDto({ id: 'p1', title: 123 })).toBe(false);
    expect(
      isCmsProjectDto({
        id: 'p1',
        slug: 'x',
        title: 'X',
        category: 'Web',
        year: '2026',
        summary: 'Bad year',
      }),
    ).toBe(false);
  });

  it('returns fallback with CMS_NOT_CONFIGURED when config is null', async () => {
    const controller = new AbortController();
    const res = await loadProjects(null, controller.signal);
    expect(res.isFallback).toBe(true);
    expect(res.projects).toEqual(FALLBACK_PROJECTS);
    expect(res.error?.code).toBe('CMS_NOT_CONFIGURED');
  });

  it('returns fallback with NETWORK_ERROR when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Offline')),
    );
    const controller = new AbortController();
    const res = await loadProjects(MOCK_CONFIG, controller.signal);
    expect(res.isFallback).toBe(true);
    expect(res.projects).toEqual(FALLBACK_PROJECTS);
    expect(res.error?.code).toBe('NETWORK_ERROR');
  });

  it('fetches, validates, and sorts CMS projects when Sanity responds with valid payload', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            result: [
              {
                id: 'p2',
                slug: 'second',
                title: 'Second Project',
                category: 'Backend',
                year: 2026,
                summary: 'Second summary',
                order: 2,
                featured: true,
              },
              {
                id: 'p1',
                slug: 'first',
                title: 'First Project',
                category: 'Fullstack',
                year: 2026,
                summary: 'First summary',
                order: 1,
                featured: true,
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      ),
    );

    const controller = new AbortController();
    const res = await loadProjects(MOCK_CONFIG, controller.signal);
    expect(res.isFallback).toBe(false);
    expect(res.error).toBeUndefined();
    expect(res.projects.map((p) => p.id)).toEqual(['p1', 'p2']);
  });
});
