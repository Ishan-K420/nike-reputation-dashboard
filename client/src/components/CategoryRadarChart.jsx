import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function CategoryRadarChart({ products, isDark }) {
  const categories = {};
  products.forEach(p => {
    if (!categories[p.Category]) {
      categories[p.Category] = { total: 0, count: 0 };
    }
    categories[p.Category].total += p.Score;
    categories[p.Category].count++;
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [{
      label: 'Average Score',
      data: Object.values(categories).map(c => (c.total / c.count).toFixed(1)),
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(102, 126, 234, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 60,
        max: 100,
        ticks: {
          stepSize: 10,
          color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          backdropColor: 'transparent'
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        },
        angleLines: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        },
        pointLabels: {
          color: isDark ? '#fff' : '#0a0a0a',
          font: {
            size: 12,
            weight: 600
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
        titleColor: isDark ? '#fff' : '#0a0a0a',
        bodyColor: isDark ? '#fff' : '#0a0a0a',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1
      }
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '500px',
      height: '400px',
      margin: '2rem auto',
      padding: '1.5rem',
      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '16px',
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
    }}>
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '1rem',
        textAlign: 'center',
        color: isDark ? '#fff' : '#0a0a0a'
      }}>
        Category Performance
      </h3>
      <div style={{ height: 'calc(100% - 2rem)' }}>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
