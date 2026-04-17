function ActivityLog({ entries }) {
  if (!entries.length) {
    return (
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight mb-4">
          Live Activity Feed
        </h2>
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-gray-400 text-sm">
            Waiting for score updates...
          </p>
          <p className="text-gray-300 text-xs mt-1">
            Updates arrive every 5 seconds via WebSocket
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Live Activity Feed
        </h2>
        <div className="live-dot" />
      </div>

      <div className="glass-card rounded-2xl p-4 max-h-64 overflow-y-auto">
        <div className="space-y-1">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-400 w-20 shrink-0">
                  {entry.time}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {entry.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-mono">
                  {entry.oldScore}
                </span>
                <span className="text-gray-300">→</span>
                <span
                  className={`text-xs font-mono font-bold ${
                    entry.newScore >= 90
                      ? 'text-emerald-600'
                      : entry.newScore >= 80
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {entry.newScore}
                </span>
                <span
                  className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                    entry.delta > 0
                      ? 'text-emerald-600 bg-emerald-50'
                      : entry.delta < 0
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  {entry.delta > 0 ? '+' : ''}
                  {entry.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ActivityLog;
