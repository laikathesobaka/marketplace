import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styled from "styled-components";

const COST_PER_BULB = 10;

const options = [];
for (let i = 1; i <= 10; i++) {
  options.push({ value: i, label: String(i) });
}

const AddItems = ({
  amount,
  updateAmount,
  total,
  updateTotal,
  updateSidebarStatus,
  createPurchaseItem,
  user,
}) => {
  const [canCheckout, setCheckout] = useState(false);
  const [isSubscriptionPurchase, setSubscriptionPurchase] = useState(false);
  const [dropdownOption, setDropdownOption] = useState({
    value: 0,
    label: "0",
  });
  const onSelect = (option) => {
    const amount = option.value;
    setDropdownOption(option);
    updateAmount(amount);
    updateTotal(COST_PER_BULB * amount);
    if (amount > 0) {
      setCheckout(true);
    }
  };

  const onAddToCart = (showSidebar) => {
    const purchaseItem = {
      amount,
      total,
      unitCost: COST_PER_BULB,
      product: "garlic",
      type: isSubscriptionPurchase ? "monthly" : null,
    };
    createPurchaseItem(purchaseItem);
    updateSidebarStatus(showSidebar);
  };
  return (
    <SelectContainer>
      <DropdownContainer>
        <StyledDropdown
          options={options}
          onChange={(option) => onSelect(option)}
          value={dropdownOption.label}
          placeholder={dropdownOption.label}
        ></StyledDropdown>

        <PurchaseOptions>
          <PurchaseOption
            onClick={() => setSubscriptionPurchase(false)}
            active={!isSubscriptionPurchase}
          >
            One-time
          </PurchaseOption>
          <PurchaseOption
            onClick={() => setSubscriptionPurchase(true)}
            active={isSubscriptionPurchase}
          >
            Monthly
          </PurchaseOption>
        </PurchaseOptions>
      </DropdownContainer>
      <StyledTotal>Total ${total}.00</StyledTotal>

      <AddToCartButton
        disabled={!canCheckout}
        onClick={() => onAddToCart(true)}
      >
        Add To Cart
      </AddToCartButton>

      {/* <StyledButton disabled={!canCheckout}>
        {canCheckout ? (
          <Link to="checkout">Checkout</Link>
        ) : (
          <div>Checkout</div>
        )}
      </StyledButton> */}
    </SelectContainer>
  );
};

export default AddItems;

const PurchaseOptions = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  width: 200px;
  border-style: solid;
  margin-left: 10px;
  border-width: 0.01em;
  justify-content: space-around;
  align-items: center;
`;

const PurchaseOption = styled.div`
  ${({ active }) =>
    active
      ? `background-color: black; color: white;`
      : `background-color: white; color: black;`}
`;

const SelectContainer = styled.div`
  padding-top: 20px;
`;

const AddToCartButton = styled.button`
  background-blend-mode: color;
  color: white;
  background-color: black;
  font-weight: 600;
  padding: 8px;
  font-size: 13px;
  width: 272px;
  margin-top: 20px;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledDropdown = styled(Dropdown)`
  width: 50px;
  margin-right: 10px;
`;

const StyledTotal = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledButton = styled.button`
  padding: 5px 17px;
  background: transparent;
`;
