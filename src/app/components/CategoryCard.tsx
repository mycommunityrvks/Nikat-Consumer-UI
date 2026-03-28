import { Link } from 'react-router';
import * as Icons from 'lucide-react';
import { Category } from '../services/merchantService';
import { analytics } from '../utils/analytics';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = (Icons as any)[category.icon] || Icons.Store;

  const handleClick = () => {
    analytics.trackCategoryClick(category.slug, category.name);
  };

  return (
    <Link
      to={`/category/${category.slug}`}
      onClick={handleClick}
      className="flex flex-col items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all"
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="font-medium text-sm">{category.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {category.merchantCount} places
        </p>
      </div>
    </Link>
  );
}
