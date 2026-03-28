import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { MerchantCard } from '../components/MerchantCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { EmptyState } from '../components/EmptyState';
import { Store } from 'lucide-react';
import { merchantService, Merchant, mockCategories } from '../services/merchantService';
import { analytics } from '../utils/analytics';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [showFilters, setShowFilters] = useState(false);

  const category = mockCategories.find((c) => c.slug === slug);

  useEffect(() => {
    if (slug) {
      analytics.trackPageView(`/category/${slug}`);
      loadMerchants();
    }
  }, [slug]);

  const loadMerchants = async () => {
    setLoading(true);
    try {
      const data = await merchantService.getMerchants({ category: slug });
      setMerchants(data);
    } finally {
      setLoading(false);
    }
  };

  const sortedMerchants = [...merchants].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return (a.distance || 0) - (b.distance || 0);
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Link
              to="/"
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">{category.name}</h1>
              <p className="text-sm text-muted-foreground">
                {merchants.length} places found
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')}
              className="flex-1 px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-3 p-4 bg-card border border-border rounded-lg">
              <h3 className="font-medium mb-3">Filters</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Distance
                  </label>
                  <select className="w-full px-3 py-2 bg-input-background border border-input rounded-lg">
                    <option>Within 1 km</option>
                    <option>Within 2 km</option>
                    <option>Within 5 km</option>
                    <option>Any distance</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Rating
                  </label>
                  <select className="w-full px-3 py-2 bg-input-background border border-input rounded-lg">
                    <option>4.0+ stars</option>
                    <option>3.5+ stars</option>
                    <option>3.0+ stars</option>
                    <option>Any rating</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    {['₹', '₹₹', '₹₹₹', '₹₹₹₹'].map((price) => (
                      <button
                        key={price}
                        className="flex-1 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Reset
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Merchants List */}
      <main className="max-w-md mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedMerchants.length === 0 ? (
          <EmptyState
            icon={Store}
            title="No merchants found"
            description="We couldn't find any merchants in this category. Try adjusting your filters or check back later."
            action={{
              label: 'Browse All Categories',
              onClick: () => window.history.back(),
            }}
          />
        ) : (
          <div className="space-y-4">
            {sortedMerchants.map((merchant) => (
              <MerchantCard key={merchant.id} merchant={merchant} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
