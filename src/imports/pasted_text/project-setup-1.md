Build a production-ready, mobile-first consumer web application for a hyperlocal discovery platform (connecting users with nearby merchants and services).

Tech Stack Requirements:

* Next.js (latest App Router) with React
* TypeScript (strict mode)
* Tailwind CSS
* SEO-first architecture using SSR/SSG
* This is a FRONTEND-ONLY project — all data must come from external REST APIs

Core Requirements:

1. Mobile-First UX:

* Design primarily for mobile devices
* Use bottom navigation (Home, Search, Profile)
* Hamburger menu on left for static pages
* Sticky header with search bar

2. SEO Optimization (CRITICAL):

* Use Next.js metadata API for dynamic meta tags
* Server-side rendering for:

  * Home page
  * Category pages
  * Search result pages
  * Merchant detail pages
* SEO-friendly URLs:

  * /category/[slug]
  * /merchant/[slug]
  * /[city]/[area]/[category]
* Generate sitemap.xml and robots.txt
* Use semantic HTML

3. Pages:

* Home Page

  * Nearby merchants
  * Categories grid
  * Popular searches
* Category Page

  * List merchants by category
* Search Results Page

  * Filters (category, distance, rating)
  * Sorting
* Merchant Detail Page

  * Images, description, contact info
  * Location map
  * Reviews (UI only)
* Login / Signup Page
* User Profile Page
* Static Pages (Privacy, Terms, Disclaimer)
* 404 page

4. API Integration Layer:

* Use a centralized API service layer
* Use Axios with interceptors
* Handle loading, error, retries
* All API URLs should come from environment variables

5. State Management:

* Use Zustand or React Context
* Manage:

  * Auth state
  * User profile
  * Saved merchants
  * Location

6. Event Tracking:

* Create analytics utility module
* Track:

  * Page views
  * Search queries
  * Merchant clicks
  * Category clicks
  * Login/signup events

7. Security Considerations:

* Do not expose sensitive API keys
* Use API proxy routes if needed
* Add basic bot protection headers
* Avoid exposing full datasets in frontend

8. Performance:

* Lazy load images/components
* Use Next.js Image optimization
* Skeleton loaders
* Debounced search

9. Reusability:

* Build reusable UI components
* Keep code structured for future React Native conversion

10. Additional Features:

* Location detection (with fallback)
* Search autocomplete
* Bookmark/favorite merchants
* Share merchant option
* Dark mode support

11. Project Structure:

* /app (pages)
* /components
* /services (API layer)
* /store (state)
* /hooks
* /utils
* /styles

Generate:

* Initial project structure
* Core reusable components
* API service layer (without backend implementation)
* Sample pages wired with mock API responses
