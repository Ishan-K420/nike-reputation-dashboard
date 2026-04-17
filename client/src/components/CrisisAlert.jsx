import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   CrisisAlert
   Fixed, pointer-events-none overlay.
   When any product drops below Score < 50, a
   soft red ambient glow pulses at the viewport
   edges — drawing the eye without disrupting UX.
   Props: products[]
───────────────────────────────────────────── */
const CRISIS_THRESHOLD = 50;

export default function CrisisAlert({ products }) {
  const crisisProducts = products.filter(p => p.Score < CRISIS_THRESHOLD);
  const hasCrisis = crisisProducts.length > 0;

  return (
    <AnimatePresence>
      {hasCrisis && (
        <motion.div
          key="crisis"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 55,
            pointerEvents: 'none',
          }}
        >
          {/* Pulsing edge glow — 4 sides */}
          <motion.div
            animate={{ opacity: [0.12, 0.38, 0.12] }}
            transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 180px 60px rgba(239, 68, 68, 0.28)',
              borderRadius: 0,
            }}
          />

          {/* Crisis badge — top center */}
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            style={{
              position: 'absolute',
              top: 64,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(239, 68, 68, 0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 40,
              padding: '7px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              pointerEvents: 'none',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#ef4444',
                display: 'inline-block',
              }}
            />
            <span style={{
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#fca5a5',
              fontWeight: 600,
            }}>
              Crisis Alert — {crisisProducts.length} product{crisisProducts.length > 1 ? 's' : ''} critical
            </span>
            <span style={{
              fontSize: '0.6rem',
              color: 'rgba(252,165,165,0.6)',
              marginLeft: 4,
            }}>
              Score &lt; {CRISIS_THRESHOLD}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
