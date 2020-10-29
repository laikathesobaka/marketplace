const express = require("express");
const router = express.Router();
const Product = require("../controllers/products");
const Vendor = require("../controllers/vendors");

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/stripe", require("./stripe"));

router.get("/products-list", async (req, res) => {
  const products = await Product.getAllProducts();
  res.send(products);
});

router.get("/vendors", async (req, res) => {
  const vendors = await Vendor.getAllVendors();
  res.send(vendors);
});

module.exports = router;
