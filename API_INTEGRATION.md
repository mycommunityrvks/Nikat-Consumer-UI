# API Integration Guide

This document provides guidance on integrating LocalDiscover with a real backend API.

## Current State

The application currently uses **mock data** defined in `/src/app/services/merchantService.ts`. All API calls simulate network delay and return static data.

## Backend Requirements

Your backend should provide the following REST API endpoints:

### Authentication

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
```

### Merchants

```
GET    /api/merchants                    # List merchants with filters
GET    /api/merchants/:slug              # Get merchant by slug
POST   /api/merchants/:id/bookmark       # Toggle bookmark
GET    /api/merchants/:id/reviews        # Get reviews
POST   /api/merchants/:id/reviews        # Add review
GET    /api/merchants/search?q=query     # Search merchants
```

### Categories

```
GET    /api/categories                   # List all categories
GET    /api/categories/:slug             # Get category details
GET    /api/categories/:slug/merchants   # List merchants in category
```

### User

```
GET    /api/user/profile                 # Get user profile
PUT    /api/user/profile                 # Update profile
GET    /api/user/bookmarks               # Get bookmarked merchants
GET    /api/user/addresses               # Get saved addresses
```

### Location

```
POST   /api/location/reverse-geocode     # Convert lat/lng to address
GET    /api/location/nearby              # Get nearby merchants
```

## Integration Steps

### 1. Update API Configuration

Edit `/src/app/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com';
```

### 2. Replace Mock Service Functions

Update `/src/app/services/merchantService.ts`:

```typescript
export const merchantService = {
  async getMerchants(params?: {
    category?: string;
    city?: string;
    area?: string;
    search?: string;
    limit?: number;
  }): Promise<Merchant[]> {
    return apiCall({
      method: 'GET',
      url: '/api/merchants',
      params,
    });
  },

  async getMerchantBySlug(slug: string): Promise<Merchant | null> {
    try {
      return await apiCall({
        method: 'GET',
        url: `/api/merchants/${slug}`,
      });
    } catch (error) {
      return null;
    }
  },

  async getCategories(): Promise<Category[]> {
    return apiCall({
      method: 'GET',
      url: '/api/categories',
    });
  },

  async getReviews(merchantId: string): Promise<Review[]> {
    return apiCall({
      method: 'GET',
      url: `/api/merchants/${merchantId}/reviews`,
    });
  },

  async searchMerchants(query: string): Promise<Merchant[]> {
    return apiCall({
      method: 'GET',
      url: '/api/merchants/search',
      params: { q: query },
    });
  },
};
```

### 3. Update Authentication

Edit `/src/app/store/authStore.ts`:

```typescript
import { apiClient } from '../services/api';

interface AuthState {
  // ... existing state
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        const response = await apiClient.post('/api/auth/login', {
          email,
          password,
        });
        
        const { user, token } = response.data;
        localStorage.setItem('auth-token', token);
        set({ user, isAuthenticated: true });
      },

      signup: async (data) => {
        const response = await apiClient.post('/api/auth/register', data);
        const { user, token } = response.data;
        localStorage.setItem('auth-token', token);
        set({ user, isAuthenticated: true });
      },

      logout: async () => {
        await apiClient.post('/api/auth/logout');
        localStorage.removeItem('auth-token');
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);
```

### 4. Update Location Service

Create `/src/app/services/locationService.ts`:

```typescript
import { apiCall } from './api';

export interface Location {
  city: string;
  area: string;
  lat: number;
  lng: number;
}

export const locationService = {
  async reverseGeocode(lat: number, lng: number): Promise<Location> {
    return apiCall({
      method: 'POST',
      url: '/api/location/reverse-geocode',
      data: { lat, lng },
    });
  },

  async getNearbyMerchants(lat: number, lng: number, radius: number = 5) {
    return apiCall({
      method: 'GET',
      url: '/api/location/nearby',
      params: { lat, lng, radius },
    });
  },
};
```

Then update `/src/app/hooks/useLocation.ts`:

```typescript
import { locationService } from '../services/locationService';

export function useLocation() {
  const { setLocation } = useAppStore();
  
  const requestLocation = async () => {
    setLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>(...);
      const location = await locationService.reverseGeocode(
        position.coords.latitude,
        position.coords.longitude
      );
      setLocation(location);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  
  return { requestLocation, loading, error };
}
```

## Expected Response Formats

### Merchant Object

```json
{
  "id": "uuid-string",
  "name": "The Sunset Grill",
  "slug": "the-sunset-grill",
  "category": "Restaurants",
  "categorySlug": "restaurants",
  "rating": 4.5,
  "reviewCount": 234,
  "image": "https://cdn.example.com/images/merchant.jpg",
  "images": ["url1", "url2"],
  "description": "Contemporary American cuisine...",
  "address": "123 Beach Road, Coastal Area",
  "city": "Mumbai",
  "area": "Bandra West",
  "phone": "+91 98765 43210",
  "email": "info@sunsetgrill.com",
  "website": "www.sunsetgrill.com",
  "distance": 1.2,
  "openNow": true,
  "hours": {
    "Monday-Friday": "11:00 AM - 11:00 PM",
    "Saturday-Sunday": "10:00 AM - 12:00 AM"
  },
  "priceRange": "₹₹₹",
  "features": ["Outdoor Seating", "Valet Parking"]
}
```

### Category Object

```json
{
  "id": "uuid-string",
  "name": "Restaurants",
  "slug": "restaurants",
  "icon": "UtensilsCrossed",
  "merchantCount": 245
}
```

### Review Object

```json
{
  "id": "uuid-string",
  "merchantId": "uuid-string",
  "userName": "Priya Sharma",
  "userAvatar": "https://cdn.example.com/avatars/user.jpg",
  "rating": 5,
  "comment": "Amazing food and fantastic ambiance!",
  "date": "2026-03-15T10:30:00Z",
  "images": ["url1", "url2"]
}
```

### User Object

```json
{
  "id": "uuid-string",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "avatar": "https://cdn.example.com/avatars/user.jpg"
}
```

## Error Handling

The API client includes built-in error handling. Ensure your backend returns errors in this format:

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "statusCode": 401
  }
}
```

## Authentication Flow

1. User submits login credentials
2. Backend validates and returns JWT token
3. Token stored in localStorage
4. Token automatically added to all subsequent requests via interceptor
5. On 401 response, token refresh is attempted
6. On logout, token is removed from storage

## Rate Limiting

Implement rate limiting on your backend:
- Search endpoints: 10 requests/minute
- Authentication: 5 requests/minute
- General API: 100 requests/minute

## CORS Configuration

Ensure your backend allows requests from your frontend domain:

```javascript
// Express.js example
app.use(cors({
  origin: ['https://localdiscover.com', 'http://localhost:5173'],
  credentials: true,
}));
```

## Image Uploads

For merchant images and user avatars, implement a file upload endpoint:

```
POST /api/upload
Content-Type: multipart/form-data

Returns:
{
  "url": "https://cdn.example.com/uploads/image.jpg"
}
```

## WebSocket Support (Optional)

For real-time features like notifications:

```javascript
// Client-side
const ws = new WebSocket('wss://api.localdiscover.com/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle real-time updates
};
```

## Testing

Use the mock data for development and testing:

```typescript
// Toggle between mock and real API
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const merchantService = {
  getMerchants: USE_MOCK_API ? getMerchantsMock : getMerchantsReal,
  // ...
};
```

## Security Best Practices

1. **Never expose API keys** in frontend code
2. **Use environment variables** for configuration
3. **Implement HTTPS** for all API calls
4. **Validate tokens** on every request
5. **Sanitize user input** before sending to API
6. **Use CORS** properly
7. **Implement rate limiting**
8. **Log security events**

## Analytics Integration

Track API performance:

```typescript
apiClient.interceptors.response.use(
  (response) => {
    // Track successful API calls
    analytics.trackApiCall({
      endpoint: response.config.url,
      duration: response.config.metadata.endTime - response.config.metadata.startTime,
      status: response.status,
    });
    return response;
  },
  (error) => {
    // Track failed API calls
    analytics.trackApiError({
      endpoint: error.config.url,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  }
);
```

## Monitoring

Implement monitoring for:
- API response times
- Error rates
- Authentication failures
- Search performance
- Popular queries
- User engagement metrics

## Support

For integration support, contact: dev@localdiscover.com
