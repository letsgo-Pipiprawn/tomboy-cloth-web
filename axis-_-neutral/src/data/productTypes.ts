import type { FulfillmentMeta } from './fulfillment';
import type { ProductSpec, SizeChartRow } from './productCopy';

export type { FulfillmentMeta, FulfillmentType, SupplySource } from './fulfillment';

export type Product = {
  id: string;
  slug: string;
  name: string;
  priceAud: number;
  category: string;
  collectionSlug: string;
  image: string;
  images: string[];
  description: string;
  story: string;
  details: string[];
  sizes: string[];
  featured?: boolean;
  specs?: ProductSpec[];
  sizeChart?: SizeChartRow[];
  fitNote?: string;
} & FulfillmentMeta;
