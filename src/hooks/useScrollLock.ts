import { use, useEffect } from 'react';
import { SmoothScrollContext } from '@/lib/smooth-scroll-context';

export function useScrollLock(active: boolean): void {
  const { stop, start } = use(SmoothScrollContext);

  useEffect(() => {
    if (!active) {
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    stop();

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      start();
    };
  }, [active, start, stop]);
}
