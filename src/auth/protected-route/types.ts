import type { ReactNode } from 'react';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
};

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
};

type UseAuthState = () => AuthState;

export type { AuthState, ProtectedRouteProps, UseAuthState };
