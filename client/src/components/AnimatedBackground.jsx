import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Blob palette — each blob has a light & dark color
───────────────────────────────────────────── */
const BLOBS = [
  {
    // Top-left — icy blue / midnight blue
    light: 'radial-gradient(circle, rgba(186,220,255,0.55) 0%, transparent 70%)',
    dark:  'radial-gradient(circle, rgba(20,60,160,0.55)  0%, transparent 70%)',
    size: 720,
    initial: { x: '-18%', y: '-20%' },
    animate: {
      x: ['-18%', '-6%', '-22%', '-10%', '-18%'],
      y: ['-20%', '-4%',  '8%',  '-14%', '-20%'],
      scale: [1, 1.06, 0.97, 1.04, 1],
    },
    duration: 26,
  },
  {
    // Top-right — pale silver / muted purple
    light: 'radial-gradient(circle, rgba(220,215,245,0.45) 0%, transparent 70%)',
    dark:  'radial-gradient(circle, rgba(90,30,140,0.45)  0%, transparent 70%)',
    size: 600,
    initial: { x: '60%', y: '-14%' },
    animate: {
      x: ['60%', '74%', '58%', '72%', '60%'],
      y: ['-14%', '4%', '-6%', '-18%', '-14%'],
      scale: [1, 0.95, 1.07, 0.98, 1],
    },
    duration: 32,
  },
  {
    // Bottom-left — soft sand / dark teal
    light: 'radial-gradient(circle, rgba(255,228,190,0.4) 0%, transparent 70%)',
    dark:  'radial-gradient(circle, rgba(10,80,100,0.45)  0%, transparent 70%)',
    size: 560,
    initial: { x: '-8%', y: '55%' },
    animate: {
      x: ['-8%', '6%', '-14%', '2%', '-8%'],
      y: ['55%', '68%', '60%', '48%', '55%'],
      scale: [1, 1.05, 0.94, 1.03, 1],
    },
    duration: 28,
  },
  {
    // Bottom-right — rose blush / deep indigo
    light: 'radial-gradient(circle, rgba(255,200,210,0.35) 0%, transparent 70%)',
    dark:  'radial-gradient(circle, rgba(50,20,110,0.4)   0%, transparent 70%)',
    size: 500,
    initial: { x: '68%', y: '60%' },
    animate: {
      x: ['68%', '56%', '72%', '62%', '68%'],
      y: ['60%', '72%', '54%', '66%', '60%'],
      scale: [1, 1.08, 0.96, 1.02, 1],
    },
    duration: 36,
  },
];

/* ─────────────────────────────────────────────
   AnimatedBackground
   Props: isDark — boolean
───────────────────────────────────────────── */
export default function AnimatedBackground({ isDark }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        /* Base canvas colour */
        backgroundColor: isDark ? '#000' : '#fff',
        transition: 'background-color 2.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          initial={{ x: blob.initial.x, y: blob.initial.y, scale: 1 }}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            /* Colour cross-dissolve is done purely via CSS transition on background */
            background: isDark ? blob.dark : blob.light,
            filter: 'blur(120px)',
            transition: 'background 2.6s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
