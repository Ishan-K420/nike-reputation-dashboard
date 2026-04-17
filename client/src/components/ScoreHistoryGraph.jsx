import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ScoreHistoryGraph({ product, isDark }) {
  // Generate mock historical data
  const generateHistory = () => {
    const days = 30;
    const data = [];
    let score = product.Score - Math.floor(Math.random() * 10);
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: Math.max(60, Math.min(100, score + (Math.random() - 0.5) * 5))
      });
      score = data[data.length - 1].score;
    }
    data[data.length - 1].score = product.Score;
    return data;
  };

  const history = generateHistory();

  const data = {
    labels: history.map(h => h.date),
    datasets: [{
      label: product.Name,
      data: history.map(h => h.score),
      borderColor: product.Score >= 90 ? '#10b981' : product.Score >= 80 ? '#f59e0b' : '#ef4444',
      backgroundColor: (product.Score >= 90 ? '#10b981' : product.Score >= 80 ? '#f59e0b' : '#ef4444') + '20',
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 6,
      borderWidth: 3
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
        titleColor: isDark ? '#fff' : '#0a0a0a',
        bodyColor: isDark ? '#fff' : '#0a0a0a',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        min: 60,
        max: 100,
        grid: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
        },
        ticks: {
          color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8
        }
      }
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '250px',
      padding: '1rem',
      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '12px',
      marginTop: '1rem'
    }}>
      <h4 style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: isDark ? '#fff' : '#0a0a0a'
      }}>
        30-Day Score History
      </h4>
      <div style={{ height: 'calc(100% - 2rem)' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
