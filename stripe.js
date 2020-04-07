// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require("stripe")(stripeSecret);

async function createPaymentIntent(amount) {
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" },
    });
  } catch (err) {
    console.log("error occurred creating payment intent", err);
    // throw err;
  }
  return paymentIntent.client_secret;
}

module.exports = {
  createPaymentIntent,
};
