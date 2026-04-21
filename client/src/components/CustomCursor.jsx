import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   CustomCursor — mix-blend-mode difference cursor
   Renders a dot + trailing ring. Desktop only.
   Inspired by Brand Simulator cursor system.
───────────────────────────────────────────── */

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    // Hide default cursor
    document.body.style.cursor = 'none';

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    let raf;
    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', handleMove);
    raf = requestAnimationFrame(animateRing);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
      />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring"
      />
    </>
  );
}
