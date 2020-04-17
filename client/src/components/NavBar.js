import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import styled from "styled-components";
import AccountSidebar from "./AccountSidebar";

const NavBar = ({ signedIn, updateAccountSidebarStatus }) => {
  return (
    <NavBarContainer>
      <div>
        <AccountIcon
          onClick={() => updateAccountSidebarStatus(true)}
          src="./account2.jpg"
        />
      </div>
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
  width: 20px;
`;
