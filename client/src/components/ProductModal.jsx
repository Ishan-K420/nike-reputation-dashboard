import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import ScoreHistoryGraph from './ScoreHistoryGraph';
import ProductStoryTimeline from './ProductStoryTimeline';

/* ─────────────────────────────────────────────
   Deterministic radar data from ProdID + Score
   No random — same product always gets same shape
───────────────────────────────────────────── */
function getRadarData(product) {
  const seed = product.ProdID * 31;
  const b    = product.Score;
  const pseudo = (offset) => {
    const h = ((seed + offset) * 2654435761) >>> 0;
    return (h % 2100) / 100 - 10.5; // deterministic -10.5 to +10.5
  };
  return [
    { subject: 'Comfort',    A: Math.max(18, Math.min(99, b + pseudo(1))) },
    { subject: 'Price',      A: Math.max(18, Math.min(99, b + pseudo(2))) },
    { subject: 'Durability', A: Math.max(18, Math.min(99, b + pseudo(3))) },
    { subject: 'Style',      A: Math.max(18, Math.min(99, b + pseudo(4))) },
    { subject: 'Buzz',       A: Math.max(18, Math.min(99, b + pseudo(5))) },
  ];
}

function getScoreColor(score) {
  if (score >= 90) return { stroke: '#10b981', fill: 'rgba(16,185,129,0.18)' };
  if (score >= 80) return { stroke: '#f59e0b', fill: 'rgba(245,158,11,0.16)' };
  return { stroke: '#ef4444', fill: 'rgba(239,68,68,0.15)' };
}

function getCategoryBadge(cat = '') {
  const m = {
    lifestyle: 'badge-lifestyle', running: 'badge-running',
    basketball: 'badge-basketball', training: 'badge-training',
    skate: 'badge-skate', soccer: 'badge-soccer',
  };
  return m[cat.toLowerCase()] || 'badge-lifestyle';
}

const CIRCUMFERENCE = 2 * Math.PI * 42;

/* ─────────────────────────────────────────────
   ProductModal
   Props: product (null = closed), onClose, isDark
───────────────────────────────────────────── */
export default function ProductModal({ product, onClose, isDark }) {
  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              cursor: 'pointer',
            }}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            style={{
              position: 'fixed',
              inset: 0,
              margin: 'auto',
              zIndex: 201,
              width: '92vw',
              maxWidth: 540,
              height: 'fit-content',
              maxHeight: '88vh',
              overflowY: 'auto',
              background: isDark
                ? 'rgba(8, 8, 16, 0.92)'
                : 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              border: isDark
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(0,0,0,0.08)',
              borderRadius: 28,
              boxShadow: isDark
                ? '0 24px 80px rgba(0,0,0,0.7)'
                : '0 24px 80px rgba(0,0,0,0.18)',
              padding: '32px 32px 28px',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 18, right: 18,
                width: 30, height: 30, borderRadius: '50%',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280',
                fontSize: '1rem', lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Header */}
            <div style={{ marginBottom: 6 }}>
              <span className={`category-badge ${getCategoryBadge(product.Category)}`}>
                {product.Category}
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.65rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: isDark ? '#fff' : '#111827',
              marginBottom: 4,
              lineHeight: 1.2,
            }}>
              {product.Name}
            </h2>
            <p style={{
              fontSize: '0.8rem', color: isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af',
              marginBottom: 24, fontFamily: 'monospace',
            }}>
              ${product.Price}
            </p>

            {/* Score ring + current score */}
            <ModalScoreRing product={product} isDark={isDark} />

            {/* Divider */}
            <div style={{
              height: 1,
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
              margin: '24px 0',
            }} />

            {/* Radar section */}
            <p style={{
              fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.35em',
              color: isDark ? 'rgba(255,255,255,0.25)' : '#9ca3af',
              marginBottom: 14,
            }}>
              Metric Breakdown
            </p>

            <AnimatedRadar product={product} isDark={isDark} />

            {/* Score History Graph */}
            <ScoreHistoryGraph product={product} isDark={isDark} />

            {/* Product Story Timeline */}
            <ProductStoryTimeline product={product} isDark={isDark} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Score ring inside modal ── */
function ModalScoreRing({ product, isDark }) {
  const { stroke, fill } = getScoreColor(product.Score);
  const offset = CIRCUMFERENCE - (product.Score / 100) * CIRCUMFERENCE;
  const label = product.Score >= 90 ? 'Excellent' : product.Score >= 80 ? 'Good' : 'Needs Attention';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width={100} height={100} viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
        <circle cx={50} cy={50} r={42} fill="none"
          stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} strokeWidth={8} />
        <motion.circle
          cx={50} cy={50} r={42} fill="none"
          stroke={stroke} strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div>
        <p style={{
          fontSize: 'clamp(2rem, 8vw, 3rem)',
          fontWeight: 800, letterSpacing: '-0.04em',
          color: stroke, lineHeight: 1,
        }}>
          {product.Score}
        </p>
        <p style={{
          fontSize: '0.6rem', textTransform: 'uppercase',
          letterSpacing: '0.3em', marginTop: 4,
          color: isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af',
        }}>
          {label}
        </p>
      </div>
    </div>
  );
}

/* ── Animated RadarChart ── */
function AnimatedRadar({ product, isDark }) {
  const data = getRadarData(product);
  const { stroke, fill } = getScoreColor(product.Score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid
            stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: isDark ? 'rgba(255,255,255,0.4)' : '#6b7280',
              fontSize: 11,
              fontFamily: "'Inter', sans-serif",
            }}
          />
          <PolarRadiusAxis
            angle={90} domain={[0, 100]}
            tick={false} axisLine={false}
          />
          <Radar
            name={product.Name}
            dataKey="A"
            stroke={stroke}
            fill={fill}
            strokeWidth={2}
            dot={{ fill: stroke, strokeWidth: 0, r: 3 }}
          />
          <Tooltip
            contentStyle={{
              background: isDark ? 'rgba(0,0,0,0.88)' : '#fff',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              borderRadius: 10,
              fontSize: 12,
              color: isDark ? '#e5e7eb' : '#111827',
            }}
            formatter={(v) => [`${Math.round(v)}`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
