# LocalDiscover - Hyperlocal Discovery Platform

A modern, mobile-first web application for discovering and connecting with nearby merchants and services. Built with React, TypeScript, Tailwind CSS, and Zustand.

## Features

### Core Functionality
- **🔍 Smart Search**: Real-time search with autocomplete and debounced queries
- **📍 Location-Based**: Geolocation support with distance-based sorting
- **🏪 Merchant Discovery**: Browse merchants by category with detailed profiles
- **⭐ Reviews & Ratings**: View customer reviews and ratings
- **🔖 Bookmarks**: Save favorite merchants for quick access
- **🌓 Dark Mode**: Full dark mode support with seamless switching
- **📱 Mobile-First**: Optimized for mobile devices with responsive design

### Pages
- **Home Page**: Categories grid, nearby merchants, popular searches
- **Category Page**: Filtered merchant listings with sorting and filters
- **Merchant Detail**: Full merchant profile with images, contact, reviews
- **Search Page**: Advanced search with real-time results
- **Profile Page**: User profile, saved places, settings
- **Auth Pages**: Login and signup with social authentication
- **Static Pages**: About, Privacy Policy, Terms of Service, Contact

### Technical Features
- **State Management**: Zustand with persistence
- **API Integration**: Axios with interceptors and retry logic
- **Analytics**: Event tracking for user interactions
- **SEO Ready**: Meta tags, structured data, robots.txt
- **Performance**: Lazy loading, skeleton loaders, debounced search
- **Routing**: React Router with SEO-friendly URLs

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── BottomNav.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Header.tsx
│   │   ├── MerchantCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Sidebar.tsx
│   │   └── SkeletonCard.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useDebounce.ts
│   │   └── useLocation.ts
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── MerchantDetailPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── [static pages]
│   ├── services/            # API layer
│   │   ├── api.ts
│   │   └── merchantService.ts
│   ├── store/               # State management
│   │   ├── appStore.ts
│   │   └── authStore.ts
│   ├── utils/               # Utility functions
│   │   ├── analytics.ts
│   │   └── seo.ts
│   ├── routes.tsx           # Route configuration
│   └── App.tsx              # Main app component
├── styles/
│   ├── fonts.css            # Font imports
│   ├── theme.css            # Theme variables
│   └── index.css            # Main stylesheet
└── public/
    └── robots.txt           # SEO robots file
```

## Tech Stack

- **React 18.3.1** - UI library
- **TypeScript** - Type safety (in strict mode concepts)
- **Tailwind CSS 4.x** - Utility-first styling
- **React Router 7.x** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client with interceptors
- **Lucide React** - Icon library
- **Vite** - Build tool

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Key Components

### State Management

**Auth Store** (`authStore.ts`)
- User authentication state
- Login/logout functionality
- User profile management
- Persisted to localStorage

**App Store** (`appStore.ts`)
- Location management
- Saved merchants/bookmarks
- Dark mode toggle
- Persisted to localStorage

### API Service Layer

**API Client** (`api.ts`)
- Axios instance with interceptors
- Automatic token injection
- Request/response logging
- Retry logic for failed requests
- Error handling

**Merchant Service** (`merchantService.ts`)
- Mock data for demo
- Search functionality
- Category filtering
- Distance-based sorting
- Review management

### Analytics

Tracks user interactions:
- Page views
- Search queries
- Merchant clicks
- Category navigation
- Login/signup events
- Engagement actions (calls, directions, shares)

## Responsive Design

- **Mobile**: 375px width (primary target)
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

### Mobile-First Features
- Bottom navigation bar
- Sticky header with search
- Hamburger menu for static pages
- Touch-optimized interactions
- Responsive images

## SEO Optimization

### Meta Tags
- Dynamic page titles
- Open Graph tags
- Twitter Card support
- Canonical URLs

### Structured Data
- LocalBusiness schema
- Merchant information
- Ratings and reviews

### Performance
- Lazy loading images
- Code splitting
- Skeleton loaders
- Debounced search (300ms)

## Dark Mode

Supports system preference and manual toggle:
- Automatic detection of system theme
- Manual toggle in header
- Persistent preference
- Smooth transitions

## Authentication

Mock authentication system for demo:
- Email/password login
- Social login (Google)
- Protected routes
- Persistent sessions

## Future Enhancements

### Backend Integration
Replace mock data with real API endpoints:
```typescript
// Update API_BASE_URL in api.ts
const API_BASE_URL = process.env.VITE_API_BASE_URL;
```

### Real-time Features
- Live merchant availability
- Real-time notifications
- Chat support

### Advanced Features
- Map integration (Google Maps)
- Order/booking system
- Payment integration
- Push notifications

### Analytics Integration
Replace console logging with real analytics:
```typescript
// Example: Google Analytics
window.gtag?.('event', action, { ...params });
```

## Environment Variables

Create `.env` file:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_ANALYTICS_ID=your_analytics_id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is built as a demo application. Customize and use as needed.

## Support

For questions or support:
- Email: support@localdiscover.com
- Website: www.localdiscover.com

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
