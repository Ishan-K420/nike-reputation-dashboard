import { useEffect, useState, useRef } from 'react';
import { getProductImage } from '../utils/productImages';

const CIRCUMFERENCE = 2 * Math.PI * 48;

function getScoreColor(score) {
  if (score >= 90) return 'green';
  if (score >= 80) return 'yellow';
  return 'red';
}

function getCategoryBadge(category) {
  const lower = category.toLowerCase();
  if (lower === 'lifestyle') return 'badge-lifestyle';
  if (lower === 'running') return 'badge-running';
  if (lower === 'basketball') return 'badge-basketball';
  return 'badge-lifestyle';
}

function ProductCard({ product, delay = 0 }) {
  const { Name, Category, Score, Price } = product;
  const color = getScoreColor(Score);
  const offset = CIRCUMFERENCE - (Score / 100) * CIRCUMFERENCE;

  const [animate, setAnimate] = useState(false);
  const prevScore = useRef(Score);

  useEffect(() => {
    if (prevScore.current !== Score) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 450);
      prevScore.current = Score;
      return () => clearTimeout(timer);
    }
  }, [Score]);

  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col items-center text-center fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Product Image */}
      <div style={{
        width: '100%',
        height: '180px',
        marginBottom: '1rem',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)'
      }}>
        <img 
          src={getProductImage(Name)} 
          alt={Name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '1rem'
          }}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x400/000000/FFFFFF?text=${encodeURIComponent(Name)}`;
          }}
        />
      </div>

      {/* Category Badge */}
      <span className={`category-badge ${getCategoryBadge(Category)} mb-4`}>
        {Category}
      </span>

      {/* Score Ring */}
      <div className={`score-ring mb-4 ${animate ? 'score-animate' : ''}`}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle className="score-bg" cx="60" cy="60" r="48" />
          <circle
            className={`score-progress stroke-${color} glow-${color}`}
            cx="60"
            cy="60"
            r="48"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <span className={`score-value score-${color}`}>{Score}</span>
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-bold text-white mb-1">{Name}</h3>

      {/* Price */}
      <p className="text-sm text-gray-500 font-mono">${Price}</p>

      {/* Status Bar */}
      <div className="w-full mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Status</span>
          <span
            className={`font-semibold ${
              color === 'green'
                ? 'text-emerald-400'
                : color === 'yellow'
                ? 'text-amber-400'
                : 'text-red-400'
            }`}
          >
            {color === 'green'
              ? '● Excellent'
              : color === 'yellow'
              ? '● Good'
              : '● At Risk'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
