import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  fetchCatalog,
  fetchCatalogSyncFallback,
  fetchProductBySlug,
} from '../lib/catalog';
import type { Product } from '../data/products';
import { isSupabaseConfigured } from '../lib/supabase';

type CatalogState = {
  products: Product[];
  loading: boolean;
  source: 'supabase' | 'local' | null;
  error: string | null;
};

const CatalogContext = createContext<CatalogState | null>(null);

function initialCatalogState(): CatalogState {
  const useLocalFirst = !isSupabaseConfigured();
  return {
    products: useLocalFirst ? fetchCatalogSyncFallback() : [],
    loading: true,
    source: null,
    error: null,
  };
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CatalogState>(initialCatalogState);

  useEffect(() => {
    let cancelled = false;

    void fetchCatalog()
      .then(({ products, source }) => {
        if (cancelled) return;
        setState((prev) => ({
          products:
            products.length > 0
              ? products
              : isSupabaseConfigured()
                ? prev.products
                : products,
          loading: false,
          source,
          error: null,
        }));
      })
      .catch((error) => {
        if (cancelled) return;
        const message = error instanceof Error ? error.message : 'Catalog failed to load.';
        setState({
          products: fetchCatalogSyncFallback(),
          loading: false,
          source: 'local',
          error: message,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogState {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return ctx;
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'local' | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void fetchProductBySlug(slug)
      .then((result) => {
        if (cancelled) return;
        setProduct(result.product ?? fetchCatalogSyncFallback().find((p) => p.slug === slug));
        setSource(result.source);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setProduct(fetchCatalogSyncFallback().find((p) => p.slug === slug));
        setSource('local');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { product, loading, source };
}
