import { motion } from 'motion/react';
import { Truck, RotateCcw, Shield, MapPin } from 'lucide-react';
import { AU_COMMERCE } from '../data/site';
import { formatPrice } from '../data/products';

const items = [
  {
    icon: Truck,
    title: 'AU-wide delivery',
    desc: `Free over ${formatPrice(AU_COMMERCE.freeShippingThresholdAud)}`,
  },
  {
    icon: RotateCcw,
    title: `${AU_COMMERCE.returnsDays}-day returns`,
    desc: 'Unworn, tags on',
  },
  {
    icon: Shield,
    title: 'Secure checkout',
    desc: 'Stripe (coming soon)',
  },
  {
    icon: MapPin,
    title: 'Melbourne studio',
    desc: 'Dispatched 1–2 days',
  },
];

export default function TrustBar() {
  return (
    <section className="py-16 border-y border-brand-slate/20 bg-[#0d0d0d]">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <item.icon className="w-5 h-5 text-brand-slate mb-4 stroke-[1.25]" />
              <h3 className="text-xs uppercase tracking-widest text-brand-white mb-2">
                {item.title}
              </h3>
              <p className="text-brand-slate text-sm font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
