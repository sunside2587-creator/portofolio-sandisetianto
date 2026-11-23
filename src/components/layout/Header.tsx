import { use, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Monogram } from '@/components/ui/Monogram';
import { NAV_ITEMS } from '@/content/navigation';
import { PROFILE } from '@/content/profile';
import { SmoothScrollContext } from '@/lib/smooth-scroll-context';
import { Container } from './Container';
import { MobileNav } from './MobileNav';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollTo } = use(SmoothScrollContext);

  function handleNavClick(href: string) {
    scrollTo(href);
    window.history.replaceState(null, '', href);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-xs">
      <Container>
        <div className="grid grid-cols-2 items-center gap-4 py-3.5 lg:grid-cols-12">
          <div className="flex flex-col gap-1.5 lg:col-span-4">
            <span aria-hidden="true" className="block h-[2px] w-7 bg-signal" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-ink uppercase">
              {PROFILE.role}
            </span>
          </div>

          <div className="hidden text-center lg:col-span-4 lg:block">
            <span className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
              {`BASED IN ${PROFILE.location}`}
            </span>
          </div>

          <div className="flex items-center justify-end gap-5 lg:col-span-4">
            <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="inline-flex min-h-11 items-center text-[11px] font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:text-signal"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <span className="hidden items-center gap-2 text-right text-[10px] font-medium tracking-[0.16em] text-muted uppercase xl:inline-flex">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal motion-safe:animate-pulse" />
              {PROFILE.availability}
            </span>

            <Monogram label={PROFILE.monogram} className="md:hidden" />

            <Button
              variant="outline"
              tone="ink"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="md:hidden"
            >
              MENU
            </Button>
          </div>
        </div>
      </Container>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
