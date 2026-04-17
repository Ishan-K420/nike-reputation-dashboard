export default function ProductStoryTimeline({ product, isDark }) {
  const milestones = [
    { date: 'Launch', event: `${product.Name} released to market`, icon: '🚀', score: 85 },
    { date: 'Week 2', event: 'Initial customer reviews positive', icon: '⭐', score: 88 },
    { date: 'Month 1', event: 'Featured in major sports magazine', icon: '📰', score: 92 },
    { date: 'Month 2', event: 'Influencer partnerships activated', icon: '👟', score: product.Score >= 90 ? 95 : 89 },
    { date: 'Current', event: `Current score: ${product.Score}`, icon: '📊', score: product.Score }
  ];

  return (
    <div style={{
      width: '100%',
      padding: '2rem',
      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '16px',
      marginTop: '2rem'
    }}>
      <h3 style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '2rem',
        color: isDark ? '#fff' : '#0a0a0a'
      }}>
        Product Journey
      </h3>

      <div style={{ position: 'relative' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '20px',
          bottom: '20px',
          width: '2px',
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }} />

        {milestones.map((milestone, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              paddingLeft: '60px',
              paddingBottom: '2rem',
              animation: `slideInLeft 0.5s ease-out ${index * 0.2}s both`
            }}
          >
            {/* Icon */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.1)',
              border: '2px solid #667eea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              zIndex: 1
            }}>
              {milestone.icon}
            </div>

            {/* Content */}
            <div style={{
              padding: '1rem',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              borderRadius: '8px',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#667eea',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {milestone.date}
                </span>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: milestone.score >= 90 ? '#10b981' : milestone.score >= 80 ? '#f59e0b' : '#ef4444'
                }}>
                  {milestone.score}
                </span>
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                lineHeight: 1.5
              }}>
                {milestone.event}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
