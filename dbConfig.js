const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query(`
CREATE TABLE IF NOT EXISTS users (
  ID SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address TEXT
);

CREATE TABLE IF NOT EXISTS products (
  ID SERIAL PRIMARY KEY,
  unit_cost INTEGER NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS purchases (
  ID SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  subscription BOOLEAN NOT NULL,
  purchase_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS orders (
  ID SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  purchases jsonb,
  order_date DATE NOT NULL DEFAULT CURRENT_DATE
)

`);

module.exports = { pool };
