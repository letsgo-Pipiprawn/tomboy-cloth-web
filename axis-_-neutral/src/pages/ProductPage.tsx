import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { getProductBySlug, formatPrice, products } from '../data/products';
import SectionLabel from '../components/SectionLabel';
import SeoHead from '../components/SeoHead';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  if (!product) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 section-content">
        <SeoHead title="Product Not Found" noindex />
        <p className="type-body text-brand-slate">Object not found.</p>
        <Link to="/" className="type-link text-brand-slate border-b border-brand-slate pb-1">
          Return home
        </Link>
      </main>
    );
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'AXIS / NEUTRAL' },
    offers: {
      '@type': 'Offer',
      price: product.priceAud,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <main>
      <SeoHead
        title={product.name}
        description={product.description}
        path={`/products/${product.slug}`}
        jsonLd={productJsonLd}
      />
      <div className="container-site section-content">
        <nav
          className="type-caption text-brand-slate mb-12 md:mb-16 flex gap-2 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-brand-white transition-colors">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/collections/aw26" className="hover:text-brand-white transition-colors">
            AW26
          </Link>
          <span aria-hidden>/</span>
          <span className="text-brand-light-slate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24">
          <div className="space-y-5">
            <div
              className={`relative aspect-[3/4] overflow-hidden bg-[#111] cursor-zoom-in ${zoomed ? 'cursor-zoom-out' : ''}`}
              onClick={() => setZoomed(!zoomed)}
            >
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: zoomed ? 1.5 : 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover origin-center"
                />
              </motion.div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setActiveImage(i);
                      setZoomed(false);
                    }}
                    className={`w-20 h-24 overflow-hidden border transition-colors ${
                      activeImage === i ? 'border-brand-white' : 'border-brand-slate/30 opacity-60'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:pt-6"
          >
            <SectionLabel className="mb-4">{product.category}</SectionLabel>
            <h1 className="type-h1 text-brand-white mb-5">{product.name}</h1>
            <p className="type-price text-brand-slate mb-2">{formatPrice(product.priceAud)}</p>
            <p className="type-caption text-brand-slate mb-10">Incl. GST · AUD</p>
            <p className="type-body-lg text-brand-light-slate mb-10 max-w-md">{product.description}</p>

            <div className="mb-10">
              <div className="flex justify-between items-center mb-5">
                <p className="type-label text-brand-slate">Size</p>
                <Link
                  to="/size-guide"
                  className="type-caption text-brand-slate hover:text-brand-white border-b border-transparent hover:border-brand-slate"
                >
                  Size guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`min-w-[3rem] px-4 py-3.5 type-caption border transition-colors ${
                      selectedSize === size
                        ? 'border-brand-white text-brand-white bg-brand-white/5'
                        : 'border-brand-slate/40 text-brand-slate hover:border-brand-slate'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="type-caption text-brand-light-slate mt-4">Select a size</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                if (!selectedSize) {
                  setSizeError(true);
                  return;
                }
                addItem({
                  slug: product.slug,
                  name: product.name,
                  priceAud: product.priceAud,
                  image: product.image,
                  size: selectedSize,
                });
              }}
              className="w-full md:w-auto type-btn bg-brand-white text-brand-black px-10 py-4 hover:bg-brand-light-slate transition-colors mb-5"
            >
              Add to Bag
            </button>
            <p className="type-caption text-brand-slate">
              Complimentary shipping over $200 AUD within Australia
            </p>
          </motion.div>
        </div>

        <section className="mt-24 md:mt-32 pt-16 md:pt-20 border-t border-brand-slate/20 max-w-3xl">
          <SectionLabel className="mb-8">The Story</SectionLabel>
          <p className="type-body-lg text-brand-light-slate">{product.story}</p>
        </section>

        <section className="mt-16 md:mt-20 max-w-3xl">
          <SectionLabel className="mb-8">Details</SectionLabel>
          <ul className="space-y-4">
            {product.details.map((line) => (
              <li key={line} className="type-body text-brand-slate flex gap-4">
                <span className="text-brand-slate/50">—</span>
                {line}
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="mt-24 md:mt-32 pt-16 md:pt-20 border-t border-brand-slate/20">
            <SectionLabel className="mb-10">You May Also Consider</SectionLabel>
            <div className="grid sm:grid-cols-3 gap-10 lg:gap-12">
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.slug}`} className="group">
                  <div className="aspect-[3/4] overflow-hidden mb-5 bg-[#111]">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[0.7] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <p className="type-body text-brand-light-slate group-hover:text-brand-white transition-colors">
                    {p.name}
                  </p>
                  <p className="type-caption text-brand-slate mt-2">{formatPrice(p.priceAud)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
