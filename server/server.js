const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const { generateProducts } = require('./utils/generateProducts');
const socialMediaListener = require('./services/socialMediaListener');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT'],
  },
});

app.use(cors());
app.use(express.json());

// Serve static React files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// ── Generate 100 Nike products ──
const products = generateProducts();

// ── REST API ──
app.get('/api/products', (_req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
  const p = products.find((p) => p.ProdID === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { Score } = req.body;
  const p = products.find((p) => p.ProdID === id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  if (Score === undefined || typeof Score !== 'number')
    return res.status(400).json({ error: 'Score must be a number' });
  p.Score = Math.max(0, Math.min(100, Score));
  io.emit('scoreUpdate', products);
  res.json(p);
});

// ── Socket.io ──
io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);
  socket.emit('initialData', products);
  socket.on('disconnect', () => console.log(`❌ Disconnected: ${socket.id}`));
});

// React Catch-all route
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// ── Start ──
socialMediaListener.start(products, io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  const cats = {};
  products.forEach((p) => (cats[p.Category] = (cats[p.Category] || 0) + 1));
  console.log(`\n  🚀 Server on http://localhost:${PORT}`);
  console.log(`  📦 ${products.length} products loaded`);
  console.log(`  📂 ${Object.entries(cats).map(([c, n]) => `${c}(${n})`).join(' | ')}\n`);
});
