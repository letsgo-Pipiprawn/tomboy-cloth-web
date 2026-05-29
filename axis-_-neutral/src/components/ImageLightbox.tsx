import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ImageLightboxProps = {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
};

export default function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close image zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-brand-black/90 backdrop-blur-sm cursor-zoom-out"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Product image zoom"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed inset-4 md:inset-10 z-[56] flex items-center justify-center pointer-events-none"
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain pointer-events-auto cursor-zoom-out"
              onClick={onClose}
            />
          </motion.div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="fixed top-6 right-6 z-[57] text-brand-white/80 hover:text-brand-white"
          >
            <X className="w-6 h-6" />
          </button>
        </>
      )}
    </AnimatePresence>
  );
}
