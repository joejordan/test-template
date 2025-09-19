function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-neutral-800">
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Welcome to the App
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              This page uses the AppLayout with the menu-style header.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-neutral-800">
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Navigation
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Use the header menu to navigate between routes.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-neutral-800">
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Responsive Design
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              The layout is fully responsive and works on all devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
