const db = require("../db-config");

async function getMarketplace() {
  let marketplace;
  try {
    marketplace = await db.query(`SELECT * FROM marketplace;`);
  } catch (err) {
    throw err;
  }
  return marketplace.rows[0];
}

module.exports = {
  getMarketplace,
};
