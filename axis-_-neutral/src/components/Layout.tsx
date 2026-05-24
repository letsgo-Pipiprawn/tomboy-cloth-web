import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import CartDrawer from './CartDrawer';
import { CartProvider } from '../context/CartContext';
import PageTransition from './PageTransition';

export default function Layout() {
  const location = useLocation();

  return (
    <CartProvider>
      <div className="bg-brand-black min-h-screen text-brand-white antialiased selection:bg-brand-white selection:text-brand-black">
        <AnnouncementBar />
        <Navbar />
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
