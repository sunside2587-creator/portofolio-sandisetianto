import { ArrowLink } from '@/components/ui/ArrowLink';
import { formatIssuedDate } from '@/lib/formatters';
import type { Certificate } from '@/types/certificate';

interface CertificateRowProps {
  readonly certificate: Certificate;
  readonly index: number;
  readonly showInlineThumb: boolean;
  readonly onOpen: (id: string) => void;
  readonly onHoverStart: (certificate: Certificate) => void;
  readonly onHoverEnd: () => void;
}

export function CertificateRow({
  certificate,
  index,
  showInlineThumb,
  onOpen,
  onHoverStart,
  onHoverEnd,
}: CertificateRowProps) {
  const num = String(index + 1).padStart(2, '0');
  const dateLabel = formatIssuedDate(certificate.issuedAt);

  return (
    <div
      onPointerEnter={() => onHoverStart(certificate)}
      onPointerLeave={onHoverEnd}
      className="group flex flex-col gap-3 border-b border-line py-4 transition-colors hover:bg-ink/[0.03] sm:grid sm:grid-cols-12 sm:items-center"
    >
      <div className="hidden sm:col-span-1 sm:block">
        <span className="font-mono text-xs font-medium text-muted">{num}</span>
      </div>

      <div className="flex items-start gap-3 sm:col-span-6 sm:items-center">
        {showInlineThumb && certificate.image ? (
          <button
            type="button"
            onClick={() => onOpen(certificate.id)}
            aria-label={`Preview ${certificate.title}`}
            className="mt-0.5 shrink-0 cursor-pointer overflow-hidden border border-line sm:mt-0"
          >
            <img
              src={certificate.image.thumb}
              alt={certificate.image.alt}
              width={56}
              height={40}
              loading="lazy"
              className="h-10 w-14 object-cover"
            />
          </button>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-muted uppercase sm:hidden">
            <span className="font-bold text-signal">{num}</span>
            <span>·</span>
            <span>{dateLabel}</span>
          </div>
          <button
            type="button"
            onClick={() => onOpen(certificate.id)}
            className="w-full cursor-pointer text-left font-display text-lg leading-snug tracking-tight text-ink uppercase transition-colors group-hover:text-signal sm:min-h-11 sm:text-2xl sm:leading-tight"
          >
            {certificate.title}
          </button>
          <p className="mt-0.5 text-xs text-muted">{certificate.issuer}</p>
        </div>
      </div>

      <div className="hidden sm:col-span-2 sm:block">
        <span className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
          {dateLabel}
        </span>
      </div>

      <div className="flex items-center justify-end gap-4 sm:col-span-3">
        {certificate.verifyUrl ? (
          <>
            <button
              type="button"
              onClick={() => onOpen(certificate.id)}
              className="inline-flex min-h-9 cursor-pointer items-center text-[11px] font-semibold tracking-[0.14em] text-muted uppercase transition-colors hover:text-signal sm:hidden"
            >
              PREVIEW
            </button>
            <ArrowLink label="VERIFY" href={certificate.verifyUrl} tone="ink" />
          </>
        ) : (
          <button
            type="button"
            onClick={() => onOpen(certificate.id)}
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 border-b border-ink/25 pb-1 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:text-signal sm:min-h-11"
          >
            <span>VIEW</span>
            <span aria-hidden="true">⟶</span>
          </button>
        )}
      </div>
    </div>
  );
}
