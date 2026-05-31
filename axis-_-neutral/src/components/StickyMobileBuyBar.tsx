import { useEffect, useState } from 'react';
import { formatPrice } from '../data/products';
import { ctaLabel } from '../data/fulfillment';

type StickyMobileBuyBarProps = {
  productName: string;
  priceAud: number;
  fulfillmentType: Parameters<typeof ctaLabel>[0];
  onAdd: () => void;
  disabled?: boolean;
};

export default function StickyMobileBuyBar({
  productName,
  priceAud,
  fulfillmentType,
  onAdd,
  disabled = false,
}: StickyMobileBuyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 z-40 md:hidden border-t border-brand-slate/25 bg-brand-black/95 backdrop-blur-md px-4 py-3 bottom-[var(--cookie-banner-offset,0px)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="type-caption text-brand-slate truncate">{productName}</p>
          <p className="type-body text-brand-white">{formatPrice(priceAud)}</p>
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={onAdd}
          className="type-btn shrink-0 bg-brand-white text-brand-black px-6 py-3 disabled:opacity-50"
        >
          {ctaLabel(fulfillmentType)}
        </button>
      </div>
    </div>
  );
}
