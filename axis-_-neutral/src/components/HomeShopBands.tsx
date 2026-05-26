import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import { FEATURED_IN_STOCK_SLUG, TIER1_WISHLIST_SLUG } from '../data/featured';
import { useCatalog } from '../hooks/useCatalog';
import WishlistProgress from './WishlistProgress';
import { fetchWishlistCount } from '../lib/wishlist';
import { useEffect, useState } from 'react';

export default function HomeShopBands() {
  const { products } = useCatalog();
  const inStock = products.find(
    (p) => p.slug === FEATURED_IN_STOCK_SLUG && p.fulfillmentType === 'in_stock',
  );
  const wishlist = products.find((p) => p.slug === TIER1_WISHLIST_SLUG);
  const [wishlistCount, setWishlistCount] = useState<number | null>(null);

  useEffect(() => {
    if (!wishlist || wishlist.fulfillmentType !== 'wishlist') return;
    let cancelled = false;
    void fetchWishlistCount(wishlist.slug).then((data) => {
      if (!cancelled && data) setWishlistCount(data.count);
    });
    return () => {
      cancelled = true;
    };
  }, [wishlist]);

  return (
    <>
      <section className="border-b border-brand-slate/20 bg-[#121210]">
        <div className="container-site section-y-sm flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <p className="type-label text-brand-white mb-3">In stock · Ships now</p>
            <h2 className="type-h3 text-brand-white mb-3">
              {inStock?.name ?? 'Black Multi-Pocket Cargo Trouser'}
            </h2>
            <p className="type-body text-brand-slate mb-3">
              Essentials ship now — Australia-wide. Structured city tailoring in solid black, ready
              to wear.
            </p>
            {inStock && (
              <p className="type-price text-brand-white">{formatPrice(inStock.priceAud)} AUD</p>
            )}
          </div>
          <Link
            to={`/products/${FEATURED_IN_STOCK_SLUG}`}
            className="type-btn inline-flex justify-center bg-brand-white text-brand-black px-8 py-3.5 hover:bg-brand-light-slate transition-colors shrink-0"
          >
            Shop now
          </Link>
        </div>
      </section>

      {wishlist?.fulfillmentType === 'wishlist' && (
        <section className="border-b border-brand-slate/20 bg-[#0f0f0f]">
          <div className="container-site section-y-sm grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="max-w-xl space-y-4">
              <p className="type-label text-[#C8B090]">Tier 1 · Made to order</p>
              <h2 className="type-h3 text-brand-white">{wishlist.name}</h2>
              <p className="type-body text-brand-slate">
                Core pieces run in small domestic batches. Join the waitlist — preorder opens at{' '}
                {wishlist.wishlistGoal} signups.
              </p>
              {wishlistCount != null && (
                <WishlistProgress count={wishlistCount} goal={wishlist.wishlistGoal} />
              )}
            </div>
            <Link
              to={`/products/${TIER1_WISHLIST_SLUG}`}
              className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-white hover:border-brand-white transition-colors justify-self-start md:justify-self-end"
            >
              Join waitlist
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
