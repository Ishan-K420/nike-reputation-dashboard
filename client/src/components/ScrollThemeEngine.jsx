import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────
   ScrollThemeEngine — Drives the light→dark transition
   
   Listens to scroll position and sets CSS custom 
   properties on :root for seamless theme blending.
   
   Progress 0 = fully light (top of page)
   Progress 1 = fully dark (deep into dashboard)
   
   No toggle button needed — the scroll IS the toggle.
───────────────────────────────────────────────────── */

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(lightRGB, darkRGB, t) {
  const r = Math.round(lerp(lightRGB[0], darkRGB[0], t));
  const g = Math.round(lerp(lightRGB[1], darkRGB[1], t));
  const b = Math.round(lerp(lightRGB[2], darkRGB[2], t));
  return `rgb(${r},${g},${b})`;
}

export default function ScrollThemeEngine() {
  const progressRef = useRef(0);
  const rafRef = useRef(null);
  const targetRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;

    // Color palettes: [R, G, B]
    const LIGHT = {
      bg:           [255, 255, 255],
      bgSecondary:  [248, 248, 250],
      textPrimary:  [10, 10, 10],
      textSecondary:[80, 80, 90],
      textMuted:    [140, 140, 150],
      border:       [0, 0, 0],       // will use alpha
      cardBg:       [255, 255, 255],
      headerBg:     [255, 255, 255],  // will use alpha
    };
    
    const DARK = {
      bg:           [11, 11, 11],
      bgSecondary:  [18, 18, 22],
      textPrimary:  [240, 240, 245],
      textSecondary:[180, 180, 195],
      textMuted:    [110, 110, 125],
      border:       [255, 255, 255], // will use alpha
      cardBg:       [20, 20, 25],
      headerBg:     [0, 0, 0],       // will use alpha
    };

    function applyTheme(t) {
      // Clamp
      t = Math.max(0, Math.min(1, t));

      root.style.setProperty('--bg-primary', lerpColor(LIGHT.bg, DARK.bg, t));
      root.style.setProperty('--bg-secondary', lerpColor(LIGHT.bgSecondary, DARK.bgSecondary, t));
      root.style.setProperty('--text-primary', lerpColor(LIGHT.textPrimary, DARK.textPrimary, t));
      root.style.setProperty('--text-secondary', lerpColor(LIGHT.textSecondary, DARK.textSecondary, t));
      root.style.setProperty('--text-muted', lerpColor(LIGHT.textMuted, DARK.textMuted, t));
      root.style.setProperty('--card-bg', lerpColor(LIGHT.cardBg, DARK.cardBg, t));

      // Border with alpha
      const borderAlpha = lerp(0.06, 0.08, t);
      root.style.setProperty('--border-color', `rgba(${DARK.border.map((v, i) => Math.round(lerp(LIGHT.border[i], DARK.border[i], t))).join(',')},${borderAlpha})`);

      // Header bg with alpha
      const headerAlpha = lerp(0.65, 0.55, t);
      root.style.setProperty('--header-bg', `rgba(${DARK.headerBg.map((v, i) => Math.round(lerp(LIGHT.headerBg[i], DARK.headerBg[i], t))).join(',')},${headerAlpha})`);

      // Card shadow
      const shadowAlpha = lerp(0.06, 0.3, t);
      root.style.setProperty('--card-shadow', `0 4px 24px rgba(0,0,0,${shadowAlpha})`);

      // Input / form backgrounds
      root.style.setProperty('--input-bg', lerpColor([245, 245, 248], [25, 25, 30], t));
      root.style.setProperty('--input-border', `rgba(${Math.round(lerp(0, 255, t))},${Math.round(lerp(0, 255, t))},${Math.round(lerp(0, 255, t))},${lerp(0.1, 0.08, t)})`);

      // Accent stays constant
      root.style.setProperty('--accent', '#ff2d00');
      
      // Progress value for components that need it
      root.style.setProperty('--theme-progress', t.toString());

      // Set a class for components that need discrete changes
      if (t > 0.5) {
        root.classList.add('theme-dark');
        root.classList.remove('theme-light');
      } else {
        root.classList.add('theme-light');
        root.classList.remove('theme-dark');
      }
    }

    function onScroll() {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      
      // Transition zone: starts at 0.5 viewport heights, 
      // fully dark by 2.5 viewport heights
      const start = viewH * 0.5;
      const end = viewH * 2.2;
      
      targetRef.current = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
    }

    // Smooth interpolation loop for buttery transitions
    function animate() {
      progressRef.current += (targetRef.current - progressRef.current) * 0.08;
      
      // Snap if close enough
      if (Math.abs(progressRef.current - targetRef.current) < 0.001) {
        progressRef.current = targetRef.current;
      }
      
      applyTheme(progressRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }

    // Initial state
    applyTheme(0);
    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null; // No visual output — this is a pure controller
}
