const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const trackRoutes = require("./routes/track.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

app.use(
  cors({
    origin: true,        // reflect request origin
    credentials: true,   // allow cookies if you use them
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "analytics-dashboard-backend",
    time: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes);
app.use("/track", trackRoutes);
app.use("/analytics", analyticsRoutes);

module.exports = app;