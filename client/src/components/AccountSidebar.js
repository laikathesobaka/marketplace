import React, { useState } from "react";
import styled from "styled-components";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import GoogleSignIn from "./GoogleSignIn";
import SignedInAccountOptions from "./SignedInAccountOptions";

const AccountSidebar = ({
  receiveUser,
  removeUser,
  open,
  updateAccountSidebarStatus,
  signedIn,
  updateSignedInStatus,
}) => {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [showSignInError, setShowSignInError] = useState(false);
  const updateShowSignInError = (state) => {
    setShowSignInError(state);
  };
  const onCloseClick = () => {
    updateAccountSidebarStatus(false);
    setSignUpClicked(false);
  };
  const updateSignUpClicked = (status) => {
    setSignUpClicked(status);
  };

  return (
    <SidebarContainer open={open}>
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
                  updateShowSignInError={updateShowSignInError}
                  style={{ marginBottom: "20px" }}
                />
                <hr />
                <SignUp
                  receiveUser={receiveUser}
                  onCloseClick={onCloseClick}
                  updateAccountSidebarStatus={updateAccountSidebarStatus}
                  updateSignedInStatus={updateSignedInStatus}
                  updateSignUpClicked={updateSignUpClicked}
                />
                {/* <CreateAccountButton>Create Account</CreateAccountButton> */}
              </div>
            ) : (
              <div>
                <GoogleSignIn
                  receiveUser={receiveUser}
                  updateShowSignInError={updateShowSignInError}
                  style={{ marginBottom: "20px" }}
                />
                <hr />
                <SignIn
                  receiveUser={receiveUser}
                  updateAccountSidebarStatus={updateAccountSidebarStatus}
                  updateSignedInStatus={updateSignedInStatus}
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
          removeUser={removeUser}
          onCloseClick={onCloseClick}
          updateSignedInStatus={updateSignedInStatus}
        />
      )}
    </SidebarContainer>
  );
};

export default AccountSidebar;

const Title = styled.div`
  position: fixed;
  left: 110px;
`;

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
  width: 30%;
  background: white;
  border-left-style: solid;
  border-width: 1px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: 100vh;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
`;

const TopBar = styled.div`
  display: flex;
  //   flex-direction: row;
  justify-content: start;
  position: fixed;
  top: 20px;
  width: 100%;
`;

const CloseButton = styled.button`
  background-blend-mode: color;
  border-style: none;
  position: fixed;
  left: 33px;
`;
