import { Link } from 'react-router';
import { ArrowLeft, FileText, Shield, HelpCircle, Mail, Info } from 'lucide-react';

export function MenuPage() {
  const menuItems = [
    { icon: Info, label: 'About Us', path: '/about' },
    { icon: FileText, label: 'Terms of Service', path: '/terms' },
    { icon: Shield, label: 'Privacy Policy', path: '/privacy' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
    { icon: Mail, label: 'Contact Us', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-lg">Menu</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-card rounded-xl border border-border divide-y divide-border overflow-hidden">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex items-center gap-3 px-4 py-4 hover:bg-accent transition-colors"
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
