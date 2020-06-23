import React, { useState } from "react";
import styled from "styled-components";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import GoogleSignIn from "./GoogleSignIn";
import SignedInAccountOptions from "./SignedInAccountOptions";

const AccountSidebar = ({
  user,
  receiveUser,
  removeUser,
  open,
  updateAccountSidebarStatus,
  signedIn,
  updateUserAuth,
  checkUserAuthenticated,
}) => {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const updateSignUpClicked = (status) => {
    setSignUpClicked(status);
  };
  const onCloseClick = () => {
    updateAccountSidebarStatus(false);
    updateSignUpClicked(false);
  };

  return (
    <SidebarContainer open={open}>
      {!signedIn ? (
        <div>
          <TopBar>
            <Close onClick={() => onCloseClick()}>
              <CloseIcon src={process.env.PUBLIC_URL + "/icons/close.svg"} />
            </Close>
            <Title>Sign in</Title>
          </TopBar>
          <Options>
            {signUpClicked ? (
              <div>
                <GoogleSignIn
                  receiveUser={receiveUser}
                  updateUserAuth={updateUserAuth}
                  style={{ marginBottom: "20px" }}
                />
                <SignUp
                  receiveUser={receiveUser}
                  onCloseClick={onCloseClick}
                  updateAccountSidebarStatus={updateAccountSidebarStatus}
                  updateUserAuth={updateUserAuth}
                  updateSignUpClicked={updateSignUpClicked}
                />
              </div>
            ) : (
              <div>
                <GoogleSignIn
                  receiveUser={receiveUser}
                  updateUserAuth={updateUserAuth}
                  style={{ marginBottom: "20px" }}
                />
                <SignIn
                  receiveUser={receiveUser}
                  updateAccountSidebarStatus={updateAccountSidebarStatus}
                  updateUserAuth={updateUserAuth}
                />
                <CreateAccountButton onClick={() => setSignUpClicked(true)}>
                  Create Account
                </CreateAccountButton>
              </div>
            )}
          </Options>
        </div>
      ) : (
        <SignedInAccountOptions
          user={user}
          removeUser={removeUser}
          onCloseClick={onCloseClick}
          updateUserAuth={updateUserAuth}
          checkUserAuthenticated={checkUserAuthenticated}
          updateAccountSidebarStatus={updateAccountSidebarStatus}
        />
      )}
    </SidebarContainer>
  );
};

export default AccountSidebar;

const Title = styled.div`
  font-size: 14px;
  font-family: "Rubik", sans-serif;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

export const CreateAccountButton = styled.button`
cursor: pointer;
  color: black
  border-style: solid;
  border-color: black;
  border-width: 1px;
  background-color: ghostwhite;
  font-size: 13px;
  padding: 10px;
  background-blend-mode: color;
  margin-top: 10px;
  width: -webkit-fill-available;
  &:hover {
    background-color: #d8d8fb;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  background: white;
  border-left-style: solid;
  border-width: 1px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: 100vh;
  padding: 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  transition: transform 0.3s ease-in-out;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const CloseIcon = styled.img`
  width: 9px;
`;

const Close = styled.div`
  position: fixed;
  left: 22px;
`;
