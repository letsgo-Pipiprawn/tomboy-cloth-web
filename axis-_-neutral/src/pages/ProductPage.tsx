import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useCatalog } from '../hooks/useCatalog';
import SectionLabel from '../components/SectionLabel';
import SeoHead from '../components/SeoHead';
import { useCart } from '../context/CartContext';
import { useSavedItems } from '../context/SavedItemsContext';
import FulfillmentBadge from '../components/FulfillmentBadge';
import WishlistForm from '../components/WishlistForm';
import ImageLightbox from '../components/ImageLightbox';
import StickyMobileBuyBar from '../components/StickyMobileBuyBar';
import RecentlyViewed from '../components/RecentlyViewed';
import RestockNotifyForm from '../components/RestockNotifyForm';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { breadcrumbJsonLd } from '../lib/breadcrumbJsonLd';
import { PACKAGING, VALIDATION_MODE, BRAND } from '../data/site';
import {
  ctaLabel,
  effectivePriceAud,
  isPurchasable,
  shippingLine,
} from '../data/fulfillment';
import { trackAddToCart, trackViewItem } from '../lib/analytics';

function isOuterwear(category: string): boolean {
  return category.toLowerCase() === 'outerwear';
}

export default function ProductPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { products: catalogProducts, loading } = useCatalog();
  const { addItem } = useCart();
  const { isSaved, toggleSaved } = useSavedItems();
  const { slugs: recentSlugs, recordView } = useRecentlyViewed();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [notifySize, setNotifySize] = useState<string | null>(null);
  const product = catalogProducts.find((item) => item.slug === slug);
  const viewedSlugRef = useRef<string | null>(null);

  useEffect(() => {
    if (!product) return;
    recordView(product.slug);
  }, [product, recordView]);

  useEffect(() => {
    if (!product || viewedSlugRef.current === product.slug) return;
    viewedSlugRef.current = product.slug;
    trackViewItem({
      slug: product.slug,
      name: product.name,
      priceAud: effectivePriceAud(product.priceAud, product),
      category: product.category,
    });
  }, [product]);

  useEffect(() => {
    setActiveImage(0);
  }, [product?.slug]);

  if (loading && !product) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center section-content">
        <p className="type-body text-brand-slate">Loading…</p>
      </main>
    );
  }

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

  const related = catalogProducts.filter((p) => p.slug !== product.slug).slice(0, 3);
  const specs = product.specs ?? [];
  const sizeChart = product.sizeChart ?? [];
  const fitNote = product.fitNote || product.story;
  const gallery = product.images;
  const showWaistHip = sizeChart.some((row) => row.waist !== '—');

  const displayPrice = effectivePriceAud(product.priceAud, product);
  const purchasable = isPurchasable(product.fulfillmentType);
  const availabilitySchema =
    product.fulfillmentType === 'wishlist'
      ? 'https://schema.org/PreOrder'
      : product.fulfillmentType === 'preorder'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/InStock';

  const soldOut = new Set(product.soldOutSizes ?? []);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        brand: { '@type': 'Brand', name: 'AXIS / NEUTRAL' },
        offers: {
          '@type': 'Offer',
          price: displayPrice,
          priceCurrency: 'AUD',
          availability: availabilitySchema,
        },
      },
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/collections/all' },
        { name: product.name, path: `/products/${product.slug}` },
      ]),
    ],
  };

  return (
    <main id="content">
      <SeoHead
        title={product.name}
        description={product.description}
        path={`/products/${product.slug}`}
        jsonLd={productJsonLd}
      />
      <div className="container-site pt-8 pb-16 md:pt-12 md:pb-24">
        <nav className="type-caption text-brand-slate mb-10 flex gap-2 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-white transition-colors">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/collections/all" className="hover:text-brand-white transition-colors">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span className="text-brand-light-slate">{product.name}</span>
        </nav>

        <section className="grid xl:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-start">
          <div className="space-y-5">
            <div
              className={`product-hero-frame relative ${gallery.length > 0 ? 'cursor-zoom-in' : ''}`}
              onClick={() => gallery.length > 0 && setLightboxOpen(true)}
            >
              {gallery.length > 0 ? (
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <img
                    src={gallery[activeImage]}
                    alt={product.name}
                    className={`product-hero-image origin-center ${activeImage === 0 ? '' : 'object-[center_20%]'}`}
                  />
                </motion.div>
              ) : (
                <div className="product-hero-image flex flex-col items-center justify-center gap-4 bg-brand-slate/10 px-8 text-center min-h-[320px] md:min-h-[480px]">
                  <p className="type-label text-brand-slate">Supplier photography pending</p>
                  <p className="type-body text-brand-light-slate max-w-sm">
                    Brand image pack is being prepared. Supplier photos are not shown on the
                    storefront — run the 7-file pack workflow and deploy.
                  </p>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setActiveImage(i);
                    }}
                    aria-label={`View image ${i + 1}`}
                    className={`aspect-[3/4] overflow-hidden border transition-colors ${
                      activeImage === i ? 'border-brand-white' : 'border-brand-slate/30 opacity-70'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {specs.length > 0 && (
              <div className="grid sm:grid-cols-3 gap-5 pt-4 border-t border-brand-slate/20">
                {specs.slice(0, 3).map((spec) => (
                  <div key={spec.label}>
                    <p className="type-caption text-brand-slate mb-2">{spec.label}</p>
                    <p className="type-body text-brand-light-slate">{spec.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="xl:sticky xl:top-28 border border-brand-slate/20 p-6 md:p-8 bg-brand-black/70 backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <SectionLabel>{product.category}</SectionLabel>
              <FulfillmentBadge type={product.fulfillmentType} />
              <button
                type="button"
                aria-label={isSaved(product.slug) ? 'Remove from saved' : 'Save object'}
                onClick={() => toggleSaved(product.slug)}
                className="ml-auto p-2 border border-brand-slate/30 text-brand-slate hover:text-brand-white hover:border-brand-slate transition-colors"
              >
                <Heart className={`w-4 h-4 ${isSaved(product.slug) ? 'fill-current text-brand-white' : ''}`} />
              </button>
            </div>
            <h1 className="type-h1 text-brand-white mb-5">{product.name}</h1>
            <p className="type-body-lg text-brand-light-slate mb-8">{product.description}</p>

            {product.fulfillmentType === 'wishlist' && product.compareAtPriceAud != null && (
              <p className="type-caption text-brand-slate mb-2">
                Preorder opens at {product.wishlistGoal} signups · early access{' '}
                {product.preorderDiscountPercent}% off
              </p>
            )}

            <div className="mb-2 flex items-baseline gap-3 flex-wrap">
              <p className="type-price text-brand-white">{formatPrice(displayPrice)}</p>
              {product.compareAtPriceAud != null &&
                product.compareAtPriceAud > displayPrice &&
                product.fulfillmentType !== 'wishlist' && (
                  <p className="type-body text-brand-slate line-through">
                    {formatPrice(product.compareAtPriceAud)}
                  </p>
                )}
              {product.fulfillmentType === 'wishlist' && product.compareAtPriceAud != null && (
                <p className="type-body text-brand-slate">
                  Est. retail {formatPrice(product.compareAtPriceAud)}
                </p>
              )}
            </div>
            <p className="type-caption text-brand-slate mb-8">
              {shippingLine(product.fulfillmentType, product.shipsInWeeks)} · Incl. GST · AUD
            </p>

            {product.fulfillmentType === 'wishlist' ? (
              <WishlistForm product={product} />
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <p className="type-label text-brand-slate">Size</p>
                    <Link
                      to="/size-guide"
                      className="type-caption text-brand-slate hover:text-brand-white border-b border-transparent hover:border-brand-slate"
                    >
                      Size guide
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((size) => {
                      const unavailable = soldOut.has(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          disabled={unavailable}
                          onClick={() => {
                            if (unavailable) {
                              setNotifySize(size);
                              return;
                            }
                            setSelectedSize(size);
                            setSizeError(false);
                            setNotifySize(null);
                          }}
                          className={`min-w-[3rem] px-4 py-3 type-caption border transition-colors ${
                            unavailable
                              ? 'border-brand-slate/20 text-brand-slate/45 line-through cursor-not-allowed'
                              : selectedSize === size
                                ? 'border-brand-white text-brand-white bg-brand-white/5'
                                : 'border-brand-slate/40 text-brand-slate hover:border-brand-slate'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  {notifySize && soldOut.has(notifySize) && !VALIDATION_MODE && (
                    <RestockNotifyForm slug={product.slug} size={notifySize} />
                  )}
                  {notifySize && soldOut.has(notifySize) && VALIDATION_MODE && (
                    <p className="type-caption text-brand-slate mt-3">
                      Size unavailable — email{' '}
                      <a href={`mailto:${BRAND.email}`} className="underline hover:text-brand-white">
                        {BRAND.email}
                      </a>
                    </p>
                  )}
                  {sizeError && (
                    <p className="type-caption text-brand-light-slate mt-3">Select a size</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!selectedSize) {
                      setSizeError(true);
                      return;
                    }
                    if (soldOut.has(selectedSize)) return;
                    addItem({
                      slug: product.slug,
                      name: product.name,
                      priceAud: displayPrice,
                      image: product.image,
                      size: selectedSize,
                    });
                    trackAddToCart({
                      slug: product.slug,
                      name: product.name,
                      priceAud: displayPrice,
                    });
                  }}
                  className="w-full type-btn bg-brand-white text-brand-black px-10 py-4 hover:bg-brand-light-slate transition-colors"
                >
                  {ctaLabel(product.fulfillmentType)}
                </button>

                {product.fulfillmentType === 'preorder' && (
                  <p className="type-caption text-brand-slate mt-4">
                    Preorder item. Ships in approximately {product.shipsInWeeks} weeks. See{' '}
                    <Link to="/policies" className="underline hover:text-brand-white">
                      policies
                    </Link>
                    .
                  </p>
                )}

                <div className="mt-10 pt-8 border-t border-brand-slate/20">
                  <SectionLabel className="mb-4">{PACKAGING.title}</SectionLabel>
                  <ul className="space-y-2">
                    {PACKAGING.lines.map((line) => (
                      <li key={line} className="type-caption text-brand-slate leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

          </motion.aside>
        </section>
      </div>

      <ImageLightbox
        src={gallery[activeImage] ?? product.image}
        alt={product.name}
        open={lightboxOpen && gallery.length > 0}
        onClose={() => setLightboxOpen(false)}
      />

      {!product.fulfillmentType || product.fulfillmentType !== 'wishlist' ? (
        <StickyMobileBuyBar
          productName={product.name}
          priceAud={displayPrice}
          fulfillmentType={product.fulfillmentType}
          disabled={!purchasable}
          onAdd={() => {
            if (!selectedSize) {
              setSizeError(true);
              return;
            }
            if (soldOut.has(selectedSize)) return;
            addItem({
              slug: product.slug,
              name: product.name,
              priceAud: displayPrice,
              image: product.image,
              size: selectedSize,
            });
            trackAddToCart({
              slug: product.slug,
              name: product.name,
              priceAud: displayPrice,
            });
          }}
        />
      ) : null}

      <section className="content-auto border-y border-brand-slate/20 bg-[#0d0d0d]">
        <div className="container-site section-y-sm grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {fitNote && (
            <div>
              <SectionLabel className="mb-6">Fit Notes</SectionLabel>
              <p className="type-body-lg text-brand-light-slate leading-relaxed">{fitNote}</p>
            </div>
          )}

          {specs.length > 0 && (
            <div>
              <SectionLabel className="mb-6">Specifications</SectionLabel>
              <dl className="product-spec-table">
                {specs.map((spec) => (
                  <div key={spec.label} className="product-spec-table__row">
                    <dt className="product-spec-table__label">{spec.label}</dt>
                    <dd className="product-spec-table__value">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {sizeChart.length > 0 && (
        <section className="content-auto container-site section-y-sm border-b border-brand-slate/20">
          <SectionLabel className="mb-6">Size Chart</SectionLabel>
          <p className="type-caption text-brand-slate mb-8">
            Flat-lay measurements · cm · {isOuterwear(product.category) ? 'garment length' : 'body fit'}
          </p>
          <div className="overflow-x-auto">
            <table className="product-size-chart">
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  {showWaistHip ? (
                    <>
                      <th scope="col">Waist</th>
                      <th scope="col">Hip</th>
                    </>
                  ) : null}
                  <th scope="col">{showWaistHip ? 'Inseam / Length' : 'Back length'}</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row) => (
                  <tr key={row.size}>
                    <td>{row.size}</td>
                    {showWaistHip ? (
                      <>
                        <td>{row.waist}</td>
                        <td>{row.hip}</td>
                      </>
                    ) : null}
                    <td>{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="content-auto container-site section-y-sm">
          <SectionLabel className="mb-10">You May Also Consider</SectionLabel>
          <div className="grid sm:grid-cols-3 gap-10 lg:gap-12">
            {related.map((p) => (
              <Link key={p.id} to={`/products/${p.slug}`} className="group">
                <div className="product-hero-frame mb-5">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="product-hero-image grayscale-[0.7] group-hover:grayscale-0 transition-all duration-500"
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

      <RecentlyViewed slugs={recentSlugs} currentSlug={product.slug} />
    </main>
  );
}
