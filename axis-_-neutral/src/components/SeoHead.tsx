import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  ORGANIZATION_JSON_LD,
  absoluteUrl,
  getSiteOrigin,
  pageTitle,
} from '../lib/seo';
import { BRAND } from '../data/site';

type SeoHeadProps = {
  title: string;
  description?: string;
  /** Path override for canonical (defaults to current route). */
  path?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
  root: ParentNode = document.head,
) {
  const selector = `meta[${attribute}="${key}"]`;
  let el = root.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    root.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image,
  noindex = false,
  jsonLd,
}: SeoHeadProps) {
  const location = useLocation();
  const canonicalPath = path ?? `${location.pathname}${location.search}`;
  const fullTitle = pageTitle(title);
  const origin = getSiteOrigin();
  const canonical = `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const ogImage = image ? absoluteUrl(image) : absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', BRAND.name);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:locale', 'en_AU');
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertLink('canonical', canonical);

    const ld = jsonLd ?? (location.pathname === '/' ? ORGANIZATION_JSON_LD : undefined);
    if (ld) {
      upsertJsonLd('seo-json-ld', ld);
    } else {
      document.getElementById('seo-json-ld')?.remove();
    }
  }, [fullTitle, description, canonical, ogImage, noindex, jsonLd, location.pathname]);

  return null;
}
