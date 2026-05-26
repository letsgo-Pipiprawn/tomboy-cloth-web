import { useEffect, useState } from 'react';
import type { Product } from '../data/products';
import WishlistProgress from './WishlistProgress';
import { fetchWishlistCount } from '../lib/wishlist';

type WishlistFormProps = {
  product: Product;
  onSuccess?: () => void;
};

export default function WishlistForm({ product, onSuccess }: WishlistFormProps) {
  const [email, setEmail] = useState('');
  const [size, setSize] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [signupCount, setSignupCount] = useState<number | null>(null);
  const goal = product.wishlistGoal;

  useEffect(() => {
    let cancelled = false;
    void fetchWishlistCount(product.slug).then((data) => {
      if (!cancelled && data) setSignupCount(data.count);
    });
    return () => {
      cancelled = true;
    };
  }, [product.slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Enter a valid email.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/wishlist/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug: product.slug,
          email: trimmed,
          sizePreference: size || undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        goal?: number;
        count?: number | null;
      };

      if (!res.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Try again.');
        return;
      }

      if (typeof data.count === 'number') {
        setSignupCount(data.count);
      }

      setStatus('success');
      setMessage(
        `You are on the list. We open preorder at ${data.goal ?? product.wishlistGoal} signups.`,
      );
      setEmail('');
      setSize('');
      onSuccess?.();
    } catch {
      setStatus('error');
      setMessage('Network error. Try again in a moment.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {signupCount != null && <WishlistProgress count={signupCount} goal={goal} />}

      <p className="type-body text-brand-light-slate">
        Register interest. When we hit {goal} signups, this piece opens for preorder at{' '}
        {product.preorderDiscountPercent}% off — ships in ~{product.shipsInWeeks} weeks.
      </p>

      <div>
        <label htmlFor="wishlist-email" className="type-label text-brand-slate block mb-2">
          Email
        </label>
        <input
          id="wishlist-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full bg-transparent border border-brand-slate/40 px-4 py-3 type-body text-brand-white placeholder:text-brand-slate focus:border-brand-white outline-none"
          disabled={status === 'loading' || status === 'success'}
        />
      </div>

      {product.sizes.length > 0 && (
        <div>
          <p className="type-label text-brand-slate mb-2">Preferred size (optional)</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(size === s ? '' : s)}
                className={`min-w-[3rem] px-3 py-2 type-caption border transition-colors ${
                  size === s
                    ? 'border-brand-white text-brand-white'
                    : 'border-brand-slate/40 text-brand-slate'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full type-btn bg-brand-white text-brand-black px-10 py-4 hover:bg-brand-light-slate transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Joining…' : status === 'success' ? 'Joined' : 'Join waitlist'}
      </button>

      {message && (
        <p
          className={`type-caption ${status === 'error' ? 'text-brand-light-slate' : 'text-[#C8B090]'}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      )}
    </form>
  );
}
