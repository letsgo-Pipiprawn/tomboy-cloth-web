import { Link } from 'react-router-dom';
import { useCatalog } from '../hooks/useCatalog';
import WishlistProgress from './WishlistProgress';
import { fetchWishlistCount } from '../lib/wishlist';
import { useEffect, useState } from 'react';

export default function HomeShopBands() {
  const { products } = useCatalog();
  const wishlist = products.find((p) => p.fulfillmentType === 'wishlist');
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

  if (wishlist?.fulfillmentType !== 'wishlist') return null;

  return (
    <section className="border-b border-brand-slate/20 bg-[#0f0f0f]">
      <div className="container-site section-y-sm grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div className="max-w-xl space-y-4">
          <p className="type-label text-[#C8B090]">Made to order</p>
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
          to={`/products/${wishlist.slug}`}
          className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-white hover:border-brand-white transition-colors justify-self-start md:justify-self-end"
        >
          Join waitlist
        </Link>
      </div>
    </section>
  );
}
