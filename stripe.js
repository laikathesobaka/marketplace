// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

require("dotenv").config();

const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require("stripe")(stripeSecret);

async function createPaymentRequest(cardElement, customerName) {
  let paymentRequest;
  try {
    paymentRequest = await stripe.createPaymentRequest({
      type: "card",
      cardElement,
      billing_details: {
        name: customerName,
      },
    });
  } catch (err) {
    console.log("Error occurred creating payment request: ", err);
  }
  return paymentRequest;
}

async function createPaymentMethod(cardElement, customerName) {
  const res = await stripe.createPaymentMethod({
    type: "card",
    card: cardElement,
    billing_details: {
      name: customerName,
    },
  });
  if (res.error) {
    console.log("Error occurred creating payment method: ", err);
  }
  return res.paymentMethod;
}

async function createPaymentIntent(amount) {
  console.log("CREATE PAYMENT INTENT ", amount);
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" },
    });
  } catch (err) {
    console.log("error occurred creating payment intent", err);
  }
  return {
    paymentIntentID: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    status: paymentIntent.status,
  };
}

async function createCustomer(email, paymentMethod) {
  let customer;
  try {
    customer = stripe.customers.create({
      email,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });
  } catch (err) {
    console.log("error occurred creating customer stripe: ", err);
  }
  return customer;
}

async function createProduct(productName = "mockecommerce") {
  let product;
  try {
    product = await stripe.products.create({
      name: productName,
      type: "service",
    });
  } catch (err) {
    console.log("Error occurred creating product: ", err);
  }
  return product;
}

async function createPlan(amount, productID, nickname) {
  let plan;
  try {
    plan = await stripe.plans.create({
      currency: "usd",
      interval: "month",
      product: productID,
      nickname: nickname,
      amount: amount,
    });
  } catch (err) {
    console.log("Error occurred creating plan: ", err);
  }
  return plan;
}

async function createSubscription(customerID, planID, paymentIntent) {
  let subscription;
  try {
    subscription = await stripe.subscriptions.create({
      customer: customerID,
      items: [
        {
          plan: planID,
        },
      ],
      expand: ["latest_invoice.payment_intent"],
    });
  } catch (err) {
    console.log("Error occurred creating subscription: ", err);
  }
  console.log("CREATED SUBSCRIPTION IN STRIPE.JS: ", subscription);
  return subscription;
}

async function getSubscription(subscriptionID) {
  let subscription;
  try {
    subscription = await stripe.subscriptions.retrieve(subscriptionID);
  } catch (err) {
    console.log("Error occurred retrieving subscription: ", err);
  }
  return subscription;
}

async function cancelSubscriptions(subscriptionIDs) {
  for (const subscriptionID of subscriptionIDs) {
    try {
      await stripe.subscriptions.del(subscriptionID);
    } catch (err) {
      console.log("Error occurred deleting subscription: ", err);
    }
  }
}

module.exports = {
  createPaymentIntent,
  createCustomer,
  createPaymentRequest,
  createPaymentMethod,
  createProduct,
  createPlan,
  createSubscription,
  getSubscription,
  cancelSubscriptions,
};
