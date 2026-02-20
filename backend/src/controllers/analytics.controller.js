const pool = require('../config/db');

exports.getAnalytics = async (req, res) => {
  try {
    const { start, end, gender, feature } = req.query;

    const params = [];
    let where = [];

    if (start) {
      params.push(start);
      where.push(`fc.timestamp >= $${params.length}`);
    }

    if (end) {
      params.push(end);
      where.push(`fc.timestamp <= $${params.length}`);
    }

    if (gender) {
      params.push(gender);
      where.push(`u.gender = $${params.length}`);
    }

    const whereClause = where.length
      ? `WHERE ${where.join(' AND ')}`
      : '';

    // Bar chart
    const barQuery = `
      SELECT fc.feature_name, COUNT(*) AS total_clicks
      FROM feature_clicks fc
      JOIN users u ON fc.user_id = u.id
      ${whereClause}
      GROUP BY fc.feature_name
    `;

    const barResult = await pool.query(barQuery, params);

    let lineResult = { rows: [] };

    if (feature) {
      const lineParams = [...params, feature];

      const lineQuery = `
        SELECT DATE(fc.timestamp) AS day, COUNT(*) AS clicks
        FROM feature_clicks fc
        JOIN users u ON fc.user_id = u.id
        ${whereClause}
        AND fc.feature_name = $${lineParams.length}
        GROUP BY day
        ORDER BY day
      `;

      lineResult = await pool.query(lineQuery, lineParams);
    }

    res.json({
      barData: barResult.rows,
      lineData: lineResult.rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
