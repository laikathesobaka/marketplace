require("dotenv").config();

const Pool = require("pg").Pool;
const products = require("./products");

// const isProduction = process.NODE_ENV === "production";

// console.log("IS PRODUCTION :", process.NODE_ENV);
// console.log(process.env);
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// console.log("CONNECTION STRING: ", connectionString);
// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction,
// });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTables = `
CREATE TABLE IF NOT EXISTS users (
  ID SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  google_id TEXT,
  first_name TEXT,
  last_name TEXT,
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
`;

const seedProducts = {
  text: `INSERT INTO products (vendor_id, unit_cost, name, media, category, inventory)
  SELECT * FROM UNNEST ($1::int[], $2::int[], $3::text[], $4::text[], $5::text[], $6::int[]) ON CONFLICT (name, category, vendor_id) DO NOTHING RETURNING *;`,
  values: [
    products.map((product) => product.vendorID),
    products.map((product) => product.unitCost),
    products.map((product) => product.name),
    products.map((product) => product.media),
    products.map((product) => product.category),
    products.map((product) => product.inventory),
  ],
};

const initializeDB = async () => {
  try {
    await pool.query(createTables);
    await pool.query(seedProducts);
  } catch (err) {
    throw err;
  }
};

initializeDB();

module.exports = { pool };
