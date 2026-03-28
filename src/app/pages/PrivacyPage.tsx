import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-accent rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: March 22, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to LocalDiscover. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform you
              about how we look after your personal data when you visit our
              platform and tell you about your privacy rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Data We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We may collect, use, store and transfer different kinds of personal
              data about you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Identity Data: name, username or similar identifier</li>
              <li>Contact Data: email address and telephone numbers</li>
              <li>Location Data: current location and saved addresses</li>
              <li>Usage Data: information about how you use our platform</li>
              <li>Marketing Data: your preferences in receiving marketing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Data</h2>
            <p className="text-muted-foreground mb-4">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To provide and maintain our service</li>
              <li>To personalize your experience</li>
              <li>To send you relevant notifications and updates</li>
              <li>To improve our platform and services</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Your Legal Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              Email: privacy@localdiscover.com
            </p>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
