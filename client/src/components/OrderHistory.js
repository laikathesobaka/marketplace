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

const OrderHistory = (props) => {
  const [orders, setOrders] = useState([]);
  const userID = props.location.state.user.id;
  useEffect(() => {
    checkUserAuthenticated();
    const getOrderHistory = async () => {
      const res = await fetch("/user/orderHistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });
      const ordersRes = await res.json();
      console.log("ORDERS GET ORDER HISTORY ----- ", ordersRes);
      setOrders(ordersRes);
    };
    getOrderHistory();
  }, []);
  return (
    <OrderHistoryContainer>
      <Title>Orders</Title>
      {orders.length === 0 && (
        <NoOrders>
          <div>No order history.</div>
        </NoOrders>
      )}
      {orders.map((order) => {
        return <Order order={order} />;
      })}
    </OrderHistoryContainer>
  );
};

// export default OrderHistory;

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
  font-size: 13px;
  margin-bottom: 10px;
  font-weight: 700;
`;

const NoOrders = styled.div`
  margin-top: 30px;
  font-size: 13px;
`;
