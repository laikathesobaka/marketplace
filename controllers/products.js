const pool = require("../db-config").pool;
const {products} = require("../mock-data");

function formatProducts(productsToFormat) {
  return productsToFormat.reduce((res, product) => {
    res[product.id] = product;
    return res;
  }, {});
}

async function createProducts() {
  let insertProductsRes;
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
    insertProductsRes = await pool.query(query);
  } catch (err) {
    console.log("Error occurred inserting product: ", err.stack);
  }
  return formatProducts(insertProductsRes.rows);
}

async function getAllProducts() {
  let allProducts;
  try {
    allProducts = await pool.query("SELECT * FROM products;");
  } catch (err) {
    console.log("Error occurred retrieving products: ", err.stack);
  }
  return formatProducts(allProducts.rows);
}

async function getProductsByVendorID(vendorID) {
  let productsByVendorID;
  try {
    productsByVendorID = await pool.query(
      `SELECT * FROM products WHERE vendor_id = ${vendorID}`
    );
  } catch (err) {
    console.log("Error occurred retrieving vendor's products: ", err.stack);
  }
  return productsByVendorID.rows;
}

async function searchProducts(searchTerm) {
  let searchProductsRes;
  try {
    searchProductsRes = await pool.query(
      `SELECT * FROM products WHERE name LIKE %${searchTerm}%;`
    );
  } catch (err) {
    console.log("Error occurred searching products: ", err.stack);
  }
  return searchProductsRes.rows;
}

module.exports = {
  createProducts,
  getAllProducts,
  getProductsByVendorID,
  searchProducts,
};
