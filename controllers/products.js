const pool = require("../dbConfig").pool;

//Product unit cost is in cents
const products = [
  {
    unitCost: 120,
    media: "/garlic2.png",
    name: "garlic",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 200,
    media: "/onion.png",
    name: "onion",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 99,
    media: "/scallion2.png",
    name: "scallion",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 100,
    media: "/scallion3.png",
    name: "scallion",
    category: "produce",
    vendorID: 2,
    inventory: 100,
  },
  {
    unitCost: 150,
    media: "/cabbage2.png",
    name: "cabbage",
    category: "produce",
    vendorID: 5,
    inventory: 100,
  },
  {
    unitCost: 150,
    media: "/cabbage.png",
    name: "cabbage",
    category: "produce",
    vendorID: 6,
    inventory: 100,
  },
  {
    unitCost: 179,
    media: "/beet2.png",
    name: "beet",
    category: "produce",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 99,
    name: "scallion",
    media: "/scallion.png",
    category: "dairy",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 489,
    media: "/marinatedmushroom.png",
    name: "marinated mushroom",
    category: "produce",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 315,
    media: "/blueberry.png",
    name: "blueberry",
    category: "produce",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 525,
    media: "/pomegranate.png",
    name: "pomegranate",
    category: "produce",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 215,
    media: "/lemon.png",
    name: "lemon",
    category: "produce",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 315,
    media: "/wildstrawberries.png",
    name: "wild strawberries",
    category: "produce",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 2000,
    media: "/blackcaviar.png",
    name: "black caviar",
    category: "seafood",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 1215,
    media: "/smokedsturgeon.png",
    name: "smoked sturgeon",
    category: "seafood",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 1100,
    media: "/herring.png",
    name: "herring",
    category: "seafood",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 2200,
    media: "/blackcaviar2.png",
    name: "black caviar",
    category: "seafood",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 1300,
    media: "/redcaviar.png",
    name: "red caviar",
    category: "seafood",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 1300,
    media: "/redcaviar2.png",
    name: "red caviar",
    category: "seafood",
    vendorID: 7,
    inventory: 100,
  },
  {
    unitCost: 1400,
    media: "/salmon.png",
    name: "salmon",
    category: "seafood",
    vendorID: 7,
    inventory: 100,
  },
  {
    unitCost: 1310,
    media: "/paltus.png",
    name: "halibut",
    category: "seafood",
    vendorID: 7,
    inventory: 100,
  },
  {
    unitCost: 350,
    media: "/potato.png",
    name: "potato",
    category: "produce",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 275,
    media: "/ogurets.png",
    name: "pickle",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 415,
    media: "/griba.png",
    name: "mushroom",
    category: "produce",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 1200,
    media: "/beef.png",
    name: "beef",
    category: "meat",
    vendorID: 2,
    inventory: 100,
  },
  {
    unitCost: 1485,
    name: "duck",
    media: "/utka.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 799,
    name: "kolbasa",
    media: "/kolbasa.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 559,
    name: "sausage",
    media: "/russiansausage.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 1299,
    name: "lamb chop",
    media: "/lambchop.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 999,
    name: "chicken",
    media: "/kuritsa.png",
    category: "poultry",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 899,
    name: "brisket",
    media: "/brisket.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 1399,
    name: "pate",
    media: "/pate.png",
    category: "meat",
    vendorID: 3,
    inventory: 100,
  },
  {
    unitCost: 200,
    media: "/maslo.png",
    name: "butter",
    category: "dairy",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 589,
    media: "/cottagecheesecasserole.png",
    name: "cottage cheese casserole",
    category: "dairy",
    vendorID: 2,
    inventory: 100,
  },
  {
    unitCost: 399,
    media: "/sirniki.png",
    name: "cheese pancake",
    category: "dairy",
    vendorID: 2,
    inventory: 100,
  },
  {
    unitCost: 289,
    media: "/tvorog.png",
    name: "cottage cheese",
    category: "dairy",
    vendorID: 2,
    inventory: 100,
  },
  {
    unitCost: 899,
    media: "/chickenbreast.png",
    name: "chicken breast",
    category: "poultry",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 799,
    media: "/chickenleg.png",
    name: "chicken leg",
    category: "poultry",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 799,
    media: "/chickenleg2.png",
    name: "chicken leg",
    category: "poultry",
    vendorID: 5,
    inventory: 100,
  },
  {
    unitCost: 1499,
    media: "/kuritsa2.png",
    name: "chicken",
    category: "poultry",
    vendorID: 5,
    inventory: 100,
  },
  {
    unitCost: 985,
    media: "/eggs.png",
    name: "eggs",
    category: "poultry",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 985,
    media: "/eggs2.png",
    name: "eggs",
    category: "poultry",
    vendorID: 5,
    inventory: 100,
  },
  {
    unitCost: 985,
    media: "/eggs3.png",
    name: "eggs",
    category: "poultry",
    vendorID: 6,
    inventory: 100,
  },
  {
    unitCost: 345,
    name: "sour cream",
    media: "/smetana.png",
    category: "dairy",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 345,
    name: "cottage cheese",
    media: "/tvorog2.png",
    category: "dairy",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 375,
    name: "milk",
    media: "/moloko.png",
    category: "dairy",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 375,
    media: "/moloko2.png",
    name: "milk",
    category: "dairy",
    vendorID: 2,
    inventory: 100,
  },
  {
    unitCost: 375,
    media: "/moloko3.png",
    name: "milk",
    category: "dairy",
    vendorID: 4,
    inventory: 100,
  },
  {
    unitCost: 600,
    name: "cheese",
    media: "/cheese.png",
    category: "dairy",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 715,
    name: "goat cheese",
    media: "/goatcheese.png",
    category: "dairy",
    vendorID: 1,
    inventory: 100,
  },
  {
    unitCost: 339,
    name: "yogurt",
    media: "/yogurt.png",
    category: "dairy",
    vendorID: 1,
    inventory: 100,
  },

  {
    unitCost: 539,
    name: "pork loin",
    media: "/porkloin.png",
    category: "meat",
    vendorID: 7,
    inventory: 100,
  },
  {
    unitCost: 439,
    name: "salo",
    media: "/salo.png",
    category: "meat",
    vendorID: 7,
    inventory: 100,
  },
];

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
    console.log("PRODUCTS SEARCH QUERY RES ! ", products);
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
