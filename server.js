const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const stripe = require("./stripe");

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(require("./routes"));

app.post("/purchase", async (req, res) => {
  console.log("pucharse req.body ---------------", req.body);
  const numItems = parseInt(req.body.amount);
  const costPerItem = 1000;
  const totalCost = numItems * costPerItem;
  const clientSecret = await stripe.createPaymentIntent(totalCost);
  res.send(clientSecret);
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
