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
  const [purchaseItemsTotal, setPurchaseItemsTotal] = useState({
    cost: 0,
    amount: 0,
  });

  const createPurchaseItem = (purchase) => {
    setAmount(purchase.amount);
    setTotal(purchase.total);
    setUnitCost(purchase.unitCost);
    setProduct(purchase.product);
    setType(purchase.type);
    addToPurchaseItems({ product, amount, total, unitCost, type });
    // aggregatePurchaseItems();
  };

  const aggregatePurchaseItems = () => {
    console.log("PURCHASE ITEMS TO TOTAL: ", purchaseItems);
    const itemsTotal = Object.keys(purchaseItems).reduce(
      (total, product) => {
        console.log("ITEM BEING TOTALLED: ", purchaseItems[product]);
        total["cost"] +=
          purchaseItems[product].unitCost * purchaseItems[product].amount;
        total["amount"] += purchaseItems[product].amount;
        return total;
      },
      { cost: 0, amount: 0 }
    );
    console.log("ITEMS TOTLA? ", itemsTotal);
    setPurchaseItemsTotal({ ...purchaseItemsTotal, ...itemsTotal });
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
  };

  return (
    <div>
      {console.log("PURCHASE ITEMS PRODUCT PAGE:!", purchaseItems)}
      <CartSidebar
        open={isSidebar}
        updateSidebar={setSidebar}
        purchaseItems={purchaseItems}
        // purchaseItemsTotal={purchaseItemsTotal}
        removePurchaseItem={removePurchaseItem}
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
              removePurchaseItem={removePurchaseItem}
              purchaseItems={purchaseItems}
              //   purchaseItemsTotal={purchaseItemsTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
