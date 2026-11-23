import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export function AppProviders({ children }: { readonly children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionConfig>
  );
}
