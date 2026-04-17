# Nike Brand Reputation Monitor - Setup Instructions

## What's Included
✅ All your changes are saved:
- Pure white background (light mode default)
- Nike logo in header
- AI Chat Assistant (bottom right)
- Sentiment Pulse (heartbeat on right side)
- Social Media Feed with instructions
- AI Insights Panel with instructions
- All 35+ components

## Setup on Windows

### 1. Install Prerequisites
- Node.js (v16 or higher): https://nodejs.org/
- Git (optional): https://git-scm.com/

### 2. Extract the Project
- Extract `brand-reputation-monitor-final.tar.gz` or copy the `brand-reputation-monitor-final` folder

### 3. Install Dependencies

Open Command Prompt or PowerShell in the project folder:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Start the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
```
You should see: "🚀 Server on http://localhost:3001"

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
You should see: "Local: http://localhost:5173"

### 5. Open in Browser
Navigate to: http://localhost:5173

## Features
- **Header**: Nike logo, theme toggle (🌙/☀️), Overview/Database tabs
- **Hero**: Chromatic ring animation with live stats
- **Sentiment Pulse**: Heartbeat indicator on right side
- **AI Chat**: Click chat bubble in bottom right corner
- **Database View**: Scroll down to see Social Media Feed and AI Insights
- **Theme Toggle**: Click 🌙/☀️ to switch between light/dark mode

## Troubleshooting
- If port 3001 is in use: Change PORT in server/server.js
- If port 5173 is in use: Vite will automatically use next available port
- Clear cache: Delete client/.vite and client/dist folders

## All Changes Applied
1. ✅ Default theme: light (white background)
2. ✅ AnimatedBackground removed (pure white/black)
3. ✅ Header at top with Nike logo
4. ✅ SentimentPulse heartbeat animation
5. ✅ AIChatAssistant chat bubble
6. ✅ Social Media Feed with instructions
7. ✅ AI Insights Panel with instructions
8. ✅ All 35+ components included

Enjoy your Nike Brand Reputation Monitor! 🚀
