import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { AU_COMMERCE } from '../data/site';
import { createCheckoutSession } from '../lib/checkout';

export default function CartDrawer() {
  const { items, isOpen, closeCart, itemCount, subtotalAud, removeItem, updateQuantity } =
    useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const { url } = await createCheckoutSession(items);
      // Failsafe: if the browser navigation is blocked or takes too long, reset the button
      const resetTimer = setTimeout(() => {
        setCheckoutLoading(false);
        setCheckoutError('Redirect timed out — please try again.');
      }, 10_000);
      window.location.href = url;
      // If navigation succeeds the component unmounts and this never fires
      return () => clearTimeout(resetTimer);
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout unavailable');
      setCheckoutLoading(false);
    }
  }

  const shipping =
    subtotalAud >= AU_COMMERCE.freeShippingThresholdAud ? 0 : AU_COMMERCE.standardShippingAud;
  const gstNote = 'Prices include GST where applicable';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-black/70 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-brand-black border-l border-brand-slate/20 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-brand-slate/20">
              <h2 className="font-serif text-xl text-brand-white">
                Bag <span className="text-brand-slate">({itemCount})</span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close"
                className="text-brand-slate hover:text-brand-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <ShoppingBag className="w-10 h-10 text-brand-slate stroke-[1]" />
                  <p className="text-brand-slate text-sm">Your bag is empty.</p>
                  <Link
                    to="/collections/aw26"
                    onClick={closeCart}
                    className="text-xs uppercase tracking-widest border-b border-brand-slate pb-1 hover:text-brand-white transition-colors"
                  >
                    Shop AW26
                  </Link>
                </div>
              ) : (
                <ul className="space-y-8">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4"
                    >
                      <Link
                        to={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="w-24 aspect-[3/4] bg-[#111] overflow-hidden shrink-0"
                      >
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm text-brand-white hover:text-brand-light-slate transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-brand-slate mt-1 uppercase tracking-widest">
                          Size {item.size}
                        </p>
                        <p className="text-sm text-brand-slate mt-2">{formatPrice(item.priceAud)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-brand-slate hover:text-brand-white border border-brand-slate/30"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-brand-slate hover:text-brand-white border border-brand-slate/30"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-[10px] uppercase tracking-widest text-brand-slate hover:text-brand-white"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-brand-slate/20 px-6 py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-slate">Subtotal</span>
                  <span className="text-brand-white">{formatPrice(subtotalAud)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-slate">Shipping (AU)</span>
                  <span className="text-brand-white">
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>
                <p className="text-[10px] text-brand-slate leading-relaxed">{gstNote}</p>
                {subtotalAud < AU_COMMERCE.freeShippingThresholdAud && (
                  <p className="text-[10px] text-brand-light-slate">
                    Add {formatPrice(AU_COMMERCE.freeShippingThresholdAud - subtotalAud)} for free
                    AU shipping
                  </p>
                )}
                {checkoutError && (
                  <p className="text-[11px] text-red-400/90 leading-relaxed">{checkoutError}</p>
                )}
                <button
                  type="button"
                  disabled={checkoutLoading}
                  onClick={() => void handleCheckout()}
                  className="w-full bg-brand-white text-brand-black py-4 text-xs uppercase tracking-widest font-semibold hover:bg-brand-light-slate transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? 'Redirecting…' : 'Checkout'}
                </button>
                <p className="text-[10px] text-center text-brand-slate uppercase tracking-widest">
                  Secure checkout via Stripe · AUD
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
