const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const trackRoutes = require('./routes/track.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();


const allowedOrigins = [
  process.env.CLIENT_URL,        // Vercel frontend
  "http://localhost:5173",       // local dev
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow server-to-server or curl requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("CORS blocked:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'analytics-dashboard-backend',
    time: new Date().toISOString(),
  });
});

app.use('/auth', authRoutes);
app.use('/track', trackRoutes);
app.use('/analytics', analyticsRoutes);

module.exports = app;