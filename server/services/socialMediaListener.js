// =============================================
// MOCK SOCIAL MEDIA LISTENER SERVICE
// =============================================
// Simulates real-time sentiment data. Randomly updates
// 10-20 products per tick (not all 100) for realism.
//
// TODO: Replace with real API integrations:
// const TWITTER_API_KEY = '';
// const REDDIT_CLIENT_ID = '';
// const REDDIT_CLIENT_SECRET = '';
// =============================================

const POLL_INTERVAL_MS = 5000;

function start(products, io) {
  console.log('  📡 Social Media Listener — ACTIVE (every 5s)\n');

  setInterval(() => {
    // Only update 10–20 random products per tick (realistic)
    const updateCount = 10 + Math.floor(Math.random() * 11);
    const indices = [];
    while (indices.length < Math.min(updateCount, products.length)) {
      const idx = Math.floor(Math.random() * products.length);
      if (!indices.includes(idx)) indices.push(idx);
    }

    indices.forEach((idx) => {
      const delta = Math.floor(Math.random() * 11) - 5;
      products[idx].Score = Math.max(0, Math.min(100, products[idx].Score + delta));
    });

    io.emit('scoreUpdate', products);
  }, POLL_INTERVAL_MS);
}

module.exports = { start };
