import React from "react";
import { Router } from "@reach/router";

import "./App.css";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import OrderFail from "./components/OrderFail";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Router>
        <ProductPage path="/" />
        <Checkout path="/checkout" />
        <OrderSuccess path="/success" />
        <OrderFail path="/fail" />
      </Router>
    </div>
  );
}

export default App;
