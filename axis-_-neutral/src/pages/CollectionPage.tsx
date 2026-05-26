import { Link, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import SeoHead from '../components/SeoHead';
import { getCollectionBySlug } from '../data/collections';
import { useCatalog } from '../hooks/useCatalog';
import { formatPrice } from '../data/products';
import {
  refreshCollectionScrollTriggers,
  useCollectionParallax,
} from '../hooks/useCollectionParallax';

const FILTERS = ['ALL', 'OUTERWEAR', 'BOTTOMS', 'FOOTWEAR'] as const;
type Filter = (typeof FILTERS)[number];
type GridCols = 2 | 3 | 4;

const PLACEHOLDER_ITEMS = [
  { id: '1', name: 'The Oversized Charcoal Blazer', price: 450, image: null as string | null },
  { id: '2', name: 'Unstructured Slate Trench', price: 680, image: null },
  { id: '3', name: 'Wide-Leg Suit Trousers', price: 320, image: null },
  { id: '4', name: 'Chunky Leather Loafers', price: 490, image: null },
  { id: '5', name: 'Boxy Oxford Shirt', price: 240, image: null },
  { id: '6', name: 'Utility Wool Vest', price: 360, image: null },
];

export default function CollectionPage() {
  const { slug = 'aw26' } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug);
  const { products: catalogProducts } = useCatalog();
  const items = catalogProducts.filter((p) => p.collectionSlug === slug);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<Filter>('ALL');
  const [gridCols, setGridCols] = useState<GridCols>(3);

  const displayItems = PLACEHOLDER_ITEMS.map((placeholder, index) => {
    const product = items[index];
    return {
      id: placeholder.id,
      name: product?.name ?? placeholder.name,
      price: product?.priceAud ?? placeholder.price,
      image: product?.image ?? null,
      slug: product?.slug,
    };
  });

  useCollectionParallax(gridRef, gridCols, displayItems.length);

  const handleGridChange = (cols: GridCols) => {
    setGridCols(cols);
    refreshCollectionScrollTriggers();
  };

  if (!collection) {
    return (
      <main className="collection-page">
        <div className="collection-page__inner container-site">
          <p className="type-body text-brand-slate">Collection not found.</p>
        </div>
      </main>
    );
  }

  const seoDescription =
    'Tomboy tailoring and androgynous womenswear for Australia. Oversized blazers, wide-leg trousers, and structured outerwear in charcoal, slate, and neutral black.';

  return (
    <main className="collection-page">
      <SeoHead
        title={collection.title}
        description={`${collection.description} Shop ${collection.season} at AXIS / NEUTRAL.`}
        path={`/collections/${slug}`}
      />

      <div className="collection-page__inner container-site">
        {/* Header Space */}
        <header className="collection-header">
          <h1 className="collection-header__title">{collection.title}</h1>
          <p className="collection-header__seo">{seoDescription}</p>
        </header>

        {/* Toolbar */}
        <div className="collection-toolbar">
          <nav className="collection-filters" aria-label="Product filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`collection-filter${activeFilter === filter ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </nav>

          <div className="collection-layout-toggle" aria-label="Grid layout">
            <button
              type="button"
              className={`collection-layout-btn${gridCols === 2 ? ' is-active' : ''}`}
              onClick={() => handleGridChange(2)}
              aria-label="2 column layout"
              aria-pressed={gridCols === 2}
            >
              &#9646;&#9646;
            </button>
            <button
              type="button"
              className={`collection-layout-btn${gridCols === 4 ? ' is-active' : ''}`}
              onClick={() => handleGridChange(4)}
              aria-label="4 column layout"
              aria-pressed={gridCols === 4}
            >
              &#9646;&#9646;&#9646;&#9646;
            </button>
          </div>
        </div>

        {/* Product Grid — column count via data-cols only */}
        <div ref={gridRef} className="collection-grid" data-cols={gridCols}>
          {displayItems.map((item) => {
            const cardBody = (
              <>
                <div className="collection-card__media">
                  {item.image ? (
                    <img src={item.image} alt={item.name} loading="lazy" />
                  ) : (
                    <div className="collection-card__placeholder" aria-hidden />
                  )}
                </div>
                <div className="collection-card__meta">
                  <h2 className="collection-card__name">{item.name}</h2>
                  <span className="collection-card__price">{formatPrice(item.price)}</span>
                </div>
              </>
            );

            return (
              <article key={item.id} className="collection-card">
                {item.slug ? (
                  <Link to={`/products/${item.slug}`} className="collection-card__link">
                    {cardBody}
                  </Link>
                ) : (
                  <div className="collection-card__link">{cardBody}</div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
