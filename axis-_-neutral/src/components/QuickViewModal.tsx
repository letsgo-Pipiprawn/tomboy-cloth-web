import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { effectivePriceAud, ctaLabel, isPurchasable } from '../data/fulfillment';
import FulfillmentBadge from './FulfillmentBadge';

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    setSelectedSize(null);
    setSizeError(false);
  }, [product?.slug]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const displayPrice = effectivePriceAud(product.priceAud, product);
  const purchasable = isPurchasable(product.fulfillmentType);
  const soldOut = new Set(product.soldOutSizes ?? []);

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        aria-label="Close quick view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-brand-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view — ${product.name}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[61] w-auto md:w-full md:max-w-4xl bg-brand-black border border-brand-slate/25 shadow-2xl"
      >
        <div className="grid md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          <div className="aspect-[3/4] md:aspect-auto md:min-h-[420px] bg-[#111]">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : null}
          </div>
          <div className="p-6 md:p-8 relative">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-brand-slate hover:text-brand-white"
            >
              <X className="w-5 h-5" />
            </button>
            <FulfillmentBadge type={product.fulfillmentType} />
            <h2 className="type-h3 text-brand-white mt-4 mb-3 pr-8">{product.name}</h2>
            <p className="type-price text-brand-white mb-6">{formatPrice(displayPrice)}</p>

            {purchasable && product.fulfillmentType !== 'wishlist' && (
              <>
                <p className="type-label text-brand-slate mb-3">Size</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.sizes.map((size) => {
                    const unavailable = soldOut.has(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={unavailable}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`min-w-[3rem] px-3 py-2 type-caption border transition-colors ${
                          unavailable
                            ? 'border-brand-slate/20 text-brand-slate/40 line-through cursor-not-allowed'
                            : selectedSize === size
                              ? 'border-brand-white text-brand-white'
                              : 'border-brand-slate/40 text-brand-slate hover:border-brand-slate'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedSize) {
                      setSizeError(true);
                      return;
                    }
                    addItem({
                      slug: product.slug,
                      name: product.name,
                      priceAud: displayPrice,
                      image: product.image,
                      size: selectedSize,
                    });
                    onClose();
                  }}
                  className="w-full type-btn bg-brand-white text-brand-black py-4 hover:bg-brand-light-slate transition-colors mb-3"
                >
                  {ctaLabel(product.fulfillmentType)}
                </button>
                {sizeError && (
                  <p className="type-caption text-brand-light-slate mb-3">Select a size</p>
                )}
              </>
            )}

            <Link
              to={`/products/${product.slug}`}
              onClick={onClose}
              className="block text-center type-caption text-brand-slate hover:text-brand-white border-b border-brand-slate/30 pb-1 w-fit mx-auto"
            >
              View full details
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
