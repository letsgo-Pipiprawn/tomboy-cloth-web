import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DESKTOP_MQ = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';
const PARALLAX_Y = 100;
const SCRUB_SMOOTH = 1.5;

function getEffectiveCols(gridCols: number, viewportWidth: number): number {
  if (viewportWidth < 768) return 1;
  if (viewportWidth < 1024 && gridCols === 4) return 2;
  return gridCols;
}

function isStaggeredCard(index: number, gridCols: number, viewportWidth: number): boolean {
  const effectiveCols = getEffectiveCols(gridCols, viewportWidth);
  if (effectiveCols <= 1) return false;

  const colIndex = index % effectiveCols;
  return colIndex % 2 === 1;
}

export function refreshCollectionScrollTriggers() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
}

export function useCollectionParallax(
  gridRef: RefObject<HTMLElement | null>,
  gridCols: number,
  itemCount: number,
) {
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MQ, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.collection-card', grid);
        const viewportWidth = window.innerWidth;

        cards.forEach((card, index) => {
          if (!isStaggeredCard(index, gridCols, viewportWidth)) return;

          gsap.fromTo(
            card,
            { y: PARALLAX_Y },
            {
              y: -PARALLAX_Y,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: SCRUB_SMOOTH,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    {
      scope: gridRef,
      dependencies: [gridCols, itemCount],
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    refreshCollectionScrollTriggers();
  }, [gridCols, itemCount]);
}
