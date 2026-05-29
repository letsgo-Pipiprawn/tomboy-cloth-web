import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCatalog } from '../hooks/useCatalog';
import { formatPrice } from '../data/products';

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const { products } = useCatalog();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [products, query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-brand-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[var(--site-header-height,5.5rem)] inset-x-0 z-[66] border-b border-brand-slate/25 bg-brand-black/95 backdrop-blur-xl"
          >
            <div className="container-site py-6 md:py-8">
              <div className="flex items-center gap-4 border-b border-brand-slate/40 pb-4 mb-6">
                <Search className="w-5 h-5 text-brand-slate shrink-0" aria-hidden />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search objects, categories…"
                  aria-label="Search products"
                  className="flex-1 bg-transparent type-body-lg text-brand-white placeholder:text-brand-slate/70 outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="text-brand-slate hover:text-brand-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {results.length === 0 ? (
                <p className="type-body text-brand-slate">No matches. Try another term.</p>
              ) : (
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((product) => (
                    <li key={product.slug}>
                      <Link
                        to={`/products/${product.slug}`}
                        onClick={onClose}
                        className="flex gap-4 p-3 border border-brand-slate/20 hover:border-brand-slate/50 transition-colors group"
                      >
                        <div className="w-16 aspect-[3/4] bg-[#111] overflow-hidden shrink-0">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt=""
                              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0 py-1">
                          <p className="type-body text-brand-light-slate group-hover:text-brand-white transition-colors line-clamp-2">
                            {product.name}
                          </p>
                          <p className="type-caption text-brand-slate mt-1">{product.category}</p>
                          <p className="type-caption text-brand-slate mt-2">
                            {formatPrice(product.priceAud)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
