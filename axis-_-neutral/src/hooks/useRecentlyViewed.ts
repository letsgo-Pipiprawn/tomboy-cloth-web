import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'axis-neutral-recent';
const MAX_ITEMS = 6;

export function useRecentlyViewed() {
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

  const recordView = useCallback((slug: string) => {
    setSlugs((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX_ITEMS));
  }, []);

  return { slugs, recordView };
}
