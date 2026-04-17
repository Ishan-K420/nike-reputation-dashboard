import { useEffect, useState, useRef } from 'react';

export default function AnimatedScore({ value, className = '', style = {} }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setIsAnimating(true);
      
      const diff = value - prevValue.current;
      const steps = 20;
      const increment = diff / steps;
      let current = prevValue.current;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current += increment;
        setDisplayValue(Math.round(current));
        
        if (step >= steps) {
          clearInterval(interval);
          setDisplayValue(value);
          setTimeout(() => setIsAnimating(false), 500);
        }
      }, 30);

      prevValue.current = value;
      return () => clearInterval(interval);
    }
  }, [value]);

  const isIncrease = value > prevValue.current;
  const isDecrease = value < prevValue.current;

  return (
    <span 
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        transition: 'all 0.3s',
        transform: isAnimating ? (isIncrease ? 'scale(1.2)' : 'scale(0.9)') : 'scale(1)',
        color: isAnimating 
          ? (isIncrease ? '#10b981' : '#ef4444')
          : style.color
      }}
    >
      {displayValue}
      {isAnimating && isIncrease && (
        <span style={{ 
          fontSize: '0.7em', 
          marginLeft: '0.2em',
          animation: 'fadeUp 0.5s ease-out'
        }}>↑</span>
      )}
      {isAnimating && isDecrease && (
        <span style={{ 
          fontSize: '0.7em', 
          marginLeft: '0.2em',
          animation: 'fadeDown 0.5s ease-out'
        }}>↓</span>
      )}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes fadeDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(10px); }
        }
      `}</style>
    </span>
  );
}
