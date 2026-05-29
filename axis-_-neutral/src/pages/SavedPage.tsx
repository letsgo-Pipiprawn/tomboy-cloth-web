import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import PageHero from '../components/PageHero';
import { useSavedItems } from '../context/SavedItemsContext';
import { useCatalog } from '../hooks/useCatalog';
import { formatPrice } from '../data/products';

export default function SavedPage() {
  const { slugs, removeSaved } = useSavedItems();
  const { products } = useCatalog();

  const savedProducts = slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <main id="content">
      <SeoHead
        title="Saved"
        description="Your saved AXIS / NEUTRAL objects."
        path="/saved"
        noindex
      />
      <PageHero
        label="Account"
        title="Saved Objects"
        subtitle="Pieces you marked for later — stored on this device."
      />

      <div className="container-site section-content pb-24">
        {savedProducts.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <Heart className="w-10 h-10 mx-auto text-brand-slate stroke-[1]" />
            <p className="type-body text-brand-slate">Nothing saved yet.</p>
            <Link
              to="/collections/all"
              className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-white"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {savedProducts.map((product) =>
              product ? (
                <article key={product.slug} className="group relative">
                  <button
                    type="button"
                    onClick={() => removeSaved(product.slug)}
                    aria-label="Remove from saved"
                    className="absolute top-3 right-3 z-10 p-2 bg-brand-black/60 text-brand-white hover:text-brand-light-slate"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <Link to={`/products/${product.slug}`}>
                    <div className="aspect-[3/4] bg-[#111] overflow-hidden mb-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : null}
                    </div>
                    <h2 className="type-body text-brand-light-slate group-hover:text-brand-white">
                      {product.name}
                    </h2>
                    <p className="type-caption text-brand-slate mt-2">{formatPrice(product.priceAud)}</p>
                  </Link>
                </article>
              ) : null,
            )}
          </div>
        )}
      </div>
    </main>
  );
}
