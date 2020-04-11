export async function getPaymentIntent(totalCost) {
  let paymentIntent;
  try {
    paymentIntent = await fetch("/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalCost }),
    });
  } catch (err) {
    console.log("Error occurred getting payment intent: ", err);
  }
  return await paymentIntent.json();
}

export async function submitSubscription(totalCost, email, paymentMethodID) {
  let subscriptionRes;
  try {
    subscriptionRes = await fetch("/purchase/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totalCost,
        email,
        paymentMethodID,
      }),
    });
  } catch (err) {
    console.log("Error occurred submitting subscription: ", err);
  }
  return await subscriptionRes.json();
}
