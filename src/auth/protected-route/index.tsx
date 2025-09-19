/* eslint-disable jsdoc/check-param-names */
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CircularProgress } from '@/components/ui/circular-progress';
import type { AuthState, ProtectedRouteProps, UseAuthState } from './types';

// Default fallback component
const DEFAULT_FALLBACK = (
  <CircularProgress size={32} className="flex justify-center items-center min-h-[200px]" />
);

/**
 * Hook to get authentication state
 *
 * STUB: Replace this with your authentication provider
 * Examples:
 * - Clerk: const { isSignedIn, isLoaded } = useAuth();
 * - Auth0: const { user, isLoading } = useUser();
 * - Firebase: const { user, loading } = useAuthState(auth);
 * - Custom: Your custom auth implementation
 */
const useAuthState: UseAuthState = (): AuthState => {
  // TODO: Replace with actual auth provider implementation
  // For now, return a mock state - customize based on your needs

  // Example for development/testing:
  // return {
  //   isAuthenticated: false,
  //   isLoading: false,
  // };

  // Example Clerk integration:
  // const { isSignedIn, isLoaded } = useAuth();
  // return {
  //   isAuthenticated: isSignedIn ?? false,
  //   isLoading: !isLoaded,
  // };

  // Example Auth0 integration:
  // const { user, isLoading } = useUser();
  // return {
  //   isAuthenticated: !!user,
  //   isLoading,
  // };

  // Mock state for development
  return {
    isAuthenticated: true, // Change to false to test redirect behavior
    isLoading: false,
  };
};

/**
 * ProtectedRoute Component
 *
 * Protects routes by checking authentication state and redirecting
 * unauthenticated users. Designed for route-level protection.
 *
 * @param children - The protected content to render
 * @param redirectTo - Where to redirect unauthenticated users (default: '/login')
 * @param fallback - Component to show while loading auth state
 */
function ProtectedRoute({
  children,
  redirectTo = '/login',
  fallback = DEFAULT_FALLBACK,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, error } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're not loading and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      void navigate({ to: redirectTo });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <>{fallback}</>;
  }

  // If there's an error, let the parent handle it by not rendering anything
  // This allows error boundaries or parent components to handle auth errors
  if (error) {
    return null;
  }

  // If not authenticated, don't render children (redirect will happen via useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}

export { useAuthState };
export type { AuthState, ProtectedRouteProps, UseAuthState } from './types';
export default ProtectedRoute;
