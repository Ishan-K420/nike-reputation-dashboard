import { useState, useEffect } from 'react';
import NotificationCenter from './NotificationCenter';

function Header({ activeView, onViewChange, connected, theme, onToggleTheme, activityLog = [] }) {
  const isDark = theme === 'dark';
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        background: isDark
          ? 'rgba(0, 0, 0, 0.55)'
          : 'rgba(255, 255, 255, 0.65)',
        borderBottom: isDark
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid rgba(0,0,0,0.06)',
        transition: 'background 1.4s cubic-bezier(0.4,0,0.2,1), border-color 1s ease',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo with Nike Swoosh */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 1000 1000" fill="white">
              <path d="M245.8,631.4c-21.4,0-39.7-2.5-54.8-7.4c-14.9-4.9-25.2-11.4-30.9-19.4c-5.7-8-7.6-16.9-5.7-26.6 c2.8-14.4,11.5-25.1,26.2-32c14.6-6.9,35.6-10.4,62.9-10.4c42.7,0,99.7,11.2,171.1,33.5c0,0,0,0,0,0 c115.4,36.1,244.8,54.2,388.1,54.2c30.5,0,49.4-2.8,56.7-8.3c7.3-5.5,8.5-13.2,3.6-23c-3.6-7.2-11.6-15.4-24-24.6 c-12.4-9.2-29.2-18.9-50.4-29.1c-21.2-10.2-46.7-20.7-76.5-31.5c-29.8-10.8-63.9-21.8-102.3-33c-38.4-11.2-80.9-22.5-127.5-33.9 c-46.6-11.4-97.3-22.8-152.1-34.2c-54.8-11.4-113.6-22.8-176.4-34.2c-62.8-11.4-129.5-22.8-200.1-34.2 c-70.6-11.4-145-22.8-223.2-34.2c-78.2-11.4-160.1-22.8-245.7-34.2L0,245.8l245.8,0c85.6,11.4,167.5,22.8,245.7,34.2 c78.2,11.4,152.6,22.8,223.2,34.2c70.6,11.4,137.3,22.8,200.1,34.2c62.8,11.4,121.6,22.8,176.4,34.2 c54.8,11.4,105.5,22.8,152.1,34.2c46.6,11.4,89.1,22.7,127.5,33.9c38.4,11.2,72.5,22.2,102.3,33c29.8,10.8,55.3,21.3,76.5,31.5 c21.2,10.2,38,19.9,50.4,29.1c12.4,9.2,20.4,17.4,24,24.6c4.9,9.8,3.7,17.5-3.6,23c-7.3,5.5-26.2,8.3-56.7,8.3 c-143.3,0-272.7-18.1-388.1-54.2c0,0,0,0,0,0C345.5,620.2,288.5,609,245.8,609c-27.3,0-48.3,3.5-62.9,10.4 c-14.7,6.9-23.4,17.6-26.2,32c-1.9,9.7,0,18.6,5.7,26.6c5.7,8,16,14.5,30.9,19.4C208.1,701.3,224.4,703.8,245.8,703.8z"/>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-500 hidden sm:block"
                style={{ transition: 'color 0.8s ease' }}>
            Brand Intelligence
          </span>
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

        {/* Right: Theme toggle + Notifications + Status */}
        <div className="flex items-center gap-3">
          <NotificationCenter activityLog={activityLog} isDark={isDark} />
          <button onClick={onToggleTheme} className="theme-toggle" title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="flex items-center gap-2">
            <div className={`live-dot ${!connected ? 'live-dot-off' : ''}`} />
            <span className="text-[0.65rem] text-gray-400 font-medium"
                  style={{ transition: 'color 0.8s ease' }}>
              {connected ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
