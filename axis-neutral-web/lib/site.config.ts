/**
 * Site-wide brand configuration.
 * Override via NEXT_PUBLIC_SITE_NAME (e.g. "AXIS" or "NEUTRAL").
 */
const envName = process.env.NEXT_PUBLIC_SITE_NAME?.trim();

export const siteConfig = {
  brandName: envName || "AXIS",
  brandSubtitle: envName === "NEUTRAL" ? "" : "/ NEUTRAL",
  tagline: "Cinematic essentials for the in-between.",
  heroCtaLabel: "Explore collections",
  collectionsAnchor: "#collections",
  footerYear: new Date().getFullYear(),
  social: {
    instagram: "#",
    email: "hello@axis-neutral.example",
  },
} as const;

export type SiteConfig = typeof siteConfig;
