import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/search"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Popular Categories:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Restaurants', 'Cafes', 'Groceries', 'Healthcare', 'Fitness'].map(
              (category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
                >
                  {category}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
