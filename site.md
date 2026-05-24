> Superseded by [brand-and-site-spec.md](./brand-and-site-spec.md)

# Project: AXIS / NEUTRAL - Cinematic E-commerce Site

## 1. Tech Stack
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS
- Animation: Framer Motion
- Database/Storage: Supabase (PostgreSQL)
- Payments: Stripe API Integration
- Deployment: Vercel (Frontend) / Railway (Backend API)

## 2. Core Components Structure
- `Navbar.tsx`: Sticky, minimalist, glassmorphic effect.
- `HeroSection.tsx`: Full-screen auto-playing video with muted/loop/autoplay/playsInline.
- `ProductCarousel.tsx`: Horizontal scroll list of product cards.
- `ProductCard.tsx`: AI-generated model image, title, price, hover-zoom effect, grayscale-to-color transition.
- `StripeButton.tsx`: Integration to trigger Stripe Checkout session.

## 3. Pages Requirements
- `/page.tsx`: Landing page with cinematic video hero and horizontal collections.
- `/shop/[slug].tsx`: Product Detail Page (PDP) with high-res zoomable images and storytelling description.
- `/cart.tsx`: Simple side-drawer cart.

## 4. Performance & UX Rules
- Use `framer-motion` for smooth layout transitions.
- Lazy load images/videos using `next/image` and native `<video>` tag with poster images.
- All assets (images/videos) should be hosted on a CDN (Supabase Storage or Cloudflare R2).
- Font: Serif for headers (Cormorant Garamond), Sans-serif for body (Inter).

## 5. Development Workflow
1. Initialize Next.js with Tailwind and TypeScript.
2. Setup Supabase client for product data fetching.
3. Implement Horizontal Scroll for collections using `framer-motion`.
4. Configure Stripe Checkout session handling.
5. Setup deployment pipeline for Vercel.