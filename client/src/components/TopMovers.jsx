export default function TopMovers({ products, prevScores, isDark }) {
  const movers = products
    .map(p => ({
      ...p,
      change: prevScores[p.ProdID] !== undefined ? p.Score - prevScores[p.ProdID] : 0
    }))
    .filter(p => p.change !== 0)
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, 5);

  if (movers.length === 0) return null;

  return (
    <div style={{
      padding: '1.5rem',
      borderRadius: '12px',
      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
      marginBottom: '2rem'
    }}>
      <h3 style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: '1rem',
        color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
      }}>
        🔥 Top Movers
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {movers.map(p => (
          <div key={p.ProdID} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem',
            borderRadius: '6px',
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'
          }}>
            <span style={{
              fontSize: '0.875rem',
              color: isDark ? '#fff' : '#0a0a0a'
            }}>{p.Name}</span>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: p.change > 0 ? '#10b981' : '#ef4444'
            }}>
              {p.change > 0 ? '+' : ''}{p.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
