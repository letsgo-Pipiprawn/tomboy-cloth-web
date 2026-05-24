import { useEffect } from 'react';
import { BRAND } from '../data/site';

type SeoHeadProps = {
  title: string;
  description?: string;
};

export default function SeoHead({ title, description }: SeoHeadProps) {
  useEffect(() => {
    document.title = `${title} | ${BRAND.name}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [title, description]);

  return null;
}
