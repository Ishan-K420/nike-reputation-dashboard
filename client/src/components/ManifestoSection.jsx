import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   ManifestoSection — Bold typographic statement
   Giant outlined/filled/accent words.
   Inspired by Brand Simulator manifesto.
───────────────────────────────────────────── */

export default function ManifestoSection({ isDark }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const words = [
    { text: 'REAL-TIME', style: 'outline' },
    { text: 'BRAND', style: 'filled' },
    { text: 'INTELLIGENCE', style: 'accent' },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#111',
        padding: '8rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(255,45,0,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Words */}
      {words.map((word, i) => (
        <span
          key={i}
          className={`manifesto-word manifesto-${word.style}`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
          }}
        >
          {word.text}
        </span>
      ))}

      {/* Sub-text */}
      <p
        style={{
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '1px',
          marginTop: '3rem',
          position: 'relative',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
        }}
      >
        Nike Brand Reputation Monitor — Powered by AI Analytics
      </p>
    </section>
  );
}
