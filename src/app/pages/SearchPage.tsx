import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search as SearchIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MerchantCard } from '../components/MerchantCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { EmptyState } from '../components/EmptyState';
import { SearchBar } from '../components/SearchBar';
import { merchantService, Merchant } from '../services/merchantService';
import { analytics } from '../utils/analytics';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    analytics.trackPageView('/search');
  }, []);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const data = await merchantService.searchMerchants(query);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <Header showSearch={false} />

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <SearchBar autoFocus />
        </div>

        {query && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {loading
                ? 'Searching...'
                : `${results.length} results for "${query}"`}
            </p>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : query && results.length === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title="No results found"
            description={`We couldn't find any results for "${query}". Try searching with different keywords.`}
          />
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((merchant) => (
              <MerchantCard key={merchant.id} merchant={merchant} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={SearchIcon}
            title="Start searching"
            description="Search for restaurants, cafes, services, and more in your area."
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
}
