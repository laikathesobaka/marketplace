require("dotenv").config();

const pg = require("pg");
const Pool = pg.Pool;
const { marketplace, vendors, categories, products } = require("./mock-data");

const createDB = `
CREATE EXTENSION IF NOT EXISTS dblink;

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = '${process.env.DB_USER}') THEN

      CREATE ROLE ${process.env.DB_USER} LOGIN PASSWORD '${process.env.DB_PASSWORD}';
   END IF;
END
$do$;

DO
$do$
BEGIN
   IF EXISTS (SELECT FROM pg_database WHERE datname = '${process.env.DB_NAME}') THEN
      RAISE NOTICE 'Database already exists';
   ELSE
      PERFORM dblink_exec('dbname=' || current_database()
                        , 'CREATE DATABASE ${process.env.DB_NAME}');
   END IF;
END
$do$;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${process.env.DB_USER};
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${process.env.DB_USER};

`;

const createTables = `
CREATE TABLE IF NOT EXISTS marketplace (
  name TEXT UNIQUE NOT NULL,
  created_at DATE DEFAULT CURRENT_DATE
);

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
  ID INTEGER PRIMARY KEY,
  name TEXT UNIQUE,
  nickname TEXT,
  created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS categories (
  ID SERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  media JSON,
  products JSON
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

`;

const seedMarketplaceData = {
  text: `INSERT INTO marketplace (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING *;`,
  values: [marketplace.name],
};

const seedCategories = {
  text: `INSERT INTO categories (name, media, products) SELECT * FROM UNNEST ($1::text[], $2::json[], $3::json[]) ON CONFLICT (name) DO NOTHING RETURNING *;`,
  values: [
    categories.map((category) => category.name),
    categories.map((category) => category.media),
    categories.map((category) => JSON.stringify(category.products)),
  ],
};

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

const seedVendors = {
  text: `INSERT INTO vendors (ID, name, nickname)
   SELECT * FROM UNNEST ($1::int[], $2::text[], $3::text[]) ON CONFLICT (name) DO NOTHING RETURNING *`,
  values: [
    vendors.map((vendor) => vendor.ID),
    vendors.map((vendor) => vendor.name),
    vendors.map((vendor) => vendor.nickname),
  ],
};

let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: "postgres",
};

let pool = new Pool(config);

(async () => {
  let client = await pool.connect();
  await pool.query(createDB);
  pool = new Pool({
    ...config,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  client = await pool.connect();
  await client.query(createTables);
  await client.query(seedMarketplaceData);
  await client.query(seedVendors);
  await client.query(seedCategories);
  await client.query(seedProducts);
})().catch((e) => console.error(e.stack));

// pool.on("connect", (client) => {
//   client.query(createDB, (err, res) => {
//     client.query(createTables, (err, res) => {
//       client.query(seedMarketplaceData);
//       client.query(seedCategories);
//       client.query(seedVendors, (err, res) => {
//         client.query(seedProducts);
//       });
//     });
//   });
// });

// (async () => {
//   await pool.connect();
// })().catch((e) => console.error(e.stack));

// let pool = new Pool({ database: "postgres" });

// pool.connect((err, client, release) => {
//   if (err) {
//     console.log("error connecting to postgres db: ", err.stack);
//     // If e-commerce db does not exist, create db and tables, then seed
//   }
//   client.query(createDB, (err, result) => {
//     if (err) {
//       console.log("error occurred creating db: ", err.stack);
//     }
//     release();
//     pool = new Pool({
//       ...config,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//     });
//     pool.connect((err, client2, release2) => {
//       if (err) {
//         console.log("error occurred connecting to marketplace db: ", err.stack);
//       }
//       client2.query(createTables, (err, res) => {
//         if (err) {
//           console.log("error occurred creating tables: ", err.stack);
//         }
//         client2.query(seedMarketplaceData);
//         client2.query(seedCategories, (err, res) => {
//           console.log("error seeding categgories: ", err);
//           console.log("res from seeding categories: ", res);
//         });
//         client2.query(seedVendors, (err, res) => {
//           client2.query(seedProducts);
//         });
//       });
//       release2();
//     });
//   });
// });

// pool.connect();

module.exports = { pool };
