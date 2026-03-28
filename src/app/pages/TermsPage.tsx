import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-accent rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Terms of Service</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: March 22, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using LocalDiscover, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Use of Service</h2>
            <p className="text-muted-foreground mb-4">
              LocalDiscover provides a platform to discover and connect with local
              merchants and services. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide accurate and complete information</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not interfere with or disrupt the service</li>
              <li>Not attempt to gain unauthorized access</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              When you create an account with us, you must provide accurate,
              complete, and current information. You are responsible for
              safeguarding the password and for all activities that occur under
              your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Merchant Information</h2>
            <p className="text-muted-foreground mb-4">
              We strive to provide accurate information about merchants and
              services. However, we do not guarantee the accuracy, completeness,
              or usefulness of this information and are not responsible for any
              errors or omissions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. User Content</h2>
            <p className="text-muted-foreground mb-4">
              By posting reviews, ratings, or other content on our platform, you
              grant us a non-exclusive, worldwide, royalty-free license to use,
              reproduce, modify, and display such content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              LocalDiscover shall not be liable for any indirect, incidental,
              special, consequential or punitive damages resulting from your use
              or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes via email or through the
              platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
            <p className="text-muted-foreground">
              For any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              Email: support@localdiscover.com
            </p>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
