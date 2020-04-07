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
  const [purchaseItems, setPurchaseItems] = useState({});

  const createPurchaseItem = (purchase) => {
    setAmount(purchase.amount);
    setTotal(purchase.total);
    setUnitCost(purchase.unitCost);
    setProduct(purchase.product);
    setType(purchase.type);
    addToPurchaseItems({ product, amount, total, unitCost, type });
  };

  const addToPurchaseItems = (purchaseItem = {}) => {
    const aggregate = purchaseItems[purchaseItem.product];
    if (aggregate) {
      aggregate.amount += purchaseItem.amount;
      aggregate.total += purchaseItem.total;
      aggregate.type = purchaseItem.type;
    } else {
      setPurchaseItems({
        [product]: {
          amount,
          total,
          unitCost,
          type,
        },
      });
    }
  };

  const removePurchaseItem = (product) => {
    let items = { ...purchaseItems };

    if (items[product]) {
      delete items[product];
    }
    setPurchaseItems(items);
    console.log("REMOVING PURCHASE ITEM:", purchaseItems);
  };

  return (
    <div>
      <CartSidebar
        open={isSidebar}
        updateSidebar={setSidebar}
        purchaseItems={purchaseItems}
        removePurchaseItem={removePurchaseItem}
      />
      {console.log("IS SIDE BAR? ", isSidebar)}

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
              removePurchaseItem={removePurchaseItem}
              purchaseItems={purchaseItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
