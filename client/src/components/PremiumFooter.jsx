/* ─────────────────────────────────────────────
   PremiumFooter — Multi-column dark footer
   Inspired by Brand Simulator footer design.
───────────────────────────────────────────── */

const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    links: ['Overview Dashboard', 'Database View', 'AI Insights', 'Social Feed'],
  },
  {
    title: 'Resources',
    links: ['API Documentation', 'Brand Guidelines', 'Score Methodology', 'Export Reports'],
  },
  {
    title: 'Company',
    links: ['About Nike BRM', 'Careers', 'Press Kit', 'Contact'],
  },
];

export default function PremiumFooter({ isDark }) {
  return (
    <footer
      className="premium-footer"
      style={{
        background: '#0b0b0b',
        padding: '5rem 3rem 3rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Grid */}
      <div className="premium-footer-grid">
        {/* Brand column */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}>
            {/* Nike swoosh */}
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 100 60" fill="#0b0b0b">
                <path d="M7.5 49.4c-1.7 0-3-.2-4.2-.6-1.2-.4-2-.9-2.5-1.6-.5-.6-.6-1.4-.4-2.2.2-1.2.9-2 2.1-2.6 1.2-.6 2.9-.8 5.1-.8 3.5 0 8.1.9 13.9 2.7 9.4 2.9 19.9 4.4 31.5 4.4 2.5 0 4-.2 4.6-.7.6-.4.7-1.1.3-1.9-.3-.6-.9-1.3-1.9-2-1-.7-2.4-1.5-4.1-2.4-1.7-.8-3.8-1.7-6.2-2.6-2.4-.9-5.2-1.8-8.3-2.7-3.1-.9-6.6-1.8-10.3-2.8-3.8-.9-7.9-1.8-12.4-2.8C11 33.5 7 32.6 3.1 31.6l-3.1-.7L7.5 4.5c7 .9 13.6 1.9 19.9 2.8 6.4.9 12.4 1.9 18.1 2.8 5.7.9 11.2 1.9 16.3 2.8 5.1.9 9.9 1.8 14.3 2.7 4.4.9 8.5 1.8 12.4 2.7 3.9.9 7.5 1.8 10.8 2.7 2.4.7 4.5 1.3 6.2 2 1.7.6 3.1 1.3 4.1 1.9 1 .7 1.7 1.4 1.9 2 .4.8.3 1.4-.3 1.9-.6.4-2.1.7-4.6.7-11.6 0-22.2-1.5-31.5-4.4C69.4 22 63.8 21 60.3 21c-2.2 0-3.9.3-5.1.8-1.2.6-1.9 1.4-2.1 2.6-.2.8 0 1.5.4 2.2.5.6 1.3 1.2 2.5 1.6 1.2.4 2.5.6 4.2.6z"/>
              </svg>
            </div>
            <div style={{
              fontFamily: "'Antonio', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              Nike<span style={{ color: '#ff2d00' }}>BRM</span>
            </div>
          </div>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.7,
            maxWidth: 260,
          }}>
            Real-time brand reputation monitoring powered by AI sentiment analysis and live social media data.
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((col, i) => (
          <div key={i}>
            <div style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '1.5rem',
            }}>
              {col.title}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {col.links.map((link, j) => (
                <li key={j}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '2rem',
        marginTop: '3rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '1px',
        }}>
          © 2025 Nike Brand Reputation Monitor. All rights reserved.
        </span>
        <span style={{
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '1px',
        }}>
          Privacy Policy · Terms of Use · Cookie Settings
        </span>
      </div>
    </footer>
  );
}
