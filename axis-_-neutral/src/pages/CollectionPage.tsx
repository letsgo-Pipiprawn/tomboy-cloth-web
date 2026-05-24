import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import PageHero from '../components/PageHero';
import SeoHead from '../components/SeoHead';
import { getCollectionBySlug, getProductsByCollection } from '../data/collections';
import { formatPrice } from '../data/products';

export default function CollectionPage() {
  const { slug = 'aw26' } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug);
  const items = getProductsByCollection(slug);

  if (!collection) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="type-body text-brand-slate">Collection not found.</p>
      </main>
    );
  }

  return (
    <main>
      <SeoHead
        title={collection.title}
        description={`${collection.description} Shop ${collection.season} at AXIS / NEUTRAL.`}
        path={`/collections/${slug}`}
      />
      <PageHero
        label={collection.season}
        title={collection.title}
        subtitle={collection.description}
        image={collection.heroImage}
        imageAlt={`${collection.title} collection hero`}
        tall
      />

      <section className="section-content container-site">
        <p className="type-body-lg text-brand-slate max-w-2xl mb-16 md:mb-20">
          {collection.tagline} — {items.length} objects, one coherent silhouette.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-20 lg:gap-y-24">
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
                  <span className="absolute top-4 left-4 type-label text-brand-white/80 bg-brand-black/50 px-2.5 py-1 backdrop-blur-md">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between gap-6 items-start">
                  <h2 className="type-h3 text-brand-light-slate group-hover:text-brand-white transition-colors">
                    {product.name}
                  </h2>
                  <span className="type-body text-brand-slate shrink-0 pt-0.5">
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
