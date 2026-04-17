import { useRef, useState, useEffect } from 'react';

/**
 * ScrollReveal — Apple-style scroll-triggered reveal wrapper.
 *
 * Props:
 *   animation  'fade-up' | 'fade-down' | 'fade-left' | 'fade-right'
 *              | 'scale-in' | 'blur-in' | 'rotate-in'
 *   delay      ms delay before the animation plays
 *   duration   ms duration of the animation (default 800)
 *   threshold  0–1 how much of the element must be visible (default 0.15)
 *   once       if true (default) the animation only triggers once
 */
function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  threshold = 0.15,
  once = true,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`sr ${animation} ${visible ? 'sr-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
