import React from "react";
import { Router } from "@reach/router";

import "./App.css";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import OrderFail from "./components/OrderFail";
import SignInPopUp from "./components/SignInPopUp";
import SignUpPopUp from "./components/SignUpPopUp";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Router>
        <ProductPage path="/" />
        <Checkout path="/checkout" />
        <OrderSuccess path="/success" />
        <OrderFail path="/fail" />
        <SignInPopUp path="/signin" />
        <SignUpPopUp path="/signup" />
      </Router>
    </div>
  );
}

export default App;
