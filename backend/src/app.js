const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const trackRoutes = require('./routes/track.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("CORS blocked:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.options("*", cors());

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/track', trackRoutes);
app.use('/analytics', analyticsRoutes);

module.exports = app;
