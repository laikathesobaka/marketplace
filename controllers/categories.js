const db = require("../db-config");

async function getCategories() {
  let categories;
  try {
    categories = await db.query(`SELECT * FROM categories;`);
  } catch (err) {
    console.log("Error occurred retrieving categories data: ", err.stack);
    throw err;
  }
  return categories.rows;
}

module.exports = {
  getCategories,
};
