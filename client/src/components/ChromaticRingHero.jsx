import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────
   CHROMATIC RING PULSE  — Apple AirPods style
   Extracted from nike-chromatic-ring.html
   Technique:
   - Multiple concentric arcs drawn as polylines
   - Each arc has 3 colour channels (R, G, B) spatially
     offset from each other — chromatic aberration
   - Arcs "breathe" (radius pulses), rotate slowly,
     and have a wave-warp along their circumference
   - On dark:  vivid saturated colours, mid opacity
   - On light: same hues but rendered via
               globalCompositeOperation 'multiply'
               so they darken the white bg instead
───────────────────────────────────────────────────── */

const RINGS = [
  { r: 330, span: 2 * Math.PI, spd:  0.00028, wf: 7,  wa: 6, hue: [0,   30,  55]  },
  { r: 312, span: 2 * Math.PI, spd: -0.00035, wf: 9,  wa: 4, hue: [190, 210, 240] },
  { r: 348, span: 2 * Math.PI, spd:  0.00020, wf: 11, wa: 5, hue: [270, 290, 320] },
  { r: 295, span: 2 * Math.PI, spd: -0.00022, wf: 6,  wa: 8, hue: [100, 140, 165] },
  { r: 362, span: 2 * Math.PI, spd:  0.00040, wf: 13, wa: 3, hue: [340, 15,  40]  },
];

const SEGMENTS = 120;
const CHROMA   = 3.5;
const LINE_W   = 3.5;

export default function ChromaticRingHero({ isDark = true, products = [] }) {
  const canvasRef = useRef(null);
  const isDarkRef = useRef(isDark);
  const rafRef    = useRef(null);

  // Keep ref in sync so the render loop always sees the latest theme
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function buildArcPoints(ring, t, channelIndex) {
      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;
      const breathe  = Math.sin(t * 0.0008) * 45;
      const phase    = t * ring.spd + channelIndex * 0.012;
      const chromaR  = (channelIndex - 1) * CHROMA;

      const pts = [];
      for (let i = 0; i <= SEGMENTS; i++) {
        const frac  = i / SEGMENTS;
        const angle = phase + frac * ring.span;
        const warp  = Math.sin(angle * ring.wf + t * 0.0009 + channelIndex * 1.1) * ring.wa;
        const r     = ring.r + breathe + chromaR + warp;
        pts.push([
          cx + Math.cos(angle) * r,
          cy + Math.sin(angle) * (r * 0.92),
        ]);
      }
      return pts;
    }

    function drawArc(pts, color, alpha) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.strokeStyle = color;
      ctx.lineWidth   = LINE_W;
      ctx.globalAlpha = alpha;
      ctx.stroke();
    }

    function drawVignette() {
      // Vignette removed
    }

    function render(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = isDarkRef.current ? 'screen' : 'multiply';

      RINGS.forEach((ring) => {
        [0, 1, 2].forEach((ch) => {
          const hue   = ring.hue[ch];
          const sat   = isDarkRef.current ? '90%' : '80%';
          const lgt   = isDarkRef.current ? '60%' : '40%';
          const alpha = isDarkRef.current ? 0.55  : 0.45;
          const color = `hsl(${hue},${sat},${lgt})`;
          const pts   = buildArcPoints(ring, t, ch);
          drawArc(pts, color, alpha);
        });
      });

      drawVignette();
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* derive stats from live products */
  const avgScore  = products.length
    ? (products.reduce((s, p) => s + p.Score, 0) / products.length).toFixed(1)
    : '—';
  const atRisk    = products.filter(p => p.Score < 80).length;
  const totalProd = products.length || 100;

  const dark = isDark;

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: isDark ? '#000' : '#fff',
        transition: 'background 0.5s',
      }}
    >
      {/* ── Canvas ring ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero text ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 2rem',
          fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            transition: 'color 0.5s',
          }}
        >
          Real-Time Sentiment Analysis
        </p>

        <h1
          style={{
            fontSize: 'clamp(58px, 8.5vw, 112px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: isDark ? '#fff' : '#0a0a0a',
            transition: 'color 0.5s',
          }}
        >
          Nike Brand<br />Reputation
        </h1>

        <p
          style={{
            marginTop: '1.4rem',
            fontSize: 15,
            lineHeight: 1.7,
            color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            transition: 'color 0.5s',
          }}
        >
          Monitoring {totalProd} products across 6 categories.<br />
          Powered by live social media sentiment data.
        </p>

        {/* ── Stats bar ── */}
        <div
          style={{
            display: 'flex',
            marginTop: '3.5rem',
            borderRadius: 14,
            overflow: 'hidden',
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            transition: 'background 0.5s, border-color 0.5s',
          }}
        >
          {[
            { num: avgScore, label: 'Average Score', alert: 'Needs Attention' },
            { num: totalProd, label: 'Products Monitored', alert: null },
            { num: atRisk || '—', label: 'At Risk',  alert: 'Score < 80' },
          ].map((stat, i, arr) => (
            <div
              key={i}
              style={{
                padding: '1.2rem 2.5rem',
                textAlign: 'center',
                borderRight: i < arr.length - 1
                  ? `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
                  : 'none',
                transition: 'border-color 0.5s',
              }}
            >
              <div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  color: isDark ? '#fff' : '#0a0a0a',
                  transition: 'color 0.5s',
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: 3,
                  color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                  transition: 'color 0.5s',
                }}
              >
                {stat.label}
              </div>
              {stat.alert && (
                <div style={{ fontSize: 11, color: '#ef4444', marginTop: 2 }}>
                  {stat.alert}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          animation: 'chroBob 2.4s ease-in-out infinite',
          color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
          transition: 'color 0.5s',
          fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        Scroll
        <div
          style={{
            width: 1,
            height: 28,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-100%',
              left: 0,
              width: 1,
              height: '100%',
              background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              animation: 'chroDrip 2.4s ease-in-out infinite',
              transition: 'background 0.5s',
            }}
          />
        </div>
      </div>

      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes chroBob  { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(5px)} }
        @keyframes chroDrip { 0%{top:-100%} 100%{top:200%} }
      `}</style>
    </section>
  );
}
