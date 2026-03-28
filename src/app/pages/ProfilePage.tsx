import { Link } from 'react-router';
import {
  User,
  Bookmark,
  MapPin,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MerchantCard } from '../components/MerchantCard';
import { EmptyState } from '../components/EmptyState';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { mockMerchants } from '../services/merchantService';

export function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { savedMerchants } = useAppStore();

  const savedMerchantsList = mockMerchants.filter((m) =>
    savedMerchants.includes(m.id)
  );

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        <Header showSearch={false} />
        <main className="max-w-md mx-auto px-4 py-6">
          <EmptyState
            icon={User}
            title="Not Signed In"
            description="Sign in to save your favorite places, view your bookmarks, and personalize your experience."
            action={{
              label: 'Sign In',
              onClick: () => (window.location.href = '/login'),
            }}
          />
          <div className="text-center mt-4">
            <Link to="/signup" className="text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const menuItems = [
    {
      icon: User,
      label: 'Edit Profile',
      path: '/profile/edit',
    },
    {
      icon: MapPin,
      label: 'Saved Addresses',
      path: '/profile/addresses',
    },
    {
      icon: Bell,
      label: 'Notifications',
      path: '/profile/notifications',
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      path: '/profile/payments',
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      path: '/help',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Header showSearch={false} />

      <main className="max-w-md mx-auto px-4 py-6">
        {/* User Info Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Link
            to="/profile/edit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        {/* Saved Merchants */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              Saved Places
            </h3>
            {savedMerchantsList.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {savedMerchantsList.length} saved
              </span>
            )}
          </div>

          {savedMerchantsList.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Bookmark className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">
                No saved places yet. Start bookmarking your favorites!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedMerchantsList.slice(0, 2).map((merchant) => (
                <MerchantCard key={merchant.id} merchant={merchant} />
              ))}
              {savedMerchantsList.length > 2 && (
                <Link
                  to="/profile/saved"
                  className="block text-center py-3 text-primary hover:underline"
                >
                  View all {savedMerchantsList.length} saved places
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Menu Items */}
        <section className="bg-card border border-border rounded-xl overflow-hidden mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-4 hover:bg-accent transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            );
          })}
        </section>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
