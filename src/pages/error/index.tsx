import { useRouter } from '@tanstack/react-router';
import type { ErrorPageProps } from '@/components/error-boundary/types';

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  const handleGoHome = () => {
    void router.navigate({ to: '/' });
  };

  const handleGoBack = () => {
    globalThis.history.back();
  };

  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      globalThis.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an error while loading this page.
            Please try again or return to the home page.
          </p>
        </div>

        {import.meta.env.DEV && error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-left">
            <details className="text-sm">
              <summary className="font-medium text-destructive cursor-pointer mb-2">
                Error Details (Development Only)
              </summary>
              <div className="space-y-2 text-destructive">
                <div>
                  <strong>Error:</strong>
                  {' '}
                  {error.message}
                </div>
                {error.stack && (
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="whitespace-pre-wrap text-xs mt-1 overflow-auto">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
