import { Link } from '@tanstack/react-router';

function AboutPage() {
  return (
    <div className="mx-auto my-8 mt-10 w-8/12 rounded border border-gray-200 p-4 text-center shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none">
      <h1 className="mb-4 text-4xl">About</h1>
      <p className="my-4">
        This is a React application using Tanstack Router for navigation.
      </p>
      <p className="my-4">
        Built with modern tools and best practices for a great developer experience.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Link
          to="/"
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
