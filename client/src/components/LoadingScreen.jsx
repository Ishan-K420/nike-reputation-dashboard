import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   LoadingScreen — Cinematic entry (inspired by Brand Simulator)
   Full-screen overlay with branded logo + progress bar.
   Fades out after progress completes (~2.5s).
───────────────────────────────────────────── */

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf;
    let start = null;
    const DURATION = 2200; // ms

    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => onComplete?.(), 600);
        }, 300);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className="loading-screen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        background: '#0b0b0b',
        opacity: progress >= 100 ? 0 : 1,
        visibility: progress >= 100 ? 'hidden' : 'visible',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s',
      }}
    >
      {/* Logo */}
      <div style={{
        fontFamily: "'Antonio', sans-serif",
        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        fontWeight: 700,
        letterSpacing: '-3px',
        textTransform: 'uppercase',
        color: '#fff',
        lineHeight: 0.85,
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.15em',
      }}>
        <span>NIKE</span>
        <span style={{ color: '#ff2d00' }}>BRM</span>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 280,
        height: 1,
        background: 'rgba(255,255,255,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          background: '#fff',
          width: `${progress}%`,
          transition: 'width 0.1s linear',
        }} />
      </div>

      {/* Percentage */}
      <div style={{
        fontFamily: "'Antonio', sans-serif",
        fontSize: '0.75rem',
        letterSpacing: '4px',
        color: '#888',
        textTransform: 'uppercase',
      }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}
