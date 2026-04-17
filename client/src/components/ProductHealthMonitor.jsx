import { useEffect, useState } from 'react';

export default function ProductHealthMonitor({ products, isDark }) {
  const [heartbeat, setHeartbeat] = useState(0);
  
  const avgScore = products.length 
    ? products.reduce((s, p) => s + p.Score, 0) / products.length 
    : 0;

  const bpm = Math.round(60 + (avgScore - 80) * 2); // 60-100 BPM based on score
  const interval = 60000 / bpm; // milliseconds per beat

  useEffect(() => {
    const timer = setInterval(() => {
      setHeartbeat(h => (h + 1) % 2);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  const getHealthStatus = () => {
    if (avgScore >= 90) return { text: 'Excellent', color: '#10b981', emoji: '💚' };
    if (avgScore >= 80) return { text: 'Good', color: '#f59e0b', emoji: '💛' };
    return { text: 'Needs Attention', color: '#ef4444', emoji: '❤️' };
  };

  const health = getHealthStatus();

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
      borderRadius: '16px',
      border: `2px solid ${health.color}`,
      boxShadow: `0 0 30px ${health.color}40`
    }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: isDark ? '#fff' : '#0a0a0a'
        }}>
          Brand Health Monitor
        </h3>

        {/* Heartbeat Animation */}
        <div style={{
          fontSize: '4rem',
          margin: '1rem 0',
          transform: heartbeat === 0 ? 'scale(1)' : 'scale(1.2)',
          transition: 'transform 0.1s',
          filter: heartbeat === 0 ? 'none' : `drop-shadow(0 0 10px ${health.color})`
        }}>
          {health.emoji}
        </div>

        {/* BPM Display */}
        <div style={{
          fontSize: '3rem',
          fontWeight: 700,
          color: health.color,
          marginBottom: '0.5rem',
          fontFamily: 'monospace'
        }}>
          {bpm} <span style={{ fontSize: '1.5rem', fontWeight: 400 }}>BPM</span>
        </div>

        <div style={{
          fontSize: '1rem',
          color: health.color,
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          {health.text}
        </div>

        {/* Waveform */}
        <svg width="100%" height="80" style={{ marginTop: '1rem' }}>
          <polyline
            points={`0,40 ${heartbeat === 0 ? '50,40 60,10 70,70 80,40' : '50,40 60,40 70,40 80,40'} 100,40 200,40 ${heartbeat === 1 ? '250,40 260,10 270,70 280,40' : '250,40 260,40 270,40 280,40'} 300,40 400,40`}
            fill="none"
            stroke={health.color}
            strokeWidth="3"
            style={{
              transition: 'all 0.1s',
              filter: `drop-shadow(0 0 5px ${health.color})`
            }}
          />
        </svg>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
              Avg Score
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#fff' : '#0a0a0a' }}>
              {avgScore.toFixed(1)}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
              Products
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#fff' : '#0a0a0a' }}>
              {products.length}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
              At Risk
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>
              {products.filter(p => p.Score < 80).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
