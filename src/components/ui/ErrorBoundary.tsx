import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { IS_DEV } from '@/lib/env';

interface ErrorBoundaryProps {
  readonly fallback: ReactNode;
  readonly children: ReactNode;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    if (IS_DEV) {
      console.error('Section ErrorBoundary caught an error:', error, info);
    }
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
