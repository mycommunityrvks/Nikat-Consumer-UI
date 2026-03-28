import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { MerchantDetailPage } from './pages/MerchantDetailPage';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/category/:slug',
    Component: CategoryPage,
  },
  {
    path: '/merchant/:slug',
    Component: MerchantDetailPage,
  },
  {
    path: '/search',
    Component: SearchPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignupPage,
  },
  {
    path: '/profile',
    Component: ProfilePage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/privacy',
    Component: PrivacyPage,
  },
  {
    path: '/terms',
    Component: TermsPage,
  },
  {
    path: '/contact',
    Component: ContactPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
