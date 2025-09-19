import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: keyof LoginForm) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for authentication logic
    console.log('Login attempt:', form);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm transform transition-all duration-700 ease-out ${isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-2xl font-semibold text-foreground transform transition-all duration-500 ease-out delay-200 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }`}
          >
            Welcome back
          </h1>
          <p
            className={`mt-2 text-sm text-muted-foreground transform transition-all duration-500 ease-out delay-[400ms] ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }`}
          >
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div
          className={`bg-card border border-border rounded-lg p-8 shadow-sm transform transition-all duration-500 ease-out delay-[600ms] ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange('email')}
                  placeholder="name@example.com"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleInputChange('password')}
                  placeholder="Enter your password"
                  className="h-11"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-8 text-center transform transition-all duration-500 ease-out delay-[800ms] ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-muted-foreground">
            Don't have an account?
            {' '}
            <Link
              to="/"
              className="font-medium text-foreground hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Back link */}
        <div
          className={`mt-6 text-center transform transition-all duration-500 ease-out delay-[1000ms] ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
