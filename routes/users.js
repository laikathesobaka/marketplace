const express = require("express");
const router = express.Router();
const Order = require("../controllers/order");
const stripe = require("../stripe");

router.get("/:userID/orders", async (req, res) => {
  const userID = req.params.userID;
  const orders = await Order.getOrdersByUserID(userID);
  res.send(orders);
});

router.get("/:userID/subscriptions", async (req, res) => {
  const userID = req.params.userID;
  const subscriptions = await Order.getSubscriptionsByUserID(userID);
  res.send(subscriptions);
});

router.post("/orders", async (req, res) => {
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

router.post("/subscriptions", async (req, res) => {
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

router.delete("/subscriptions", async (req, res) => {
  const subscriptions = req.body;
  const subscriptionIDs = subscriptions.map(
    (subscription) => subscription.subscription_id
  );
  const purchaseIDs = subscriptions.map(
    (subscription) => subscription.purchase_id
  );
  try {
    await stripe.cancelSubscriptions(subscriptionIDs);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  try {
    await Order.cancelPurchaseSubscriptions(purchaseIDs);
  } catch (err) {
    res.status(500).send(err);
  }
  res.status(200).end();
});

module.exports = router;
