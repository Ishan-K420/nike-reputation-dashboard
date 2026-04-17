import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import AIInsightBox from './components/AIInsightBox';
import MarqueeTicker from './components/MarqueeTicker';
import CrisisAlert from './components/CrisisAlert';
import ProductModal from './components/ProductModal';
import OverviewTab from './components/OverviewTab';
import DatabaseTab from './components/DatabaseTab';
import SentimentPulse from './components/SentimentPulse';
import SocialMediaFeed from './components/SocialMediaFeed';
import AIInsightsPanel from './components/AIInsightsPanel';
import PerformanceMonitor from './components/PerformanceMonitor';
import AIChatAssistant from './components/AIChatAssistant';

const SOCKET_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

function App({ theme: externalTheme, activeView: externalActiveView, setActiveView: externalSetActiveView, onActivityLogUpdate }) {
  const [products, setProducts] = useState([]);
  const [connected, setConnected] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [activeView, setActiveView] = useState('overview');
  const [theme, setTheme] = useState('light');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const prevScoresRef = useRef({});

  // Use external theme and activeView if provided
  const currentTheme = externalTheme || theme;
  const currentActiveView = externalActiveView || activeView;
  const currentSetActiveView = externalSetActiveView || setActiveView;

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('initialData', (data) => {
      setProducts(data);
      const scores = {};
      data.forEach((p) => (scores[p.ProdID] = p.Score));
      prevScoresRef.current = scores;
      pushHistory(data);
    });

    socket.on('scoreUpdate', (data) => {
      const now = new Date().toLocaleTimeString();
      const newEntries = [];

      data.forEach((p) => {
        const prev = prevScoresRef.current[p.ProdID];
        if (prev !== undefined && prev !== p.Score) {
          newEntries.push({
            id: `${p.ProdID}-${Date.now()}-${Math.random()}`,
            name: p.Name,
            oldScore: prev,
            newScore: p.Score,
            delta: p.Score - prev,
            time: now,
          });
        }
        prevScoresRef.current[p.ProdID] = p.Score;
      });

      if (newEntries.length > 0) {
        setActivityLog((prev) => {
          const updated = [...newEntries, ...prev].slice(0, 50);
          if (onActivityLogUpdate) onActivityLogUpdate(updated);
          return updated;
        });
      }

      setProducts([...data]);
      pushHistory(data);
    });

    fetch(`${SOCKET_URL}/api/products`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        const scores = {};
        data.forEach((p) => (scores[p.ProdID] = p.Score));
        prevScoresRef.current = scores;
      })
      .catch(console.error);

    return () => socket.disconnect();
  }, []);

  function pushHistory(data) {
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const cats = {};
    data.forEach((p) => {
      if (!cats[p.Category]) cats[p.Category] = { sum: 0, count: 0 };
      cats[p.Category].sum += p.Score;
      cats[p.Category].count += 1;
    });
    const snap = { time };
    Object.entries(cats).forEach(([c, { sum, count }]) => {
      snap[c] = Math.round(sum / count);
    });
    setScoreHistory((prev) => [...prev, snap].slice(-30));
  }

  const isDark = currentTheme === 'dark';

  return (
    <div className={`min-h-screen relative ${isDark ? 'dark-theme' : ''}`} style={{ background: isDark ? '#000' : '#fff' }}>
      {/* ═══ Foreground content ═══ */}
      <div className="relative" style={{ zIndex: 1 }}>
        {currentActiveView === 'overview' ? (
          <OverviewTab
            products={products}
            scoreHistory={scoreHistory}
            activityLog={activityLog}
            theme={currentTheme}
            prevScores={prevScoresRef.current}
            onProductClick={setSelectedProduct}
          />
        ) : (
          <DatabaseTab
            products={products}
            scoreHistory={scoreHistory}
            activityLog={activityLog}
            prevScores={prevScoresRef.current}
            theme={currentTheme}
            onProductClick={setSelectedProduct}
          />
        )}

        {/* ── AI Insight Panel in Database view ── */}
        {currentActiveView === 'database' && products.length > 0 && (
          <div style={{ padding: '0 24px 48px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600, 
                marginBottom: '1rem',
                color: isDark ? '#fff' : '#0a0a0a'
              }}>
                Live Social Media Feed
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                marginBottom: '1rem'
              }}>
                Real-time sentiment from Reddit r/Sneakers. Monitor what people are saying about Nike products.
              </p>
              <SocialMediaFeed isDark={isDark} />
            </div>
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600, 
                marginBottom: '1rem',
                color: isDark ? '#fff' : '#0a0a0a'
              }}>
                AI-Powered Insights
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                marginBottom: '1rem'
              }}>
                Our AI analyzes trends, predicts performance, and provides actionable recommendations.
              </p>
              <AIInsightsPanel products={products} isDark={isDark} />
            </div>
          </div>
        )}

        {/* ── AI Insight Box (below hero KPIs, inside overview wrapper) ── */}
        {currentActiveView === 'overview' && products.length > 0 && (
          <div style={{ padding: '0 24px 48px', maxWidth: 1200, margin: '0 auto' }}>
            <AIInsightBox products={products} isDark={isDark} />
          </div>
        )}

        <footer className="py-10 text-center border-t border-gray-100" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : undefined, paddingBottom: '60px' }}>
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-400">
            Nike Brand Intelligence · Real-Time Analytics
          </p>
        </footer>
      </div>

      {/* ── Fixed overlays (outside scroll wrapper) ── */}
      <SentimentPulse products={products} isDark={isDark} />
      <PerformanceMonitor isDark={isDark} />
      <AIChatAssistant products={products} isDark={isDark} />
      <CrisisAlert products={products} />
      <MarqueeTicker activityLog={activityLog} isDark={isDark} />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isDark={isDark}
      />
    </div>
  );
}

export default App;
