import type { Product } from '../data/products';
import {
  getProductCopy,
  isSupplierPlaceholderCopy,
  type ProductSpec,
  type SizeChartRow,
} from '../data/productCopy';

export type { ProductSpec, SizeChartRow };

function specsToDetails(specs: ProductSpec[]): string[] {
  return specs.map((spec) => `${spec.label} · ${spec.value}`);
}

export function presentProduct(product: Product): Product {
  const copy = getProductCopy(product.slug);

  if (!copy) {
    const fallbackSpecs: ProductSpec[] = product.details
      .filter((line) => !isSupplierPlaceholderCopy(line))
      .map((line) => {
        const [label, ...rest] = line.split('·');
        if (rest.length > 0) {
          return { label: label.trim(), value: rest.join('·').trim() };
        }
        return { label: 'Detail', value: line.trim() };
      });

    return {
      ...product,
      description: isSupplierPlaceholderCopy(product.description)
        ? 'Refined neutral piece from the AXIS / NEUTRAL collection.'
        : product.description,
      story: isSupplierPlaceholderCopy(product.story) ? '' : product.story,
      details: isSupplierPlaceholderCopy(product.details.join(' '))
        ? fallbackSpecs.map((s) => `${s.label} · ${s.value}`)
        : product.details,
      specs: fallbackSpecs,
      sizeChart: [],
      fitNote: isSupplierPlaceholderCopy(product.story) ? '' : product.story,
    };
  }

  return {
    ...product,
    name: copy.name,
    description: copy.description,
    story: copy.fitNote,
    details: specsToDetails(copy.specs),
    sizes: copy.sizes,
    specs: copy.specs,
    sizeChart: copy.sizeChart,
    fitNote: copy.fitNote,
  };
}

export function presentCatalog(products: Product[]): Product[] {
  return products.map(presentProduct);
}
