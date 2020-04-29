import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const NavBar = ({
  updateShowSearch,
  updateAccountSidebarStatus,
  updateCartSidebarStatus,
}) => {
  return (
    <NavBarContainer>
      <LeftBar>
        <Link to="/">
          <HomeIcon
            src={process.env.PUBLIC_URL + "/cathedral.png"}
            // onClick={() => navigate("/")}
          />
        </Link>
        <SearchIcon
          src={process.env.PUBLIC_URL + "/search.png"}
          onClick={() => updateShowSearch(true)}
        />
      </LeftBar>
      <RightBar>
        <AccountIcon
          src={process.env.PUBLIC_URL + "/account3.png"}
          onClick={() => updateAccountSidebarStatus(true)}
        />
        <BasketIcon
          src={process.env.PUBLIC_URL + "/account.png"}
          onClick={() => updateCartSidebarStatus(true)}
        />
      </RightBar>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  margin-right: 15px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  // justify-content: flex-end;
  z-index: 3;
  position: relative;
`;

const LeftBar = styled.div``;

const RightBar = styled.div``;

const HomeIcon = styled.img`
  width: 25px;
  margin-left: 30px;
  z-index: 2;
  position: fixed;
  left: 0;
`;

const SearchIcon = styled.img`
  position: fixed;
  left: 65px;
  width: 18px;
`;

const SearchContainer = styled.div``;

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
