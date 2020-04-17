import React from "react";
import styled from "styled-components";
import SignOut from "./SignOut";

const SignedInAccountOptions = ({
  removeUser,
  onCloseClick,
  updateSignedInStatus,
}) => {
  return (
    <div>
      <TopBar>
        <CloseButton onClick={() => onCloseClick()}>X</CloseButton>
        <Title>Your Account</Title>
      </TopBar>
      <Options>
        <SignOut
          removeUser={removeUser}
          updateSignedInStatus={updateSignedInStatus}
        />
      </Options>
    </div>
  );
};

export default SignedInAccountOptions;

const Title = styled.div`
  position: fixed;
  left: 90px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 200px;
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
