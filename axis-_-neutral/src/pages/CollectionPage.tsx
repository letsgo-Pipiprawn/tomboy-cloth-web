import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CollectionTemplate from '../components/CollectionTemplate';
import SeoHead from '../components/SeoHead';
import {
  DEFAULT_COLLECTION_FILTERS,
  getCollectionBySlug,
  getProductsForCollection,
} from '../data/collections';
import { useCatalog } from '../hooks/useCatalog';

export default function CollectionPage() {
  const { slug = 'all' } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug);
  const { products: catalogProducts, loading } = useCatalog();

  const collectionProducts = useMemo(() => {
    if (!collection) return [];
    return getProductsForCollection(catalogProducts, collection);
  }, [catalogProducts, collection]);

  if (!collection) {
    return (
      <main className="collection-page">
        <div className="collection-page__inner container-site">
          <p className="type-body text-brand-slate">Collection not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="collection-page">
      <SeoHead
        title={collection.title}
        description={`${collection.description} Shop ${collection.season} at AXIS / NEUTRAL.`}
        path={`/collections/${slug}`}
      />

      <CollectionTemplate
        title={collection.title}
        seoDescription={collection.seoDescription}
        products={collectionProducts}
        loading={loading}
        filters={collection.filters ?? DEFAULT_COLLECTION_FILTERS}
      />
    </main>
  );
}
