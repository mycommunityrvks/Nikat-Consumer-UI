import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import {
  ChevronLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Share2,
  Bookmark,
  Navigation,
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { merchantService, Merchant, Review, mockReviews } from '../services/merchantService';
import { useAppStore } from '../store/appStore';
import { analytics } from '../utils/analytics';

export function MerchantDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { savedMerchants, toggleSavedMerchant } = useAppStore();

  useEffect(() => {
    if (slug) {
      analytics.trackPageView(`/merchant/${slug}`);
      loadData();
    }
  }, [slug]);

  const loadData = async () => {
    setLoading(true);
    try {
      const merchantData = await merchantService.getMerchantBySlug(slug!);
      if (merchantData) {
        setMerchant(merchantData);
        const reviewsData = await merchantService.getReviews(merchantData.id);
        setReviews(reviewsData);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Merchant Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = savedMerchants.includes(merchant.id);
  const images = merchant.images || [merchant.image];

  const handleShare = () => {
    analytics.trackShareClick(merchant.id);
    if (navigator.share) {
      navigator.share({
        title: merchant.name,
        text: merchant.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleCall = () => {
    analytics.trackCallClick(merchant.id);
    window.location.href = `tel:${merchant.phone}`;
  };

  const handleDirections = () => {
    analytics.trackDirectionsClick(merchant.id);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        merchant.address
      )}`,
      '_blank'
    );
  };

  const handleBookmark = () => {
    toggleSavedMerchant(merchant.id);
    analytics.trackBookmarkToggle(merchant.id, isSaved ? 'remove' : 'add');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="flex-1 font-semibold truncate">{merchant.name}</h1>
          <button
            onClick={handleShare}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isSaved
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto">
        {/* Image Gallery */}
        <div className="relative h-64 bg-muted">
          <img
            src={images[currentImageIndex]}
            alt={merchant.name}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-6">
          {/* Header Info */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-bold flex-1">{merchant.name}</h2>
              {merchant.priceRange && (
                <span className="text-lg text-muted-foreground ml-2">
                  {merchant.priceRange}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{merchant.rating}</span>
                <span className="text-muted-foreground">
                  ({merchant.reviewCount} reviews)
                </span>
              </div>
              {merchant.distance && (
                <span className="text-muted-foreground">
                  {merchant.distance} km away
                </span>
              )}
            </div>

            <Link
              to={`/category/${merchant.categorySlug}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              {merchant.category}
            </Link>

            {merchant.openNow && (
              <div className="flex items-center gap-2 mt-3 text-green-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Open Now</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">{merchant.description}</p>
          </div>

          {/* Features */}
          {merchant.features && merchant.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {merchant.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hours */}
          {merchant.hours && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Hours</h3>
              <div className="space-y-2">
                {Object.entries(merchant.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{merchant.address}</span>
              </div>
              <a
                href={`tel:${merchant.phone}`}
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{merchant.phone}</span>
              </a>
              {merchant.email && (
                <a
                  href={`mailto:${merchant.email}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{merchant.email}</span>
                </a>
              )}
              {merchant.website && (
                <a
                  href={`https://${merchant.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{merchant.website}</span>
                </a>
              )}
            </div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{review.userName}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 sticky bottom-20 md:bottom-8 mt-8">
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Phone className="w-5 h-5" />
              <span>Call</span>
            </button>
            <button
              onClick={handleDirections}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Navigation className="w-5 h-5" />
              <span>Directions</span>
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
