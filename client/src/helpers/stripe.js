export async function createPaymentIntent(totalCost) {
  let paymentIntent;
  try {
    paymentIntent = await fetch("/stripe/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalCost }),
    });
  } catch (err) {
    console.log("Error occurred getting payment intent: ", err);
  }
  return await paymentIntent.json();
}

export async function createSubscription(totalCost, email, paymentMethodID) {
  let subscriptionRes;
  try {
    subscriptionRes = await fetch(`/users/subscriptions`, {
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

export async function cancelSubscriptions(subscriptions) {
  let res;
  try {
    res = await fetch("/users/subscriptions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriptions),
    });
  } catch (err) {
    console.log("Error occurred canceling subscriptions: ", err);
  }
  if (res.status === 200) {
    return true;
  }
  return false;
}

export async function createOrder(user, purchases, orderTotals) {
  const orderDate = new Date();
  try {
    await fetch("/users/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        purchases: Object.keys(purchases).map(
          (purchase) => purchases[purchase]
        ),
        orderTotals,
        orderDate,
      }),
    });
  } catch (err) {
    throw err;
  }
}
