import { apiCall } from './api';

export interface Merchant {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  description: string;
  address: string;
  city: string;
  area: string;
  phone: string;
  email?: string;
  website?: string;
  distance?: number;
  openNow: boolean;
  hours?: {
    [key: string]: string;
  };
  priceRange?: string;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  merchantCount: number;
}

export interface Review {
  id: string;
  merchantId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

// Mock data for demo purposes
export const mockCategories: Category[] = [
  { id: '1', name: 'Restaurants', slug: 'restaurants', icon: 'UtensilsCrossed', merchantCount: 245 },
  { id: '2', name: 'Cafes', slug: 'cafes', icon: 'Coffee', merchantCount: 187 },
  { id: '3', name: 'Groceries', slug: 'groceries', icon: 'ShoppingBasket', merchantCount: 132 },
  { id: '4', name: 'Healthcare', slug: 'healthcare', icon: 'Heart', merchantCount: 98 },
  { id: '5', name: 'Fitness', slug: 'fitness', icon: 'Dumbbell', merchantCount: 76 },
  { id: '6', name: 'Salons', slug: 'salons', icon: 'Scissors', merchantCount: 154 },
  { id: '7', name: 'Services', slug: 'services', icon: 'Wrench', merchantCount: 203 },
  { id: '8', name: 'Education', slug: 'education', icon: 'GraduationCap', merchantCount: 89 },
];

export const mockMerchants: Merchant[] = [
  {
    id: '1',
    name: 'The Sunset Grill',
    slug: 'the-sunset-grill',
    category: 'Restaurants',
    categorySlug: 'restaurants',
    rating: 4.5,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
    ],
    description: 'Contemporary American cuisine with stunning sunset views. Our chef-crafted menu features locally sourced ingredients and seasonal specialties.',
    address: '123 Beach Road, Coastal Area',
    city: 'Mumbai',
    area: 'Bandra West',
    phone: '+91 98765 43210',
    email: 'info@sunsetgrill.com',
    website: 'www.sunsetgrill.com',
    distance: 1.2,
    openNow: true,
    hours: {
      'Monday-Friday': '11:00 AM - 11:00 PM',
      'Saturday-Sunday': '10:00 AM - 12:00 AM',
    },
    priceRange: '₹₹₹',
    features: ['Outdoor Seating', 'Valet Parking', 'Live Music', 'Pet Friendly'],
  },
  {
    id: '2',
    name: 'Bean There Coffee',
    slug: 'bean-there-coffee',
    category: 'Cafes',
    categorySlug: 'cafes',
    rating: 4.8,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    ],
    description: 'Artisanal coffee roasted in-house. Cozy atmosphere perfect for work or catching up with friends.',
    address: '456 Link Road, Central District',
    city: 'Mumbai',
    area: 'Bandra West',
    phone: '+91 98765 43211',
    distance: 0.8,
    openNow: true,
    hours: {
      'Monday-Sunday': '7:00 AM - 10:00 PM',
    },
    priceRange: '₹₹',
    features: ['WiFi', 'Outdoor Seating', 'Pet Friendly', 'Vegan Options'],
  },
  {
    id: '3',
    name: 'Fresh Harvest Market',
    slug: 'fresh-harvest-market',
    category: 'Groceries',
    categorySlug: 'groceries',
    rating: 4.3,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800',
    ],
    description: 'Your neighborhood organic grocery store with fresh produce and pantry essentials.',
    address: '789 Hill Road',
    city: 'Mumbai',
    area: 'Bandra West',
    phone: '+91 98765 43212',
    distance: 1.5,
    openNow: true,
    hours: {
      'Monday-Sunday': '8:00 AM - 10:00 PM',
    },
    priceRange: '₹₹',
    features: ['Home Delivery', 'Organic Products', 'Parking Available'],
  },
  {
    id: '4',
    name: 'Wellness Health Clinic',
    slug: 'wellness-health-clinic',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    rating: 4.7,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    ],
    description: 'Comprehensive healthcare services with experienced doctors and modern facilities.',
    address: '321 Carter Road',
    city: 'Mumbai',
    area: 'Bandra West',
    phone: '+91 98765 43213',
    distance: 2.1,
    openNow: true,
    hours: {
      'Monday-Saturday': '9:00 AM - 8:00 PM',
      'Sunday': '10:00 AM - 4:00 PM',
    },
    priceRange: '₹₹₹',
    features: ['Emergency Services', 'Insurance Accepted', 'Parking Available'],
  },
  {
    id: '5',
    name: 'FitZone Gym',
    slug: 'fitzone-gym',
    category: 'Fitness',
    categorySlug: 'fitness',
    rating: 4.6,
    reviewCount: 428,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    ],
    description: 'State-of-the-art fitness center with personal trainers and group classes.',
    address: '555 Linking Road',
    city: 'Mumbai',
    area: 'Bandra West',
    phone: '+91 98765 43214',
    distance: 0.6,
    openNow: true,
    hours: {
      'Monday-Sunday': '5:00 AM - 11:00 PM',
    },
    priceRange: '₹₹',
    features: ['Personal Training', 'Group Classes', 'Sauna', 'Parking'],
  },
  {
    id: '6',
    name: 'Style Studio',
    slug: 'style-studio',
    category: 'Salons',
    categorySlug: 'salons',
    rating: 4.4,
    reviewCount: 276,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    ],
    description: 'Premium salon services including hair, makeup, and spa treatments.',
    address: '678 Turner Road',
    city: 'Mumbai',
    area: 'Bandra West',
    phone: '+91 98765 43215',
    distance: 1.8,
    openNow: true,
    hours: {
      'Monday-Sunday': '10:00 AM - 9:00 PM',
    },
    priceRange: '₹₹₹',
    features: ['Appointments Available', 'Bridal Services', 'Spa'],
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    merchantId: '1',
    userName: 'Priya Sharma',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment: 'Amazing food and fantastic ambiance! The sunset view is breathtaking.',
    date: '2026-03-15',
  },
  {
    id: '2',
    merchantId: '1',
    userName: 'Rahul Verma',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    comment: 'Great service but slightly expensive. Worth it for special occasions.',
    date: '2026-03-10',
  },
  {
    id: '3',
    merchantId: '1',
    userName: 'Ananya Iyer',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    comment: 'My favorite restaurant in the area. The seafood is exceptional!',
    date: '2026-03-05',
  },
];

// API Service functions (using mock data for demo)
export const merchantService = {
  async getMerchants(params?: {
    category?: string;
    city?: string;
    area?: string;
    search?: string;
    limit?: number;
  }): Promise<Merchant[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    let filtered = [...mockMerchants];
    
    if (params?.category) {
      filtered = filtered.filter((m) => m.categorySlug === params.category);
    }
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(search) ||
          m.category.toLowerCase().includes(search) ||
          m.description.toLowerCase().includes(search)
      );
    }
    
    if (params?.limit) {
      filtered = filtered.slice(0, params.limit);
    }
    
    return filtered;
  },

  async getMerchantBySlug(slug: string): Promise<Merchant | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockMerchants.find((m) => m.slug === slug) || null;
  },

  async getCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCategories;
  },

  async getReviews(merchantId: string): Promise<Review[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockReviews.filter((r) => r.merchantId === merchantId);
  },

  async searchMerchants(query: string): Promise<Merchant[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const search = query.toLowerCase();
    return mockMerchants.filter(
      (m) =>
        m.name.toLowerCase().includes(search) ||
        m.category.toLowerCase().includes(search) ||
        m.description.toLowerCase().includes(search) ||
        m.area.toLowerCase().includes(search)
    );
  },
};
