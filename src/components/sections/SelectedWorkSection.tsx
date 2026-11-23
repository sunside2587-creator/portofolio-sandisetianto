import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectCard } from '@/features/projects/ProjectCard';
import { ProjectCardSkeleton } from '@/features/projects/ProjectCardSkeleton';
import { getFeaturedProjects, getRemainingProjects } from '@/features/projects/projects.selectors';
import { useProjects } from '@/features/projects/useProjects';
import { IS_DEV } from '@/lib/env';
import type { CardSurfaceVariant } from '@/types/common';

const SURFACE_CYCLE: readonly CardSurfaceVariant[] = ['ink', 'signal', 'paper'];

export function SelectedWorkSection() {
  const { state, refetch } = useProjects();
  const [showAll, setShowAll] = useState(false);

  const featured = getFeaturedProjects(state.data);
  const remaining = getRemainingProjects(state.data, featured);
  const visibleProjects = showAll ? state.data : featured;

  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-line py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-3">
            <div>
              <SectionLabel label="PORTFOLIO" />
              <h2
                id="work-title"
                data-reveal
                className="mt-4 font-display text-5xl leading-[0.9] tracking-tight text-ink uppercase sm:text-6xl"
              >
                SELECTED WORK
              </h2>
              <p data-reveal className="mt-5 text-sm leading-relaxed text-muted">
                A selection of web engineering and interactive builds across front-end architecture,
                APIs, and hardware integration.
              </p>

              {IS_DEV && state.isFallback ? (
                <p className="mt-4 inline-block border border-signal/40 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-signal uppercase">
                  DEMO DATA
                </p>
              ) : null}

              {state.status === 'error' && state.error.code !== 'CMS_NOT_CONFIGURED' ? (
                <div className="mt-4 border border-signal/30 bg-signal/5 p-3">
                  <p className="text-xs text-ink">{"Couldn't load latest projects."}</p>
                  <Button variant="text" tone="signal" onClick={refetch} className="mt-1">
                    RETRY
                  </Button>
                </div>
              ) : null}
            </div>

            {remaining.length > 0 ? (
              <div className="mt-8">
                <Button
                  variant="text"
                  tone="ink"
                  aria-expanded={showAll}
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? 'SHOW FEATURED ONLY ⟶' : `VIEW ALL WORK (${state.data.length}) ⟶`}
                </Button>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-9">
            {state.status === 'loading' ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
              </div>
            ) : visibleProjects.length === 0 ? (
              <div className="border border-line p-10 text-center">
                <p className="font-display text-2xl uppercase">Projects coming soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {visibleProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    variant={SURFACE_CYCLE[index % SURFACE_CYCLE.length] ?? 'paper'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
