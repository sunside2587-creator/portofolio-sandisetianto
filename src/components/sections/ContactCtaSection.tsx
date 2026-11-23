import { Container } from '@/components/layout/Container';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Button } from '@/components/ui/Button';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { PROFILE } from '@/content/profile';
import { useClipboard } from '@/hooks/useClipboard';

export function ContactCtaSection() {
  const { copied, copy } = useClipboard();
  const { email, cvUrl } = PROFILE.contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-ink py-16 text-paper lg:py-24"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2
              id="contact-title"
              data-reveal
              className="font-display text-4xl leading-[0.92] tracking-tight text-paper uppercase sm:text-5xl"
            >
              {"LET'S CREATE SOMETHING "}
              <span className="underline decoration-signal decoration-4 underline-offset-4">
                GREAT TOGETHER.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-signal uppercase">
              HAVE A PROJECT IN MIND?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-paper/80">
              {`Currently ${PROFILE.availability.toLowerCase()}. Reach out for internships, fullstack builds, or collaboration.`}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {email ? (
                <>
                  <ArrowLink label="GET IN TOUCH" href={`mailto:${email}`} tone="paper" />
                  <Button
                    variant="outline"
                    tone="paper"
                    onClick={() => void copy(email)}
                  >
                    {copied ? 'EMAIL COPIED' : 'COPY EMAIL'}
                  </Button>
                  <span aria-live="polite" className="sr-only">
                    {copied ? 'Email address copied to clipboard' : ''}
                  </span>
                </>
              ) : (
                <p className="border border-paper/20 px-3 py-2 text-xs tracking-[0.14em] text-paper/75 uppercase">
                  CONTACT EMAIL COMING SOON
                </p>
              )}

              {cvUrl ? (
                <a
                  href={cvUrl}
                  download
                  className="inline-flex min-h-11 items-center border border-paper/35 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-paper uppercase transition-colors hover:border-signal hover:text-signal"
                >
                  DOWNLOAD CV
                </a>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 lg:col-span-3 lg:items-end">
            <div className="text-xs leading-relaxed text-paper/80 lg:text-right">
              {email ? <p>{email}</p> : null}
              <p className="uppercase tracking-[0.14em]">{PROFILE.location}</p>
            </div>

            <RotatingBadge text="AVAILABLE FOR NEW PROJECTS • " tone="paper">
              <span className="font-display text-2xl leading-none text-signal">*</span>
            </RotatingBadge>
          </div>
        </div>
      </Container>
    </section>
  );
}
