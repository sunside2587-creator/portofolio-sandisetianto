import { Container } from '@/components/layout/Container';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { GeometricIcon } from '@/components/ui/GeometricIcon';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SERVICES } from '@/content/services';

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-b border-line py-16 lg:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <SectionLabel label="CAPABILITIES" />
            <h2
              id="services-title"
              data-reveal
              className="mt-4 font-display text-4xl leading-[0.92] tracking-tight text-ink uppercase sm:text-5xl"
            >
              WHAT I DO
            </h2>
            <p data-reveal className="mt-4 text-sm leading-relaxed text-muted">
              From specification and interface architecture to back-end endpoints and IoT
              prototyping.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4 lg:gap-0">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                data-reveal
                className="flex flex-col justify-between border-t border-line pt-6 lg:border-t-0 lg:border-l lg:px-6 lg:pt-0"
              >
                <div>
                  <GeometricIcon kind={service.icon} />
                  <h3 className="mt-6 font-display text-2xl leading-[0.95] tracking-tight text-ink uppercase">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
                </div>

                <div className="mt-6">
                  <ul className="flex flex-wrap gap-1.5">
                    {service.tools.map((tool) => (
                      <li
                        key={tool}
                        className="border border-line px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] text-ink/80 uppercase"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>

                  {service.href ? (
                    <div className="mt-5">
                      <ArrowLink label="LEARN MORE" href={service.href} tone="ink" />
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
