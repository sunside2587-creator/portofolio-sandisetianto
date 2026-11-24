import { use, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Monogram } from '@/components/ui/Monogram';
import { NAV_ITEMS } from '@/content/navigation';
import { PROFILE } from '@/content/profile';
import { SmoothScrollContext } from '@/lib/smooth-scroll-context';
import { Container } from './Container';
import { MobileNav } from './MobileNav';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { scrollTo } = use(SmoothScrollContext);

  function handleNavClick(href: string) {
    scrollTo(href);
    window.history.replaceState(null, '', href);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-xs">
        <Container>
          <div className="flex items-center justify-between gap-3 py-3 lg:grid lg:grid-cols-12 lg:py-3.5">
            <a
              href="#top"
              onClick={(event) => {
                event.preventDefault();
                handleNavClick('#top');
              }}
              className="group flex min-w-0 items-center gap-3 lg:col-span-4"
            >
              <Monogram label={PROFILE.monogram} className="h-9 w-9 text-[11px] md:hidden" />
              <div className="min-w-0">
                <span aria-hidden="true" className="hidden h-[2px] w-7 bg-signal md:block" />
                <span className="block truncate text-[11px] font-bold tracking-[0.16em] text-ink uppercase transition-colors group-hover:text-signal md:mt-1.5 md:hidden">
                  {PROFILE.name}
                </span>
                <span className="block truncate text-[10px] font-semibold tracking-[0.15em] text-muted uppercase md:mt-1.5 md:text-[11px] md:tracking-[0.18em] md:text-ink">
                  {PROFILE.role}
                </span>
              </div>
            </a>

            <div className="hidden text-center xl:col-span-3 xl:block">
              <span className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
                {`BASED IN ${PROFILE.location}`}
              </span>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-4 lg:col-span-8 xl:col-span-5">
              <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="inline-flex min-h-11 items-center text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:text-signal"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <span
                aria-label={PROFILE.availability}
                title={PROFILE.availability}
                className="hidden h-2 w-2 shrink-0 rounded-full bg-signal motion-safe:animate-pulse lg:inline-block"
              />

              <Button
                ref={menuTriggerRef}
                variant="outline"
                tone="ink"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-drawer"
                className="px-3.5 py-2 md:hidden"
              >
                <span>MENU</span>
                <span aria-hidden="true" className="flex flex-col gap-1">
                  <span className="block h-[1.5px] w-3.5 bg-current" />
                  <span className="block h-[1.5px] w-3.5 bg-current" />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={(restoreFocus) => {
          setMenuOpen(false);
          if (restoreFocus) {
            requestAnimationFrame(() => {
              menuTriggerRef.current?.focus({ preventScroll: true });
            });
          }
        }}
      />
    </>
  );
}
