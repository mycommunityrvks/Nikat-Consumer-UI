import { Star, MapPin, Clock, Bookmark } from 'lucide-react';
import { Link } from 'react-router';
import { Merchant } from '../services/merchantService';
import { useAppStore } from '../store/appStore';
import { analytics } from '../utils/analytics';

interface MerchantCardProps {
  merchant: Merchant;
}

export function MerchantCard({ merchant }: MerchantCardProps) {
  const { savedMerchants, toggleSavedMerchant } = useAppStore();
  const isSaved = savedMerchants.includes(merchant.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedMerchant(merchant.id);
    analytics.trackBookmarkToggle(merchant.id, isSaved ? 'remove' : 'add');
  };

  const handleClick = () => {
    analytics.trackMerchantClick(merchant.id, merchant.name);
  };

  return (
    <Link
      to={`/merchant/${merchant.slug}`}
      onClick={handleClick}
      className="block bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={merchant.image}
          alt={merchant.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={handleBookmark}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
            isSaved
              ? 'bg-primary text-primary-foreground'
              : 'bg-white/80 text-foreground hover:bg-white'
          }`}
          aria-label={isSaved ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
        {merchant.openNow && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-green-500 text-white rounded-full text-sm flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Open Now</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-1">{merchant.name}</h3>
          {merchant.priceRange && (
            <span className="text-muted-foreground text-sm">{merchant.priceRange}</span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {merchant.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{merchant.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({merchant.reviewCount})
              </span>
            </div>
            
            {merchant.distance && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{merchant.distance} km</span>
              </div>
            )}
          </div>
        </div>
        
        {merchant.features && merchant.features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {merchant.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
