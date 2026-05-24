import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductCarousel() {
  return (
    <section id="new-arrivals" className="py-24 bg-brand-black w-full overflow-hidden">
      <div className="px-8 md:px-16 mb-12 flex justify-between items-end max-w-screen-2xl mx-auto">
        <div>
          <span className="text-brand-slate uppercase tracking-[0.3em] text-xs font-medium mb-3 block">
            Curated
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-white">New Arrivals</h2>
        </div>
        <Link
          to="/collections/aw26"
          className="hidden md:block text-brand-slate hover:text-brand-white text-xs uppercase tracking-widest border-b border-transparent hover:border-brand-white pb-1 transition-all"
        >
          View All Objects
        </Link>
      </div>

      <div className="w-full pl-8 md:pl-16 pb-8 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing">
        <div className="flex gap-6 w-max pr-8 md:pr-16">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
