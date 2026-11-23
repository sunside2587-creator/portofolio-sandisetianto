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
      className="group grid grid-cols-12 items-center gap-3 border-b border-line py-4 transition-colors hover:bg-ink/[0.03]"
    >
      <div className="col-span-2 sm:col-span-1">
        <span className="font-mono text-xs font-medium text-muted">{num}</span>
      </div>

      <div className="col-span-10 flex items-center gap-3 sm:col-span-6">
        {showInlineThumb && certificate.image ? (
          <img
            src={certificate.image.thumb}
            alt={certificate.image.alt}
            width={48}
            height={36}
            loading="lazy"
            className="h-9 w-12 shrink-0 rounded object-cover border border-line"
          />
        ) : null}

        <div className="min-w-0">
          <button
            type="button"
            onClick={() => onOpen(certificate.id)}
            className="min-h-11 w-full cursor-pointer text-left font-display text-xl leading-tight tracking-tight text-ink uppercase transition-colors group-hover:text-signal sm:text-2xl"
          >
            {certificate.title}
          </button>
          <p className="mt-0.5 text-xs text-muted">{certificate.issuer}</p>
        </div>
      </div>

      <div className="col-span-6 pl-0 sm:col-span-2 sm:pl-0">
        <span className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
          {dateLabel}
        </span>
      </div>

      <div className="col-span-6 flex items-center justify-end gap-4 sm:col-span-3">
        {certificate.verifyUrl ? (
          <ArrowLink label="VERIFY" href={certificate.verifyUrl} tone="ink" />
        ) : (
          <button
            type="button"
            onClick={() => onOpen(certificate.id)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 border-b border-ink/25 pb-1 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:text-signal"
          >
            <span>VIEW</span>
            <span aria-hidden="true">⟶</span>
          </button>
        )}
      </div>
    </div>
  );
}
