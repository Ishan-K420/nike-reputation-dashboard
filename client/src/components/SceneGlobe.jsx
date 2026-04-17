import { useRef, useEffect } from 'react';

/* ─────────────────────────────────────────────
   SceneGlobe — Act I: The Global Pulse
   Full-screen HTML5 canvas globe with animated
   lat/lon wireframe, pulsing data nodes, and
   fiber-optic connection streams.
───────────────────────────────────────────── */
export default function SceneGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    // Initialise node layer
    const NODES = Array.from({ length: 70 }, () => ({
      phi:   Math.acos(2 * Math.random() - 1),
      theta: Math.random() * Math.PI * 2,
      pulse: Math.random() * Math.PI * 2,
      size:  0.8 + Math.random() * 1.8,
    }));

    /* Project a spherical point onto the 2-D canvas */
    function project(phi, theta, angle, W, H, R) {
      const x =  R * Math.sin(phi) * Math.cos(theta + angle);
      const z =  R * Math.sin(phi) * Math.sin(theta + angle);
      const y =  R * Math.cos(phi);
      const fov = 900;
      const s = fov / (fov + z);
      return { x: W / 2 + x * s, y: H / 2 + y * s, z, vis: z > -R * 0.25 };
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw(t) {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const R = Math.min(W, H) * 0.30;
      const angle = t * 0.00018;

      ctx.clearRect(0, 0, W, H);

      /* ── Ambient radial glow behind globe ── */
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, R * 1.6);
      bg.addColorStop(0,   'rgba(10, 30, 90, 0.55)');
      bg.addColorStop(0.6, 'rgba(5, 12, 40, 0.3)');
      bg.addColorStop(1,   'transparent');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* ── Latitude lines ── */
      for (let i = 0; i <= 10; i++) {
        const phi = (Math.PI * i) / 10;
        ctx.beginPath();
        let moved = false;
        for (let j = 0; j <= 80; j++) {
          const p = project(phi, (2 * Math.PI * j) / 80, angle, W, H, R);
          if (!p.vis) { moved = false; continue; }
          moved ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
          moved = true;
        }
        ctx.strokeStyle = 'rgba(50, 130, 255, 0.16)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      /* ── Longitude lines ── */
      for (let j = 0; j < 18; j++) {
        const theta = (2 * Math.PI * j) / 18;
        ctx.beginPath();
        let moved = false;
        for (let i = 0; i <= 50; i++) {
          const p = project((Math.PI * i) / 50, theta, angle, W, H, R);
          if (!p.vis) { moved = false; continue; }
          moved ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
          moved = true;
        }
        ctx.strokeStyle = 'rgba(50, 130, 255, 0.16)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      /* ── Fiber-optic connection streams ── */
      for (let i = 0; i < 35; i++) {
        const n1 = NODES[i % NODES.length];
        const n2 = NODES[(i + 22) % NODES.length];
        const p1 = project(n1.phi, n1.theta, angle, W, H, R);
        const p2 = project(n2.phi, n2.theta, angle, W, H, R);
        if (!p1.vis || !p2.vis) continue;

        const pulse = Math.sin(t * 0.0014 + i * 0.55) * 0.5 + 0.5;
        const g = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        g.addColorStop(0,   `rgba(80, 150, 255, ${pulse * 0.08})`);
        g.addColorStop(0.5, `rgba(160, 100, 255, ${pulse * 0.42})`);
        g.addColorStop(1,   `rgba(80, 150, 255, ${pulse * 0.08})`);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      /* ── Pulsing data nodes ── */
      NODES.forEach(n => {
        const p = project(n.phi, n.theta, angle, W, H, R);
        if (!p.vis) return;
        const pulse = Math.sin(t * 0.0018 + n.pulse) * 0.5 + 0.5;

        /* Outer glow halo */
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10 + pulse * 7);
        halo.addColorStop(0, `rgba(130, 200, 255, ${0.55 + pulse * 0.35})`);
        halo.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10 + pulse * 7, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        /* Core bright dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.size + pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 240, 255, ${0.75 + pulse * 0.25})`;
        ctx.fill();
      });

      /* ── Cascading data-stream particles ── */
      for (let i = 0; i < 8; i++) {
        const seed = (t * 0.00012 + i * 0.137) % 1;
        const px = W * 0.1 + i * W * 0.11;
        const py = (H * seed) % H;
        ctx.fillStyle = `rgba(100, 180, 255, ${0.3 - seed * 0.25})`;
        ctx.fillRect(px - 1, py, 2, 14);
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
