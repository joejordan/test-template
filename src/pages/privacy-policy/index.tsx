import { Link } from '@tanstack/react-router';

function PrivacyPolicyPage() {
  return (
    <div className="mx-auto my-8 mt-10 w-10/12 max-w-4xl rounded border border-gray-200 p-8 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none">
      <article className="prose prose-gray prose-lg max-w-none dark:prose-invert">
        <h1>Privacy Policy</h1>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account,
          use our services, or contact us for support.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services,
          process transactions, and communicate with you.
        </p>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to third parties
          without your consent, except as described in this policy.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information against
          unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us.
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

export default PrivacyPolicyPage;
