import { useState, useEffect, useCallback } from 'react';
import ChromaticRingHero from './components/ChromaticRingHero';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollThemeEngine from './components/ScrollThemeEngine';
import App from './App';

/* ─────────────────────────────────────────────────────
   LandingPage — No dark/light toggle.
   Theme is driven entirely by scroll position via
   ScrollThemeEngine setting CSS custom properties.
───────────────────────────────────────────────────── */

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [activeView, setActiveView] = useState('overview');
  const [connected, setConnected] = useState(true);
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrl = import.meta.env.PROD ? '/api/products' : 'http://localhost:3001/api/products';
    fetch(fetchUrl)
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Scroll-driven theme engine (no toggle) */}
      <ScrollThemeEngine />

      {/* Cinematic loading screen */}
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        connected={connected}
        activityLog={activityLog}
      />
      <ChromaticRingHero products={products} />
      <App
        activeView={activeView}
        setActiveView={setActiveView}
        onActivityLogUpdate={setActivityLog}
      />
    </div>
  );
}
