import { useMemo } from 'react';

/* ─────────────────────────────────────────────
   StatsTicker — Horizontal auto-scrolling brand metrics bar
   Dark strip between hero and dashboard.
   Inspired by Brand Simulator ticker section.
───────────────────────────────────────────── */

export default function StatsTicker({ products = [], activityLog = [], isDark }) {
  const metrics = useMemo(() => {
    if (!products.length) return [];

    const avgScore = (products.reduce((s, p) => s + p.Score, 0) / products.length).toFixed(1);
    const categories = [...new Set(products.map(p => p.Category))].length;
    const topScore = Math.max(...products.map(p => p.Score));
    const atRisk = products.filter(p => p.Score < 80).length;
    const excellent = products.filter(p => p.Score >= 90).length;

    return [
      { num: avgScore, label: 'Brand Score' },
      { num: `${products.length}`, label: 'Products Monitored' },
      { num: `${categories}`, label: 'Categories' },
      { num: `${topScore}`, label: 'Peak Score' },
      { num: `${atRisk}`, label: 'At Risk' },
      { num: `${excellent}`, label: 'Excellent Rated' },
      { num: `${activityLog.length}+`, label: 'Live Updates' },
      { num: '24/7', label: 'Real-Time Tracking' },
    ];
  }, [products, activityLog.length]);

  if (!metrics.length) return null;

  // Duplicate for seamless loop
  const doubled = [...metrics, ...metrics];

  return (
    <div
      className="stats-ticker-section"
      style={{
        background: isDark ? '#111' : '#111',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="stats-ticker-track">
        {doubled.map((item, idx) => (
          <div key={idx} className="stats-ticker-item">
            <span className="stats-ticker-dot" />
            <span className="stats-ticker-num">{item.num}</span>
            <span className="stats-ticker-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
