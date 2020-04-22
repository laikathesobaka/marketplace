import React from "react";
import styled from "styled-components";

const SignOut = ({ removeUser, updateUserAuth }) => {
  const onSignOutClick = async () => {
    try {
      await fetch("/signout");
    } catch (err) {
      throw err;
    }
    // removeUser();
    updateUserAuth({ authenticated: false });
  };
  return <Button onClick={() => onSignOutClick()}>Sign Out</Button>;
};

export default SignOut;

const Button = styled.button`
  padding: 10px;
  font-size: 13px;
  background-blend-mode: color;
  border-style: solid;
  border-color: black;
`;
