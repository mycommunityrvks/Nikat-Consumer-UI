import { Link } from 'react-router';
import { ChevronLeft, MapPin, Users, Heart, Sparkles } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-accent rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">About Us</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Discover Local, Live Local</h2>
          <p className="text-lg text-muted-foreground">
            LocalDiscover helps you find and connect with the best local
            businesses and services in your neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Hyperlocal Focus</h3>
            <p className="text-muted-foreground">
              We focus on connecting you with businesses right in your
              neighborhood, supporting local commerce and community.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
            <p className="text-muted-foreground">
              Real reviews and ratings from real customers help you make
              informed decisions about where to shop and dine.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Support Local</h3>
            <p className="text-muted-foreground">
              Every search, every visit, every review helps local businesses
              thrive and strengthens your community.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized</h3>
            <p className="text-muted-foreground">
              Get recommendations tailored to your preferences, location, and
              past interactions.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-muted-foreground mb-4">
            At LocalDiscover, we believe in the power of local communities. Our
            mission is to make it easier for people to discover, connect with,
            and support local businesses in their area.
          </p>
          <p className="text-muted-foreground">
            We're building more than just a discovery platform – we're creating
            connections that strengthen neighborhoods and help local businesses
            flourish in the digital age.
          </p>
        </section>

        <section className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
          <p className="text-muted-foreground mb-6">
            Start discovering amazing local businesses today and become part of
            a community that supports local commerce.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
