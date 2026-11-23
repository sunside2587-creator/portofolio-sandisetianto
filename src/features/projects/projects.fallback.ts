import type { Project } from '@/types/project';

export const FALLBACK_PROJECTS: readonly Project[] = [
  {
    id: 'sandi-portfolio',
    slug: 'sandi-portfolio',
    title: 'Personal Portfolio',
    category: 'Web App',
    year: 2026,
    summary:
      'Editorial Brutalist × Y2K single-page portfolio built with React 19, strict TypeScript, Tailwind CSS v4, GSAP, Lenis, and Motion.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    featured: true,
    order: 1,
  },
  {
    id: 'placeholder-project-2',
    slug: 'project-2-isi',
    title: 'Project Title [ISI]',
    category: '[ISI]',
    year: 2026,
    summary: 'Add a real project in Sanity CMS or update projects.fallback.ts.',
    tags: ['React', 'TypeScript'],
    featured: true,
    order: 2,
  },
  {
    id: 'placeholder-project-3',
    slug: 'project-3-isi',
    title: 'Project Title [ISI]',
    category: '[ISI]',
    year: 2026,
    summary: 'Add a real project in Sanity CMS or update projects.fallback.ts.',
    tags: ['Node.js', 'REST API'],
    featured: true,
    order: 3,
  },
];
