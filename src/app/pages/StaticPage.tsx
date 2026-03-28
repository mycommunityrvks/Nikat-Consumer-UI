import { Link, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const content: Record<string, { title: string; content: string }> = {
  '/about': {
    title: 'About Us',
    content: `We are a hyperlocal discovery platform connecting users with nearby merchants and services. Our mission is to help people discover amazing local businesses in their neighborhood.

Founded in 2024, we've grown to serve thousands of users across multiple cities, helping them find everything from restaurants and groceries to healthcare and fitness centers.

Our platform makes it easy to explore, discover, and connect with local businesses that matter to you.`
  },
  '/terms': {
    title: 'Terms of Service',
    content: `Welcome to our platform. By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.

1. Use of Service
You agree to use this service only for lawful purposes and in accordance with these Terms.

2. User Accounts
You are responsible for maintaining the confidentiality of your account and password.

3. Content
All content provided on this platform is for informational purposes only.

4. Privacy
Your use of the service is also governed by our Privacy Policy.

5. Modifications
We reserve the right to modify these terms at any time.

Last updated: March 22, 2026`
  },
  '/privacy': {
    title: 'Privacy Policy',
    content: `Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.

Information We Collect:
- Account information (name, email, phone)
- Location data to show nearby merchants
- Usage data to improve our services

How We Use Your Information:
- To provide and maintain our service
- To personalize your experience
- To communicate with you
- To improve our platform

Data Security:
We implement appropriate security measures to protect your personal information.

Your Rights:
You have the right to access, update, or delete your personal information at any time.

Contact us if you have any questions about our privacy practices.

Last updated: March 22, 2026`
  },
  '/help': {
    title: 'Help & Support',
    content: `Need help? We're here for you!

Frequently Asked Questions:

Q: How do I search for merchants?
A: Use the search bar on the home screen or browse by category.

Q: How do I save my favorite places?
A: Click the heart icon on any merchant page to add it to your favorites.

Q: How accurate is the location data?
A: We use GPS and network data to provide accurate location information.

Q: Can I suggest a new merchant?
A: Yes! Contact us with merchant details and we'll review it for addition.

Still need help? Contact our support team.`
  },
  '/contact': {
    title: 'Contact Us',
    content: `Get in Touch

We'd love to hear from you! Whether you have questions, feedback, or need support, our team is here to help.

Email: support@localapp.com
Phone: +1 (555) 123-4567

Business Hours:
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed

Office Address:
123 Tech Street
San Francisco, CA 94105
United States

For business inquiries: business@localapp.com
For merchant partnerships: partners@localapp.com`
  }
};

export function StaticPage() {
  const location = useLocation();
  const page = content[location.pathname];

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/menu">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-lg">{page.title}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="prose prose-sm max-w-none">
          {page.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 text-foreground whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
