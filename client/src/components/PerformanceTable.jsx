function getScoreColor(score) {
  if (score >= 90) return { text: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Excellent' };
  if (score >= 80) return { text: 'text-amber-600', bg: 'bg-amber-50', label: 'Good' };
  return { text: 'text-red-600', bg: 'bg-red-50', label: 'At Risk' };
}

function getBadgeClass(category) {
  const map = {
    lifestyle: 'badge-lifestyle',
    running: 'badge-running',
    basketball: 'badge-basketball',
    training: 'badge-training',
    skate: 'badge-skate',
    soccer: 'badge-soccer',
  };
  return map[category.toLowerCase()] || 'badge-lifestyle';
}

function PerformanceTable({ products, prevScores }) {
  if (!products.length) return null;

  const sorted = [...products].sort((a, b) => b.Score - a.Score);
  const top = sorted.slice(0, 10);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          🏅 Top 10 Performance Rankings
        </h3>
        <span className="text-xs text-gray-400">
          Top 10 of {products.length} products
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">#</th>
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">PRODUCT</th>
              <th className="text-left py-3 px-2 text-gray-500 font-medium text-xs">CATEGORY</th>
              <th className="text-right py-3 px-2 text-gray-500 font-medium text-xs">PRICE</th>
              <th className="text-right py-3 px-2 text-gray-500 font-medium text-xs">SCORE</th>
              <th className="text-right py-3 px-2 text-gray-500 font-medium text-xs">TREND</th>
              <th className="text-right py-3 px-2 text-gray-500 font-medium text-xs">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {top.map((product, idx) => {
              const color = getScoreColor(product.Score);
              const prev = prevScores[product.ProdID];
              const delta = prev !== undefined ? product.Score - prev : 0;

              return (
                <tr
                  key={product.ProdID}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  {/* Rank */}
                  <td className="py-3 px-2">
                    <span className={`font-mono text-xs ${idx < 3 ? 'text-amber-600 font-bold' : 'text-gray-400'}`}>
                      {idx < 3 ? ['🥇', '🥈', '🥉'][idx] : `${idx + 1}`}
                    </span>
                  </td>

                  {/* Name */}
                  <td className="py-3 px-2 font-medium text-gray-800">
                    {product.Name}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-2">
                    <span className={`category-badge ${getBadgeClass(product.Category)}`}>
                      {product.Category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-2 text-right text-gray-400 font-mono text-xs">
                    ${product.Price}
                  </td>

                  {/* Score */}
                  <td className="py-3 px-2 text-right">
                    <span className={`font-mono font-bold ${color.text}`}>
                      {product.Score}
                    </span>
                  </td>

                  {/* Trend */}
                  <td className="py-3 px-2 text-right">
                    {delta !== 0 ? (
                      <span
                        className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                          delta > 0
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-red-600 bg-red-50'
                        }`}
                      >
                        {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-600">—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-2 text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${color.bg} ${color.text}`}>
                      {color.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PerformanceTable;
