export default function ExportButton({ products, isDark }) {
  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Category', 'Score', 'Price'];
    const rows = products.map(p => [p.ProdID, p.Name, p.Category, p.Score, p.Price]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nike-brand-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const json = JSON.stringify(products, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nike-brand-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        onClick={exportToCSV}
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          color: isDark ? '#fff' : '#0a0a0a',
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        📊 Export CSV
      </button>
      <button
        onClick={exportToJSON}
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          color: isDark ? '#fff' : '#0a0a0a',
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        📄 Export JSON
      </button>
    </div>
  );
}
