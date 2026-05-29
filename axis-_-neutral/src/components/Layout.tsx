import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import CookieConsent from './CookieConsent';
import { CartProvider } from '../context/CartContext';
import { SavedItemsProvider } from '../context/SavedItemsContext';
import PageTransition from './PageTransition';
import { useSiteHeaderHeight } from '../hooks/useSiteHeaderHeight';
import CustomCursor from './CustomCursor';

export default function Layout() {
  const location = useLocation();
  const headerRef = useSiteHeaderHeight<HTMLElement>();
  const isHome = location.pathname === '/';

  return (
    <CartProvider>
      <SavedItemsProvider>
        <div className="bg-brand-black min-h-screen text-brand-white antialiased overflow-x-clip selection:bg-brand-white selection:text-brand-black">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-white focus:text-brand-black focus:px-4 focus:py-2 type-caption"
          >
            Skip to content
          </a>
          <CustomCursor />
          <header
            ref={headerRef}
            className={`fixed top-0 inset-x-0 z-50 flex flex-col pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
              isHome
                ? 'bg-transparent'
                : 'bg-brand-black/90 backdrop-blur-md supports-[backdrop-filter]:bg-brand-black/80'
            }`}
          >
            <Navbar overlayMode={isHome} />
          </header>
          {!isHome && (
            <div
              className="shrink-0 pointer-events-none"
              style={{ height: 'var(--site-header-height, 5.5rem)' }}
              aria-hidden
            />
          )}
          <CartDrawer />
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
          <Footer />
          <CookieConsent />
        </div>
      </SavedItemsProvider>
    </CartProvider>
  );
}
