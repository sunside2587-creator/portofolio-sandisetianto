import { useCallback, useEffect, useRef, useState } from 'react';

export function useClipboard(resetDelayMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timerRef.current !== null) {
          window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
          setCopied(false);
        }, resetDelayMs);
      } catch {
        setCopied(false);
      }
    },
    [resetDelayMs],
  );

  return { copied, copy };
}
