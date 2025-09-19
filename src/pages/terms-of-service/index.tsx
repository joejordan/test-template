import { Link } from '@tanstack/react-router';

function TermsOfServicePage() {
  return (
    <div className="mx-auto my-8 mt-10 w-10/12 max-w-4xl rounded border border-gray-200 p-8 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none">
      <article className="prose prose-gray prose-lg max-w-none dark:prose-invert">
        <h1>Terms of Service</h1>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this application, you accept and agree to be bound by the terms
          and provision of this agreement.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials on this
          application for personal, non-commercial transitory viewing only.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on this application are provided on an 'as is' basis. We make no
          warranties, expressed or implied, and hereby disclaim and negate all other warranties
          including without limitation, implied warranties or conditions of merchantability.
        </p>

        <h2>4. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us.
        </p>
      </article>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default TermsOfServicePage;
