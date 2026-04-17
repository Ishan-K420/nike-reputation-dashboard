import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

/* ─── Scroll phase narrative text ─── */
const PHASES = [
  { primary: 'Monitoring the global conversation.', secondary: 'Millions of data points.',    range: [0.05, 0.30], peak: [0.12, 0.23] },
  { primary: 'Distilled into a single source of truth.', secondary: null,                    range: [0.36, 0.62], peak: [0.43, 0.56] },
  { primary: 'Every metric, isolated.',                  secondary: null,                    range: [0.68, 0.97], peak: [0.75, 0.91] },
];
function ramp(p, a, b) { if (p <= a) return 0; if (p >= b) return 1; return (p - a) / (b - a); }
function phaseOp(p, { range: [rs, re], peak: [ps, pe] }) {
  if (p < rs || p > re) return 0;
  if (p >= ps && p <= pe) return 1;
  return p < ps ? ramp(p, rs, ps) : 1 - ramp(p, pe, re);
}

/* ═══════════════════════════════════════════
   CANVAS — sonar rings + floating particles
   (drawn on top of the video background)
   Canvas fills itself with a dark gradient first
   so it is OPAQUE and blocks any elements below.
═══════════════════════════════════════════ */
class SonarRing {
  constructor(cx, cy, maxR) {
    this.cx = cx; this.cy = cy; this.maxR = maxR;
    this.r = 0;
    this.speed = 0.7 + Math.random() * 0.8;
    this.hue   = 185 + Math.random() * 90;
    this.lw    = 0.8 + Math.random() * 1.2;
  }
  tick()  { this.r += this.speed; }
  dead()  { return this.r > this.maxR; }
  a()     { return Math.max(0, 1 - this.r / this.maxR); }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${this.hue},90%,68%,${this.a() * 0.55})`;
    ctx.lineWidth   = this.lw;
    ctx.stroke();
  }
}

class Particle {
  constructor(W, H) { this.W = W; this.H = H; this.reset(true); }
  reset(init = false) {
    this.x     = Math.random() * this.W;
    this.y     = init ? Math.random() * this.H : this.H + 8;
    this.vx    = (Math.random() - 0.5) * 0.35;
    this.vy    = -(0.18 + Math.random() * 0.42);
    this.r     = 0.8 + Math.random() * 1.8;
    this.alpha = 0.18 + Math.random() * 0.35;
    this.hue   = 175 + Math.random() * 110;
  }
  tick() { this.x += this.vx; this.y += this.vy; if (this.y < -8) this.reset(); }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue},85%,70%,${this.alpha})`;
    ctx.fill();
  }
}

function startCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  let raf, rings = [], particles = [], lastRing = 0;
  const RING_MS = 1600;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    particles = Array.from({ length: 60 }, () => new Particle(W, H));
  }
  resize();
  window.addEventListener('resize', resize);

  function draw(t) {
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const cx = W / 2, cy = H / 2;
    const maxR = Math.min(W, H) * 0.44;

    /* ── Opaque dark background (blocks everything beneath) ── */
    const bg = ctx.createRadialGradient(cx, cy * 0.9, 0, cx, cy, maxR * 1.6);
    bg.addColorStop(0,   '#0a1628');
    bg.addColorStop(0.5, '#050d1a');
    bg.addColorStop(1,   '#02060f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* ── Sonar rings ── */
    if (t - lastRing > RING_MS) { rings.push(new SonarRing(cx, cy, maxR)); lastRing = t; }
    rings = rings.filter(r => { r.tick(); r.draw(ctx); return !r.dead(); });

    /* ── Particles ── */
    particles.forEach(p => { p.tick(); p.draw(ctx); });

    /* ── Rotating chromatic halo arcs ── */
    const rot = t * 0.00025;
    for (let i = 0; i < 3; i++) {
      const radius = maxR * (0.72 + i * 0.10);
      const hueBase = 195 + i * 55;
      const grad = ctx.createConicalGradient
        ? ctx.createConicalGradient(cx, cy, rot + i * 1.1) // non-standard, skip if absent
        : null;

      /* Fallback: simple arc stroke with alpha pulse */
      const pulse = Math.sin(t * 0.0009 + i * 1.3) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, rot + i * 0.4, rot + i * 0.4 + Math.PI * 1.2);
      ctx.strokeStyle = `hsla(${hueBase + pulse * 30},90%,65%,${0.04 + pulse * 0.06})`;
      ctx.lineWidth = 8 + i * 4;
      ctx.stroke();
    }

    /* ── Central data pulse dot ── */
    const pulse = Math.sin(t * 0.0018) * 0.5 + 0.5;
    const dotR  = 3 + pulse * 4;
    const glow  = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40 + pulse * 20);
    glow.addColorStop(0,   `rgba(80,180,255,${0.6 + pulse * 0.3})`);
    glow.addColorStop(0.3, `rgba(80,180,255,${0.12})`);
    glow.addColorStop(1,   'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(cx - 60, cy - 60, 120, 120);
    ctx.beginPath();
    ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(160,220,255,${0.8 + pulse * 0.2})`;
    ctx.fill();

    raf = requestAnimationFrame(draw);
  }

  raf = requestAnimationFrame(draw);
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
}

/* ═════════════════════════════════════════════
   VideoScrubber — hero section component
═════════════════════════════════════════════ */
export default function VideoScrubber() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const textRefs     = useRef(PHASES.map(() => ({ wrap: null })));
  const scrollIndRef = useRef(null);

  /* ── Canvas animation (always running) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return startCanvas(canvas);
  }, []);

  /* ── GSAP ScrollTrigger pin + phase text reveals ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let trigger = null;

    const id = requestAnimationFrame(() => {
      if (trigger) return;
      trigger = ScrollTrigger.create({
        trigger:    container,
        start:      'top top',
        end:        '+=300%',
        pin:        true,
        scrub:      true,
        pinSpacing: true,
        onUpdate(self) {
          const p = self.progress;
          if (scrollIndRef.current) {
            scrollIndRef.current.style.opacity = String(Math.max(0, 1 - ramp(p, 0, 0.05)));
          }
          textRefs.current.forEach((r, i) => {
            if (r.wrap) r.wrap.style.opacity = String(phaseOp(p, PHASES[i]));
          });
        },
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(id);
      if (trigger) { trigger.kill(); trigger = null; }
    };
  }, []);

  const setRef = (i) => (el) => { textRefs.current[i].wrap = el; };

  return (
    /*
     * z-index: 10 ensures this section sits ABOVE the App's
     * position:fixed AnimatedBackground (z-index:-1) and any
     * other fixed elements that may bleed into this viewport.
     */
    <div
      ref={containerRef}
      style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        zIndex:     10,
        overflow:   'hidden',
        background: '#02060f',   /* fallback while canvas paints */
      }}
    >
      {/* ── Canvas (opaque background + animations) ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          display: 'block', zIndex: 0,
        }}
      />

      {/* ── Video plays silently in background; adds real motion ── */}
      <video
        src={VIDEO_SRC}
        muted playsInline preload="auto" autoPlay loop
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 0.12,          /* subtle — visible fire glow */
          mixBlendMode: 'screen', /* blends with dark canvas bg */
          zIndex: 1,
        }}
      />

      {/* ── Main title — CSS gradient clip (MacBook-style shimmer) ── */}
      <h1
        style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -56%)',
          margin:        0,
          fontSize:      'clamp(3.5rem, 12vw, 11rem)',
          fontWeight:    900,
          letterSpacing: '-0.04em',
          lineHeight:    1,
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          zIndex:        3,
          background:    'linear-gradient(135deg, #ffffff 0%, #93c5fd 18%, #c4b5fd 36%, #f9a8d4 54%, #ffffff 72%, #93c5fd 90%)',
          backgroundSize:'350% 350%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          backgroundClip:'text',
          animation:     'shimmerText 3.5s linear infinite',
          filter:        'drop-shadow(0 0 60px rgba(96,165,250,0.35))',
        }}
      >
        BRAND INTEL
      </h1>

      {/* ── Sub-title ── */}
      <p style={{
        position:      'absolute',
        top:           '50%',
        left:          '50%',
        transform:     'translate(-50%, 180%)',
        margin:        0,
        fontSize:      'clamp(0.65rem, 1.6vw, 0.9rem)',
        fontWeight:    400,
        letterSpacing: '0.38em',
        textTransform: 'uppercase',
        whiteSpace:    'nowrap',
        color:         'rgba(255,255,255,0.28)',
        fontFamily:    "'Inter', -apple-system, sans-serif",
        pointerEvents: 'none',
        zIndex:        3,
      }}>
        Nike Real-Time Reputation Monitor
      </p>

      {/* ── Phase scroll text overlays ── */}
      {PHASES.map((ph, i) => (
        <div key={i} ref={setRef(i)} style={{
          position:      'absolute',
          bottom:        '14%',
          left:          '50%',
          transform:     'translateX(-50%)',
          width:         '90%',
          maxWidth:      680,
          textAlign:     'center',
          opacity:       0,
          pointerEvents: 'none',
          zIndex:        4,
        }}>
          <p style={{
            margin:        0,
            fontSize:      'clamp(1.5rem, 3.5vw, 2.7rem)',
            fontWeight:    300,
            letterSpacing: '-0.02em',
            lineHeight:    1.28,
            color:         'rgba(255,255,255,0.92)',
            fontFamily:    "'Inter', -apple-system, sans-serif",
            textShadow:    '0 0 80px rgba(96,165,250,0.45)',
          }}>
            {ph.primary}
          </p>
          {ph.secondary && (
            <p style={{
              margin:  '11px 0 0',
              fontSize:'clamp(0.82rem, 1.8vw, 1rem)',
              fontWeight: 300,
              letterSpacing: '0.07em',
              color:   'rgba(255,255,255,0.36)',
              fontFamily: "'Inter', -apple-system, sans-serif",
            }}>
              {ph.secondary}
            </p>
          )}
        </div>
      ))}

      {/* ── Scroll indicator ── */}
      <div ref={scrollIndRef} style={{
        position: 'absolute', bottom: 28, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        zIndex: 5, pointerEvents: 'none',
      }}>
        <div className="scroll-chevron" />
        <span style={{
          fontSize: '0.6rem', textTransform: 'uppercase',
          letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)',
          fontFamily: "'Inter', sans-serif",
        }}>
          Scroll
        </span>
      </div>

      {/* Wordmark */}
      <span style={{
        position: 'absolute', bottom: 28, right: 28,
        fontSize: '0.55rem', textTransform: 'uppercase',
        letterSpacing: '0.38em', color: 'rgba(255,255,255,0.1)',
        pointerEvents: 'none', zIndex: 5,
      }}>
        Nike Brand Intelligence
      </span>
    </div>
  );
}
