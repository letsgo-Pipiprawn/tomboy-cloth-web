export type FulfillmentType = 'in_stock' | 'preorder' | 'wishlist';
export type SupplySource = 'cj' | 'domestic_1688' | 'odm';

export type FulfillmentMeta = {
  fulfillmentType: FulfillmentType;
  supplySource: SupplySource;
  compareAtPriceAud?: number;
  preorderDiscountPercent: number;
  shipsInWeeks: number;
  wishlistGoal: number;
  wishlistOpensAt?: string | null;
  supplierRef?: string | null;
};

export const DEFAULT_FULFILLMENT: FulfillmentMeta = {
  fulfillmentType: 'in_stock',
  supplySource: 'cj',
  preorderDiscountPercent: 30,
  shipsInWeeks: 4,
  wishlistGoal: 40,
};

export const FULFILLMENT_LABEL: Record<FulfillmentType, string> = {
  in_stock: 'In stock',
  preorder: 'Preorder',
  wishlist: 'Coming soon',
};

export function isPurchasable(type: FulfillmentType): boolean {
  return type === 'in_stock' || type === 'preorder';
}

export function effectivePriceAud(
  priceAud: number,
  meta: Pick<FulfillmentMeta, 'fulfillmentType' | 'preorderDiscountPercent'>,
): number {
  if (meta.fulfillmentType !== 'preorder') return priceAud;
  const discount = meta.preorderDiscountPercent / 100;
  return Math.round(priceAud * (1 - discount) * 100) / 100;
}

export function shippingLine(type: FulfillmentType, weeks: number): string {
  if (type === 'wishlist') return 'Join the waitlist — not on sale yet';
  if (type === 'preorder') return `Ships in approximately ${weeks} weeks`;
  return 'Ships in 6–13 business days (AU)';
}

export function ctaLabel(type: FulfillmentType): string {
  if (type === 'wishlist') return 'Join waitlist';
  if (type === 'preorder') return 'Reserve now';
  return 'Add to Bag';
}
