import React from "react";
import styled from "styled-components";

const NavBar = ({ updateAccountSidebarStatus, updateCartSidebarStatus }) => {
  return (
    <NavBarContainer>
      <AccountIcon
        src={process.env.PUBLIC_URL + "/account3.png"}
        onClick={() => updateAccountSidebarStatus(true)}
      />
      <BasketIcon
        src={process.env.PUBLIC_URL + "/account.png"}
        onClick={() => updateCartSidebarStatus(true)}
      />
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  margin-top: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const AccountIcon = styled.img`
  position: fixed;
  right: 45px;
  width: 20px;
`;

const BasketIcon = styled.img`
  position: fixed;
  right: 20px;
  width: 20px;
  margin-left: 10px;
`;
