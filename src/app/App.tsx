import { useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { AboutSection } from '@/components/sections/AboutSection';
import { CertificatesSection } from '@/components/sections/CertificatesSection';
import { ContactCtaSection } from '@/components/sections/ContactCtaSection';
import { GallerySection } from '@/components/sections/gallery/GallerySection';
import { HeroSection } from '@/components/sections/HeroSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Marquee } from '@/components/ui/Marquee';
import { HERO_TECH_MARQUEE } from '@/content/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AppProviders } from './AppProviders';

function SectionFallback({ label }: { readonly label: string }) {
  return (
    <div className="border-b border-line px-6 py-12 text-center text-sm text-muted">
      {`Unable to render ${label} right now.`}
    </div>
  );
}

function PortfolioPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef} id="top" className="min-h-dvh bg-paper text-ink">
      <SkipLink />
      <Header />

      <main id="main">
        <HeroSection />
        <Marquee items={HERO_TECH_MARQUEE} />
        <AboutSection />

        <ErrorBoundary fallback={<SectionFallback label="Gallery" />}>
          <GallerySection />
        </ErrorBoundary>

        <ErrorBoundary fallback={<SectionFallback label="Selected Work" />}>
          <SelectedWorkSection />
        </ErrorBoundary>

        <ServicesSection />

        <ErrorBoundary fallback={<SectionFallback label="Certificates & Awards" />}>
          <CertificatesSection />
        </ErrorBoundary>
      </main>

      <ContactCtaSection />
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <AppProviders>
      <PortfolioPage />
    </AppProviders>
  );
}
