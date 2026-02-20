const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, age, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, password, age, gender)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [username, hashedPassword, age, gender]
    );

    const token = jwt.sign(
      { id: result.rows[0].id },
      process.env.JWT_SECRET
    );

    res.json({ token });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      `SELECT * FROM users WHERE username=$1`,
      [username]
    );

    if (!result.rows.length) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
