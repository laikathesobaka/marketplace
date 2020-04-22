const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const stripe = require("./stripe");
import { v4 as uuidv4 } from "uuid";
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./controllers/user");
const Order = require("./controllers/order");

require("dotenv").config();

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      let userRes;
      try {
        userRes = await User.authenticateUser(email, password);
      } catch (err) {
        return done(err);
      }
      if (!userRes) {
        return done(null, false, { message: "Invalid email or password" });
      }
      return done(null, userRes);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.getUserByID(id);
  done(null, user);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    genid: (req) => {
      console.log("Inside the session middleware");
      return uuidv4();
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(require("./routes/user"));

const isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ authenticated: false });
};
app.get("/authenticated", isAuthenticated, async (req, res, next) => {
  // const user = { ...req.user, auth };
  res.send({ ...req.user, authenticated: true });
});

app.post("/signin", async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    req.login(user, async (err) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(user);
    });
  })(req, res, next);
});

app.post("/signin/google", async (req, res) => {
  const { email, firstName, lastName } = req.body;
  let existingUser = await User.getUserByEmail(email);

  if (!existingUser) {
    const newUser = await User.createUser(firstName, lastName, email);
    res.send(newUser);
  }
  res.send(existingUser);
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // Check if user already exists
  let userExistsRes;
  try {
    userExistsRes = await User.getUserByEmail(email);
  } catch (err) {
    throw err;
  }

  if (userExistsRes) {
    res.status(400).send({ alreadyRegistered: true, user: userExistsRes });
  }
  let registerRes;
  try {
    registerRes = await User.createUser(firstName, lastName, email, password);
  } catch (err) {
    throw err;
  }
  res.status(200).send(registerRes);
});

app.get("/signout", async (req, res) => {
  console.log("SIGN OUT SERVER REQ !!!!!!!!!!!! ", req.session, req.user);
  req.logout();
  console.log("SESSION AFTER LOGGING OUT : ", req.session);
  res.redirect("/");
});

app.post("/purchase", async (req, res) => {
  const totalCost = req.body.totalCost;
  const paymentIntent = await stripe.createPaymentIntent(totalCost);
  res.send(paymentIntent);
});

app.post("/purchase/submitOrder", async (req, res) => {
  const { user, purchases, orderTotals, orderDate } = req.body;
  console.log("SUBMIT ORDER REQ . BODY", req.body);
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
  console.log('"PURCHASE / SUBSCRIPTION REQ.BODY: ', req.body);
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

app.post("/user/orderHistory", async (req, res) => {
  const { userID } = req.body;
  console.log("user/orderHistory req.body", req.body);
  const orders = await Order.getOrdersByUserID(userID);
  console.log("sending orders /orderHistory: ", orders);
  res.send(orders);
});

app.post("/user/subscriptions", async (req, res) => {
  const { userID } = req.body;
  const subscriptions = await Order.getSubscriptionsByUserID(userID);
  res.send(subscriptions);
});

app.post("/user/cancelSubscriptions", async (req, res) => {
  const subscriptions = req.body;
  console.log("CANCEL SUBSCRIPTIONS REQ.BODY --- ", req.body);
  const subscriptionIDs = subscriptions.map(
    (subscription) => subscription.subscription_id
  );
  console.log("SUBSCRIPTION IDS: ", subscriptionIDs);
  const purchaseIDs = subscriptions.map(
    (subscription) => subscription.purchase_id
  );
  console.log("PURCHASE IDS : ", purchaseIDs);

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
  res.status(200);
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
