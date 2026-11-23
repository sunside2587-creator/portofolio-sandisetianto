import { lazy, Suspense, useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CERTIFICATES } from '@/content/certificates';
import { CertificateList } from '@/features/certificates/CertificateList';
import { CursorPreview } from '@/features/certificates/CursorPreview';
import { HighlightCard } from '@/features/certificates/HighlightCard';
import { useCertificateFilter } from '@/features/certificates/useCertificateFilter';
import { useCursorPreview } from '@/features/certificates/useCursorPreview';
import { ScrollTrigger } from '@/lib/gsap';
import type { CardSurfaceVariant } from '@/types/common';

const LazyCertificateDialog = lazy(() =>
  import('@/features/certificates/CertificateDialog').then((mod) => ({
    default: mod.CertificateDialog,
  })),
);

const SURFACE_CYCLE: readonly CardSurfaceVariant[] = ['ink', 'signal', 'paper'];

export function CertificatesSection() {
  const {
    filter,
    showAll,
    filterOptions,
    highlights,
    filtered,
    visible,
    hasMore,
    selectFilter,
    toggleShowAll,
  } = useCertificateFilter(CERTIFICATES);

  const [activeId, setActiveId] = useState<string | null>(null);
  const cursorPreview = useCursorPreview();

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
    return () => window.clearTimeout(timerId);
  }, [filter, showAll]);

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="border-b border-line py-16 lg:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel label="CREDENTIALS" />
            <div className="mt-4 flex flex-wrap items-baseline gap-5">
              <h2
                id="certificates-title"
                data-reveal
                className="font-display text-4xl leading-[0.9] tracking-tight text-ink uppercase sm:text-6xl"
              >
                CERTIFICATES &amp; AWARDS
              </h2>
              <span className="font-display text-5xl leading-none text-signal sm:text-6xl">
                <CountUp value={CERTIFICATES.length} />
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p data-reveal className="text-sm leading-relaxed text-muted">
              Verified courses, national programs, hackathon participation, and competition awards
              collected across web engineering and IoT.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <HighlightCard
              key={item.id}
              certificate={item}
              index={index}
              variant={SURFACE_CYCLE[index % SURFACE_CYCLE.length] ?? 'paper'}
              onSelect={setActiveId}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <FilterTabs
            options={filterOptions}
            value={filter}
            onChange={selectFilter}
            ariaLabel="Filter credentials by category"
          />
          <span className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
            {`SHOWING ${visible.length} OF ${filtered.length}`}
          </span>
        </div>

        <CertificateList
          items={visible}
          showInlineThumbs={!cursorPreview.enabled}
          onOpen={setActiveId}
          onHoverStart={cursorPreview.handleHoverStart}
          onHoverEnd={cursorPreview.handleHoverEnd}
          onPointerMove={cursorPreview.handlePointerMove}
        />

        <CursorPreview
          certificate={cursorPreview.hoveredCert}
          enabled={cursorPreview.enabled}
          x={cursorPreview.smoothX}
          y={cursorPreview.smoothY}
        />

        {hasMore ? (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              tone="ink"
              aria-expanded={showAll}
              onClick={toggleShowAll}
            >
              {showAll ? 'SHOW LESS' : `SHOW ALL (${filtered.length}) ⟶`}
            </Button>
          </div>
        ) : null}
      </Container>

      {activeId !== null ? (
        <Suspense fallback={null}>
          <LazyCertificateDialog
            items={filtered}
            activeId={activeId}
            onClose={() => setActiveId(null)}
            onSelect={setActiveId}
          />
        </Suspense>
      ) : null}
    </section>
  );
}
