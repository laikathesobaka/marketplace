import React, { useState } from "react";
import styled from "styled-components";
import { Link, Location } from "@reach/router";

const NavBar = ({
  updateShowSearch,
  updateAccountSidebarStatus,
  updateCartSidebarStatus,
}) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const iconPaths = {
    home: {
      default: process.env.PUBLIC_URL + "/icons/store.svg",
      hover: process.env.PUBLIC_URL + "/icons/storehover.svg",
    },
    search: {
      default: process.env.PUBLIC_URL + "/icons/search.svg",
      hover: process.env.PUBLIC_URL + "/icons/searchhover.svg",
    },
    account: {
      default: process.env.PUBLIC_URL + "/icons/matryoshka.svg",
      hover: process.env.PUBLIC_URL + "/icons/matryoshkahover.svg",
    },
    basket: {
      default: process.env.PUBLIC_URL + "/icons/basket.svg",
      hover: process.env.PUBLIC_URL + "/icons/baskethover.svg",
    },
  };

  const handleMouseOver = (e, icon) => {
    e.currentTarget.src = iconPaths[icon].hover;
  };
  const handleMouseOut = (e, icon) => {
    e.currentTarget.src = iconPaths[icon].default;
  };
  return (
    <NavBarContainer>
      <Location>
        {({ location }) => {
          if (location && location.pathname === "/checkout") {
            setIsCheckout(true);
          }
          console.log("LOCATION---- ", location);
        }}
      </Location>
      {!isCheckout ? (
        <div>
          <Link to="/">
            <HomeIcon
              src={iconPaths["home"].default}
              onMouseOver={(e) => handleMouseOver(e, "home")}
              onMouseOut={(e) => handleMouseOut(e, "home")}
            />
          </Link>
          <SearchIcon
            src={iconPaths["search"].default}
            onMouseOver={(e) => handleMouseOver(e, "search")}
            onMouseOut={(e) => handleMouseOut(e, "search")}
            onClick={() => updateShowSearch(true)}
          />
          <AccountIcon
            src={iconPaths["account"].default}
            onMouseOver={(e) => handleMouseOver(e, "account")}
            onMouseOut={(e) => handleMouseOut(e, "account")}
            onClick={() => updateAccountSidebarStatus(true)}
          />
          <BasketIcon
            src={iconPaths["basket"].default}
            onMouseOver={(e) => handleMouseOver(e, "basket")}
            onMouseOut={(e) => handleMouseOut(e, "basket")}
            onClick={() => updateCartSidebarStatus(true)}
          />
        </div>
      ) : (
        <Link to="/">
          <HomeIcon
            src={iconPaths["home"].default}
            onMouseOver={(e) => handleMouseOver(e, "home")}
            onMouseOut={(e) => handleMouseOut(e, "home")}
          />
        </Link>
      )}
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  z-index: 3;
  position: fixed;
  top: 20px;
`;

const LeftBar = styled.div``;

const RightBar = styled.div``;

const HomeIcon = styled.img`
  width: 23px;
  margin-left: 30px;
  z-index: 2;
  position: fixed;
  left: 0;
`;

const SearchIcon = styled.img`
  position: fixed;
  left: 65px;
  width: 22px;
`;

const AccountIcon = styled.img`
  position: fixed;
  right: 55px;
  width: 25px;
`;

const BasketIcon = styled.img`
  position: fixed;
  right: 20px;
  width: 25px;
  margin-left: 10px;
`;
