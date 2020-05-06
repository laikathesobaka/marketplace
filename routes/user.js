const express = require("express");
const router = express.Router();
const Order = require("../controllers/order");
const stripe = require("../stripe");

router.post("/orderHistory", async (req, res) => {
  const { userID } = req.body;
  const orders = await Order.getOrdersByUserID(userID);
  res.send(orders);
});

router.post("/subscriptions", async (req, res) => {
  const { userID } = req.body;
  const subscriptions = await Order.getSubscriptionsByUserID(userID);
  res.send(subscriptions);
});

router.post("/cancelSubscriptions", async (req, res) => {
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
