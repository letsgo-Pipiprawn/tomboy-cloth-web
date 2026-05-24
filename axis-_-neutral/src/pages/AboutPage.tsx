import { motion } from 'motion/react';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import SeoHead from '../components/SeoHead';
import { BRAND } from '../data/site';

export default function AboutPage() {
  return (
    <main>
      <SeoHead title="About" description={`${BRAND.name} studio — Melbourne tailoring for the modern city.`} />
      <PageHero
        label="The Studio"
        title="Built for the In-Between"
        subtitle="AXIS / NEUTRAL exists at the intersection of masculine tailoring and feminine restraint — tomboy form, city pace, neutral palette."
        image="/images/about-studio.png"
        tall
      />

      <section className="py-24 px-8 md:px-16 max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel className="mb-6">Our Thesis</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-white mb-8 leading-snug">
              We define the architecture of the modern wardrobe.
            </h2>
            <div className="space-y-6 text-brand-light-slate text-sm leading-relaxed">
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
            className="space-y-12"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#111]">
              <img
                src="/images/about-studio.png"
                alt="AXIS / NEUTRAL studio"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 border-t border-brand-slate/20 pt-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-slate mb-2">Founded</p>
                <p className="font-serif text-xl text-brand-white">2024</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-slate mb-2">Studio</p>
                <p className="font-serif text-xl text-brand-white">Melbourne</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-slate mb-2">Production</p>
                <p className="font-serif text-xl text-brand-white">EU</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-slate mb-2">Contact</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="font-serif text-xl text-brand-white hover:text-brand-slate transition-colors"
                >
                  Studio
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16 bg-[#0d0d0d] border-y border-brand-slate/20">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel className="mb-6">Values</SectionLabel>
          <h2 className="font-serif text-2xl md:text-3xl text-brand-white mb-12">
            Three principles, no compromise
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-left md:text-center">
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
                <h3 className="text-brand-white text-sm uppercase tracking-widest mb-4">
                  {item.title}
                </h3>
                <p className="text-brand-slate text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
