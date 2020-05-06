const express = require("express");
const router = express.Router();
const Order = require("../controllers/order");
const stripe = require("../stripe");

router.post("/paymentIntent", async (req, res) => {
  const totalCost = req.body.totalCost;
  const paymentIntent = await stripe.createPaymentIntent(totalCost);
  res.send(paymentIntent);
});

router.post("/submitOrder", async (req, res) => {
  const { user, purchases, orderTotals, orderDate } = req.body;
  try {
    const order = await Order.createOrder(
      user,
      purchases,
      orderTotals,
      orderDate
    );
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/paymentRequest", async (req, res) => {
  const { cardElement, customerName } = req.body;
  let paymentRequest;
  try {
    paymentRequest = await stripe.createPaymentRequest(
      cardElement,
      customerName
    );
  } catch (err) {
    console.log(err);
  }
  return paymentRequest;
});

router.post("/customer", async (req, res) => {
  const { email, paymentMethod } = req.body;
  let customer;
  try {
    customer = await stripe.createCustomer(email, paymentMethod);
  } catch (err) {
    console.log(err);
  }
  return customer;
});

router.post("/subscription", async (req, res) => {
  const { email, amount, paymentMethodID } = req.body;
  let customer;
  try {
    customer = await stripe.createCustomer(email, paymentMethodID);
  } catch (err) {
    console.log(err);
  }

  let product;
  try {
    product = await stripe.createProduct();
  } catch (err) {
    console.log(err);
  }

  let plan;
  try {
    plan = await stripe.createPlan(amount, product.id);
  } catch (err) {
    console.log(err);
  }

  let subscription;
  try {
    subscription = await stripe.createSubscription(customer.id, plan.id);
  } catch (err) {
    console.log(err);
  }
  return res.send(subscription);
});

module.exports = router;
