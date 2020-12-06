const db = require("../db-config");

async function createVendors(vendors) {
  for (const vendor of vendors) {
    try {
      await db.query(
        `INSERT INTO vendors (name) VALUES (${vendor}) RETURNING id;`
      );
    } catch (err) {
      console.log("Error occurred inserting vendor: ", err.stack);
    }
  }
}

function formatVendors(vendors) {
  return vendors.reduce((res, vendor) => {
    res[vendor.id] = vendor;
    return res;
  }, {});
}

async function getAllVendors() {
  let vendors;
  try {
    vendors = await db.query("SELECT * FROM vendors;");
  } catch (err) {
    console.log("Error occurred retrieving vendors: ", err.stack);
  }
  return formatVendors(vendors.rows);
}

module.exports = { createVendors, getAllVendors };
