import React from "react";
import styled from "styled-components";
// import moment from "moment";

const SubscriptionItem = ({ subscription, product, cancelSubscriptions }) => {
  const subscriptionType = subscription.subscription_interval;
  const nextOrderDate = new Date(subscription.current_period_end * 1000);
  return (
    <SubscriptionItemContainer>
      <ImgContainer>
        <Img src={product.media} />
      </ImgContainer>
      <Information>
        <Title>
          {subscriptionType} subscription for {subscription.name}
        </Title>
        <div>Quantity: {subscription.quantity}</div>
        <div>Total: {subscription.total}</div>
        <div>
          Next order takes place on {nextOrderDate.getMonth() + 1}{" "}
          {nextOrderDate.getDate()} {nextOrderDate.getFullYear()}
        </div>
        <CancelSubscriptionButton
          onClick={() => cancelSubscriptions([subscription])}
        >
          Cancel Subscription
        </CancelSubscriptionButton>
      </Information>
    </SubscriptionItemContainer>
  );
};

export default SubscriptionItem;

const SubscriptionItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
  border-style: solid;
  border-width: 1px;
  padding: 20px;
  border-color: blue;
  width: 500px;
  font-size: 12px;
`;

const Title = styled.div`
  font-weight: 600;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
`;

const CancelSubscriptionButton = styled.button`
  background-blend-mode: color;
  margin-top: 10px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  width: 80px;
  background-color: blanchedalmond;
`;

const Img = styled.img`
  width: 50px;
`;
