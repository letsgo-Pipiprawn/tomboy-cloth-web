import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import SectionLabel from './SectionLabel';
import { useCatalog } from '../hooks/useCatalog';

export default function ProductCarousel() {
  const { products, loading } = useCatalog();

  return (
    <section id="new-arrivals" className="section-y bg-brand-black w-full overflow-hidden">
      <div className="container-site mb-14 md:mb-16 flex justify-between items-end gap-8">
        <div>
          <SectionLabel className="mb-4">Curated</SectionLabel>
          <h2 className="type-h2 text-brand-white">New Arrivals</h2>
        </div>
        <Link
          to="/collections/all"
          className="hidden md:inline-block type-link text-brand-slate hover:text-brand-white border-b border-transparent hover:border-brand-white pb-1 transition-all"
        >
          View All Objects
        </Link>
      </div>

      <div className="w-full pl-[clamp(1.25rem,4vw,4rem)] pb-4 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing">
        <div className="flex gap-8 md:gap-10 w-max pr-[clamp(1.25rem,4vw,4rem)]">
          {loading && products.length === 0 ? (
            <p className="type-body text-brand-slate px-2">Loading collection…</p>
          ) : (
            products.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
