import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CATEGORY_COLORS = {
  Lifestyle: '#7c3aed',
  Running: '#2563eb',
  Basketball: '#ea580c',
  Training: '#db2777',
  Skate: '#059669',
  Soccer: '#0284c7',
};

function TrendChart({ history, theme }) {
  const isDark = theme === 'dark';
  if (history.length < 2) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          📈 Category Sentiment Trend
        </h3>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 text-sm">
            Collecting data... chart will appear in ~10 seconds
          </p>
        </div>
      </div>
    );
  }

  const categories = Object.keys(CATEGORY_COLORS);

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        📈 Category Sentiment Trend
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} />
          <XAxis
            dataKey="time"
            stroke={isDark ? '#4a5568' : '#d1d5db'}
            tick={{ fill: isDark ? '#718096' : '#6b7280', fontSize: 10 }}
            tickLine={false}
          />
          <YAxis
            domain={[40, 100]}
            stroke={isDark ? '#4a5568' : '#d1d5db'}
            tick={{ fill: isDark ? '#718096' : '#6b7280', fontSize: 11 }}
            tickLine={false}
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
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', color: isDark ? '#a0aec0' : '#6b7280' }}
          />
          {categories.map((cat) => (
            <Line
              key={cat}
              type="monotone"
              dataKey={cat}
              stroke={CATEGORY_COLORS[cat]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;
