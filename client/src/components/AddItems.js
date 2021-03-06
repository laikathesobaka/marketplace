import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCartProducts, aggregateCartTotals } from "../reducers/cart";
import { addToCart, updateCartSidebarStatus } from "../actions";
import { formatPrice } from "../helpers/formatPrice";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styled from "styled-components";

const options = [];
for (let i = 1; i <= 10; i++) {
  options.push({ value: i, label: String(i) });
}

const AddItems = ({ product, addToCart, updateCartSidebarStatus }) => {
  const [dropdownOption, setDropdownOption] = useState({
    value: 1,
    label: "1",
  });

  const [unitCost, setUnitCost] = useState(0);
  const [media, setMedia] = useState(product.media);
  const [productName, setProductName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(product.unitCost);
  const [isSubscriptionPurchase, setIsSubscriptionPurchase] = useState(false);

  useEffect(() => {
    setProductData();
  }, [product]);

  const setProductData = () => {
    setUnitCost(product.unitCost);
    setMedia(product.media);
    setProductName(product.name);
    setCategory(product.category);
  };

  const onSelectProduct = (option) => {
    const quantity = option.value;
    setDropdownOption(option);
    setAmount(quantity);
    setTotal(unitCost * quantity);
  };

  const onAddToCart = (sidebarStatus) => {
    const sub = isSubscriptionPurchase ? "monthly" : "";
    const purchaseItem = {
      productID: product.id,
      amount,
      total,
      unitCost,
      productName,
      subscription: sub,
      media,
      category,
    };
    addToCart(purchaseItem);
    setAmount(1);
    setTotal(product.unitCost);
    setDropdownOption({ value: 1, label: "1" });
    setIsSubscriptionPurchase(false);
    updateCartSidebarStatus(sidebarStatus);
  };

  return (
    <div>
      <SelectContainer>
        <DropdownContainer>
          <StyledDropdown
            options={options}
            onChange={(option) => onSelectProduct(option)}
            value={dropdownOption.label}
            placeholder={dropdownOption.label}
          ></StyledDropdown>

          <PurchaseOptions>
            <PurchaseOption
              onClick={() => setIsSubscriptionPurchase(false)}
              active={!isSubscriptionPurchase}
            >
              One-time
            </PurchaseOption>
            <PurchaseOption
              onClick={() => setIsSubscriptionPurchase(true)}
              active={isSubscriptionPurchase}
            >
              Monthly
            </PurchaseOption>
          </PurchaseOptions>
        </DropdownContainer>

        <Total>Total ${formatPrice(unitCost * amount)}</Total>

        <AddToCartButton onClick={() => onAddToCart(true)}>
          Add To Cart
        </AddToCartButton>
      </SelectContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: getCartProducts(state),
  cartTotals: aggregateCartTotals(state),
});

export default connect(mapStateToProps, {
  addToCart,
  aggregateCartTotals,
  updateCartSidebarStatus,
})(AddItems);

const PurchaseOptions = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  width: 200px;
  margin-left: 10px;
`;

const PurchaseOption = styled.button`
  cursor: pointer;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  color: darkslategray;
  border-color: lightsteelblue;
  &:hover {
  }

  &:nth-child(2) {
    border-left-style: none;
  }
  &:nth-child(1) {
    border-right-style: none;
  }

  ${({ active }) =>
    active
      ? `background-color: lightsteelblue;`
      : `background-color: white; &:hover{background-color: #6e8fbb;}`}
  &:hover {
    background-color: #6e8fbb;
  }
`;

const SelectContainer = styled.div`
  padding-top: 20px;
`;

const AddToCartButton = styled.button`
  cursor: pointer;
  background-blend-mode: color;
  background-color: black;
  color: white;
  &:hover {
    opacity: 0.8;
  }
  font-weight: 600;
  padding: 8px;
  font-size: 13px;
  width: 272px;
  margin-top: 20px;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const StyledDropdown = styled(Dropdown)`
  width: 50px;
  margin-right: 10px;
`;

const Total = styled.div`
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
