import { useState } from 'react';
import { getProductImage } from '../utils/productImages';

export default function ProductComparison({ products, isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleProduct = (product) => {
    if (selected.find(p => p.ProdID === product.ProdID)) {
      setSelected(selected.filter(p => p.ProdID !== product.ProdID));
    } else if (selected.length < 3) {
      setSelected([...selected, product]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          color: isDark ? '#fff' : '#0a0a0a',
          fontSize: '0.875rem',
          cursor: 'pointer',
          fontWeight: 600
        }}
      >
        ⚖️ Compare Products ({selected.length}/3)
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={() => setIsOpen(false)}>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            maxHeight: '90vh',
            background: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.98)',
            borderRadius: '16px',
            overflow: 'auto',
            padding: '2rem'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#fff' : '#0a0a0a' }}>
                Product Comparison
              </h2>
              <button onClick={() => setIsOpen(false)} style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: isDark ? '#fff' : '#0a0a0a'
              }}>✕</button>
            </div>

            {selected.length === 0 ? (
              <div>
                <p style={{ marginBottom: '1rem', color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                  Select up to 3 products to compare:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {products.slice(0, 20).map(product => (
                    <div
                      key={product.ProdID}
                      onClick={() => toggleProduct(product)}
                      style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        transition: 'all 0.3s'
                      }}
                    >
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: isDark ? '#fff' : '#0a0a0a' }}>
                        {product.Name}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', marginTop: '0.5rem' }}>
                        Score: {product.Score}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelected([])}
                  style={{
                    marginBottom: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#fff' : '#0a0a0a',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  ← Select Different Products
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selected.length}, 1fr)`, gap: '2rem' }}>
                  {selected.map(product => (
                    <div key={product.ProdID} style={{
                      padding: '1.5rem',
                      borderRadius: '12px',
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
                    }}>
                      <img
                        src={getProductImage(product.Name)}
                        alt={product.Name}
                        style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '1rem' }}
                      />
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: isDark ? '#fff' : '#0a0a0a' }}>
                        {product.Name}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                          <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Score</p>
                          <p style={{ fontSize: '2rem', fontWeight: 700, color: product.Score >= 90 ? '#10b981' : product.Score >= 80 ? '#f59e0b' : '#ef4444' }}>
                            {product.Score}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Price</p>
                          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: isDark ? '#fff' : '#0a0a0a' }}>${product.Price}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Category</p>
                          <p style={{ fontSize: '0.875rem', color: isDark ? '#fff' : '#0a0a0a' }}>{product.Category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
