import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { Certificate } from '@/types/certificate';
import { CertificateMetaList } from './CertificateMetaList';

interface CertificateDialogProps {
  readonly items: readonly Certificate[];
  readonly activeId: string | null;
  readonly onClose: () => void;
  readonly onSelect: (id: string) => void;
}

export function CertificateDialog({
  items,
  activeId,
  onClose,
  onSelect,
}: CertificateDialogProps) {
  const activeIndex = activeId ? items.findIndex((item) => item.id === activeId) : -1;
  const certificate = activeIndex >= 0 ? items[activeIndex] ?? null : null;
  const open = certificate !== null;

  useScrollLock(open);

  const prevCert = activeIndex > 0 ? items[activeIndex - 1] : undefined;
  const nextCert =
    activeIndex >= 0 && activeIndex < items.length - 1 ? items[activeIndex + 1] : undefined;

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' && prevCert) {
        event.preventDefault();
        onSelect(prevCert.id);
      } else if (event.key === 'ArrowRight' && nextCert) {
        event.preventDefault();
        onSelect(nextCert.id);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCert, onSelect, open, prevCert]);

  return (
    <Dialog open={open} onClose={onClose} labelledBy="cert-dialog-title">
      {certificate ? (
        <>
          <Dialog.Header className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
                {certificate.category}
              </span>
              <h3
                id="cert-dialog-title"
                className="mt-1 font-display text-xl leading-tight uppercase sm:text-3xl"
              >
                {certificate.title}
              </h3>
            </div>
            <Button
              variant="outline"
              tone="ink"
              onClick={onClose}
              aria-label="Close certificate dialog"
              className="shrink-0 px-3 py-2 sm:px-4"
            >
              CLOSE ×
            </Button>
          </Dialog.Header>

          <Dialog.Body className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              {certificate.image ? (
                <img
                  src={certificate.image.full}
                  alt={certificate.image.alt}
                  width={certificate.image.width}
                  height={certificate.image.height}
                  className="w-full border border-line object-contain bg-ink/5"
                />
              ) : (
                <div className="flex aspect-[4/3] flex-col justify-between border border-line bg-ink p-6 text-paper">
                  <span className="text-xs font-semibold tracking-[0.18em] text-signal uppercase">
                    INTERNAL RECORD — FILE NOT PUBLISHED
                  </span>
                  <p className="font-display text-3xl uppercase leading-tight">
                    {certificate.title}
                  </p>
                  <span className="text-xs text-paper/70">{certificate.issuer}</span>
                </div>
              )}
            </div>

            <CertificateMetaList certificate={certificate} />
          </Dialog.Body>

          <Dialog.Footer className="flex items-center justify-between gap-2 sm:gap-4">
            <Button
              variant="outline"
              tone="ink"
              disabled={!prevCert}
              onClick={() => {
                if (prevCert) {
                  onSelect(prevCert.id);
                }
              }}
              className="px-3 py-2 sm:px-4"
            >
              <span>←</span>
              <span className="sm:hidden">PREV</span>
              <span className="hidden sm:inline">PREVIOUS</span>
            </Button>
            <span className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
              {`${activeIndex + 1} / ${items.length}`}
            </span>
            <Button
              variant="outline"
              tone="ink"
              disabled={!nextCert}
              onClick={() => {
                if (nextCert) {
                  onSelect(nextCert.id);
                }
              }}
              className="px-3 py-2 sm:px-4"
            >
              <span>NEXT</span>
              <span>→</span>
            </Button>
          </Dialog.Footer>
        </>
      ) : null}
    </Dialog>
  );
}
