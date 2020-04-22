const pool = require("../dbConfig").pool;
const User = require("./user");
const stripe = require("../stripe");

async function createPurchases(userID, orderID, orderDate, purchases) {
  for (const purchase of purchases) {
    const subscriptionID = purchase.subscriptionID
      ? purchase.subscriptionID
      : "";
    const subscriptionInterval = purchase.subscription
      ? purchase.subscription
      : "";
    const query = {
      text: `INSERT INTO purchases(
            user_id,
            product_id,
            order_id,
            subscription_id,
            subscription_interval,
            name,
            quantity,
            cost,
            purchase_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      values: [
        userID,
        purchase.productID,
        orderID,
        subscriptionID,
        subscriptionInterval,
        purchase.name,
        purchase.amount,
        purchase.total,
        orderDate,
      ],
    };
    try {
      const purchase = await pool.query(query);
      console.log("INSERTED PURCHSE ---- ", purchase);
    } catch (err) {
      console.log("Error occurred inserting purchase: ", err.stack);
    }
  }
}

async function createOrder(user, purchases, orderTotals, orderDate) {
  console.log("PURCHASES TO INSERT: ", purchases);
  let order;
  const query = {
    text: `INSERT INTO orders(
          user_id,
          quantity_total,
          cost_total,
          order_date) VALUES($1, $2, $3, $4) RETURNING id;`,
    values: [user.id, orderTotals.amount, orderTotals.cost, orderDate],
  };
  try {
    order = await pool.query(query);
    // await User.updateUserContact(user.id, user.address, user.phone)
    console.log("INSERTED ORDER ----- ", order);
    await createPurchases(user.id, order.rows[0].id, orderDate, purchases);
  } catch (err) {
    console.log("Error occurred inserting order", err.stack);
  }
  return order.rows[0];
}

async function getOrdersByUserID(userID) {
  const query = {
    text: "SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC;",
    values: [userID],
  };
  let orders;
  try {
    orders = await pool.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  console.log("ORDERS.ROWS[0].PURCHASES ", orders.rows);
  return orders.rows;
}

async function getSubscriptionsByUserID(userID) {
  let purchases;
  try {
    purchases = await pool.query(
      `SELECT * FROM purchases WHERE subscription_id IS NOT NULL AND user_id = ${userID};`
    );
  } catch (err) {
    console.log(err.stack);
  }
  console.log("PURCHASES SUBSCRIPTIONS QUERY RES", purchases);

  const res = [];
  for (const purchase of purchases.rows) {
    let subscription = await stripe.getSubscription(purchase.subscription_id);
    console.log("GET SUBSCRIPTION--- ", subscription);
    res.push({
      ...purchase,
      purchase_id: purchase.id,
      subscription_id: subscription.id,
      billing_cycle_anchor: subscription.billing_cycle_anchor,
      created: subscription.created,
      current_period_end: subscription.current_period_end,
      current_period_start: subscription.current_period_start,
      stripe_customer_id: subscription.customer,
      start_date: subscription.start_date,
    });
  }
  console.log("GET SUBSCRIPTIONS RES -------- ", res);
  return res;
}

async function cancelPurchaseSubscriptions(purchaseIDs) {
  try {
    await pool.query(
      `UPDATE purchases SET subscription_id = NULL, subscription_interval = NULL WHERE id IN (${purchaseIDs});`
    );
  } catch (err) {
    console.log("Error occurred updating purchases: ", err.stack);
  }
}
module.exports = {
  createOrder,
  getOrdersByUserID,
  getSubscriptionsByUserID,
  cancelPurchaseSubscriptions,
};
