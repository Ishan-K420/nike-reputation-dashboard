import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneGlobe from './SceneGlobe';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════
   Jordan 1 High OG — stylised SVG side-profile
   viewBox: 0 0 600 300
═══════════════════════════════════════════════ */
const SHOE = {
  outsole: 'M 80 264 Q 62 278 76 290 L 524 280 Q 548 276 542 258 L 514 248 Q 310 260 100 256 Z',
  midsole: 'M 100 238 L 514 222 L 542 248 Q 310 260 76 256 Q 64 252 72 240 Z',
  upper:
    'M 100 238 C 80 196 74 158 92 128 C 114 94 162 74 224 68 C 286 62 342 74 386 100 C 418 120 436 150 440 188 L 514 230 L 542 248 Q 310 260 76 256 Q 64 250 72 240 Z',
  collar:
    'M 386 100 C 408 78 434 64 454 70 C 476 80 480 114 472 152 C 466 176 448 200 440 216',
  tongue: 'M 258 66 C 250 36 266 16 288 8 L 310 24 C 292 38 278 56 282 68',
  swoop:  'M 120 188 Q 200 154 296 144 Q 340 140 356 150 Q 342 166 290 170 Q 194 180 128 218',
  lace1:  'M 216 160 L 320 146',
  lace2:  'M 320 146 L 400 136',
  lace3:  'M 210 178 L 186 192',
  lace4:  'M 320 128 L 398 118',
};

/* ── Metric tiles for Act III ── */
const TILES = [
  { label: 'Price Sentiment',  icon: '↑', color: '#2563eb', glow: 'rgba(37,99,235,0.35)',  dx: -220, dy: -200 },
  { label: 'Style Trends',     icon: '✦', color: '#7c3aed', glow: 'rgba(124,58,237,0.35)', dx:  220, dy: -200 },
  { label: 'Comfort Metrics',  icon: '◉', color: '#059669', glow: 'rgba(5,150,105,0.35)',  dx: -220, dy:  200 },
  { label: 'Market Buzz',      icon: '▲', color: '#d97706', glow: 'rgba(217,119,6,0.35)',  dx:  220, dy:  200 },
];

/* ════════════════════════════════════════════
   CinematicSequence
   400vh wrapper → sticky 100vh panel
   GSAP scrubs a 3-phase timeline on scroll
════════════════════════════════════════════ */
export default function CinematicSequence() {
  /* Wrapper = scroll-fuel container (400 vh) */
  const wrapperRef = useRef(null);

  /* Scenes */
  const s1Ref = useRef(null); // Act I  – Globe
  const s2Ref = useRef(null); // Act II – Digital Twin
  const s3Ref = useRef(null); // Act III – Exploded View

  /* Act I text */
  const txt1aRef = useRef(null);
  const txt1bRef = useRef(null);

  /* Act II — shoe & annotation elements */
  const txt2Ref  = useRef(null);
  const shoeFillRef = useRef(null);
  const annot1Ref = useRef(null);
  const annot2Ref = useRef(null);
  const annot3Ref = useRef(null);

  /* Act III */
  const txt3Ref  = useRef(null);
  const tile0Ref = useRef(null);
  const tile1Ref = useRef(null);
  const tile2Ref = useRef(null);
  const tile3Ref = useRef(null);
  const tileRefs = [tile0Ref, tile1Ref, tile2Ref, tile3Ref];

  /* Scroll indicator */
  const scrollIndRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start:   'top top',
          end:     'bottom bottom',
          scrub:   1.8,
        },
      });

      /* ── Set all initial states ── */
      gsap.set([txt1aRef.current, txt1bRef.current], { opacity: 0, y: 22 });
      gsap.set(txt2Ref.current,  { opacity: 0, y: 22 });
      gsap.set(txt3Ref.current,  { opacity: 0, y: 22 });
      gsap.set(shoeFillRef.current, { opacity: 0 });
      gsap.set([annot1Ref.current, annot2Ref.current, annot3Ref.current], { opacity: 0, x: 20 });
      gsap.set(tileRefs.map(r => r.current), { x: 0, y: 0 });

      /* ════════════════════════════════════════
         PHASE 1  (tl progress 0 → 1)
         Globe visible. Text fades in then out.
         Scene fades to black.
      ════════════════════════════════════════ */
      tl
        /* Scroll indicator disappears immediately */
        .to(scrollIndRef.current, { opacity: 0, y: -12, duration: 0.12 }, 0)

        /* Text1a: "Monitoring the global conversation." */
        .to(txt1aRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0.08)

        /* Text1b: "Millions of data points." */
        .to(txt1bRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0.22)

        /* Both texts fade out */
        .to([txt1aRef.current, txt1bRef.current], { opacity: 0, y: -14, duration: 0.22 }, 0.60)

        /* Globe fades out + slight zoom */
        .to(s1Ref.current, { opacity: 0, scale: 1.06, duration: 0.24 }, 0.72)

      /* ════════════════════════════════════════
         PHASE 2  (tl progress 1 → 2)
         Digital Twin — wireframe to filled shoe.
      ════════════════════════════════════════ */

        /* Scene 2 fades in */
        .to(s2Ref.current, { opacity: 1, duration: 0.22 }, 0.82)

        /* Shoe fill appears (wireframe → solid) */
        .to(shoeFillRef.current, { opacity: 1, duration: 0.38 }, 1.02)

        /* Overlay text */
        .to(txt2Ref.current, { opacity: 1, y: 0, duration: 0.28 }, 1.08)

        /* Annotations stagger in */
        .to(annot1Ref.current, { opacity: 1, x: 0, duration: 0.2 }, 1.20)
        .to(annot2Ref.current, { opacity: 1, x: 0, duration: 0.2 }, 1.30)
        .to(annot3Ref.current, { opacity: 1, x: 0, duration: 0.2 }, 1.40)

        /* All fade out */
        .to([txt2Ref.current, annot1Ref.current, annot2Ref.current, annot3Ref.current],
            { opacity: 0, duration: 0.22 }, 1.58)
        .to(s2Ref.current, { opacity: 0, duration: 0.22 }, 1.68)

      /* ════════════════════════════════════════
         PHASE 3  (tl progress 2 → 3)
         Exploded View — tiles burst outward.
      ════════════════════════════════════════ */

        /* Scene 3 fades in */
        .to(s3Ref.current, { opacity: 1, duration: 0.22 }, 1.78)

        /* Overlay text */
        .to(txt3Ref.current, { opacity: 1, y: 0, duration: 0.28 }, 2.00)

        /* Tiles explode simultaneously */
        .to(tile0Ref.current, { x: TILES[0].dx, y: TILES[0].dy, duration: 0.5, ease: 'power2.out' }, 2.15)
        .to(tile1Ref.current, { x: TILES[1].dx, y: TILES[1].dy, duration: 0.5, ease: 'power2.out' }, 2.15)
        .to(tile2Ref.current, { x: TILES[2].dx, y: TILES[2].dy, duration: 0.5, ease: 'power2.out' }, 2.15)
        .to(tile3Ref.current, { x: TILES[3].dx, y: TILES[3].dy, duration: 0.5, ease: 'power2.out' }, 2.15)

        /* Final fade-to-black → reveals dashboard beneath */
        .to([s3Ref.current, txt3Ref.current], { opacity: 0, duration: 0.36 }, 2.68)

        /* Tiny hold so the last frame is fully visible */
        .to({}, { duration: 0.05 }, 3.05);
    });

    return () => ctx.revert();
  }, []);

  /* ── Tiny coordinate-grid SVG for Scene 2 background ── */
  const gridLines = [];
  for (let i = 0; i <= 20; i++) {
    gridLines.push(
      <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%"
        stroke="rgba(40,100,220,0.06)" strokeWidth="1" />,
      <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`}
        stroke="rgba(40,100,220,0.06)" strokeWidth="1" />,
    );
  }

  return (
    /* 400 vh of scroll fuel */
    <div ref={wrapperRef} style={{ height: '400vh', position: 'relative' }}>

      {/* Sticky viewport-height panel */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        background: '#00050a',
      }}>

        {/* ══════════════════════════════
            SCENE 1 — The Global Pulse
        ══════════════════════════════ */}
        <div ref={s1Ref} style={{ position: 'absolute', inset: 0 }}>
          <SceneGlobe />

          {/* Text overlays */}
          <div ref={txt1aRef} className="cinematic-text">
            Monitoring the global conversation.
          </div>
          <div ref={txt1bRef} className="cinematic-subtext">
            Millions of data points.
          </div>
        </div>

        {/* ══════════════════════════════
            SCENE 2 — The Digital Twin
        ══════════════════════════════ */}
        <div ref={s2Ref} style={{
          position: 'absolute', inset: 0, opacity: 0,
          background: 'linear-gradient(135deg, #000006 0%, #02000e 100%)',
        }}>
          {/* Coordinate grid */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {gridLines}
          </svg>

          {/* Scene 2 horizontal rule annotations */}
          <div ref={annot1Ref} className="scene-annot" style={{ top: '22%', left: '8%', opacity: 0, transform: 'translateX(20px)' }}>
            <span className="annot-line" style={{ marginRight: 10 }} />
            Price Index: {'{'}p.Score{'}'}
          </div>
          <div ref={annot2Ref} className="scene-annot" style={{ top: '50%', right: '8%', opacity: 0, transform: 'translateX(20px)', textAlign: 'right' }}>
            Comfort Score
            <span className="annot-line" style={{ marginLeft: 10 }} />
          </div>
          <div ref={annot3Ref} className="scene-annot" style={{ bottom: '16%', left: '8%', opacity: 0, transform: 'translateX(20px)' }}>
            <span className="annot-line" style={{ marginRight: 10 }} />
            Durability
          </div>

          {/* Shoe SVG */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 600 300" style={{ width: '68%', maxWidth: 620 }}>
              {/* Wireframe layer — always visible */}
              <g stroke="rgba(60,140,255,0.75)" fill="none" strokeWidth="1.8"
                filter="url(#blueGlow)">
                <defs>
                  <filter id="blueGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path d={SHOE.outsole} />
                <path d={SHOE.midsole} />
                <path d={SHOE.upper} />
                <path d={SHOE.collar} />
                <path d={SHOE.tongue} />
                <path d={SHOE.swoop} strokeWidth="4" stroke="rgba(100,160,255,0.55)" />
                <path d={SHOE.lace1} strokeWidth="1.2" strokeDasharray="4 3" />
                <path d={SHOE.lace2} strokeWidth="1.2" strokeDasharray="4 3" />
                <path d={SHOE.lace3} strokeWidth="1.2" strokeDasharray="4 3" />
                <path d={SHOE.lace4} strokeWidth="1.2" strokeDasharray="4 3" />

                {/* Eyelet dots */}
                {[
                  [214, 161], [264, 153], [316, 146], [368, 138],
                  [414, 132], [184, 196],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="4" fill="rgba(140,200,255,0.8)" stroke="none" />
                ))}
              </g>

              {/* Solid fill layer — fades in with scroll */}
              <g ref={shoeFillRef}>
                <path d={SHOE.upper}   fill="rgba(20,50,120,0.65)"  stroke="rgba(60,140,255,0.4)" strokeWidth="1.2" />
                <path d={SHOE.midsole} fill="rgba(30,60,90,0.55)"   stroke="rgba(60,120,200,0.3)" strokeWidth="1" />
                <path d={SHOE.outsole} fill="rgba(10,20,50,0.7)"    stroke="rgba(40,100,180,0.3)" strokeWidth="1" />
                <path d={SHOE.collar}  fill="none"                  stroke="rgba(100,160,255,0.6)" strokeWidth="1.8" />
                <path d={SHOE.tongue}  fill="rgba(30,70,160,0.5)"   stroke="rgba(80,150,255,0.5)" strokeWidth="1.4" />
                <path d={SHOE.swoop}   fill="rgba(220,40,40,0.8)"   stroke="none" />
              </g>
            </svg>
          </div>

          {/* Tech label */}
          <div style={{
            position: 'absolute', bottom: '8%', right: '8%',
            fontFamily: 'monospace', fontSize: '0.7rem',
            color: 'rgba(60,140,255,0.45)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            AIR JORDAN 1 — DIGITAL TWIN  v1.0
          </div>

          <div ref={txt2Ref} className="cinematic-text">
            Distilled into a single source of truth.
          </div>
        </div>

        {/* ══════════════════════════════
            SCENE 3 — The Exploded View
        ══════════════════════════════ */}
        <div ref={s3Ref} style={{
          position: 'absolute', inset: 0, opacity: 0,
          background: 'linear-gradient(135deg, #020008 0%, #000308 100%)',
        }}>
          <div ref={txt3Ref} className="cinematic-text">
            Every metric, isolated.
          </div>

          {/* Tiles container — centered */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ position: 'relative', width: 0, height: 0 }}>
              {TILES.map((tile, i) => (
                <div
                  key={tile.label}
                  ref={tileRefs[i]}
                  style={{
                    position: 'absolute',
                    width: 160, height: 160,
                    top: -80, left: -80,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${tile.color}40`,
                    borderRadius: 20,
                    boxShadow: `0 0 40px 0 ${tile.glow}, inset 0 0 30px 0 ${tile.color}10`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{
                    fontSize: '2.2rem',
                    color: tile.color,
                    filter: `drop-shadow(0 0 10px ${tile.color})`,
                    lineHeight: 1,
                  }}>
                    {tile.icon}
                  </span>
                  <span style={{
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center',
                    padding: '0 12px',
                    lineHeight: 1.4,
                  }}>
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scroll indicator (fades out on first scroll) ── */}
        <div ref={scrollIndRef} className="scroll-indicator">
          <div className="scroll-chevron" />
          <span>Scroll</span>
        </div>

        {/* ── Nike wordmark watermark ── */}
        <div style={{
          position: 'absolute', bottom: 44, right: 32,
          fontSize: '0.55rem', textTransform: 'uppercase',
          letterSpacing: '0.4em', color: 'rgba(255,255,255,0.12)',
          pointerEvents: 'none',
        }}>
          Nike Brand Intelligence
        </div>
      </div>
    </div>
  );
}
