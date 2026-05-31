import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, Heart } from 'lucide-react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import {
  refreshCollectionScrollTriggers,
  useCollectionParallax,
} from '../hooks/useCollectionParallax';
import { useSavedItems } from '../context/SavedItemsContext';
import QuickViewModal from './QuickViewModal';

const ALL_FILTER = 'ALL';
type GridCols = 2 | 3 | 4;
type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

export type CollectionTemplateProps = {
  title: string;
  seoDescription: string;
  products: Product[];
  loading?: boolean;
  filters?: readonly string[];
};

function matchesCategoryFilter(product: Product, filter: string): boolean {
  return product.category.toUpperCase() === filter;
}

function sortProducts(items: Product[], sort: SortKey): Product[] {
  const next = [...items];
  switch (sort) {
    case 'price-asc':
      return next.sort((a, b) => a.priceAud - b.priceAud);
    case 'price-desc':
      return next.sort((a, b) => b.priceAud - a.priceAud);
    case 'name':
      return next.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return next.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
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
  const { isSaved, toggleSaved } = useSavedItems();

  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const [gridCols, setGridCols] = useState<GridCols>(3);
  const [sort, setSort] = useState<SortKey>('featured');
  const [quickView, setQuickView] = useState<Product | null>(null);

  const displayItems = useMemo(() => {
    const filtered =
      activeFilter === ALL_FILTER
        ? products
        : products.filter((product) => matchesCategoryFilter(product, activeFilter));
    return sortProducts(filtered, sort);
  }, [products, activeFilter, sort]);

  useCollectionParallax(gridRef, gridCols, displayItems.length);

  useEffect(() => {
    refreshCollectionScrollTriggers();
  }, [activeFilter, sort]);

  const handleGridChange = (cols: GridCols) => {
    setGridCols(cols);
    refreshCollectionScrollTriggers();
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
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </nav>

        <div className="collection-toolbar__controls">
          <label className="sr-only" htmlFor="collection-sort">
            Sort products
          </label>
          <select
            id="collection-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-transparent border border-brand-slate/30 type-caption text-brand-slate px-3 py-2 outline-none focus:border-brand-white"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price · Low to high</option>
            <option value="price-desc">Price · High to low</option>
            <option value="name">Name</option>
          </select>

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
      </div>

      {loading && products.length === 0 ? (
        <p className="type-body text-brand-slate">Loading collection…</p>
      ) : displayItems.length === 0 ? (
        <p className="type-body text-brand-slate">No objects in this view yet.</p>
      ) : (
        <div ref={gridRef} className="collection-grid" data-cols={gridCols}>
          {displayItems.map((product) => (
            <article key={product.id} className="collection-card group/card">
              <div className="collection-card__media relative">
                <Link to={`/products/${product.slug}`} className="collection-card__link block">
                  {product.image ? (
                    <img src={product.image} alt={product.name} loading="lazy" />
                  ) : (
                    <div className="collection-card__placeholder" aria-hidden />
                  )}
                </Link>
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 transition-opacity">
                  <button
                    type="button"
                    aria-label={isSaved(product.slug) ? 'Remove from saved' : 'Save object'}
                    onClick={() => toggleSaved(product.slug)}
                    className="p-2 bg-brand-black/70 text-brand-white hover:text-brand-light-slate"
                  >
                    <Heart
                      className={`w-4 h-4 ${isSaved(product.slug) ? 'fill-current' : ''}`}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="Quick view"
                    onClick={() => setQuickView(product)}
                    className="p-2 bg-brand-black/70 text-brand-white hover:text-brand-light-slate"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <Link to={`/products/${product.slug}`} className="collection-card__link">
                <div className="collection-card__meta">
                  <h2 className="collection-card__name">{product.name}</h2>
                  <span className="collection-card__price">{formatPrice(product.priceAud)}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
