import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../hooks/useCatalog';
import { formatPrice } from '../data/products';
import SectionLabel from './SectionLabel';

type RecentlyViewedProps = {
  slugs: string[];
  currentSlug: string;
};

export default function RecentlyViewed({ slugs, currentSlug }: RecentlyViewedProps) {
  const { products } = useCatalog();
  const [visible, setVisible] = useState<string[]>([]);

  useEffect(() => {
    setVisible(slugs.filter((s) => s !== currentSlug).slice(0, 4));
  }, [slugs, currentSlug]);

  const items = visible
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className="content-auto container-site section-y-sm border-t border-brand-slate/20">
      <SectionLabel className="mb-8">Recently Viewed</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map((product) =>
          product ? (
            <Link key={product.slug} to={`/products/${product.slug}`} className="group">
              <div className="aspect-[3/4] bg-[#111] overflow-hidden mb-3">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : null}
              </div>
              <p className="type-caption text-brand-light-slate group-hover:text-brand-white line-clamp-2">
                {product.name}
              </p>
              <p className="type-caption text-brand-slate mt-1">{formatPrice(product.priceAud)}</p>
            </Link>
          ) : null,
        )}
      </div>
    </section>
  );
}
