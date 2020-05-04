import React from "react";
import { Router } from "@reach/router";

import "./App.css";
import "./index.css";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import OrderFail from "./components/OrderFail";
import Products from "./components/Products";
import Category from "./components/Category";
import OrderHistory from "./components/OrderHistory";
import SignedInAccountOptions from "./components/SignedInAccountOptions";
import Subscriptions from "./components/Subscriptions";

function App() {
  return (
    <div>
      <Home />
      <Router>
        <Products path="/" />
        <Category path="/category/:categoryName" />
        <ProductPage path="/product/:productName" />
        <SignedInAccountOptions path="/account" />
        <Checkout path="/checkout" />
        <OrderSuccess path="/success" />
        <OrderFail path="/fail" />
        <OrderHistory path="/orders" />
        <Subscriptions path="/subscriptions" />
      </Router>
    </div>
  );
}

export default App;
