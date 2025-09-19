import type { ReactNode } from 'react';

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack: string } | null;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: { componentStack: string }) => ReactNode;
};

export type ErrorPageProps = {
  error?: Error;
  reset?: () => void;
};
