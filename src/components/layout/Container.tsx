import type { ReactNode } from 'react';

interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
