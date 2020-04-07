import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styled from "styled-components";

const COST_PER_BULB = 10;

const options = [];
for (let i = 1; i <= 10; i++) {
  options.push({ value: i, label: i });
}

const AddItems = ({
  amount,
  updateAmount,
  total,
  updateTotal,
  updateSidebarStatus,
  createPurchaseItem,
  purchaseItems,
  addToPurchaseItems,
}) => {
  const [canCheckout, setCheckout] = useState(false);
  const [isMonthlyPurchase, setMonthlyPurchase] = useState(false);

  const onSelect = (amount) => {
    console.log("Amount items selected: ", amount);
    updateAmount(amount);
    updateTotal(COST_PER_BULB * amount);
    if (amount > 0) {
      setCheckout(true);
    }
  };

  const onAddToCart = (showSidebar, amount) => {
    const purchaseItem = {
      amount,
      total,
      unitCost: COST_PER_BULB,
      product: "garlic",
      type: isMonthlyPurchase ? "monthly" : "one-time",
    };
    createPurchaseItem(purchaseItem);
    console.log("purchase item being added: ", purchaseItem);
    addToPurchaseItems(purchaseItem);
    updateSidebarStatus(showSidebar);
  };
  return (
    <SelectWrapper>
      <StyledDropdown
        options={options}
        onChange={(option) => onSelect(option.value)}
        value={amount}
        placeholder={amount}
      ></StyledDropdown>
      <StyledTotal>Total: ${total}.00</StyledTotal>

      <PurchaseOptions>
        <OneTime>One-time</OneTime>
        <Monthly>Monthly</Monthly>
      </PurchaseOptions>

      <StyledButton onClick={() => onAddToCart(true, amount)}>
        Add To Cart
      </StyledButton>

      <StyledButton disabled={!canCheckout}>
        {canCheckout ? (
          <Link to="checkout" purchaseItems={purchaseItems}>
            Checkout
          </Link>
        ) : (
          <div>Checkout</div>
        )}
      </StyledButton>
    </SelectWrapper>
  );
};

export default AddItems;

const PurchaseOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 12px;
  width: 100px;
`;

const OneTime = styled.div`
  background-color: fuchsia;
`;

const Monthly = styled.div`
  background-color: aqua;
`;
const SelectWrapper = styled.div`
  padding-top: 20px;
`;

const StyledDropdown = styled(Dropdown)``;

const StyledTotal = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledButton = styled.button`
  padding: 5px 17px;
  background: transparent;
`;
