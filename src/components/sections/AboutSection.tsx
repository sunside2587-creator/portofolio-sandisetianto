import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { CountUp } from '@/components/ui/CountUp';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CERTIFICATES } from '@/content/certificates';
import { ABOUT_PORTRAIT } from '@/content/images';
import { PROFILE } from '@/content/profile';
import { countByCategory } from '@/features/certificates/certificates.selectors';
import { useProjects } from '@/features/projects/useProjects';

export function AboutSection() {
  const [expanded, setExpanded] = useState(false);
  const bioPanelId = useId();
  const { state: projectState } = useProjects();

  const stats = [
    { label: 'CERTIFICATES', value: CERTIFICATES.length, suffix: '' },
    { label: 'COURSES', value: countByCategory(CERTIFICATES, 'course'), suffix: '' },
    { label: 'AWARDS', value: countByCategory(CERTIFICATES, 'award'), suffix: '' },
    { label: 'PROJECTS', value: projectState.data.length, suffix: '+' },
  ] as const;

  return (
    <section id="about" aria-labelledby="about-title" className="border-b border-line py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-between lg:col-span-5 lg:border-r lg:border-line lg:pr-8">
            <div>
              <SectionLabel label={PROFILE.aboutLabel} />
              <h2
                id="about-title"
                data-reveal
                className="mt-5 font-display text-4xl leading-[0.95] tracking-tight text-ink uppercase sm:text-5xl"
              >
                {PROFILE.aboutHeadlinePrefix}
                <span className="underline decoration-signal decoration-4 underline-offset-4">
                  {PROFILE.aboutHeadlineEmphasis}
                </span>
              </h2>

              <p data-reveal className="mt-6 text-sm leading-relaxed text-ink/85 sm:text-base">
                {PROFILE.bioShort}
              </p>

              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    id={bioPanelId}
                    key="bio-long"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="pt-4 text-sm leading-relaxed text-muted sm:text-base">
                      {PROFILE.bioLong}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="mt-8">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={bioPanelId}
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex min-h-11 cursor-pointer items-center gap-3 border-b border-ink/25 pb-1 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:text-signal"
              >
                <span>{expanded ? 'LESS ABOUT ME' : 'MORE ABOUT ME'}</span>
                <span aria-hidden="true">⟶</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 lg:flex lg:items-center">
            <div data-reveal className="mx-auto w-full max-w-xs overflow-hidden border border-line bg-ink">
              <img
                src={ABOUT_PORTRAIT.src}
                srcSet={ABOUT_PORTRAIT.srcSet}
                sizes={ABOUT_PORTRAIT.sizes}
                width={ABOUT_PORTRAIT.width}
                height={ABOUT_PORTRAIT.height}
                alt={ABOUT_PORTRAIT.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label} data-reveal className="border-t border-line pt-4">
                  <p className="font-display text-5xl leading-none text-signal sm:text-6xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <RotatingBadge text="THOUGHTFUL CODE • MEANINGFUL IMPACT • ">
                <span className="font-display text-3xl leading-none text-signal">*</span>
              </RotatingBadge>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
