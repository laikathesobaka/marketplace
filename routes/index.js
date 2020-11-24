const express = require("express");
const router = express.Router();
const Marketplace = require("../controllers/marketplace");
const Category = require("../controllers/categories");
const Product = require("../controllers/products");
const Vendor = require("../controllers/vendors");

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/stripe", require("./stripe"));

router.get("/marketplace", async (req, res) => {
  const marketplace = await Marketplace.getMarketplace();
  res.send(marketplace);
});

router.get("/categories", async (req, res) => {
  const categories = await Category.getCategories();
  console.log("🌄", categories);
  res.send(categories);
});

router.get("/products-list", async (req, res) => {
  const products = await Product.getAllProducts();
  res.send(products);
});

router.get("/vendors", async (req, res) => {
  const vendors = await Vendor.getAllVendors();
  res.send(vendors);
});

module.exports = router;
