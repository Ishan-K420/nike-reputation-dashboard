import { useState, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import SearchFilter from './SearchFilter';
import TopMovers from './TopMovers';
import ExportButton from './ExportButton';
import ProductComparison from './ProductComparison';
import CategoryRadarChart from './CategoryRadarChart';
import ProductHealthMonitor from './ProductHealthMonitor';
import { debounce } from '../utils/performance';

function getScoreColorClass(score) {
  if (score >= 90) return 'score-muted-green';
  if (score >= 80) return 'score-muted-amber';
  return 'score-muted-red';
}

function getStatusText(score) {
  if (score >= 90) return { label: 'Excellent', cls: 'text-muted-green' };
  if (score >= 80) return { label: 'Good', cls: 'text-muted-amber' };
  return { label: 'Needs Attention', cls: 'text-muted-red' };
}

function OverviewTab({ products, scoreHistory, activityLog, theme, prevScores = {} }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('score-desc');

  const isDark = theme === 'dark';

  // Debounced search to reduce re-renders
  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.Category))];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const matchesSearch = p.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.Category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'score-desc': return b.Score - a.Score;
        case 'score-asc': return a.Score - b.Score;
        case 'name-asc': return a.Name.localeCompare(b.Name);
        case 'price-desc': return b.Price - a.Price;
        case 'price-asc': return a.Price - b.Price;
        default: return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  if (!products.length) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Connecting to Database...</p>
    </div>
  );

  const avgScore = (filteredAndSortedProducts.reduce((s, p) => s + p.Score, 0) / filteredAndSortedProducts.length).toFixed(1);
  const crisisCount = filteredAndSortedProducts.filter((p) => p.Score < 80).length;
  const topProducts = [...filteredAndSortedProducts].sort((a, b) => b.Score - a.Score).slice(0, 5);
  const avgStatus = getStatusText(parseFloat(avgScore));

  const jordan1 = filteredAndSortedProducts.find(
    (p) => p.Name.includes('Jordan 1 Retro') && !p.Name.includes('Low')
  ) || filteredAndSortedProducts.find((p) => p.Name.includes('Jordan 1'));

  return (
    <div className="relative z-10">

      {/* ══════════ KPIs ══════════ */}
      <ScrollReveal animation="fade-up" duration={1000} delay={100}>
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-20">
            <div className="text-center flex-1">
              <p className="kpi-number">{avgScore}</p>
              <p className="kpi-label">Average Score</p>
              <p className={`text-xs mt-2 ${avgStatus.cls}`}>{avgStatus.label}</p>
            </div>
            <div className="w-px h-16 bg-gray-200 hidden sm:block section-divider" />
            <div className="text-center flex-1">
              <p className="kpi-number">{filteredAndSortedProducts.length}</p>
              <p className="kpi-label">Products {searchTerm || selectedCategory !== 'all' ? 'Filtered' : 'Monitored'}</p>
            </div>
            <div className="w-px h-16 bg-gray-200 hidden sm:block section-divider" />
            <div className="text-center flex-1">
              <p className="kpi-number text-gray-400">{crisisCount}</p>
              <p className="kpi-label">At Risk</p>
              <p className="text-xs mt-2 text-muted-red">Score &lt; 80</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════ SEARCH, FILTER, EXPORT ══════════ */}
      <ScrollReveal animation="fade-up" duration={800}>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: '1 1 400px' }}>
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={debouncedSetSearch}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                categories={categories}
                isDark={isDark}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ProductComparison products={filteredAndSortedProducts} isDark={isDark} />
              <ExportButton products={filteredAndSortedProducts} isDark={isDark} />
            </div>
          </div>
          <TopMovers products={products} prevScores={prevScores} isDark={isDark} />
        </section>
      </ScrollReveal>

      {/* ══════════ JORDAN 1 RETRO SPOTLIGHT ══════════ */}
      {jordan1 && (
        <ScrollReveal animation="scale-in" duration={1200}>
          <section className="max-w-xl mx-auto px-6 py-20">
            <div className="spotlight-card p-10 md:p-14 text-center">
              <p className="text-[0.55rem] uppercase tracking-[0.5em] text-gray-400 mb-3"
                 style={{ transition: 'color 0.8s ease' }}>
                Spotlight
              </p>
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gray-400 mb-4"
                 style={{ transition: 'color 0.8s ease' }}>
                {jordan1.Category}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8"
                  style={{ transition: 'color 0.8s ease' }}>
                {jordan1.Name}
              </h3>
              <p className={`featured-score ${getScoreColorClass(jordan1.Score)}`}>
                {jordan1.Score}
              </p>
              <p className="text-[0.55rem] uppercase tracking-[0.45em] text-gray-400 mt-6"
                 style={{ transition: 'color 0.8s ease' }}>
                Reputation Score
              </p>
              <p className="text-sm text-gray-400 mt-2 font-light"
                 style={{ transition: 'color 0.8s ease' }}>
                ${jordan1.Price}
              </p>
              <p className="text-[0.55rem] uppercase tracking-[0.4em] text-gray-300 mt-6"
                 style={{ transition: 'color 0.8s ease' }}>
                Toggle 🌙 to experience the transition
              </p>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ══════════ FEATURED PRODUCTS ══════════ */}
      <section className="py-12">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-4">
            <p className="hero-subtitle mb-2">Top Performers</p>
            <h2 className="text-2xl font-semibold text-gray-800"
                style={{ transition: 'color 0.8s ease' }}>
              Featured Products
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {topProducts.map((product, i) => (
            <ScrollReveal
              key={product.ProdID}
              animation="fade-up"
              delay={i * 80}
              duration={1000}
            >
              <div className="min-h-[45vh] flex items-center justify-center py-10 px-6">
                <div className="text-center w-full">
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gray-400 mb-4"
                     style={{ transition: 'color 0.8s ease' }}>
                    {product.Category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10"
                      style={{ transition: 'color 0.8s ease' }}>
                    {product.Name}
                  </h3>
                  <p className={`featured-score ${getScoreColorClass(product.Score)}`}>
                    {product.Score}
                  </p>
                  <p className="text-[0.55rem] uppercase tracking-[0.45em] text-gray-400 mt-6"
                     style={{ transition: 'color 0.8s ease' }}>
                    Reputation Score
                  </p>
                  <p className="text-sm text-gray-400 mt-2 font-light"
                     style={{ transition: 'color 0.8s ease' }}>
                    ${product.Price}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════ LIVE ACTIVITY ══════════ */}
      {activityLog.length > 0 && (
        <ScrollReveal animation="fade-up" duration={900}>
          <section className="max-w-2xl mx-auto px-6 py-16">
            <p className="hero-subtitle mb-6 text-center">Live Feed</p>
            <div className="space-y-2">
              {activityLog.slice(0, 8).map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                >
                  <div>
                    <span className="text-sm text-gray-700 font-medium"
                          style={{ transition: 'color 0.8s ease' }}>
                      {entry.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-3">{entry.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{entry.oldScore}</span>
                    <span className="text-gray-300">→</span>
                    <span className="text-sm font-semibold text-gray-800"
                          style={{ transition: 'color 0.8s ease' }}>
                      {entry.newScore}
                    </span>
                    <span className={`text-xs font-mono ${entry.delta > 0 ? 'text-muted-green' : 'text-muted-red'}`}>
                      {entry.delta > 0 ? '+' : ''}{entry.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  );
}

export default OverviewTab;
