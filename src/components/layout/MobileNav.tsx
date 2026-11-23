import { use } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Monogram } from '@/components/ui/Monogram';
import { NAV_ITEMS } from '@/content/navigation';
import { PROFILE } from '@/content/profile';
import { useScrollLock } from '@/hooks/useScrollLock';
import { SmoothScrollContext } from '@/lib/smooth-scroll-context';

interface MobileNavProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { scrollTo } = use(SmoothScrollContext);
  useScrollLock(open);

  function handleNavigate(href: string) {
    onClose();
    scrollTo(href);
    window.history.replaceState(null, '', href);
  }

  return (
    <Dialog open={open} onClose={onClose} labelledBy="mobile-nav-title" variant="drawer">
      <div className="flex h-dvh flex-col justify-between px-6 py-6">
        <div className="flex items-center justify-between border-b border-paper/15 pb-4">
          <div className="flex items-center gap-3">
            <Monogram label={PROFILE.monogram} tone="paper" />
            <span id="mobile-nav-title" className="text-xs font-semibold tracking-[0.2em] uppercase text-paper/80">
              {PROFILE.name}
            </span>
          </div>
          <Button variant="outline" tone="paper" onClick={onClose} aria-label="Close navigation menu">
            CLOSE ×
          </Button>
        </div>

        <nav aria-label="Mobile navigation" className="flex flex-col gap-6 py-8">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavigate(item.href);
              }}
              className="group flex items-baseline gap-4 border-b border-paper/15 pb-4 font-display text-5xl tracking-tight text-paper uppercase transition-colors hover:text-signal"
            >
              <span className="font-sans text-xs font-semibold tracking-[0.2em] text-signal">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="border-t border-paper/15 pt-4 text-[11px] font-medium tracking-[0.18em] text-paper/70 uppercase">
          <p>{`BASED IN ${PROFILE.location}`}</p>
          <p className="mt-1 text-paper">{PROFILE.availability}</p>
        </div>
      </div>
    </Dialog>
  );
}
