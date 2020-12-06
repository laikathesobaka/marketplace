require("dotenv").config();

const pg = require("pg");
const Pool = pg.Pool;
const {
  marketplace,
  vendors,
  categories,
  products,
} = require("./data/mock-data.json");

const createRole = `
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = '${process.env.DB_USER}') THEN
      CREATE ROLE ${process.env.DB_USER} LOGIN SUPERUSER PASSWORD '${process.env.DB_PASSWORD}';
   END IF;
END
$do$;

`;

const createDB = `
CREATE EXTENSION IF NOT EXISTS dblink;

DO
$do$
BEGIN
   IF EXISTS (SELECT FROM pg_database WHERE datname = '${process.env.DB_NAME}') THEN
      RAISE NOTICE 'Database already exists';
   ELSE
      PERFORM dblink_exec('dbname=' || current_database()
                        , 'CREATE DATABASE ${process.env.DB_NAME} WITH OWNER = ${process.env.DB_USER}');
   END IF;
END
$do$;
 
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${process.env.DB_USER};
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${process.env.DB_USER};
`;

const createTables = `
CREATE TABLE IF NOT EXISTS marketplace (
  name TEXT UNIQUE NOT NULL,
  multi_vendor BOOLEAN,
  media JSON,
  authentication JSON,
  payment_methods JSON,
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
  description TEXT,
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
  text: `INSERT INTO marketplace (name, multi_vendor, media, authentication, payment_methods) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (name) DO NOTHING RETURNING *;`,
  values: [
    marketplace.name,
    marketplace.multipleVendors,
    marketplace.media,
    marketplace.authentication,
    marketplace.paymentMethods,
  ],
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
  text: `INSERT INTO products (vendor_id, unit_cost, name, description, media, category, inventory)
   SELECT * FROM UNNEST ($1::int[], $2::int[], $3::text[], $4::text[], $5::text[], $6::text[], $7::int[]) ON CONFLICT (name, category, vendor_id) DO NOTHING RETURNING *;`,
  values: [
    products.map((product) => product.vendorID),
    products.map((product) => product.unitCost),
    products.map((product) => product.name),
    products.map((product) => product.description),
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

let pool;
(async () => {
  let poolPG = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "postgres",
  });
  try {
    await poolPG.query(createRole);
    await poolPG.query(createDB);
  } catch (err) {
    console.log(
      `Error occurred creating role ${process.env.DB_USER}: `,
      err.stack
    );
  } finally {
    poolPG.end();
  }
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  let client;
  try {
    client = await pool.connect();
  } catch (err) {
    throw err;
  }
  try {
    await client.query("BEGIN");
    try {
      await client.query(createTables);
      await client.query(seedMarketplaceData);
      await client.query(seedVendors);
      await client.query(seedCategories);
      await client.query(seedProducts);
      await client.query("COMMIT");
    } catch (err) {
      console.error(`Error occurred seeding db: `, err.stack);
      client.query("ROLLBACK");
    }
  } finally {
    client.end();
  }
})().catch((e) => console.log(e));

module.exports = {
  query: async (text, params) => await pool.query(text, params),
};
