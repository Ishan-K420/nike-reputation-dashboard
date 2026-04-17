import { useState, useEffect } from 'react';

export default function NotificationCenter({ activityLog, isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Create notifications from activity log
    const newNotifications = activityLog.slice(0, 10).map((entry, index) => ({
      id: entry.id,
      title: entry.delta < -5 ? '⚠️ Significant Drop' : entry.delta > 5 ? '🎉 Major Improvement' : '📊 Score Update',
      message: `${entry.name}: ${entry.oldScore} → ${entry.newScore}`,
      time: entry.time,
      type: entry.delta < -5 ? 'alert' : entry.delta > 5 ? 'success' : 'info',
      read: index >= 3 // First 3 are unread
    }));
    
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.read).length);
  }, [activityLog]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          color: isDark ? '#fff' : '#0a0a0a',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          transition: 'all 0.3s'
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#ef4444',
            color: 'white',
            fontSize: '0.65rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '45px',
          right: 0,
          width: '320px',
          maxHeight: '400px',
          background: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          zIndex: 100,
          animation: 'slideDown 0.3s ease-out'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: isDark ? '#fff' : '#0a0a0a'
            }}>
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  padding: '0.3rem 0.6rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  fontSize: '0.7rem',
                  cursor: 'pointer'
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div style={{
            maxHeight: '340px',
            overflowY: 'auto'
          }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                fontSize: '0.875rem'
              }}>
                No notifications yet
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: '0.875rem 1rem',
                    borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                    background: !notif.read 
                      ? (isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)')
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>
                      {notif.title.split(' ')[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: '0.8rem',
                        fontWeight: !notif.read ? 600 : 400,
                        color: isDark ? '#fff' : '#0a0a0a',
                        marginBottom: '0.25rem'
                      }}>
                        {notif.title.substring(2)}
                      </p>
                      <p style={{
                        fontSize: '0.75rem',
                        color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                        marginBottom: '0.25rem'
                      }}>
                        {notif.message}
                      </p>
                      <p style={{
                        fontSize: '0.65rem',
                        color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
                      }}>
                        {notif.time}
                      </p>
                    </div>
                    {!notif.read && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#3b82f6',
                        flexShrink: 0,
                        marginTop: '0.5rem'
                      }} />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
