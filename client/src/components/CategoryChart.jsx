import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CATEGORY_COLORS = {
  Lifestyle: '#7c3aed',
  Running: '#2563eb',
  Basketball: '#ea580c',
  Training: '#db2777',
  Skate: '#059669',
  Soccer: '#0284c7',
};

function CategoryChart({ products, theme }) {
  const isDark = theme === 'dark';
  if (!products.length) return null;

  // Aggregate: average score per category
  const catMap = {};
  products.forEach((p) => {
    if (!catMap[p.Category]) catMap[p.Category] = { sum: 0, count: 0 };
    catMap[p.Category].sum += p.Score;
    catMap[p.Category].count += 1;
  });

  const data = Object.entries(catMap)
    .map(([name, { sum, count }]) => ({
      name,
      avgScore: Math.round(sum / count),
      count,
    }))
    .sort((a, b) => b.avgScore - a.avgScore);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          📊 Category Performance
        </h3>
        <span className="text-xs text-gray-400">
          AVG(Score) per category
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} vertical={false} />
          <XAxis
            dataKey="name"
            stroke={isDark ? '#4a5568' : '#d1d5db'}
            tick={{ fill: isDark ? '#a0aec0' : '#6b7280', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 100]}
            stroke={isDark ? '#4a5568' : '#d1d5db'}
            tick={{ fill: isDark ? '#718096' : '#6b7280', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: isDark ? 'rgba(0,0,0,0.9)' : '#fff',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
              borderRadius: '12px',
              color: isDark ? '#e5e7eb' : '#111827',
              fontSize: '12px',
              boxShadow: isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.08)',
            }}
            formatter={(value, name) => [value, 'Avg Score']}
            labelFormatter={(label) => `Category: ${label}`}
          />
          <Bar dataKey="avgScore" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name] || '#6366f1'}
                style={{ filter: `drop-shadow(0 0 8px ${CATEGORY_COLORS[entry.name] || '#6366f1'}40)` }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
