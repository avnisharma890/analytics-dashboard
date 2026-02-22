const { Pool } = require('pg');
require('dotenv').config();

console.log("DB URL:", process.env.DATABASE_URL);

const isLocal =
  process.env.DATABASE_URL?.includes('localhost') ||
  process.env.DATABASE_URL?.includes('127.0.0.1');

// Parse connection string to override SSL settings
const dbUrl = new URL(process.env.DATABASE_URL);
const connectionConfig = {
  host: dbUrl.hostname,
  port: dbUrl.port || 5432,
  database: dbUrl.pathname.substring(1),
  user: dbUrl.username,
  password: dbUrl.password,
  ssl: isLocal ? false : { rejectUnauthorized: false },
};

const pool = new Pool(connectionConfig);

module.exports = pool;