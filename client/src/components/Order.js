import React from "react";
import styled from "styled-components";

const Order = ({ order }) => {
  return (
    <OrderContainer>
      <Overview>
        <div>Order No. {order.id}</div>
        <div>{order.order_date}</div>
      </Overview>
      <CostTotal>${order.cost_total}.00</CostTotal>
      <OrderItemsContainer>
        {Object.keys(order.purchases).map((productName) => {
          return (
            <OrderItem>
              <Img src={order.purchases[productName].media} />
              <Amount>
                {productName} x {order.purchases[productName].amount}
              </Amount>
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
  width: 500px;
  height: 130px;
  border-width: 1px;
  border-color: lightgray;
  padding: 25px;
  margin-bottom: 15px;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CostTotal = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const OrderItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Img = styled.img`
  width: 30px;
`;

const Amount = styled.div`
  font-size: 10px;
`;
