function AppFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 App. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/privacy-policy"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Privacy
            </a>
            <a
              href="/terms-of-service"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
