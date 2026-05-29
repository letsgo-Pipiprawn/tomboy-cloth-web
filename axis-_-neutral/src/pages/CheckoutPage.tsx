import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import SeoHead from '../components/SeoHead';
import PageHero from '../components/PageHero';
import { useCart } from '../context/CartContext';
import { createCheckoutSession } from '../lib/checkout';
import { getStripePromise, getStripePublishableKey } from '../lib/stripe';
import { trackBeginCheckout } from '../lib/analytics';
import { BRAND } from '../data/site';

export default function CheckoutPage() {
  const { items, itemCount, subtotalAud, shippingAud, shippingMethod } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const publishableKey = getStripePublishableKey();

  useEffect(() => {
    if (items.length === 0) return;

    let cancelled = false;

    async function initCheckout() {
      setError(null);
      try {
        trackBeginCheckout({ valueAud: subtotalAud + shippingAud, itemCount });
        const session = await createCheckoutSession(items, shippingMethod);
        if (!cancelled) {
          setClientSecret(session.clientSecret);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Checkout unavailable');
        }
      }
    }

    void initCheckout();
    return () => {
      cancelled = true;
    };
  }, [items, shippingMethod, subtotalAud, shippingAud, itemCount]);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  if (!publishableKey) {
    return (
      <main id="content">
        <SeoHead title="Checkout" description={`Secure checkout — ${BRAND.name}`} path="/checkout" />
        <PageHero label="Checkout" title="Almost there" subtitle="Payment setup incomplete" />
        <section className="container-narrow section-content pb-24 text-center">
          <p className="type-body text-brand-slate mb-8">
            Add <code className="text-brand-light-slate">VITE_STRIPE_PUBLISHABLE_KEY</code> to your
            environment to enable checkout.
          </p>
          <Link
            to="/cart"
            className="type-link text-brand-white border-b border-brand-slate pb-1"
          >
            Back to bag
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main id="content">
      <SeoHead title="Checkout" description={`Secure checkout — ${BRAND.name}`} path="/checkout" />
      <PageHero
        label="Checkout"
        title="Complete your order"
        subtitle={`${itemCount} item${itemCount === 1 ? '' : 's'} · Secure payment`}
      />

      <section className="container-site section-content pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/cart"
              className="type-caption text-brand-slate hover:text-brand-white uppercase tracking-widest transition-colors"
            >
              ← Back to bag
            </Link>
            <p className="type-caption text-brand-slate uppercase tracking-widest">
              {BRAND.name}
            </p>
          </div>

          {error && (
            <div className="border border-red-400/30 bg-red-950/20 px-6 py-4 mb-8" role="alert">
              <p className="type-body text-red-300/90">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 type-caption uppercase tracking-widest text-brand-white border-b border-brand-slate pb-1"
              >
                Try again
              </button>
            </div>
          )}

          {!error && !clientSecret && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="h-px w-12 bg-brand-slate/40 animate-pulse" />
              <p className="type-body text-brand-slate">Preparing secure checkout…</p>
            </div>
          )}

          {clientSecret && (
            <div className="checkout-embedded border border-brand-slate/20 bg-brand-ink/30">
              <EmbeddedCheckoutProvider stripe={getStripePromise()} options={{ clientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}

          <p className="type-caption text-center text-brand-slate uppercase tracking-widest mt-8">
            Secure checkout via Stripe · AUD
          </p>
        </div>
      </section>
    </main>
  );
}
