import { Outlet, useLocation } from 'react-router';
import { BottomNav } from './BottomNav';

export function Layout() {
  const location = useLocation();
  
  // Hide bottom nav on certain pages
  const hideBottomNav = ['/login', '/signup', '/menu'].includes(location.pathname) ||
    location.pathname.startsWith('/merchant/');

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
