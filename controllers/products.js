const pool = require("../dbConfig").pool;
const products = require("../products");

function formatProducts(products) {
  return products.reduce((res, product) => {
    res[product.id] = product;
    return res;
  }, {});
}

async function createProducts() {
  let productsRes;
  const query = {
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
  try {
    productsRes = await pool.query(query);
  } catch (err) {
    console.log(
      "Error occurred inserting product: ",

      err.stack
    );
  }
  return formatProducts(productsRes.rows);
}

async function getAllProducts() {
  let products;
  try {
    products = await pool.query("SELECT * FROM products;");
  } catch (err) {
    console.log("Error occurred retrieving products: ", err.stack);
  }
  return formatProducts(products.rows);
}

async function getProductsByVendorID(vendorID) {
  let products;
  try {
    products = await pool.query(
      `SELECT * FROM products WHERE vendor_id = ${vendorID}`
    );
  } catch (err) {
    console.log("Error occurred retrieving vendor's products: ", err.stack);
  }
  return products.rows;
}

async function searchProducts(searchTerm) {
  let products;
  try {
    products = await pool.query(
      `SELECT * FROM products WHERE name LIKE %${searchTerm}%;`
    );
  } catch (err) {
    console.log("Error occurred searching products: ", err.stack);
  }
  return products.rows;
}

module.exports = {
  createProducts,
  getAllProducts,
  getProductsByVendorID,
  searchProducts,
};
