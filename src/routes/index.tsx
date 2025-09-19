import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import ProtectedRoute from '@/auth/protected-route';
import AppLayout from '@/layouts/app';
import PublicLayout from '@/layouts/public';
import AboutPage from '@/pages/about';
import DashboardPage from '@/pages/app/dashboard';
import ErrorPage from '@/pages/error';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import NotFoundPage from '@/pages/not-found';
import PrivacyPolicyPage from '@/pages/privacy-policy';
import TermsOfServicePage from '@/pages/terms-of-service';

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  errorComponent: ({ error, reset }) => <ErrorPage error={error} reset={reset} />,
  notFoundComponent: () => <NotFoundPage />,
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
});

// Home route
const indexRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: HomePage,
});

// About route
const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: AboutPage,
});

// Terms of Service route
const termsOfServiceRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/terms-of-service',
  component: TermsOfServicePage,
});

// Privacy Policy route
const privacyPolicyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/login',
  component: LoginPage,
});

// App layout route - Protected with authentication
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: () => (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
});

// Dashboard route
const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/dashboard',
  component: DashboardPage,
});

// Route tree
const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    indexRoute,
    aboutRoute,
    termsOfServiceRoute,
    privacyPolicyRoute,
    loginRoute,
  ]),
  appLayoutRoute.addChildren([dashboardRoute]),
]);

// Create and export router
export const router = createRouter({ routeTree });

// Register router for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
