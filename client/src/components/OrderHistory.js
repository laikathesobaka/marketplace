import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getUser,
  getUserAuthStatus,
  getAccountSidebarStatus,
} from "../reducers/user";
import {
  checkUserAuthenticated,
  updateUserAuth,
  updateAccountSidebarStatus,
} from "../actions";
import styled from "styled-components";
import Order from "./Order";

const OrderHistory = ({ location }) => {
  const [orders, setOrders] = useState({});
  const userID = location.state.user.id;
  useEffect(() => {
    checkUserAuthenticated();
    const getOrderHistory = async () => {
      const res = await fetch(`/users/${userID}/orders`);
      const ordersRes = await res.json();
      setOrders(ordersRes);
    };
    getOrderHistory();
  }, []);
  return (
    <OrderHistoryContainer>
      <Title>Orders</Title>
      {Object.keys(orders).length === 0 && (
        <NoOrders>
          <div>No order history.</div>
        </NoOrders>
      )}
      {Object.keys(orders).map((orderID) => {
        return <Order order={orders[orderID]} />;
      })}
    </OrderHistoryContainer>
  );
};

const mapStateToProps = (state) => ({
  accountSidebarStatus: getAccountSidebarStatus(state),
  user: getUser(state),
  userAuthStatus: getUserAuthStatus(state),
});

export default connect(mapStateToProps, {
  updateAccountSidebarStatus,
  checkUserAuthenticated,
  updateUserAuth,
})(OrderHistory);

const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  align-items: center;
  margin-top: 100px;
`;

const Title = styled.div`
  font-family: "Rubik", sans-serif;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 100;
`;

const NoOrders = styled.div`
  margin-top: 30px;
  font-size: 13px;
`;
