import React from "react";
import styled from "styled-components";
import moment from "moment";
import { formatPrice } from "../helpers/formatPrice";

const Order = ({ order }) => {
  const orderDate = moment(order.orderDate).format("MMM Do, YYYY h:mma");
  return (
    <OrderContainer>
      <Overview>
        <div>Order No. {order.orderID}</div>
        <div>{orderDate}</div>
      </Overview>
      <CostTotal>${formatPrice(order.costTotal)}</CostTotal>
      <OrderItemsContainer>
        {order.purchases.map((purchase) => {
          return (
            <OrderItem>
              <ImgContainer>
                <Img src={purchase.media} />
              </ImgContainer>
              <Amount>
                {purchase.productName} x {purchase.quantity}
              </Amount>
              <Cost>${formatPrice(purchase.cost)}</Cost>
              {purchase.subscriptionID && (
                <Subscription>subscription</Subscription>
              )}
            </OrderItem>
          );
        })}
      </OrderItemsContainer>
    </OrderContainer>
  );
};

export default Order;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid;
  width: 600px;
  border-width: 1px;
  border-color: #000000a6;
  padding: 25px;
  margin-bottom: 15px;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 11px;
`;

const CostTotal = styled.div`
  font-size: 11px;
  font-weight: 700;
`;

const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
  &:after {
    content: "",
    flex: auto
  }
  margin-top: 15px;
`;

const OrderItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //   flex: 1;
  padding: 10px;
  font-size: 10px;
  width: 100px;
`;

const ImgContainer = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 30px;
`;

const Amount = styled.div`
  white-space: nowrap;
  font-weight: 600;
`;

const Cost = styled.div``;

const Subscription = styled.div`
  font-weight: 100;
`;
