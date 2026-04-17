import { useState, useMemo } from 'react';

const CATEGORIES = ['All', 'Lifestyle', 'Running', 'Basketball', 'Training', 'Skate', 'Soccer'];

const BADGE_CLASSES = {
  lifestyle: 'badge-lifestyle',
  running: 'badge-running',
  basketball: 'badge-basketball',
  training: 'badge-training',
  skate: 'badge-skate',
  soccer: 'badge-soccer',
};

function getScoreStyle(score) {
  if (score >= 90) return { bg: 'bg-emerald-50', text: 'text-emerald-600', glow: 'shadow-glow-green' };
  if (score >= 80) return { bg: 'bg-amber-50', text: 'text-amber-600', glow: 'shadow-glow-yellow' };
  return { bg: 'bg-red-50', text: 'text-red-600', glow: 'shadow-glow-red' };
}

function CompactCard({ product, index, onCardClick }) {
  const { Name, Category, Score, Price } = product;
  const style = getScoreStyle(Score);

  return (
    <div
      onClick={() => onCardClick && onCardClick(product)}
      className="glass-card rounded-xl p-4 flex flex-col items-center text-center group hover:scale-[1.03] transition-all duration-200 card-stagger"
      style={{ animationDelay: `${Math.min(index * 40, 500)}ms`, cursor: 'pointer' }}
    >
      {/* Category */}
      <span
        className={`category-badge text-[0.6rem] mb-3 ${
          BADGE_CLASSES[Category.toLowerCase()] || 'badge-lifestyle'
        }`}
      >
        {Category}
      </span>

      {/* Score Circle */}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${style.bg} ${style.glow}`}
      >
        <span className={`text-lg font-bold font-mono ${style.text}`}>
          {Score}
        </span>
      </div>

      {/* Name */}
      <h4 className="text-xs font-semibold text-gray-800 leading-tight mb-1 line-clamp-2 h-8 w-full">
        {Name}
      </h4>

      {/* Price */}
      <p className="text-[0.65rem] text-gray-400 font-mono">${Price}</p>
    </div>
  );
}

function ProductGrid({ products, onCardClick }) {
  const [activeTab, setActiveTab] = useState('All');

  const counts = useMemo(() => {
    const c = { All: products.length };
    products.forEach((p) => {
      c[p.Category] = (c[p.Category] || 0) + 1;
    });
    return c;
  }, [products]);

  const filtered = useMemo(() => {
    if (activeTab === 'All') return products;
    return products.filter((p) => p.Category === activeTab);
  }, [products, activeTab]);

  // Sort by score descending
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.Score - a.Score),
    [filtered]
  );

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Product Catalog
        </h2>
        <span className="text-xs text-gray-400 font-mono">
          {sorted.length} of {products.length} products
        </span>
      </div>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`tab-btn ${activeTab === cat ? 'tab-btn-active' : ''}`}
          >
            {cat}
            <span className="tab-count ml-1.5">{counts[cat] || 0}</span>
          </button>
        ))}
      </div>

      {/* Scrollable Grid */}
      <div className="max-h-[620px] overflow-y-auto pr-1 custom-scrollbar">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {sorted.map((product, index) => (
            <CompactCard key={`${activeTab}-${product.ProdID}`} product={product} index={index} onCardClick={onCardClick} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
