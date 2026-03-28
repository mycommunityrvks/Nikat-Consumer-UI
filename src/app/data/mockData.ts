import { Merchant, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Restaurants', icon: 'UtensilsCrossed', count: 120 },
  { id: '2', name: 'Groceries', icon: 'ShoppingCart', count: 85 },
  { id: '3', name: 'Healthcare', icon: 'Heart', count: 45 },
  { id: '4', name: 'Salons', icon: 'Scissors', count: 67 },
  { id: '5', name: 'Fitness', icon: 'Dumbbell', count: 32 },
  { id: '6', name: 'Electronics', icon: 'Smartphone', count: 54 },
  { id: '7', name: 'Fashion', icon: 'Shirt', count: 98 },
  { id: '8', name: 'Home Services', icon: 'Home', count: 76 },
];

export const merchants: Merchant[] = [
  {
    id: '1',
    name: 'The Spice Kitchen',
    category: 'Restaurants',
    rating: 4.5,
    reviewCount: 234,
    distance: '0.5 km',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    address: '123 Main Street, Downtown',
    phone: '+1 234-567-8900',
    description: 'Authentic Indian cuisine with a modern twist. Fresh ingredients, traditional recipes, and warm hospitality.',
    isOpen: true,
    priceRange: '$$',
    tags: ['Indian', 'Vegetarian Options', 'Dine-in', 'Takeaway']
  },
  {
    id: '2',
    name: 'Fresh Mart Grocery',
    category: 'Groceries',
    rating: 4.2,
    reviewCount: 456,
    distance: '0.8 km',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    address: '456 Oak Avenue',
    phone: '+1 234-567-8901',
    description: 'Your neighborhood grocery store with fresh produce, organic options, and daily essentials.',
    isOpen: true,
    priceRange: '$',
    tags: ['Groceries', 'Organic', 'Fresh Produce', 'Home Delivery']
  },
  {
    id: '3',
    name: 'City Health Clinic',
    category: 'Healthcare',
    rating: 4.8,
    reviewCount: 189,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop',
    address: '789 Health Plaza',
    phone: '+1 234-567-8902',
    description: 'Comprehensive healthcare services with experienced doctors and modern facilities.',
    isOpen: true,
    priceRange: '$$$',
    tags: ['General Practice', 'Specialists', 'Lab Services', 'Emergency Care']
  },
  {
    id: '4',
    name: 'Glow Salon & Spa',
    category: 'Salons',
    rating: 4.6,
    reviewCount: 312,
    distance: '0.3 km',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    address: '321 Beauty Lane',
    phone: '+1 234-567-8903',
    description: 'Premium salon and spa services for hair, skin, and beauty treatments.',
    isOpen: false,
    priceRange: '$$',
    tags: ['Hair Styling', 'Spa', 'Manicure', 'Facial']
  },
  {
    id: '5',
    name: 'Power Fitness Studio',
    category: 'Fitness',
    rating: 4.7,
    reviewCount: 278,
    distance: '1.5 km',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    address: '555 Fitness Drive',
    phone: '+1 234-567-8904',
    description: 'State-of-the-art gym with personal trainers, group classes, and modern equipment.',
    isOpen: true,
    priceRange: '$$',
    tags: ['Gym', 'Personal Training', 'Yoga', 'Cardio']
  },
  {
    id: '6',
    name: 'Tech Hub Electronics',
    category: 'Electronics',
    rating: 4.4,
    reviewCount: 523,
    distance: '2.1 km',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    address: '888 Tech Boulevard',
    phone: '+1 234-567-8905',
    description: 'Latest gadgets, smartphones, laptops, and electronics accessories.',
    isOpen: true,
    priceRange: '$$$',
    tags: ['Smartphones', 'Laptops', 'Accessories', 'Warranty']
  },
  {
    id: '7',
    name: 'Milano Cafe',
    category: 'Restaurants',
    rating: 4.3,
    reviewCount: 198,
    distance: '0.7 km',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    address: '999 Coffee Street',
    phone: '+1 234-567-8906',
    description: 'Cozy cafe serving artisan coffee, fresh pastries, and light meals.',
    isOpen: true,
    priceRange: '$$',
    tags: ['Cafe', 'Coffee', 'Breakfast', 'Wi-Fi']
  },
  {
    id: '8',
    name: 'Urban Style Boutique',
    category: 'Fashion',
    rating: 4.5,
    reviewCount: 267,
    distance: '1.0 km',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    address: '777 Fashion Avenue',
    phone: '+1 234-567-8907',
    description: 'Trendy clothing and accessories for men and women.',
    isOpen: true,
    priceRange: '$$',
    tags: ['Clothing', 'Accessories', 'Trendy', 'Sale']
  }
];

export const reviews = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely amazing! The food was delicious and service was exceptional.',
    date: '2 days ago'
  },
  {
    id: '2',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great experience overall. Highly recommend for authentic cuisine.',
    date: '1 week ago'
  },
  {
    id: '3',
    userName: 'Emily Rodriguez',
    rating: 5,
    comment: 'Best place in town! Will definitely come back.',
    date: '2 weeks ago'
  }
];
