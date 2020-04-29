import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getUser,
  getUserAuthStatus,
  getAccountSidebarStatus,
} from "../reducers/user";
import { getProducts } from "../reducers/products";
import {
  checkUserAuthenticated,
  updateUserAuth,
  updateAccountSidebarStatus,
  getAllProducts,
} from "../actions";
import { cancelSubscriptions } from "../helpers/payment";
import SubscriptionItem from "./SubscriptionItem";
import styled from "styled-components";

const Subscriptions = ({
  user,
  checkUserAuthenticated,
  products,
  getAllProducts,
}) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [cancelSubscriptionStatus, setCancelSubscriptionStatus] = useState(
    false
  );
  const [cancelledSubscriptions, setCancelledSubscriptions] = useState([]);
  useEffect(() => {
    checkUserAuthenticated();
    const getSubscriptions = async () => {
      const res = await fetch("/user/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID: user.id }),
      });
      const subscriptionsRes = await res.json();
      console.log("ORDERS GET SUBSCRIPTIONS ----- ", subscriptionsRes);
      setSubscriptions(subscriptionsRes);
    };
    getAllProducts();
    getSubscriptions();
  }, []);

  const onCancelSubscriptionsClick = async (subscriptionItems) => {
    setCancelSubscriptionStatus(cancelSubscriptions(subscriptionItems));
    const cancelledSubscriptionIDs = subscriptionItems.map(
      (item) => item.subscription_id
    );
    console.log("CANCEL SUBSCRIPTION STATUS: ", cancelSubscriptionStatus);
    console.log("SUBSCRIPTIONS -------- . ", subscriptions);
    setSubscriptions(
      subscriptions.filter(
        (item) => !cancelledSubscriptionIDs.includes(item.subscription_id)
      )
    );
  };
  return (
    <div>
      <SubscriptionsContainer>
        <Title>Subscriptions</Title>
        {!subscriptions.length ? (
          <NoSubscriptions>No subscriptions</NoSubscriptions>
        ) : (
          <SubscriptionItemsContainer>
            {subscriptions.map((subscription) => {
              return (
                <SubscriptionItem
                  subscription={subscription}
                  product={products[subscription.product_id]}
                  cancelSubscriptions={onCancelSubscriptionsClick}
                />
              );
            })}
            <CancelAllSubscriptions>
              Cancel All Subscriptions
            </CancelAllSubscriptions>
          </SubscriptionItemsContainer>
        )}
      </SubscriptionsContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountSidebarStatus: getAccountSidebarStatus(state),
  user: getUser(state),
  userAuthStatus: getUserAuthStatus(state),
  products: getProducts(state),
});

export default connect(mapStateToProps, {
  updateAccountSidebarStatus,
  checkUserAuthenticated,
  updateUserAuth,
  getAllProducts,
})(Subscriptions);

const SubscriptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 13px;
`;

const NoSubscriptions = styled.div`
  margin-top: 30px;
  font-size: 13px;
`;

const SubscriptionItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CancelAllSubscriptions = styled.button`
  width: 200px;
`;
