'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface CrisisOverlayProps {
  onClose: () => void;
}

export default function CrisisOverlay({ onClose }: CrisisOverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-midnight/95 backdrop-blur-xl flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="max-w-md w-full space-y-6 text-center"
        >
          {/* Warm header */}
          <div className="space-y-3">
            <span className="text-5xl">💛</span>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              You don&apos;t have to carry this alone.
            </h2>
            <p className="text-text-muted font-body leading-relaxed">
              What you&apos;re feeling is real, and it matters. Please reach out to someone who can help — you deserve support right now.
            </p>
          </div>

          {/* Helplines */}
          <div className="glass-card p-5 space-y-4 text-left">
            <h3 className="font-display font-semibold text-coral text-sm uppercase tracking-wider">
              Immediate Support
            </h3>

            <div className="space-y-3">
              <a
                href="tel:9152987821"
                className="flex justify-between items-center p-3 bg-midnight-light rounded-xl hover:bg-midnight-border transition-colors"
              >
                <div>
                  <p className="font-display font-semibold text-text-primary text-sm">iCall</p>
                  <p className="text-xs text-text-muted">Professional counseling</p>
                </div>
                <span className="text-coral font-display font-bold">9152987821</span>
              </a>

              <a
                href="tel:18005990019"
                className="flex justify-between items-center p-3 bg-midnight-light rounded-xl hover:bg-midnight-border transition-colors"
              >
                <div>
                  <p className="font-display font-semibold text-text-primary text-sm">Kiran Mental Health</p>
                  <p className="text-xs text-text-muted">Free, 24/7, multilingual</p>
                </div>
                <span className="text-coral font-display font-bold">1800-599-0019</span>
              </a>

              <a
                href="tel:18602662345"
                className="flex justify-between items-center p-3 bg-midnight-light rounded-xl hover:bg-midnight-border transition-colors"
              >
                <div>
                  <p className="font-display font-semibold text-text-primary text-sm">Vandrevala Foundation</p>
                  <p className="text-xs text-text-muted">24/7 helpline</p>
                </div>
                <span className="text-coral font-display font-bold">1860-2662-345</span>
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="btn-ghost w-full text-sm"
            >
              I&apos;d like to continue journaling
            </button>
            <p className="text-[11px] text-text-dim">
              MindFlow is a wellness companion, not a substitute for professional help.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
