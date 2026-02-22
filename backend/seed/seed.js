require('dotenv').config();
const { faker } = require('@faker-js/faker');
const pool = require('../src/config/db');

const genders = ['Male', 'Female', 'Other'];
const features = ['date_filter', 'gender_filter', 'bar_chart_zoom'];

async function seed() {
  try {
    console.log("Seed function started");
    console.log("Seeding database...");

    // Clear old data
    await pool.query('DELETE FROM feature_clicks');
    await pool.query('DELETE FROM users');

    // Insert users
    const userIds = [];

    for (let i = 0; i < 20; i++) {
      const result = await pool.query(
        `INSERT INTO users (username, password, age, gender)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [
          faker.internet.username() + i,
          'hashed_pw',
          faker.number.int({ min: 15, max: 60 }),
          genders[Math.floor(Math.random() * genders.length)]
        ]
      );

      userIds.push(result.rows[0].id);
    }

    // Insert feature clicks
    for (let i = 0; i < 100; i++) {
      await pool.query(
        `INSERT INTO feature_clicks (user_id, feature_name, timestamp)
         VALUES ($1, $2, $3)`,
        [
          userIds[Math.floor(Math.random() * userIds.length)],
          features[Math.floor(Math.random() * features.length)],
          faker.date.recent({ days: 10 })
        ]
      );
    }

    console.log("Seeding complete.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = seed;

// Run directly if called via: node seed/seed.js
if (require.main === module) {
  seed();
}