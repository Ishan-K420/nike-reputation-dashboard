import { useEffect, useState } from 'react';

export default function PerformanceMonitor({ isDark }) {
  const [fps, setFps] = useState(60);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    if (show) {
      animationId = requestAnimationFrame(measureFPS);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [show]);

  // Toggle with Ctrl+Shift+P
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShow(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      padding: '0.5rem 1rem',
      background: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
      border: `2px solid ${fps < 30 ? '#ef4444' : fps < 50 ? '#f59e0b' : '#10b981'}`,
      borderRadius: '8px',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      color: isDark ? '#fff' : '#0a0a0a'
    }}>
      <div>FPS: <strong style={{ color: fps < 30 ? '#ef4444' : fps < 50 ? '#f59e0b' : '#10b981' }}>{fps}</strong></div>
      <div style={{ fontSize: '0.65rem', marginTop: '0.25rem', opacity: 0.6 }}>
        Press Ctrl+Shift+P to hide
      </div>
    </div>
  );
}
