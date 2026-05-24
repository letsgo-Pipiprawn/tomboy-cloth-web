import { useEffect, useRef } from 'react';

/** Keeps `--site-header-height` in sync with the fixed site header (announcement + nav). */
export function useSiteHeaderHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setHeight = () => {
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${el.getBoundingClientRect().height}px`,
      );
    };

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(el);
    window.addEventListener('resize', setHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setHeight);
      document.documentElement.style.removeProperty('--site-header-height');
    };
  }, []);

  return ref;
}
