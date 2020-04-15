import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCartProducts, aggregateCartTotals } from "../reducers/cart";
import { addToCart, removeFromCart } from "../actions";

import styled from "styled-components";
import Header from "./Header";
import Image from "./Image";
import About from "./About";
import AddItems from "./AddItems";
import CartSidebar from "./CartSidebar";
import NavBar from "./NavBar";

const ProductPage = ({ cart, cartTotals, addToCart, removeFromCart }) => {
  const [isSidebar, setSidebar] = useState(false);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [unitCost, setUnitCost] = useState(10);
  const [product, setProduct] = useState("garlic");
  const [type, setType] = useState("one-time");

  const createPurchaseItem = (purchase) => {
    setAmount(purchase.amount);
    setTotal(purchase.total);
    setUnitCost(purchase.unitCost);
    setProduct(purchase.product);
    setType(purchase.type);
    addToCart(purchase);
  };

  return (
    <div>
      <CartSidebar
        open={isSidebar}
        updateSidebarStatus={setSidebar}
        purchaseItems={cart}
        purchaseItemsTotal={cartTotals}
        removePurchaseItem={removeFromCart}
      />
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Image />
          </div>
          <div>
            <About />
            <AddItems
              amount={amount}
              updateAmount={setAmount}
              total={total}
              updateTotal={setTotal}
              updateSidebarStatus={setSidebar}
              createPurchaseItem={createPurchaseItem}
              removePurchaseItem={removeFromCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: getCartProducts(state),
  cartTotals: aggregateCartTotals(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item)),
});
// const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  aggregateCartTotals,
})(ProductPage);
