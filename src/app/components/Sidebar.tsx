import { X, Home, Info, Shield, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { isAuthenticated, user } = useAuthStore();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: Info, label: 'About Us' },
    { path: '/privacy', icon: Shield, label: 'Privacy Policy' },
    { path: '/terms', icon: FileText, label: 'Terms of Service' },
    { path: '/contact', icon: Mail, label: 'Contact Us' },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <h2 className="text-xl font-bold text-sidebar-primary">LocalDiscover</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          {isAuthenticated && user && (
            <div className="p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sidebar-primary/10 flex items-center justify-center">
                  <span className="text-sidebar-primary font-semibold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-sidebar-foreground/60">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-sidebar-accent transition-colors"
                >
                  <Icon className="w-5 h-5 text-sidebar-foreground/60" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-sm text-sidebar-foreground/60 text-center">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
