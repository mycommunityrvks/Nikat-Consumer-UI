import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDebounce } from '../hooks/useDebounce';
import { merchantService, Merchant } from '../services/merchantService';
import { analytics } from '../utils/analytics';

interface SearchBarProps {
  onFocus?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ onFocus, autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Merchant[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      setLoading(true);
      merchantService
        .searchMerchants(debouncedQuery)
        .then((data) => {
          setResults(data);
          setShowResults(true);
        })
        .finally(() => setLoading(false));
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      analytics.trackSearch(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
      setQuery('');
    }
  };

  const handleResultClick = (merchant: Merchant) => {
    analytics.trackMerchantClick(merchant.id, merchant.name);
    navigate(`/merchant/${merchant.slug}`);
    setShowResults(false);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            onFocus?.();
            if (results.length > 0) setShowResults(true);
          }}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder="Search restaurants, cafes, services..."
          className="w-full pl-12 pr-12 py-3 bg-input-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
          {loading && (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          )}
          {!loading && results.length === 0 && query.trim().length > 1 && (
            <div className="p-4 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
          {!loading && results.length > 0 && (
            <div className="py-2">
              {results.map((merchant) => (
                <button
                  key={merchant.id}
                  onClick={() => handleResultClick(merchant)}
                  className="w-full px-4 py-3 hover:bg-accent text-left flex items-center gap-3"
                >
                  <img
                    src={merchant.image}
                    alt={merchant.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{merchant.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {merchant.category} • {merchant.area}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
