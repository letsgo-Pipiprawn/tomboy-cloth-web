import { motion } from 'motion/react';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import SeoHead from '../components/SeoHead';
import { BRAND } from '../data/site';

export default function AboutPage() {
  return (
    <main>
      <SeoHead
        title="About"
        description={`${BRAND.name} studio — Melbourne tailoring for the modern city.`}
        path="/about"
      />
      <PageHero
        label="The Studio"
        title="Built for the In-Between"
        subtitle="AXIS / NEUTRAL exists at the intersection of masculine tailoring and feminine restraint — tomboy form, city pace, neutral palette."
        image="/images/about-studio.png"
        imageAlt="AXIS / NEUTRAL Melbourne studio"
        tall
      />

      <section className="section-y container-site">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel className="mb-6">Our Thesis</SectionLabel>
            <h2 className="type-h2 text-brand-white mb-10">
              We define the architecture of the modern wardrobe.
            </h2>
            <div className="space-y-8 type-body-lg text-brand-light-slate">
              <p>
                Founded in {BRAND.location}, {BRAND.name} is a direct-to-consumer studio focused on
                androgynous tailoring and foundation pieces. We design for people who move between
                contexts — office, gallery, late dinner — without changing silhouette.
              </p>
              <p>
                Every garment is developed around proportion first: oversized without sloppiness,
                structured without armour. We work with mills in Italy and Portugal, and factories
                that share our standard for consistency over volume.
              </p>
              <p>
                Neutrality is not absence of personality. It is room for you to inhabit the clothes —
                not the other way around.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-14"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#111]">
              <img
                src="/images/about-studio.png"
                alt="AXIS / NEUTRAL studio"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-10 border-t border-brand-slate/20 pt-12">
              {[
                { label: 'Founded', value: '2024' },
                { label: 'Studio', value: 'Melbourne' },
                { label: 'Production', value: 'EU' },
                { label: 'Contact', value: 'Studio', href: `mailto:${BRAND.email}` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="type-label text-brand-slate mb-3">{item.label}</p>
                  {'href' in item && item.href ? (
                    <a
                      href={item.href}
                      className="type-h3 text-brand-white hover:text-brand-slate transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="type-h3 text-brand-white">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-y-sm container-narrow bg-[#0d0d0d] border-y border-brand-slate/20">
        <SectionLabel className="mb-6 text-center">Values</SectionLabel>
        <h2 className="type-h2 text-brand-white mb-14 text-center">
          Three principles, no compromise
        </h2>
        <div className="grid md:grid-cols-3 gap-14 md:gap-12 text-left md:text-center">
          {[
            {
              title: 'Material honesty',
              body: 'We name mills, publish fibre content, and avoid vague sustainability claims.',
            },
            {
              title: 'Proportion over trend',
              body: 'Silhouettes are designed to last seasons, not weeks.',
            },
            {
              title: 'Fewer, better objects',
              body: 'Capsule releases. No constant churn. Each piece must earn its place.',
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="type-label text-brand-white mb-5">{item.title}</h3>
              <p className="type-body text-brand-slate">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
