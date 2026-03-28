// Analytics utility for tracking user events
// In production, this would integrate with Google Analytics, Mixpanel, etc.

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class AnalyticsService {
  private enabled: boolean = true;

  constructor() {
    // Check if analytics should be enabled
    this.enabled = !window.location.hostname.includes('localhost');
  }

  private log(event: AnalyticsEvent) {
    if (!this.enabled) {
      console.log('[Analytics]', event);
      return;
    }
    
    // In production, send to analytics service
    // Example: window.gtag?.('event', event.action, { ... });
  }

  trackPageView(path: string, title?: string) {
    this.log({
      category: 'Navigation',
      action: 'page_view',
      label: path,
    });
  }

  trackSearch(query: string) {
    this.log({
      category: 'Search',
      action: 'search',
      label: query,
    });
  }

  trackMerchantClick(merchantId: string, merchantName: string) {
    this.log({
      category: 'Merchant',
      action: 'click',
      label: `${merchantId}-${merchantName}`,
    });
  }

  trackCategoryClick(categorySlug: string, categoryName: string) {
    this.log({
      category: 'Category',
      action: 'click',
      label: `${categorySlug}-${categoryName}`,
    });
  }

  trackLogin(method: string) {
    this.log({
      category: 'Auth',
      action: 'login',
      label: method,
    });
  }

  trackSignup(method: string) {
    this.log({
      category: 'Auth',
      action: 'signup',
      label: method,
    });
  }

  trackCallClick(merchantId: string) {
    this.log({
      category: 'Engagement',
      action: 'call_click',
      label: merchantId,
    });
  }

  trackDirectionsClick(merchantId: string) {
    this.log({
      category: 'Engagement',
      action: 'directions_click',
      label: merchantId,
    });
  }

  trackShareClick(merchantId: string) {
    this.log({
      category: 'Engagement',
      action: 'share_click',
      label: merchantId,
    });
  }

  trackBookmarkToggle(merchantId: string, action: 'add' | 'remove') {
    this.log({
      category: 'Engagement',
      action: 'bookmark',
      label: `${action}-${merchantId}`,
    });
  }
}

export const analytics = new AnalyticsService();
