import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { CategoryCard } from '../components/CategoryCard';
import { MerchantCard } from '../components/MerchantCard';
import { SkeletonCard, SkeletonCategoryCard } from '../components/SkeletonCard';
import { merchantService, Merchant, Category } from '../services/merchantService';
import { useLocation } from '../hooks/useLocation';
import { useAppStore } from '../store/appStore';
import { analytics } from '../utils/analytics';

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [nearbyMerchants, setNearbyMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const { requestLocation } = useLocation();
  const { location } = useAppStore();

  useEffect(() => {
    analytics.trackPageView('/');
    loadData();
    
    // Request location if not set
    if (!location) {
      requestLocation();
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriesData, merchantsData] = await Promise.all([
        merchantService.getCategories(),
        merchantService.getMerchants({ limit: 6 }),
      ]);
      setCategories(categoriesData);
      setNearbyMerchants(merchantsData);
    } finally {
      setLoading(false);
    }
  };

  const popularSearches = [
    'Pizza near me',
    'Coffee shops',
    'Gym membership',
    'Hair salon',
    'Grocery delivery',
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Header />

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Categories Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Browse Categories</h2>
            <Link
              to="/categories"
              className="text-primary text-sm flex items-center gap-1 hover:underline"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCategoryCard key={i} />
                ))
              : categories.slice(0, 6).map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
          </div>
        </section>

        {/* Nearby Merchants Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Nearby You</h2>
            <Link
              to="/search"
              className="text-primary text-sm flex items-center gap-1 hover:underline"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : nearbyMerchants.map((merchant) => (
                  <MerchantCard key={merchant.id} merchant={merchant} />
                ))}
          </div>
        </section>

        {/* Popular Searches Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Popular Searches</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <Link
                key={search}
                to={`/search?q=${encodeURIComponent(search)}`}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                {search}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
