import { useEffect, useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { CircularProgress } from '@/components/ui/circular-progress';
import { useNasaApod } from '@/hooks/use-nasa-apod';

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [shouldThrowNetworkError, setShouldThrowNetworkError] = useState(false);
  const [shouldFetchApod, setShouldFetchApod] = useState(false);
  const router = useRouter();

  // TanStack Query demo
  const { data: apodData, isLoading, error, refetch } = useNasaApod(shouldFetchApod);

  const handleFetchApod = () => {
    if (shouldFetchApod) {
      void refetch();
    } else {
      setShouldFetchApod(true);
    }
  };

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Demo handlers for testing error boundaries
  const handleJavaScriptError = () => {
    setShouldThrowError(true);
  };

  const handleNotFoundError = () => {
    void router.navigate({ to: '/this-page-does-not-exist' as any });
  };

  const handleStateError = () => {
    // Set state to trigger error on next render
    // This simulates what happens when async errors get converted to sync errors during rendering
    setShouldThrowNetworkError(true);
  };

  // This will trigger the error boundary when shouldThrowError is true
  if (shouldThrowError) {
    throw new Error(
      'Demo JavaScript Error: This error was intentionally triggered to test the ErrorBoundary!',
    );
  }

  // This simulates a state error that gets caught by the error boundary
  // (e.g., when async operations fail and trigger errors during rendering)
  if (shouldThrowNetworkError) {
    throw new Error(
      'Demo State Error: This simulates a synchronous error that might occur when async operations fail and cause errors during component rendering!',
    );
  }

  return (
    <div
      className={`mx-auto my-8 mt-10 w-8/12 rounded border border-gray-200 p-4 text-center shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none transform transition-all duration-700 ease-out ${isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      <h1
        className={`mb-4 text-4xl font-bold transform transition-all duration-500 ease-out delay-200 ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
        }`}
      >
        Welcome
      </h1>
      <p
        className={`my-4 transform transition-all duration-500 ease-out delay-[400ms] ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
        }`}
      >
        <em className="text-lg">Minimal, fast, sensible defaults.</em>
      </p>
      <p
        className={`my-4 text-muted-foreground transform transition-all duration-500 ease-out delay-[600ms] ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
        }`}
      >
        Using Vite, React, TypeScript, Tailwind, and now Tanstack Router.
      </p>
      <div
        className={`mt-6 flex justify-center gap-4 transform transition-all duration-500 ease-out delay-[800ms] ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
        }`}
      >
        <Link
          to="/about"
          className="group relative overflow-hidden rounded bg-blue-500 px-6 py-3 text-white transition-all duration-300 ease-out hover:bg-blue-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-800"
        >
          <span className="relative z-10">Learn More</span>
          <div className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-left"></div>
        </Link>
        <Link
          to="/dashboard"
          className="group relative overflow-hidden rounded bg-green-500 px-6 py-3 text-white transition-all duration-300 ease-out hover:bg-green-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-offset-gray-800"
        >
          <span className="relative z-10">Go to Dashboard</span>
          <div className="absolute inset-0 scale-x-0 bg-gradient-to-r from-green-600 to-green-500 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-left"></div>
        </Link>
      </div>

      {/* TanStack Query Demo Section */}
      <div
        className={`mt-8 rounded border-2 border-dashed border-blue-400 bg-blue-50 p-6 dark:border-blue-500 dark:bg-blue-900/20 transform transition-[transform,opacity,background-color,border-color] duration-300 ease-out ${isVisible
          ? 'opacity-100 translate-y-0 duration-500'
          : 'opacity-0 translate-y-4 duration-500'
        }`}
      >
        <h2 className="mb-4 text-2xl font-bold text-blue-800 dark:text-blue-200">
          🚀 TanStack Query Demo
        </h2>
        <p className="mb-4 text-sm text-blue-700 dark:text-blue-300">
          Fetches NASA's Astronomy Picture of the Day using TanStack Query.
          Demonstrates loading states, error handling, caching, and refetching.
        </p>

        <div className="mb-4">
          <button
            type="button"
            onClick={handleFetchApod}
            disabled={isLoading}
            className="rounded bg-blue-500 px-6 py-3 text-white transition-all duration-200 hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-800"
          >
            {isLoading
              ? 'Loading...'
              : (shouldFetchApod ? '🔄 Refetch NASA APOD' : '🚀 Fetch NASA APOD')}
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <CircularProgress size={32} className="text-blue-500" />
            <span className="ml-3 text-blue-600 dark:text-blue-400">
              Fetching astronomy data...
            </span>
          </div>
        )}

        {error && (
          <div className="rounded border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-600 dark:bg-red-900/20 dark:text-red-400">
            <h3 className="font-semibold">❌ Error loading data</h3>
            <p className="mt-1 text-sm">{error.message}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Retry
            </button>
          </div>
        )}

        {apodData && !isLoading && !error && (
          <div className="rounded border border-blue-200 bg-white p-4 text-left dark:border-blue-700 dark:bg-gray-800">
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              {apodData.title}
            </h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              📅
              {' '}
              {apodData.date}
            </p>

            {apodData.media_type === 'image'
              ? (
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="mb-4 max-h-64 w-full rounded object-cover"
                    loading="lazy"
                  />
                )
              : (
                  <div className="mb-4 aspect-video rounded bg-gray-100 dark:bg-gray-700">
                    <iframe
                      src={apodData.url}
                      title={apodData.title}
                      className="h-full w-full rounded border-0"
                      sandbox="allow-scripts allow-presentation"
                      allow="encrypted-media"
                      allowFullScreen
                    />
                  </div>
                )}

            <p className="prose text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {apodData.explanation}
            </p>

            {apodData.hdurl && (
              <a
                href={apodData.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View HD Image →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Error Boundary Demo Section - Only show in development */}
      {import.meta.env.DEV && (
        <div
          className={`mt-8 rounded border-2 border-dashed border-yellow-400 bg-yellow-50 p-6 dark:border-yellow-500 dark:bg-yellow-900/20 transform transition-[transform,opacity,background-color,border-color] duration-300 ease-out ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-yellow-800 dark:text-yellow-200">
            ⚠️ Error Boundary Demo
          </h2>
          <p className="mb-4 text-sm text-yellow-700 dark:text-yellow-300">
            <strong>Development Only:</strong>
            {' '}
            These buttons intentionally trigger different types of errors
            to test our error boundary implementation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <button
                type="button"
                onClick={handleJavaScriptError}
                className="w-full rounded bg-red-500 px-4 py-3 text-white transition-all duration-200 hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                💥 JavaScript Error
              </button>
              <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                Tests React ErrorBoundary
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleNotFoundError}
                className="w-full rounded bg-orange-500 px-4 py-3 text-white transition-all duration-200 hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                🔍 404 Not Found
              </button>
              <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                Tests Router notFoundComponent
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleStateError}
                className="w-full rounded bg-purple-500 px-4 py-3 text-white transition-all duration-200 hover:bg-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                ⚡ State Error
              </button>
              <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                Simulates sync errors from async operations
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
