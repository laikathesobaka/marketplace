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
import { cancelSubscriptions } from "../helpers/stripe";
import SubscriptionItem from "./SubscriptionItem";
import Loader from "./Loader";
import styled from "styled-components";

const Subscriptions = ({
  user,
  checkUserAuthenticated,
  products,
  getAllProducts,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [cancelSubscriptionStatus, setCancelSubscriptionStatus] = useState(
    false
  );
  useEffect(() => {
    checkUserAuthenticated();
    const getSubscriptions = async () => {
      setIsLoading(true);
      const res = await fetch(`/users/${user.id}/subscriptions`);
      const subscriptionsRes = await res.json();
      setSubscriptions(subscriptionsRes);
      setIsLoading(false);
    };
    getAllProducts();
    getSubscriptions();
  }, []);

  const onCancelSubscriptionsClick = async (subscriptionItems) => {
    setCancelSubscriptionStatus(cancelSubscriptions(subscriptionItems));
    const cancelledSubscriptionIDs = subscriptionItems.map(
      (item) => item.subscription_id
    );
    setSubscriptions(
      subscriptions.filter(
        (item) => !cancelledSubscriptionIDs.includes(item.subscription_id)
      )
    );
  };
  return (
    <div>
      <Loader active={isLoading} />
      <SubscriptionsContainer>
        <Title>Subscriptions</Title>
        {!subscriptions.length && !isLoading ? (
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
  font-family: "Rubik", sans-serif;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 100;
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
