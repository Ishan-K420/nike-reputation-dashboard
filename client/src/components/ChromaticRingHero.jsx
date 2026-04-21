import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────
   CHROMATIC RING HERO — Restored with new branding
   "REAL-TIME BRAND INTELLIGENCE" headline
   Chromatic ring canvas animation behind text
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

export default function ChromaticRingHero({ products = [] }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

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

    function render(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Always use 'multiply' for light hero start
      ctx.globalCompositeOperation = 'multiply';

      RINGS.forEach((ring) => {
        [0, 1, 2].forEach((ch) => {
          const hue   = ring.hue[ch];
          const sat   = '80%';
          const lgt   = '40%';
          const alpha = 0.45;
          const color = `hsl(${hue},${sat},${lgt})`;
          const pts   = buildArcPoints(ring, t, ch);
          drawArc(pts, color, alpha);
        });
      });

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const totalProd = products.length || 100;

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#fff',
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
        }}
      >
        <p
          style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            color: 'var(--text-muted)',
            transition: 'color 0.4s',
          }}
        >
          Nike Brand Monitor · {totalProd} Products
        </p>

        <h1
          style={{
            fontFamily: "'Antonio', sans-serif",
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            fontSize: 'clamp(44px, 8.5vw, 120px)',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              display: 'block',
              color: 'var(--text-primary)',
              transition: 'color 0.4s',
            }}
          >
            Real-Time
          </span>
          <span
            style={{
              display: 'block',
              color: '#ff2d00',
              textShadow: '0 0 60px rgba(255,45,0,0.15)',
            }}
          >
            Brand
          </span>
          <span
            style={{
              display: 'block',
              color: 'var(--text-primary)',
              transition: 'color 0.4s',
            }}
          >
            Intelligence
          </span>
        </h1>

        <p
          style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            transition: 'color 0.4s',
            maxWidth: 480,
            margin: '1.8rem auto 0',
          }}
        >
          Monitoring {totalProd} products across 6 categories.<br />
          Powered by live social media sentiment data.
        </p>
      </div>

      {/* ── Scroll hint ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          animation: 'chroBob 2.4s ease-in-out infinite',
          color: 'var(--text-muted)',
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        Scroll
        <div style={{ width: 1, height: 35, position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: '-100%',
              left: 0,
              width: 1,
              height: '100%',
              background: 'var(--text-muted)',
              animation: 'chroDrip 2.4s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes chroBob  { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(5px)} }
        @keyframes chroDrip { 0%{top:-100%} 100%{top:200%} }
      `}</style>
    </section>
  );
}
