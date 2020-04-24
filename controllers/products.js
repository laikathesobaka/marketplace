const pool = require("../dbConfig").pool;

const products = [
  {
    unitCost: 2,
    media: "/garlic2.png",
    name: "garlic",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 2,
    media: "/onion.png",
    name: "onion",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 3,
    media: "/potato.png",
    name: "potato",
    category: "produce",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 3,
    media: "/ogurets.png",
    name: "pickle",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 4,
    media: "/griba.png",
    name: "mushroom",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 10,
    media: "/beef.png",
    name: "beef",
    category: "meat",
    vendorID: 2,
    inventory: 100,
  },
  {
    unitCost: 11,
    name: "duck",
    media: "/utka.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 7,
    name: "kolbasa",
    media: "/kolbasa.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 6,
    name: "sausage",
    media: "/russiansausage.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 9,
    name: "chicken",
    media: "/kuritsa.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 2,
    media: "/maslo.png",
    name: "butter",
    category: "dairy",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 3,
    name: "sour cream",
    media: "/smetana.png",
    category: "dairy",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 2,
    name: "milk",
    media: "/moloko.png",
    category: "dairy",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 6,
    name: "cheese",
    media: "/cheese.png",
    category: "dairy",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 3,
    name: "yogurt",
    media: "/yogurt.png",
    category: "dairy",
    vendorID: 1,
    inventory: 100,
  },
];

function formatProducts(products) {
  return products.reduce((res, product) => {
    res[product.name] = product;
    return res;
  }, {});
}

async function createProducts() {
  let productsRes;
  const query = {
    text: `INSERT INTO products (vendor_id, unit_cost, name, media, category, inventory)
    SELECT * FROM UNNEST ($1::int[], $2::int[], $3::text[], $4::text[], $5::text[], $6::int[]) RETURNING *;`,
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
    console.log("Error occurred inserting product: ", err.stack);
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

module.exports = { createProducts, getAllProducts, getProductsByVendorID };
