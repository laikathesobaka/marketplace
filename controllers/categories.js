const pool = require("../db-config").pool;

async function getCategories() {
  let categories;
  try {
    categories = await pool.query(`SELECT * FROM categories;`);
  } catch (err) {
    console.log("Error occurred retrieving categories data: ", err.stack);
  }
  console.log("CATEGGORISE DATA > :", categories);
  return categories.rows;
}

module.exports = {
  getCategories,
};
