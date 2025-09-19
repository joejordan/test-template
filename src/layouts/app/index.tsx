import { Outlet } from '@tanstack/react-router';
import AppFooter from './app-footer';
import AppHeader from './app-header';

function AppLayout() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background text-foreground">
      {/* App header */}
      <AppHeader />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* App footer */}
      <AppFooter />
    </div>
  );
}

export default AppLayout;
