import { motion } from 'motion/react';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { assertNever } from '@/lib/assert';
import type { CardSurfaceVariant } from '@/types/common';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  readonly project: Project;
  readonly index: number;
  readonly variant: CardSurfaceVariant;
}

function getSurfaceClasses(variant: CardSurfaceVariant): {
  readonly container: string;
  readonly mutedText: string;
  readonly tagBorder: string;
  readonly linkTone: 'ink' | 'paper';
} {
  switch (variant) {
    case 'ink':
      return {
        container: 'bg-ink text-paper border border-ink',
        mutedText: 'text-paper/70',
        tagBorder: 'border-paper/25 text-paper/85',
        linkTone: 'paper',
      };
    case 'signal':
      return {
        container: 'bg-signal text-paper border border-signal',
        mutedText: 'text-paper/85',
        tagBorder: 'border-paper/35 text-paper',
        linkTone: 'paper',
      };
    case 'paper':
      return {
        container: 'bg-paper text-ink border border-line',
        mutedText: 'text-muted',
        tagBorder: 'border-ink/20 text-ink',
        linkTone: 'ink',
      };
    default:
      return assertNever(variant);
  }
}

export function ProjectCard({ project, index, variant }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, '0');
  const styles = getSurfaceClasses(variant);

  return (
    <div data-reveal>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`flex h-full flex-col justify-between p-5 transition-colors sm:p-6 ${styles.container}`}
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-2xl leading-none tracking-tight sm:text-3xl">{num}</span>
            <span className={`text-[10px] font-semibold tracking-[0.16em] uppercase sm:text-[11px] sm:tracking-[0.18em] ${styles.mutedText}`}>
              {`${project.category} · ${project.year}`}
            </span>
          </div>

          <h3 className="mt-3.5 font-display text-2xl leading-[0.96] tracking-tight uppercase sm:mt-4 sm:text-3xl">
            {project.title}
          </h3>

          <div className="mt-4 aspect-[16/10] w-full overflow-hidden border border-current/15 sm:mt-5">
            {project.coverImage ? (
              <img
                src={project.coverImage.url}
                srcSet={project.coverImage.srcSet}
                alt={project.coverImage.alt}
                width={project.coverImage.width}
                height={project.coverImage.height}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full flex-col justify-between p-4 opacity-90">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-70">
                  {`// ${project.slug}`}
                </span>
                <span className="font-display text-4xl leading-none tracking-tight uppercase opacity-35">
                  {num}
                </span>
              </div>
            )}
          </div>

          <p className={`mt-4 text-sm leading-relaxed ${styles.mutedText}`}>
            {project.summary}
          </p>
        </div>

        <div className="mt-6">
          {project.tags.length > 0 ? (
            <ul className="mb-5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className={`border px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase ${styles.tagBorder}`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex items-center justify-between gap-4 border-t border-current/15 pt-4">
            <div className="flex flex-wrap items-center gap-4">
              {project.liveUrl ? (
                <ArrowLink label="LIVE" href={project.liveUrl} tone={styles.linkTone} />
              ) : null}
              {project.repoUrl ? (
                <ArrowLink label="CODE" href={project.repoUrl} tone={styles.linkTone} />
              ) : null}
              {!project.liveUrl && !project.repoUrl ? (
                <span className={`text-[11px] font-semibold tracking-[0.16em] uppercase ${styles.mutedText}`}>
                  IN PROGRESS
                </span>
              ) : null}
            </div>
            <span aria-hidden="true" className="font-mono text-lg leading-none">
              +
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
