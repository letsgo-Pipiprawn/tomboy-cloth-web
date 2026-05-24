import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductCarousel } from "@/components/ProductCarousel";
import { siteConfig } from "@/lib/site.config";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductCarousel />
      </main>
      <footer className="border-t border-white/10 bg-zinc-950 px-6 py-8 text-center text-xs text-zinc-500 sm:px-8">
        <p>
          © {siteConfig.footerYear} {siteConfig.brandName}
          {siteConfig.brandSubtitle}. All rights reserved.
        </p>
      </footer>
    </>
  );
}
