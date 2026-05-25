import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import CartDrawer from './CartDrawer';
import { CartProvider } from '../context/CartContext';
import PageTransition from './PageTransition';
import { useSiteHeaderHeight } from '../hooks/useSiteHeaderHeight';
import CustomCursor from './CustomCursor';

export default function Layout() {
  const location = useLocation();
  const headerRef = useSiteHeaderHeight<HTMLElement>();
  const isHome = location.pathname === '/';

  return (
    <CartProvider>
      <div className="bg-brand-black min-h-screen text-brand-white antialiased selection:bg-brand-white selection:text-brand-black">
        <CustomCursor />
        <header
          ref={headerRef}
          className={`fixed top-0 inset-x-0 z-50 flex flex-col pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
            isHome
              ? 'bg-transparent'
              : 'bg-brand-black/90 backdrop-blur-md supports-[backdrop-filter]:bg-brand-black/80'
          }`}
        >
          <AnnouncementBar overlayMode={isHome} />
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
      </div>
    </CartProvider>
  );
}
