import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Image from "./Image";
import About from "./About";
import AddItems from "./AddItems";
import CartSidebar from "./CartSidebar";

const Product = () => {
  const [isSidebar, setSidebar] = useState(false);
  const [amount, setAmount] = useState(0);
  const [purchaseItem, setPurchaseItem] = useState({});
  const [purchaseItems, setPurchaseItems] = useState([]);

  const addPurchaseItems = (purchaseItem = {}) => {
    setPurchaseItems([...purchaseItems, purchaseItem]);
  };
  return (
    <div>
      <CartSidebar
        purchaseItems={purchaseItems}
        open={isSidebar}
        setSidebar={setSidebar}
      />
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
              setAmount={setAmount}
              setSidebar={setSidebar}
              purchaseItem={purchaseItem}
              setPurchaseItem={setPurchaseItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
