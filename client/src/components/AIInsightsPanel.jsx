import { useEffect, useState } from 'react';

const INSIGHTS = [
  "Basketball category showing strong momentum with 94.2% positive sentiment...",
  "Air Max 90 experiencing 15% increase in social mentions this week...",
  "Predicted score improvement of +3 points for Lifestyle category by end of month...",
  "Jordan 1 Retro maintaining premium brand position with consistent 95+ scores...",
  "Recommendation: Focus marketing efforts on Running category to boost engagement...",
  "Alert: Dunk Low price sensitivity detected. Consider promotional strategy...",
  "Trend Analysis: Sustainability messaging driving +8% sentiment improvement...",
  "Competitor Analysis: Nike maintaining 12-point lead over nearest competitor...",
  "Customer Feedback: Delivery experience rated 4.2/5, opportunity for improvement...",
  "Market Insight: Gen-Z demographic showing 23% higher engagement with retro styles..."
];

export default function AIInsightsPanel({ products, isDark }) {
  const [currentInsight, setCurrentInsight] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const insight = INSIGHTS[insightIndex];
    setCurrentInsight(insight);
    setDisplayText('');
    setIsTyping(true);

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < insight.length) {
        setDisplayText(insight.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        setTimeout(() => {
          setInsightIndex((prev) => (prev + 1) % INSIGHTS.length);
        }, 8000); // Increased from 5s to 8s
      }
    }, 60); // Increased from 50ms to 60ms

    return () => clearInterval(typingInterval);
  }, [insightIndex]);

  const avgScore = products.length 
    ? (products.reduce((s, p) => s + p.Score, 0) / products.length).toFixed(1)
    : 0;

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      padding: '1.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem'
        }}>
          🤖
        </div>
        <div>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isDark ? '#fff' : '#0a0a0a',
            marginBottom: '0.15rem'
          }}>
            AI Insights
          </h3>
          <p style={{
            fontSize: '0.65rem',
            color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Powered by ML
          </p>
        </div>
      </div>

      <div style={{
        padding: '1rem',
        borderRadius: '10px',
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
        minHeight: '100px',
        position: 'relative'
      }}>
        <p style={{
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
          fontFamily: 'monospace'
        }}>
          {displayText}
          {isTyping && (
            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: isDark ? '#fff' : '#0a0a0a',
              marginLeft: '2px',
              animation: 'blink 1s infinite'
            }} />
          )}
        </p>
      </div>

      <div style={{
        marginTop: '1rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem'
      }}>
        <div style={{
          padding: '0.75rem',
          borderRadius: '8px',
          background: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <p style={{
            fontSize: '0.65rem',
            color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Confidence
          </p>
          <p style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#10b981'
          }}>
            {Math.min(95, Math.round(avgScore + 5))}%
          </p>
        </div>

        <div style={{
          padding: '0.75rem',
          borderRadius: '8px',
          background: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <p style={{
            fontSize: '0.65rem',
            color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Accuracy
          </p>
          <p style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#3b82f6'
          }}>
            92%
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
