const db = require("../db-config");
const stripe = require("../stripe");

async function createPurchases(userID, orderID, orderDate, purchases) {
  for (const purchase of purchases) {
    const query = {
      text: `INSERT INTO purchases(
            user_id,
            product_id,
            order_id,
            subscription_id,
            subscription_interval,
            product_name,
            quantity,
            cost,
            purchase_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      values: [
        userID,
        purchase.productID,
        orderID,
        purchase.subscriptionID,
        purchase.subscription,
        purchase.productName,
        purchase.amount,
        purchase.total,
        orderDate,
      ],
    };
    try {
      const purchase = await db.query(query);
    } catch (err) {
      console.log("Error occurred inserting purchase: ", err.stack);
    }
  }
}

async function createOrder(user, purchases, orderTotals, orderDate) {
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
    order = await db.query(query);
    // await User.updateUserContact(user.id, user.address, user.phone)
    await createPurchases(user.id, order.rows[0].id, orderDate, purchases);
  } catch (err) {
    console.log("Error occurred inserting order", err.stack);
  }
  return order.rows[0];
}

function formatOrdersByID(orders) {
  return orders.reduce((res, order) => {
    const purchase = {
      productID: order.product_id,
      subscriptionID: order.subscription_id,
      subscriptionInterval: order.subscription_interval,
      productName: order.product_name,
      quantity: order.quantity,
      cost: order.cost,
      vendorID: order.vendor_id,
      unitCost: order.unit_cost,
      media: order.media,
      category: order.category,
    };
    if (!res[order.id]) {
      res[order.id] = {
        orderID: order.id,
        orderDate: order.order_date,
        quantityTotal: order.quantity_total,
        costTotal: order.cost_total,
        purchases: [purchase],
      };
    } else {
      res[order.id].purchases.push(purchase);
    }
    return res;
  }, {});
}

async function getOrdersByUserID(userID) {
  const query = {
    text: `SELECT
        orders.id,
        order_date,
        quantity_total,
        cost_total,
        product_id,
        subscription_id,
        subscription_interval,
        product_name,
        quantity,
        cost,
        vendor_id,
        unit_cost,
        media,
        category
    FROM orders INNER JOIN purchases ON orders.id = purchases.order_id
    INNER JOIN products on purchases.product_id = products.id 
    WHERE orders.user_id = $1 ORDER BY order_date DESC;`,
    values: [userID],
  };
  let orders;
  try {
    orders = await db.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  return formatOrdersByID(orders.rows);
}

async function getSubscriptionsByUserID(userID) {
  let purchases;
  try {
    purchases = await db.query(
      `SELECT * FROM purchases WHERE subscription_id IS NOT NULL AND user_id = ${userID};`
    );
  } catch (err) {
    console.log(err.stack);
  }
  if (!purchases) {
    return [];
  }
  const res = [];
  for (const purchase of purchases.rows) {
    let subscription = await stripe.getSubscription(purchase.subscription_id);
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
  return res;
}

async function cancelPurchaseSubscriptions(purchaseIDs) {
  try {
    await db.query(
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
