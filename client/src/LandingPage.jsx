import { useState, useEffect } from 'react';
import ChromaticRingHero from './components/ChromaticRingHero';
import Header from './components/Header';
import App from './App';

export default function LandingPage() {
  const [theme, setTheme] = useState('light');
  const [products, setProducts] = useState([]);
  const [activeView, setActiveView] = useState('overview');
  const [connected, setConnected] = useState(true);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    const fetchUrl = import.meta.env.PROD ? '/api/products' : 'http://localhost:3001/api/products';
    fetch(fetchUrl)
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const isDark = theme === 'dark';

  return (
    <div style={{ position: 'relative' }}>
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        connected={connected}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        activityLog={activityLog}
      />
      <ChromaticRingHero isDark={isDark} products={products} />
      <App 
        theme={theme} 
        activeView={activeView} 
        setActiveView={setActiveView}
        onActivityLogUpdate={setActivityLog}
      />
    </div>
  );
}
