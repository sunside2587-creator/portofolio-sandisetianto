import type { Project } from '@/types/project';

export function getFeaturedProjects(projects: readonly Project[]): readonly Project[] {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  if (featured.length > 0) {
    return featured;
  }
  return projects.slice(0, 3);
}

export function getRemainingProjects(
  projects: readonly Project[],
  featured: readonly Project[],
): readonly Project[] {
  const featuredIds = new Set(featured.map((p) => p.id));
  return projects.filter((p) => !featuredIds.has(p.id));
}
