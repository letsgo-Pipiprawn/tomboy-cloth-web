import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/site';
import { useCart } from '../context/CartContext';

const MOBILE_EXTRA_LINKS = [{ label: 'Policies', href: '/policies' }] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const mobileLinks = [...NAV_LINKS, ...MOBILE_EXTRA_LINKS];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-50 flex items-center justify-between gap-3 px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1 md:flex-none">
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-brand-white hover:text-brand-slate transition-colors md:hidden shrink-0"
          >
            {menuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
          <div className="hidden md:flex gap-8 type-link text-brand-slate">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-brand-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 max-w-[52vw] sm:max-w-none px-1 pointer-events-none md:pointer-events-auto">
          <Link
            to="/"
            className="font-serif text-lg sm:text-2xl tracking-[0.12em] sm:tracking-widest text-brand-white block truncate text-center pointer-events-auto"
          >
            AXIS <span className="opacity-50">/</span> NEUTRAL
          </Link>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 shrink-0 flex-1 justify-end md:flex-none">
          <Link
            to="/contact"
            className="hidden sm:block type-link text-brand-slate hover:text-brand-white transition-colors"
          >
            Client Services
          </Link>
          <button
            type="button"
            aria-label="Bag"
            onClick={toggleCart}
            className="relative text-brand-white hover:text-brand-slate transition-colors"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-white text-brand-black text-[9px] font-semibold flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 z-40 bg-brand-black/70 backdrop-blur-sm md:hidden"
              style={{ top: 'var(--site-header-height, 5.5rem)' }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-[49] md:hidden flex flex-col bg-brand-black border-t border-brand-slate/20 overflow-y-auto overscroll-contain"
              style={{ top: 'var(--site-header-height, 5.5rem)' }}
            >
              <nav className="flex flex-col gap-1 px-6 py-10 type-link text-brand-slate">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="py-4 border-b border-brand-slate/15 hover:text-brand-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
