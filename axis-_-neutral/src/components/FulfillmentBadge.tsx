import type { FulfillmentType } from '../data/fulfillment';
import { FULFILLMENT_LABEL } from '../data/fulfillment';

type FulfillmentBadgeProps = {
  type: FulfillmentType;
  className?: string;
};

const BADGE_STYLE: Record<FulfillmentType, string> = {
  in_stock: 'border-brand-white/20 text-brand-light-slate',
  preorder: 'border-[#C8B090]/40 text-[#C8B090]',
  wishlist: 'border-brand-white/30 text-brand-white',
};

export default function FulfillmentBadge({ type, className = '' }: FulfillmentBadgeProps) {
  return (
    <span
      className={`type-label uppercase tracking-wider border px-2.5 py-1 ${BADGE_STYLE[type]} ${className}`}
    >
      {FULFILLMENT_LABEL[type]}
    </span>
  );
}
