export default function SearchFilter({ searchTerm, onSearchChange, selectedCategory, onCategoryChange, sortBy, onSortChange, categories, isDark }) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '1rem', 
      flexWrap: 'wrap', 
      marginBottom: '2rem',
      alignItems: 'center'
    }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          flex: '1 1 200px',
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          color: isDark ? '#fff' : '#0a0a0a',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'all 0.3s'
        }}
      />
      
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          color: isDark ? '#fff' : '#0a0a0a',
          fontSize: '0.875rem',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          color: isDark ? '#fff' : '#0a0a0a',
          fontSize: '0.875rem',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        <option value="score-desc">Score: High to Low</option>
        <option value="score-asc">Score: Low to High</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="price-asc">Price: Low to High</option>
      </select>
    </div>
  );
}
