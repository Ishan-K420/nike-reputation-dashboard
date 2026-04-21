import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import AIInsightBox from './components/AIInsightBox';
import MarqueeTicker from './components/MarqueeTicker';
import CrisisAlert from './components/CrisisAlert';
import ProductModal from './components/ProductModal';
import OverviewTab from './components/OverviewTab';
import DatabaseTab from './components/DatabaseTab';
import SocialMediaFeed from './components/SocialMediaFeed';
import AIInsightsPanel from './components/AIInsightsPanel';
import PerformanceMonitor from './components/PerformanceMonitor';
import AIChatAssistant from './components/AIChatAssistant';
import StatsTicker from './components/StatsTicker';
import ManifestoSection from './components/ManifestoSection';
import PremiumFooter from './components/PremiumFooter';

const SOCKET_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

function App({ activeView: externalActiveView, setActiveView: externalSetActiveView, onActivityLogUpdate }) {
  const [products, setProducts] = useState([]);
  const [connected, setConnected] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [activeView, setActiveView] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const prevScoresRef = useRef({});

  const currentActiveView = externalActiveView || activeView;
  const currentSetActiveView = externalSetActiveView || setActiveView;

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

  // isDark is now computed from CSS custom property for components that still need it
  // Components should prefer CSS vars, but some need the boolean for logic
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => {
      const progress = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--theme-progress') || '0');
      setIsDark(progress > 0.5);
    };
    const interval = setInterval(check, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-primary)', transition: 'background 0.3s' }}>
      {/* ═══ Stats Ticker — Brand metrics strip ═══ */}
      <StatsTicker products={products} activityLog={activityLog} isDark={isDark} />

      {/* ═══ Foreground content ═══ */}
      <div className="relative" style={{ zIndex: 1 }}>
        {currentActiveView === 'overview' ? (
          <OverviewTab
            products={products}
            scoreHistory={scoreHistory}
            activityLog={activityLog}
            theme={isDark ? 'dark' : 'light'}
            prevScores={prevScoresRef.current}
            onProductClick={setSelectedProduct}
          />
        ) : (
          <DatabaseTab
            products={products}
            scoreHistory={scoreHistory}
            activityLog={activityLog}
            prevScores={prevScoresRef.current}
            theme={isDark ? 'dark' : 'light'}
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
                color: 'var(--text-primary)',
              }}>
                Live Social Media Feed
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
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
                color: 'var(--text-primary)',
              }}>
                AI-Powered Insights
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                marginBottom: '1rem'
              }}>
                Our AI analyzes trends, predicts performance, and provides actionable recommendations.
              </p>
              <AIInsightsPanel products={products} isDark={isDark} />
            </div>
          </div>
        )}

        {/* ── AI Insight Box (overview) ── */}
        {currentActiveView === 'overview' && products.length > 0 && (
          <div style={{ padding: '0 24px 48px', maxWidth: 1200, margin: '0 auto' }}>
            <AIInsightBox products={products} isDark={isDark} />
          </div>
        )}

        {/* ═══ Premium Footer ═══ */}
        <PremiumFooter isDark={isDark} />
      </div>

      {/* ── Fixed overlays ── */}
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
