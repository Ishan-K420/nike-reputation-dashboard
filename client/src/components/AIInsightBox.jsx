import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   AIInsightBox
   Frosted-glass box that types out a one-sentence
   AI-generated summary of live product data.
   Props: products[], isDark
───────────────────────────────────────────── */
export default function AIInsightBox({ products, isDark }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [blinkOn, setBlinkOn] = useState(true);
  const indexRef = useRef(0);
  const fullTextRef = useRef('');

  /* Build the insight sentence from live data */
  useEffect(() => {
    if (!products.length) return;
    const sorted = [...products].sort((a, b) => b.Score - a.Score);
    const best  = sorted[0];
    const worst = sorted[sorted.length - 1];
    const avg   = (products.reduce((s, p) => s + p.Score, 0) / products.length).toFixed(1);

    fullTextRef.current =
      `The ${best.Name} is currently driving the system average up to ${avg}, ` +
      `while the ${worst.Name} requires immediate attention at a score of ${worst.Score}.`;

    // Reset and retype whenever products data refreshes meaningfully
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);
  }, [products.length > 0 ? products[0]?.Name : null]);

  /* Typewriter loop */
  useEffect(() => {
    if (!fullTextRef.current) return;
    const iv = setInterval(() => {
      if (indexRef.current >= fullTextRef.current.length) {
        setDone(true);
        clearInterval(iv);
        return;
      }
      setDisplayed(fullTextRef.current.slice(0, indexRef.current + 1));
      indexRef.current += 1;
    }, 28);
    return () => clearInterval(iv);
  }, [fullTextRef.current]);

  /* Cursor blink */
  useEffect(() => {
    if (done) return;
    const iv = setInterval(() => setBlinkOn(b => !b), 530);
    return () => clearInterval(iv);
  }, [done]);

  if (!products.length) return null;

  return (
    <div
      className="ai-insight-box"
      style={{
        background: isDark ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.55)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderRadius: 16,
        padding: '22px 28px',
        maxWidth: 760,
        margin: '0 auto',
        transition: 'background 1.2s ease, border-color 1s ease',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{
          fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.35em',
          color: isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af',
        }}>
          AI Insight
        </span>
        <span style={{
          width: 5, height: 5, borderRadius: '50%', background: '#10b981',
          animation: 'livePulse 1.8s ease-in-out infinite',
          display: 'inline-block',
        }} />
      </div>

      {/* Typed text */}
      <p style={{
        fontSize: '0.92rem',
        lineHeight: 1.75,
        fontWeight: 300,
        color: isDark ? 'rgba(255,255,255,0.75)' : '#374151',
        fontFamily: "'Inter', sans-serif",
        transition: 'color 0.8s ease',
        minHeight: '1.6rem',
      }}>
        {displayed}
        {!done && (
          <span style={{
            display: 'inline-block',
            width: 2,
            height: '1em',
            background: isDark ? 'rgba(255,255,255,0.6)' : '#374151',
            marginLeft: 2,
            verticalAlign: 'middle',
            opacity: blinkOn ? 1 : 0,
            transition: 'opacity 0.1s',
          }} />
        )}
      </p>
    </div>
  );
}
