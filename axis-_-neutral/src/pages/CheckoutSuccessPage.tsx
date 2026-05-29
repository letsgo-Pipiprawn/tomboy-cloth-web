import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { BRAND } from '../data/site';
import { fetchCheckoutSessionSummary, type CheckoutSessionSummary } from '../lib/checkout';
import { useCart } from '../context/CartContext';
import { trackPurchase } from '../lib/analytics';

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const { clearCart } = useCart();
  const [summary, setSummary] = useState<CheckoutSessionSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const purchaseTrackedRef = useRef(false);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId) {
      setError('Missing checkout session.');
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const data = await fetchCheckoutSessionSummary(sessionId);
        if (!cancelled) setSummary(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not confirm your order.');
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  useEffect(() => {
    if (!summary || purchaseTrackedRef.current || summary.paymentStatus !== 'paid') return;
    if (summary.amountTotal == null) return;
    purchaseTrackedRef.current = true;
    trackPurchase({
      transactionId: summary.orderNumber ?? summary.id,
      valueAud: summary.amountTotal,
      currency: summary.currency,
    });
  }, [summary]);

  return (
    <>
      <SeoHead title="Order confirmed" description={`Thank you for shopping ${BRAND.name}.`} />
      <section className="section-y container-narrow text-center">
        <p className="type-label text-brand-slate mb-4">Order confirmed</p>
        <h1 className="type-h1 text-brand-white mb-6">Thank you</h1>

        {error && <p className="type-body text-brand-slate mb-8">{error}</p>}

        {!error && !summary && (
          <p className="type-body text-brand-slate mb-8">Confirming your payment…</p>
        )}

        {summary && (
          <div className="type-body-lg text-brand-light-slate space-y-3 mb-10">
            {summary.orderNumber && (
              <p>
                Order <span className="text-brand-white">{summary.orderNumber}</span>
              </p>
            )}
            {summary.customerEmail && (
              <p>
                Payment receipt from Stripe sent to{' '}
                <span className="text-brand-white">{summary.customerEmail}</span>
              </p>
            )}
            {summary.amountTotal != null && (
              <p>
                Total{' '}
                <span className="text-brand-white">
                  {summary.amountTotal.toFixed(2)} {summary.currency}
                </span>
              </p>
            )}
            <p className="type-caption text-brand-slate pt-4">
              We prepare orders within 1–3 business days, then email tracking when your parcel ships.
              You can also{' '}
              <Link to="/orders/track" className="underline hover:text-brand-white">
                look up your order
              </Link>{' '}
              with your email and order number.
            </p>
          </div>
        )}

        <Link
          to="/collections/aw26"
          className="type-link text-brand-white border-b border-brand-slate pb-1"
        >
          Continue shopping
        </Link>
      </section>
    </>
  );
}
