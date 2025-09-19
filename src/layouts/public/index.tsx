import { Outlet } from '@tanstack/react-router';
import { ThemeToggle } from '@/components/theme-toggle';
import PublicFooter from './public-footer';

function PublicLayout() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background text-foreground">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Outlet />
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
