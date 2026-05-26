import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import {
  refreshCollectionScrollTriggers,
  useCollectionParallax,
} from '../hooks/useCollectionParallax';

const ALL_FILTER = 'ALL';
type GridCols = 2 | 3 | 4;

export type CollectionTemplateProps = {
  title: string;
  seoDescription: string;
  products: Product[];
  loading?: boolean;
  /** Category labels for toolbar (without ALL). Example: OUTERWEAR, BOTTOMS, TOPS */
  filters?: readonly string[];
};

function matchesCategoryFilter(product: Product, filter: string): boolean {
  return product.category.toUpperCase() === filter;
}

export default function CollectionTemplate({
  title,
  seoDescription,
  products,
  loading = false,
  filters = ['OUTERWEAR', 'BOTTOMS', 'TOPS', 'FOOTWEAR'],
}: CollectionTemplateProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const filterOptions = useMemo(() => [ALL_FILTER, ...filters], [filters]);

  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const [gridCols, setGridCols] = useState<GridCols>(3);

  const displayItems = useMemo(() => {
    if (activeFilter === ALL_FILTER) return products;
    return products.filter((product) => matchesCategoryFilter(product, activeFilter));
  }, [products, activeFilter]);

  useCollectionParallax(gridRef, gridCols, displayItems.length);

  useEffect(() => {
    refreshCollectionScrollTriggers();
  }, [activeFilter]);

  const handleGridChange = (cols: GridCols) => {
    setGridCols(cols);
    refreshCollectionScrollTriggers();
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="collection-page__inner container-site">
      <header className="collection-header">
        <h1 className="collection-header__title">{title}</h1>
        <p className="collection-header__seo">{seoDescription}</p>
      </header>

      <div className="collection-toolbar">
        <nav className="collection-filters" aria-label="Product filters">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`collection-filter${activeFilter === filter ? ' is-active' : ''}`}
              onClick={() => handleFilterChange(filter)}
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

      {loading && products.length === 0 ? (
        <p className="type-body text-brand-slate">Loading collection…</p>
      ) : displayItems.length === 0 ? (
        <p className="type-body text-brand-slate">No objects in this view yet.</p>
      ) : (
        <div ref={gridRef} className="collection-grid" data-cols={gridCols}>
          {displayItems.map((product) => (
            <article key={product.id} className="collection-card">
              <Link to={`/products/${product.slug}`} className="collection-card__link">
                <div className="collection-card__media">
                  {product.image ? (
                    <img src={product.image} alt={product.name} loading="lazy" />
                  ) : (
                    <div className="collection-card__placeholder" aria-hidden />
                  )}
                </div>
                <div className="collection-card__meta">
                  <h2 className="collection-card__name">{product.name}</h2>
                  <span className="collection-card__price">{formatPrice(product.priceAud)}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
