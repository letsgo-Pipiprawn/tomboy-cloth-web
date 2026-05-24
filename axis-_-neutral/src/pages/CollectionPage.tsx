import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import PageHero from '../components/PageHero';
import { getCollectionBySlug, getProductsByCollection } from '../data/collections';
import { formatPrice } from '../data/products';

export default function CollectionPage() {
  const { slug = 'aw26' } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug);
  const items = getProductsByCollection(slug);

  if (!collection) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-brand-slate">Collection not found.</p>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        label={collection.season}
        title={collection.title}
        subtitle={collection.description}
        image={collection.heroImage}
        tall
      />

      <section className="py-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
        <p className="text-brand-slate text-sm max-w-2xl mb-16 leading-relaxed">
          {collection.tagline} — {items.length} objects, one coherent silhouette.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16">
          {items.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              className="group"
            >
              <Link to={`/products/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#111]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-[1.02]"
                  />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-brand-white/70 bg-brand-black/50 px-2 py-1 backdrop-blur-md">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <h2 className="font-medium text-brand-light-slate group-hover:text-brand-white transition-colors text-sm tracking-wide">
                    {product.name}
                  </h2>
                  <span className="text-brand-slate text-sm shrink-0">
                    {formatPrice(product.priceAud)}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
