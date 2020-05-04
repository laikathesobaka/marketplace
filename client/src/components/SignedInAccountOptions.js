import React from "react";
import styled from "styled-components";
import SignOut from "./SignOut";
import { navigate } from "@reach/router";

const SignedInAccountOptions = ({
  user,
  removeUser,
  onCloseClick,
  updateUserAuth,
  updateAccountSidebarStatus,
}) => {
  const onViewOrdersClick = () => {
    updateAccountSidebarStatus(false);
    navigate("/orders", { state: { user } });
  };
  const onManageSubscriptionsClick = () => {
    updateAccountSidebarStatus(false);
    navigate("/subscriptions", { state: { user } });
  };
  return (
    <div>
      <TopBar>
        <Close
          src={process.env.PUBLIC_URL + "/icons/close.svg"}
          onClick={() => onCloseClick()}
        />
        <Title>Your Account</Title>
      </TopBar>
      <Options>
        <AccountOptions>
          <ViewOrders onClick={() => onViewOrdersClick()}>
            See Orders
          </ViewOrders>
          <Subscriptions onClick={() => onManageSubscriptionsClick()}>
            Manage Subscriptions
          </Subscriptions>
        </AccountOptions>

        <SignOut removeUser={removeUser} updateUserAuth={updateUserAuth} />
      </Options>
    </div>
  );
};

export default SignedInAccountOptions;

const Title = styled.div`
  font-size: 14px;
  font-family: "Rubik", sans-serif;
`;

const AccountOptions = styled.div`
  padding: 20px 0px 50px;
`;
const ViewOrders = styled.button`
  background-blend-mode: color;
  border-style: none;
  font-weight: 700;
`;
const Subscriptions = styled.button`
  background-blend-mode: color;
  border-style: none;
  font-weight: 700;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 200px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const Close = styled.img`
  position: fixed;
  left: 22px;
  width: 9px;
`;
