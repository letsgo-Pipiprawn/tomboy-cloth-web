import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SeoHead from '../components/SeoHead';

export default function NotFoundPage() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-8 text-center pt-32">
      <SeoHead title="Page Not Found" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-brand-slate uppercase tracking-[0.3em] text-xs mb-6">404</p>
        <h1 className="font-serif text-4xl md:text-6xl text-brand-white mb-6">Lost in neutral</h1>
        <p className="text-brand-slate text-sm max-w-md mb-10">
          This page doesn&apos;t exist. Return to the collection or studio.
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            to="/"
            className="bg-brand-white text-brand-black px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-brand-light-slate transition-colors"
          >
            Home
          </Link>
          <Link
            to="/collections/aw26"
            className="text-brand-white text-xs uppercase tracking-widest border-b border-brand-slate pb-1"
          >
            AW26
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
