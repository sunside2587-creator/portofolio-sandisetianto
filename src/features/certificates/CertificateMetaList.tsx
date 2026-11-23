import { ArrowLink } from '@/components/ui/ArrowLink';
import { Button } from '@/components/ui/Button';
import { useClipboard } from '@/hooks/useClipboard';
import { formatIssuedDate } from '@/lib/formatters';
import type { Certificate } from '@/types/certificate';

interface CertificateMetaListProps {
  readonly certificate: Certificate;
}

export function CertificateMetaList({ certificate }: CertificateMetaListProps) {
  const { copied, copy } = useClipboard();

  return (
    <div className="flex flex-col justify-between gap-6 md:col-span-5">
      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            ISSUER
          </dt>
          <dd className="mt-1 font-medium text-ink">{certificate.issuer}</dd>
        </div>

        <div>
          <dt className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            ISSUED
          </dt>
          <dd className="mt-1 font-medium text-ink">{formatIssuedDate(certificate.issuedAt)}</dd>
        </div>

        {certificate.expiresAt ? (
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              VALID UNTIL
            </dt>
            <dd className="mt-1 font-medium text-ink">
              {formatIssuedDate(certificate.expiresAt)}
            </dd>
          </div>
        ) : null}

        {certificate.credentialId ? (
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              CREDENTIAL ID
            </dt>
            <dd className="mt-1 flex flex-wrap items-center gap-2">
              <code className="border border-line bg-ink/5 px-2 py-1 text-xs">
                {certificate.credentialId}
              </code>
              <Button
                variant="outline"
                tone="ink"
                onClick={() => void copy(certificate.credentialId ?? '')}
                className="min-h-9 px-3 py-1 text-[10px]"
              >
                {copied ? 'COPIED' : 'COPY'}
              </Button>
              <span aria-live="polite" className="sr-only">
                {copied ? 'Credential ID copied to clipboard' : ''}
              </span>
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-4">
        {certificate.verifyUrl ? (
          <ArrowLink label="VERIFY CREDENTIAL" href={certificate.verifyUrl} tone="ink" />
        ) : null}
        {certificate.pdfUrl ? (
          <a
            href={certificate.pdfUrl}
            download
            className="inline-flex min-h-11 items-center border border-ink px-4 py-2 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:bg-ink hover:text-paper"
          >
            DOWNLOAD PDF
          </a>
        ) : null}
      </div>
    </div>
  );
}
