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

export async function cancelSubscriptions(subscriptions) {
  let res;
  try {
    res = await fetch("/user/cancelSubscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriptions),
    });
  } catch (err) {
    console.log("Error occurred canceling subscriptions: ", err);
  }
  console.log("RES FROM CANCEL SUBSCRIPTION: ", res);
  if (res.status === 200) {
    return true;
  }
  return false;
}

export async function submitOrder(user, purchases, orderTotals) {
  const orderDate = new Date();
  try {
    await fetch("/purchase/submitOrder", {
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
    console.log("ERROR OCCURRED SUBMITTING ORDER TO SERVER", err);
  }
}
