import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import ErrorBoundary from '@/components/error-boundary';
import HelmetHeader from '@/components/helmet-header';
import { ThemeProvider } from '@/contexts/theme-context';
import { router } from './routes';

// Create a QueryClient instance for Tanstack Query
const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <HelmetHeader />
            <RouterProvider router={router} />
          </HelmetProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
