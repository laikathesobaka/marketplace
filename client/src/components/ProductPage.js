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
  const [total, setTotal] = useState(0);
  const [unitCost, setUnitCost] = useState(10);
  const [product, setProduct] = useState("garlic");
  const [type, setType] = useState("one-time");
  const [purchaseItems, setPurchaseItems] = useState([]);
  const createPurchaseItem = (purchase) => {
    setAmount(purchase.amount);
    setTotal(purchase.total);
    setUnitCost(purchase.unitCost);
    setProduct(purchase.product);
    setType(purchase.type);
  };

  const addToPurchaseItems = (purchaseItem = {}) => {
    console.log("purchase itemm to add! ", purchaseItem);
    if (Object.keys(purchaseItem).length) {
      setPurchaseItems([...purchaseItems, purchaseItem]);
    }
    console.log("set purchase item!");
  };
  return (
    <div>
      {console.log("PUCHASE ITEM!!SSSSSS", purchaseItems)}
      <CartSidebar
        open={isSidebar}
        purchaseItems={purchaseItems}
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
              updateAmount={setAmount}
              total={total}
              updateTotal={setTotal}
              updateSidebarStatus={setSidebar}
              createPurchaseItem={createPurchaseItem}
              purchaseItems={purchaseItems}
              addToPurchaseItems={addToPurchaseItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
