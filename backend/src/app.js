const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const trackRoutes = require('./routes/track.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/track', trackRoutes);
app.use('/analytics', analyticsRoutes);

module.exports = app;
