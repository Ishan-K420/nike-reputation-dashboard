function SummaryCards({ products }) {
  if (!products.length) return null;

  const avgScore =
    products.reduce((sum, p) => sum + p.Score, 0) / products.length;
  const bestProduct = products.reduce((a, b) =>
    a.Score > b.Score ? a : b
  );
  const crisisProducts = products.filter((p) => p.Score < 80);
  const totalProducts = products.length;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Highest Rated */}
      <div className="summary-card-best glass-card rounded-2xl p-5 fade-in-up">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🏆</span>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            Highest Rated
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-800">{bestProduct.Name}</p>
        <p className="text-sm text-gray-500 mt-1">
          Score:{' '}
          <span className="text-emerald-600 font-mono font-bold">
            {bestProduct.Score}
          </span>
        </p>
      </div>

      {/* Average Sentiment */}
      <div className="summary-card-avg glass-card rounded-2xl p-5 fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📊</span>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Avg Brand Sentiment
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-800 font-mono">
          {avgScore.toFixed(1)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Status:{' '}
          <span
            className={`font-semibold ${
              avgScore >= 90
                ? 'text-emerald-600'
                : avgScore >= 80
                ? 'text-amber-600'
                : 'text-red-600'
            }`}
          >
            {avgScore >= 90
              ? 'Excellent'
              : avgScore >= 80
              ? 'Good'
              : 'Needs Attention'}
          </span>
        </p>
      </div>

      {/* Crisis Products */}
      <div className="summary-card-crisis glass-card rounded-2xl p-5 fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">⚠️</span>
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
            Crisis Alert
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {crisisProducts.length}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Products with score &lt; 80
        </p>
      </div>

      {/* Total Monitored */}
      <div className="summary-card-total glass-card rounded-2xl p-5 fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">👟</span>
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            Total Monitored
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
        <p className="text-sm text-gray-500 mt-1">Active product streams</p>
      </div>
    </section>
  );
}

export default SummaryCards;
