import { AnimatePresence, motion } from 'motion/react';
import { use, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Monogram } from '@/components/ui/Monogram';
import { NAV_ITEMS } from '@/content/navigation';
import { PROFILE } from '@/content/profile';
import { useScrollLock } from '@/hooks/useScrollLock';
import { SmoothScrollContext } from '@/lib/smooth-scroll-context';

interface MobileNavProps {
  readonly open: boolean;
  readonly onClose: (restoreFocus?: boolean) => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { scrollTo } = use(SmoothScrollContext);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  function handleNavigate(href: string) {
    onClose(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollTo(href);
        window.history.replaceState(null, '', href);
      });
    });
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-ink px-5 py-4 text-paper md:hidden"
        >
          <div className="flex items-center justify-between border-b border-paper/15 pb-3.5">
            <div className="flex items-center gap-3">
              <Monogram label={PROFILE.monogram} tone="paper" className="h-9 w-9 text-[11px]" />
              <span
                id="mobile-nav-title"
                className="text-xs font-semibold tracking-[0.18em] text-paper/85 uppercase"
              >
                {PROFILE.name}
              </span>
            </div>
            <Button
              ref={closeButtonRef}
              variant="outline"
              tone="paper"
              onClick={() => onClose(true)}
              aria-label="Close navigation menu"
              className="px-3.5 py-2"
            >
              CLOSE ×
            </Button>
          </div>

          <nav aria-label="Mobile navigation" className="my-auto flex flex-col py-6">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate(item.href);
                }}
                className="group flex items-baseline justify-between border-b border-paper/15 py-3.5 transition-colors hover:border-signal"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-signal">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-4xl tracking-tight text-paper uppercase transition-colors group-hover:text-signal sm:text-5xl">
                    {item.label}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm text-paper/50 transition-transform group-hover:translate-x-1 group-hover:text-signal"
                >
                  ⟶
                </span>
              </a>
            ))}
          </nav>

          <div className="space-y-3 border-t border-paper/15 pt-4 text-[11px] tracking-[0.16em] uppercase">
            <div className="flex items-center gap-2 text-paper">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
              <span>{PROFILE.availability}</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-paper/65">
              <span>{PROFILE.location}</span>
              {PROFILE.contact.email ? (
                <a
                  href={`mailto:${PROFILE.contact.email}`}
                  className="font-semibold text-paper underline decoration-signal underline-offset-4"
                >
                  EMAIL ME
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
