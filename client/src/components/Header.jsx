import { useState, useEffect } from 'react';
import NotificationCenter from './NotificationCenter';

/* ─────────────────────────────────────────────
   Header — No toggle button. Theme is scroll-driven.
───────────────────────────────────────────── */

function Header({ activeView, onViewChange, connected, activityLog = [] }) {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        background: 'var(--header-bg)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Nike Logo + Brand Name */}
        <div className="flex items-center gap-3">
          <svg
            width="44"
            height="18"
            viewBox="0 0 69 30"
            style={{ fill: 'var(--text-primary)', transition: 'fill 0.3s' }}
          >
            <path d="M68.56 4.05c-.52.2-1.06.37-1.6.52-5.88 1.62-11.78 3.18-17.66 4.81a236.6 236.6 0 0 0-17.47 5.63 47.7 47.7 0 0 0-8.56 4.07c-1.85 1.18-3.4 2.58-4.1 4.7-.43 1.32-.34 2.62.27 3.85.72 1.44 1.92 2.37 3.36 3.02 1.63.74 3.37 1.07 5.15 1.2 2.38.17 4.75.02 7.12-.25 3.34-.38 6.62-1.08 9.87-1.93.67-.18 1.34-.37 2.01-.55l.08-.02c-.03.05-.05.08-.07.12-1.53 2.42-3.57 4.34-6.03 5.78-2.02 1.18-4.2 1.97-6.5 2.37-2.38.41-4.77.46-7.16.15a19.64 19.64 0 0 1-7.47-2.54c-2.14-1.28-3.8-3.02-4.75-5.35-.7-1.72-.9-3.52-.6-5.36.38-2.32 1.4-4.33 2.9-6.1 1.85-2.2 4.12-3.84 6.63-5.17A65.6 65.6 0 0 1 34.5 7.8c5.1-1.8 10.3-3.28 15.54-4.6 4.3-1.08 8.64-2 13.02-2.7 1.5-.24 3-.43 4.52-.5.5-.03 1 .02 1.5.07.15.01.22.08.2.23-.04.25-.1.5-.18.74l-.55.01z"/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            <span style={{
              fontFamily: "'Antonio', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              transition: 'color 0.3s',
            }}>
              Brand
            </span>
            <span style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              transition: 'color 0.3s',
            }}>
              Intelligence
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex gap-1">
          <button
            onClick={() => onViewChange('overview')}
            className={`nav-tab ${activeView === 'overview' ? 'nav-tab-active' : ''}`}
          >
            Overview
          </button>
          <button
            onClick={() => onViewChange('database')}
            className={`nav-tab ${activeView === 'database' ? 'nav-tab-active' : ''}`}
          >
            Database
          </button>
        </nav>

        {/* Right: Notifications + Status */}
        <div className="flex items-center gap-3">
          <NotificationCenter activityLog={activityLog} isDark={false} />
          <div className="flex items-center gap-2">
            <div className={`live-dot ${!connected ? 'live-dot-off' : ''}`} />
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              transition: 'color 0.3s',
            }}>
              {connected ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
