# Nike Brand Reputation Monitor - Full Stack Implementation

## 🚀 Live Demo
**[https://nike-reputation-dashboard.onrender.com](https://nike-reputation-dashboard.onrender.com)**

## What's Included
This project is a full-stack real-time analytics dashboard built with React, Vite, Express, and Socket.io.

### ✨ Key Features:
- **Scroll-Driven Theme Engine:** The site starts bright and organically transitions to a cinematic dark mode as you scroll down. No hardware buttons or toggle switches used—just pure scroll metrics driving CSS custom properties.
- **Real-Time Data (Socket.io):** A live connection streams continuous reputation score updates across 100 generated Nike products spanning 6 categories (Lifestyle, Running, Basketball, Training, Skate, Soccer).
- **Simulated Reddit Feed:** A live social media ticker simulating incoming product reviews and modifying the reputation scores in real-time. (Includes a graceful fallback for CORS restrictions).
- **Chromatic Ring Hero:** A canvas-based interactive hero section that animates vibrant concentric rings.
- **Premium Apple-Inspired UI:** Glassmorphism, smooth animations (Framer Motion + GSAP), hover effects, and strict adherence to modern typography and spacing.
- **Data Visualization:** Interactive charts including Spider/Radar charts, Bar charts, and Trend Line graphs for comprehensive reputation insights.
- **AI Integration UI:** Live AI Insight panels and a functional Chat Assistant UI for querying product metrics.

## Setup Instructions for Local Development

### 1. Prerequisites
- Node.js (v18 or higher)
- NPM or regular Git

### 2. Install Dependencies

Open Command Prompt or Terminal in the project root:

```bash
# Install all dependencies (Client + Server)
npm run install:all
```

*(Alternatively, you can manually `cd server && npm install` and then `cd ../client && npm install`)*

### 3. Start the Application

**Run Backend Server:**
```bash
npm start
# or cd server && node server.js
```
*The server runs on port 3001 and emits WebSockets.*

**Run Frontend Development Server (Optional):**
If you want to edit React code with Hot-Module-Replacement:
```bash
cd client
npm run dev
```

### 4. Production Build & Deployment (Render.com)

This project includes a `render.yaml` configuration to auto-deploy to Render via GitHub:

1. Push your repository to GitHub.
2. Sign in to [Render](https://dashboard.render.com).
3. Connect your repository.
4. Render will automatically install dependencies, build the Vite app, and serve it via Express using the configuration provided.


## Database Schema & Products

The application simulates a continuous data stream. Upon startup, `server/utils/generateProducts.js` automatically generates a database of 100 realistic Nike products across various categories with randomized base scores and prices. 

**Structure:**
- `ProdID`: Integer (Primary Key)
- `Name`: String (e.g. "Air Force 1 Low", "Vaporfly 3")
- `Category`: String ("Lifestyle", "Running", etc.)
- `Score`: Integer (0-100)
- `Price`: Float

See `schema.sql` for the SQL-representation of the 100 seeded products.

## Architecture & Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS (for layout utilities), Vanilla CSS (for theme engine), Framer Motion, GSAP, Chart.js, Recharts.
- **Backend:** Node.js, Express (REST API + static serving), Socket.io (real-time events).
- **Deployment:** Render.com (Web Service).
