import { useEffect, useState } from 'react';
import {
  fetchCatalog,
  fetchCatalogSyncFallback,
  fetchProductBySlug,
} from '../lib/catalog';
import type { Product } from '../data/products';

type CatalogState = {
  products: Product[];
  loading: boolean;
  source: 'supabase' | 'local' | null;
  error: string | null;
};

export function useCatalog(): CatalogState {
  const [state, setState] = useState<CatalogState>({
    products: fetchCatalogSyncFallback(),
    loading: true,
    source: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    void fetchCatalog().then(({ products, source }) => {
      if (cancelled) return;
      setState({ products, loading: false, source, error: null });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'local' | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void fetchProductBySlug(slug).then((result) => {
      if (cancelled) return;
      setProduct(result.product ?? fetchCatalogSyncFallback().find((p) => p.slug === slug));
      setSource(result.source);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { product, loading, source };
}
