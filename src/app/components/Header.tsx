import { Menu, MapPin, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useAppStore } from '../store/appStore';
import { SearchBar } from './SearchBar';
import { Sidebar } from './Sidebar';

interface HeaderProps {
  showSearch?: boolean;
}

export function Header({ showSearch = true }: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { location, darkMode, toggleDarkMode } = useAppStore();

  return (
    <>
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-30">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link to="/" className="flex-1">
              <h1 className="text-xl font-bold text-primary">LocalDiscover</h1>
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {location && (
            <Link
              to="/location"
              className="flex items-center gap-2 mb-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>
                {location.area}, {location.city}
              </span>
            </Link>
          )}

          {showSearch && <SearchBar />}
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
