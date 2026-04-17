import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = {
  Excellent: '#10b981',
  Good: '#f59e0b',
  'At Risk': '#ef4444',
};

function ScoreDistribution({ products, theme }) {
  const isDark = theme === 'dark';
  if (!products.length) return null;

  const excellent = products.filter((p) => p.Score >= 90).length;
  const good = products.filter((p) => p.Score >= 80 && p.Score < 90).length;
  const atRisk = products.filter((p) => p.Score < 80).length;

  const data = [
    { name: 'Excellent', value: excellent },
    { name: 'Good', value: good },
    { name: 'At Risk', value: atRisk },
  ].filter((d) => d.value > 0);

  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        🎯 Score Distribution
      </h3>
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name]}
                  style={{ filter: `drop-shadow(0 0 6px ${COLORS[entry.name]}50)` }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: isDark ? 'rgba(0,0,0,0.9)' : '#fff',
                border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                borderRadius: '12px',
                color: isDark ? '#e5e7eb' : '#111827',
                fontSize: '12px',
                boxShadow: isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.08)',
              }}
              formatter={(value, name) => [`${value} products`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-5 mt-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: COLORS[entry.name] }}
            />
            <span className="text-xs text-gray-500">
              {entry.name}{' '}
              <span className="font-mono font-bold text-gray-800">
                {entry.value}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreDistribution;
