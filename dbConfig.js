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
  address TEXT,
  phone_number INTEGER
);

CREATE TABLE IF NOT EXISTS vendors (
  ID SERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS products (
  ID SERIAL PRIMARY KEY,
  vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
  unit_cost INTEGER NOT NULL,
  name TEXT NOT NULL,
  media TEXT,
  category TEXT,
  inventory INTEGER,
  UNIQUE (name, category, vendor_id)
);

CREATE TABLE IF NOT EXISTS orders (
  ID SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quantity_total INTEGER,
  cost_total INTEGER,
  order_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS purchases (
  ID SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  subscription_id TEXT,
  subscription_interval TEXT,
  product_name TEXT,
  quantity INTEGER NOT NULL,
  cost INTEGER NOT NULL,
  purchase_date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO vendors (name) VALUES ('Yulia'), ('Dima'), ('Anna'), ('Alex'), ('Sasha'), ('Katya'), ('Vlad') ON CONFLICT (name) DO NOTHING;

`);

module.exports = { pool };
