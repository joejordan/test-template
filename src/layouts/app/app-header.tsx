import { Link } from '@tanstack/react-router';
import { ThemeToggle } from '@/components/theme-toggle';

function AppHeader() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              App
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              activeProps={{
                className: 'text-blue-600 dark:text-blue-400',
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              activeProps={{
                className: 'text-blue-600 dark:text-blue-400',
              }}
            >
              About
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              activeProps={{
                className: 'text-blue-600 dark:text-blue-400',
              }}
            >
              Dashboard
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
