import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import SectionLabel from './SectionLabel';
import { TIER1_WISHLIST_SLUG } from '../data/featured';
import { useCatalog } from '../hooks/useCatalog';

export default function ProductCarousel() {
  const { products, loading } = useCatalog();
  const signature =
    products.find((p) => p.slug === TIER1_WISHLIST_SLUG) ?? products[0] ?? null;
  const productPath = `/products/${TIER1_WISHLIST_SLUG}`;

  return (
    <section id="signature-piece" className="section-y bg-brand-black w-full">
      <div className="container-site">
        <div className="mb-12 md:mb-14 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div>
            <SectionLabel className="mb-4">AW26</SectionLabel>
            <h2 className="type-h2 text-brand-white">The Signature Piece</h2>
            <p className="type-body text-brand-slate mt-4 max-w-md">
              One hero blazer in small-batch production. Join the waitlist — we open preorder when
              the list fills.
            </p>
          </div>
          <Link
            to={productPath}
            className="type-btn shrink-0 self-start sm:self-auto bg-brand-bone px-7 py-3.5 text-brand-ink hover:bg-brand-white transition-colors"
          >
            Join waitlist
          </Link>
        </div>

        <div className="max-w-[min(100%,28rem)] mx-auto">
          {loading && !signature ? (
            <p className="type-body text-brand-slate text-center">Loading…</p>
          ) : signature ? (
            <ProductCard product={signature} />
          ) : (
            <p className="type-body text-brand-slate text-center">Catalog unavailable.</p>
          )}
        </div>
      </div>
    </section>
  );
}
