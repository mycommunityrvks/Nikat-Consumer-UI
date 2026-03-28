// SEO utility functions for meta tags and structured data
// In a real Next.js app, this would use the Metadata API

interface PageMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function updatePageMeta(meta: PageMeta) {
  // Update document title
  document.title = `${meta.title} | LocalDiscover`;

  // Update or create meta tags
  updateMetaTag('description', meta.description);
  
  // Open Graph tags
  updateMetaTag('og:title', meta.title, 'property');
  updateMetaTag('og:description', meta.description, 'property');
  updateMetaTag('og:type', 'website', 'property');
  
  if (meta.image) {
    updateMetaTag('og:image', meta.image, 'property');
  }
  
  if (meta.url) {
    updateMetaTag('og:url', meta.url, 'property');
    updateMetaTag('canonical', meta.url, 'rel');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', meta.title, 'name');
  updateMetaTag('twitter:description', meta.description, 'name');
  
  if (meta.image) {
    updateMetaTag('twitter:image', meta.image, 'name');
  }
}

function updateMetaTag(key: string, content: string, attribute: string = 'name') {
  let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  
  element.content = content;
}

// Generate structured data for merchants
export function generateMerchantStructuredData(merchant: {
  name: string;
  description: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  image: string;
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: merchant.name,
    description: merchant.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: merchant.address,
    },
    telephone: merchant.phone,
    image: merchant.image,
    priceRange: merchant.priceRange,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: merchant.rating,
      reviewCount: merchant.reviewCount,
    },
  };
}

// Generate sitemap (in a real app, this would be generated server-side)
export function generateSitemap(merchants: Array<{ slug: string }>) {
  const baseUrl = 'https://localdiscover.com';
  
  const urls = [
    { loc: baseUrl, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/search`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/about`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${baseUrl}/privacy`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${baseUrl}/terms`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${baseUrl}/contact`, priority: '0.6', changefreq: 'monthly' },
  ];

  // Add merchant pages
  merchants.forEach((merchant) => {
    urls.push({
      loc: `${baseUrl}/merchant/${merchant.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    });
  });

  return urls;
}
