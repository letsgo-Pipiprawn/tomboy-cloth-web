import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useCart, type ShippingMethod } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { AU_COMMERCE, VALIDATION_MODE } from '../data/site';

type CartSummaryProps = {
  onCheckout: () => void;
  checkoutLoading?: boolean;
  checkoutError?: string | null;
  compact?: boolean;
  showItems?: boolean;
};

export default function CartSummary({
  onCheckout,
  checkoutLoading = false,
  checkoutError = null,
  compact = false,
  showItems = true,
}: CartSummaryProps) {
  const {
    items,
    subtotalAud,
    shippingMethod,
    setShippingMethod,
    shippingAud,
    removeItem,
    updateQuantity,
  } = useCart();

  if (items.length === 0) return null;

  const gstNote = 'Prices include GST where applicable';

  return (
    <div className={compact ? 'space-y-4' : 'border border-brand-slate/20 p-6 md:p-8 space-y-6'}>
      {!compact && showItems && <h2 className="type-h3 text-brand-white">Order summary</h2>}

      {showItems && (
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4">
            <Link to={`/products/${item.slug}`} className="w-20 aspect-[3/4] bg-[#111] overflow-hidden shrink-0">
              <img src={item.image} alt="" className="w-full h-full object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link
                to={`/products/${item.slug}`}
                className="type-body text-brand-white hover:text-brand-light-slate line-clamp-2"
              >
                {item.name}
              </Link>
              <p className="type-caption text-brand-slate mt-1">Size {item.size}</p>
              <p className="type-caption text-brand-slate mt-2">{formatPrice(item.priceAud)}</p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-brand-slate hover:text-brand-white border border-brand-slate/30"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="type-caption w-4 text-center">{item.quantity}</span>
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
                  className="ml-auto type-caption text-brand-slate hover:text-brand-white uppercase tracking-widest"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      )}

      {!VALIDATION_MODE && (
      <fieldset className="space-y-3">
        <legend className="type-label text-brand-slate mb-2">Shipping (Australia)</legend>
        {(['standard', 'express'] as ShippingMethod[]).map((method) => {
          const cost =
            method === 'express'
              ? AU_COMMERCE.expressShippingAud
              : subtotalAud >= AU_COMMERCE.freeShippingThresholdAud
                ? 0
                : AU_COMMERCE.standardShippingAud;
          const label =
            method === 'express'
              ? `Express · ${formatPrice(AU_COMMERCE.expressShippingAud)} · 3–5 business days`
              : cost === 0
                ? 'Standard · Complimentary'
                : `Standard · ${formatPrice(AU_COMMERCE.standardShippingAud)} · ${AU_COMMERCE.standardDeliveryDays}`;

          return (
            <label
              key={method}
              className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                shippingMethod === method
                  ? 'border-brand-white/60 bg-brand-white/5'
                  : 'border-brand-slate/30 hover:border-brand-slate/50'
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value={method}
                checked={shippingMethod === method}
                onChange={() => setShippingMethod(method)}
                className="mt-1 accent-brand-white"
              />
              <span className="type-caption text-brand-light-slate">{label}</span>
            </label>
          );
        })}
      </fieldset>
      )}

      {VALIDATION_MODE && (
        <p className="type-caption text-brand-slate">
          Standard shipping (Australia) · {AU_COMMERCE.standardDeliveryDays}
          {shippingAud === 0
            ? ' · Complimentary on this order'
            : ` · ${formatPrice(AU_COMMERCE.standardShippingAud)}`}
        </p>
      )}

      <div className="space-y-3 border-t border-brand-slate/20 pt-4">
        <div className="flex justify-between type-body">
          <span className="text-brand-slate">Subtotal</span>
          <span className="text-brand-white">{formatPrice(subtotalAud)}</span>
        </div>
        <div className="flex justify-between type-body">
          <span className="text-brand-slate">Shipping</span>
          <span className="text-brand-white">
            {shippingAud === 0 ? 'Complimentary' : formatPrice(shippingAud)}
          </span>
        </div>
        <div className="flex justify-between type-body-lg pt-2">
          <span className="text-brand-white">Total</span>
          <span className="text-brand-white">{formatPrice(subtotalAud + shippingAud)}</span>
        </div>
        <p className="type-caption text-brand-slate">{gstNote}</p>
        {shippingMethod === 'standard' &&
          subtotalAud < AU_COMMERCE.freeShippingThresholdAud && (
            <p className="type-caption text-brand-light-slate">
              Add {formatPrice(AU_COMMERCE.freeShippingThresholdAud - subtotalAud)} for free standard
              shipping
            </p>
          )}
      </div>

      {checkoutError && (
        <p className="type-caption text-red-400/90 leading-relaxed" role="alert">
          {checkoutError}
        </p>
      )}

      <button
        type="button"
        disabled={checkoutLoading}
        onClick={onCheckout}
        className="w-full type-btn bg-brand-white text-brand-black py-4 hover:bg-brand-light-slate transition-colors disabled:opacity-60"
      >
        {checkoutLoading ? 'Loading…' : 'Checkout'}
      </button>
      <p className="type-caption text-center text-brand-slate uppercase tracking-widest">
        Secure checkout via Stripe · AUD
      </p>
    </div>
  );
}
