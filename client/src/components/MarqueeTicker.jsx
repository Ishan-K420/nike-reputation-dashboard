import { useMemo } from 'react';

/* ─────────────────────────────────────────────
   MarqueeTicker
   Fixed bottom bar — infinitely scrolling live
   activity feed with simulated social handles.
   Props: activityLog[], isDark
───────────────────────────────────────────── */

const HANDLES = [
  'SneakerHead99', 'NikeFreak', 'JordanFan', 'StreetWearKing',
  'RunnerElite', 'KickCollector', 'SoleTrader', 'HypeBeast42',
  'BasketballJunkie', 'UrbanStyle', 'AthleticPro', 'NikePurist',
];

const SENTIMENTS = [
  'Incredibly comfortable for long runs.',
  'The colorway is absolutely fire 🔥',
  'Worth every penny — premium quality.',
  'Not feeling the new silhouette...',
  'Sold out everywhere. Hype is real.',
  'Hands down the best Jordan collab.',
  'Sizing runs a little small, heads up.',
  'The cushioning is next level.',
  'Overpriced for what you get honestly.',
  'My go-to shoe for the past 3 months.',
];

function buildTickerItems(activityLog) {
  if (activityLog.length === 0) {
    /* Fallback simulated items */
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      handle: HANDLES[i % HANDLES.length],
      text: SENTIMENTS[i % SENTIMENTS.length],
      delta: (((i * 7) % 5) - 2) * 0.4,
    }));
  }
  return activityLog.slice(0, 20).map((entry, i) => ({
    id: entry.id || i,
    handle: HANDLES[i % HANDLES.length],
    text: `${entry.name}: score changed from ${entry.oldScore} → ${entry.newScore}`,
    delta: entry.delta,
  }));
}

export default function MarqueeTicker({ activityLog, isDark }) {
  const items = useMemo(() => buildTickerItems(activityLog), [activityLog]);

  /* Duplicate items so the loop is seamless */
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 36,
        overflow: 'hidden',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        background: isDark
          ? 'rgba(0,0,0,0.65)'
          : 'rgba(255,255,255,0.7)',
        borderTop: isDark
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid rgba(0,0,0,0.06)',
        transition: 'background 1.2s ease',
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: isDark
          ? 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 6%, transparent 94%, rgba(0,0,0,0.8) 100%)'
          : 'linear-gradient(to right, rgba(255,255,255,0.9) 0%, transparent 6%, transparent 94%, rgba(255,255,255,0.9) 100%)',
      }} />

      {/* Scrolling track */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          height: '100%',
          gap: 0,
        }}
      >
        {doubled.map((item, idx) => (
          <span
            key={`${item.id}-${idx}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              paddingRight: 40,
              fontSize: '0.68rem',
              fontFamily: "'Inter', monospace",
              color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
            }}
          >
            <span style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>
              @{item.handle}:
            </span>
            <span>&quot;{item.text}&quot;</span>
            <span style={{
              fontSize: '0.6rem',
              fontWeight: 600,
              color: item.delta > 0 ? '#10b981' : item.delta < 0 ? '#ef4444' : '#9ca3af',
            }}>
              ({item.delta > 0 ? '+' : ''}{item.delta.toFixed(1)})
            </span>
            <span style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', paddingRight: 10 }}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
