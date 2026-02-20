const pool = require('../config/db');

exports.track = async (req, res) => {
  try {
    const { feature_name } = req.body;

    await pool.query(
      `INSERT INTO feature_clicks (user_id, feature_name)
       VALUES ($1, $2)`,
      [req.user.id, feature_name]
    );

    res.json({ message: "Tracked" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
