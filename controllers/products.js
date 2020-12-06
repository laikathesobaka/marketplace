const db = require("../db-config");

async function getAllProducts() {
  let products;
  try {
    products = await db.query(
      `SELECT
        id,
        unit_cost as "unitCost",
        vendor_id as "vendorID",
        media,
        name,
        description,
        category,
        inventory FROM products;`
    );
  } catch (err) {
    console.log("Error occurred retrieving products: ", err.stack);
    throw err;
  }
  return products.rows;
}

async function searchProducts(searchTerm) {
  let searchProductsRes;
  try {
    searchProductsRes = await db.query(
      `SELECT unit_cost as "unitCost", vendor_id as "vendorID", media, name, description, category, inventory FROM products WHERE name LIKE %${searchTerm}%;`
    );
  } catch (err) {
    console.log("Error occurred searching products: ", err.stack);
  }
  return searchProductsRes.rows;
}

module.exports = {
  getAllProducts,
  searchProducts,
};
