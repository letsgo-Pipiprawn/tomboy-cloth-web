import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/site';
import { useCart } from '../context/CartContext';

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-500 ${
        scrolled ? 'bg-brand-black/90 backdrop-blur-md py-4' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-6">
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-brand-white hover:text-brand-slate transition-colors md:hidden"
        >
          <Menu className="w-6 h-6 stroke-[1.5]" />
        </button>
        <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-medium text-brand-slate">
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

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link to="/" className="font-serif text-2xl tracking-widest text-brand-white">
          AXIS <span className="opacity-50">/</span> NEUTRAL
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          aria-label="Search"
          className="text-brand-white hover:text-brand-slate transition-colors hidden sm:block"
        >
          <Search className="w-5 h-5 stroke-[1.5]" />
        </button>
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

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-black/95 backdrop-blur-md border-t border-brand-slate/20 py-6 px-6 md:hidden flex flex-col gap-4 text-xs uppercase tracking-widest text-brand-slate">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href} className="hover:text-brand-white transition-colors">
              {link.label}
            </Link>
          ))}
          <Link to="/policies" className="hover:text-brand-white transition-colors">
            Policies
          </Link>
        </div>
      )}
    </motion.nav>
  );
}
