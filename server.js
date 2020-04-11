const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const stripe = require("./stripe");

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(require("./routes"));

app.post("/purchase", async (req, res) => {
  const totalCost = req.body.totalCost;
  const paymentIntent = await stripe.createPaymentIntent(totalCost);
  res.send(paymentIntent);
});

app.post("/purchase/product", async (req, res) => {});

app.post("/purchase/paymentRequest", async (req, res) => {
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

app.post("/purchase/customer", async (req, res) => {
  const { email, paymentMethod } = req.body;
  let customer;
  try {
    customer = await stripe.createCustomer(email, paymentMethod);
  } catch (err) {
    console.log(err);
  }
  return customer;
});

app.post("/purchase/subscription", async (req, res) => {
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

  let subscriptionStatus;
  try {
    subscriptionStatus = await stripe.createSubscription(customer.id, plan.id);
  } catch (err) {
    console.log(err);
  }
  return res.send({ status: subscriptionStatus });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
