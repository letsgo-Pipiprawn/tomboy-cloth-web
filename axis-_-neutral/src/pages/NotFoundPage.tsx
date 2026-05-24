import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SeoHead from '../components/SeoHead';

export default function NotFoundPage() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center container-site text-center section-content">
      <SeoHead title="Page Not Found" noindex />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="type-label text-brand-slate mb-8">404</p>
        <h1 className="type-h1 text-brand-white mb-8">Lost in neutral</h1>
        <p className="type-body-lg text-brand-slate max-w-md mb-12 mx-auto">
          This page doesn&apos;t exist. Return to the collection or studio.
        </p>
        <div className="flex gap-8 justify-center flex-wrap">
          <Link
            to="/"
            className="type-btn bg-brand-white text-brand-black px-9 py-4 hover:bg-brand-light-slate transition-colors"
          >
            Home
          </Link>
          <Link
            to="/collections/aw26"
            className="type-link text-brand-white border-b border-brand-slate pb-1"
          >
            AW26
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
