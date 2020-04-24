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
      {console.log("ACCOUNT SIDE BAR OPEN STATUS ----- ", open)}
      {!signedIn ? (
        <div>
          <TopBar>
            <CloseButton onClick={() => onCloseClick()}>X</CloseButton>
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
                <hr />
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
                <hr />
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

const Title = styled.div``;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 200px;
`;

export const CreateAccountButton = styled.button`
  color: black
  border-style: solid;
  border-color: black;
  border-width: 1px;
  background-color: white;
  font-size: 13px;
  font-weight: 600;
  padding: 10px;
  background-blend-mode: color;
  margin-top: 10px;
  width: 200px;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
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
  margin-top: 14px;
  width: 100%;
`;

const CloseButton = styled.button`
  background-blend-mode: color;
  border-style: none;
  position: fixed;
  left: 12px;
  top: 15px;
  color: black;
`;
