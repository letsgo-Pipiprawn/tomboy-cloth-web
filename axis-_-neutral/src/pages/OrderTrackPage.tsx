import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';
import { formatPrice } from '../data/products';

type TrackItem = {
  slug: string;
  name: string;
  size: string;
  quantity: number;
  unitPriceAud: number;
};

type TrackResult = {
  orderNumber: string;
  status: string;
  totalAud: number;
  currency: string;
  createdAt: string;
  tracking: string | null;
  items: TrackItem[];
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Order received',
  paid: 'Payment confirmed · Preparing',
  cj_submitted: 'Sent to fulfillment partner',
  cj_failed: 'Fulfillment issue · Support notified',
  shipped: 'Shipped',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

function formatStatus(status: string): string {
  return STATUS_LABELS[status] ?? status.replaceAll('_', ' ');
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export default function OrderTrackPage() {
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), orderNumber: orderNumber.trim() }),
      });
      const data = (await res.json()) as TrackResult & { error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Could not find that order.');
        return;
      }
      setResult(data);
    } catch {
      setError('Network error. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SeoHead
        title="Track order"
        description="Look up your AXIS / NEUTRAL order status with your email and order number."
      />
      <PageHero
        label="Support"
        title="Track your order"
        subtitle="Enter the email used at checkout and your order number (e.g. AXN-…)."
      />

      <section className="container-narrow section-y-sm pb-24">
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6 max-w-xl mx-auto">
          <div>
            <label htmlFor="track-email" className="type-label text-brand-slate block mb-2">
              Email
            </label>
            <input
              id="track-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white focus:border-brand-white outline-none"
            />
          </div>
          <div>
            <label htmlFor="track-order" className="type-label text-brand-slate block mb-2">
              Order number
            </label>
            <input
              id="track-order"
              type="text"
              autoComplete="off"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="AXN-…"
              required
              className="w-full bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white focus:border-brand-white outline-none uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full type-btn bg-brand-white text-brand-black px-10 py-4 hover:bg-brand-light-slate transition-colors disabled:opacity-50"
          >
            {loading ? 'Looking up…' : 'Track order'}
          </button>
          {error && (
            <p className="type-body text-brand-light-slate" role="alert">
              {error}
            </p>
          )}
        </form>

        {result && (
          <div className="max-w-xl mx-auto mt-14 border border-brand-slate/25 p-6 md:p-8 space-y-6">
            <div>
              <SectionLabel className="mb-3">Order</SectionLabel>
              <p className="type-h3 text-brand-white">{result.orderNumber}</p>
              <p className="type-caption text-brand-slate mt-2">{formatDate(result.createdAt)}</p>
            </div>
            <div>
              <p className="type-label text-brand-slate mb-2">Status</p>
              <p className="type-body-lg text-brand-white">{formatStatus(result.status)}</p>
            </div>
            {result.tracking && (
              <div>
                <p className="type-label text-brand-slate mb-2">Tracking</p>
                {/^https?:\/\//i.test(result.tracking) ? (
                  <a
                    href={result.tracking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link text-brand-white border-b border-brand-slate pb-1"
                  >
                    View tracking
                  </a>
                ) : (
                  <p className="type-body text-brand-light-slate">{result.tracking}</p>
                )}
              </div>
            )}
            <ul className="space-y-4 border-t border-brand-slate/20 pt-6">
              {result.items.map((item) => (
                <li key={`${item.slug}-${item.size}`} className="flex justify-between gap-4">
                  <div>
                    <Link
                      to={`/products/${item.slug}`}
                      className="type-body text-brand-white hover:text-brand-light-slate"
                    >
                      {item.name}
                    </Link>
                    <p className="type-caption text-brand-slate mt-1">
                      Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="type-body text-brand-slate shrink-0">
                    {formatPrice(item.unitPriceAud * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <p className="type-price text-brand-white border-t border-brand-slate/20 pt-4">
              Total {formatPrice(result.totalAud)} {result.currency}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
