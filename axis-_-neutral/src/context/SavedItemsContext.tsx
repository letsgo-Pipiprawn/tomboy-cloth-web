import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'axis-neutral-saved';

type SavedItemsContextValue = {
  slugs: string[];
  count: number;
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  removeSaved: (slug: string) => void;
};

const SavedItemsContext = createContext<SavedItemsContextValue | null>(null);

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs]);

  const isSaved = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggleSaved = useCallback((slug: string) => {
    setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const removeSaved = useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const value = useMemo(
    () => ({
      slugs,
      count: slugs.length,
      isSaved,
      toggleSaved,
      removeSaved,
    }),
    [slugs, isSaved, toggleSaved, removeSaved],
  );

  return <SavedItemsContext.Provider value={value}>{children}</SavedItemsContext.Provider>;
}

export function useSavedItems() {
  const ctx = useContext(SavedItemsContext);
  if (!ctx) throw new Error('useSavedItems must be used within SavedItemsProvider');
  return ctx;
}
