import { useEffect, useState } from 'react';

export default function SentimentPulse({ products, isDark }) {
  const [pulse, setPulse] = useState(0);
  const [beat, setBeat] = useState(false);
  
  const avgScore = products.length 
    ? products.reduce((s, p) => s + p.Score, 0) / products.length 
    : 0;
  
  const getColor = () => {
    if (avgScore >= 90) return isDark ? '#10b981' : '#059669';
    if (avgScore >= 80) return isDark ? '#f59e0b' : '#d97706';
    return isDark ? '#ef4444' : '#dc2626';
  };

  const getPulseSpeed = () => {
    if (avgScore >= 90) return 1000;
    if (avgScore >= 80) return 800;
    return 600;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat(true);
      setTimeout(() => setBeat(false), 150);
      setPulse(p => (p + 1) % 2);
    }, getPulseSpeed());
    return () => clearInterval(interval);
  }, [avgScore]);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      right: '2rem',
      transform: 'translateY(-50%)',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        {/* Outer pulse rings - multiple waves */}
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            inset: -i * 8,
            borderRadius: '50%',
            border: `${3 - i}px solid ${getColor()}`,
            opacity: beat ? 0 : 0.3 - (i * 0.1),
            transform: beat ? `scale(${1.5 + i * 0.2})` : 'scale(1)',
            transition: `all ${0.6 + i * 0.2}s cubic-bezier(0.4, 0, 0.2, 1)`,
            pointerEvents: 'none'
          }} />
        ))}
        
        {/* Core circle with glow */}
        <div style={{
          position: 'absolute',
          inset: 20,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${getColor()}, ${getColor()}dd)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 700,
          boxShadow: beat 
            ? `0 0 40px ${getColor()}, 0 0 20px ${getColor()}` 
            : `0 0 20px ${getColor()}80`,
          transform: beat ? 'scale(1.15)' : 'scale(1)',
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          border: `2px solid ${getColor()}`,
          animation: 'heartbeat 0.15s ease-in-out'
        }}>
          {avgScore.toFixed(0)}
        </div>

        {/* Heartbeat icon */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          fontSize: '1.5rem',
          transform: beat ? 'scale(1.3)' : 'scale(1)',
          transition: 'transform 0.15s ease-out',
          filter: `drop-shadow(0 0 8px ${getColor()})`
        }}>
          💓
        </div>
      </div>
      
      <div style={{
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        fontWeight: 600
      }}>
        Brand<br/>Pulse
      </div>

      {/* BPM indicator */}
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        color: getColor(),
        fontFamily: 'monospace',
        background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        border: `1px solid ${getColor()}40`
      }}>
        {Math.round(60 + (avgScore - 80) * 2)} BPM
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
