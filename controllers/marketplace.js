const pool = require("../db-config").pool;

async function getMarketplace() {
  let marketplace;
  try {
    marketplace = await pool.query(`SELECT * FROM marketplace;`);
  } catch (err) {
    console.log("Error occurred retrieving marketplace data: ", err.stack);
  }
  return marketplace.rows[0];
}

module.exports = {
  getMarketplace,
};
