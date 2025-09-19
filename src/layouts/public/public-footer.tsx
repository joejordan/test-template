function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Links Section */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href="/privacy-policy"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Terms of Service
            </a>
            <a
              href="/about"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              About
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            ©
            {' '}
            {currentYear}
            {' '}
            Breeze React Template. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
