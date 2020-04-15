import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import styled from "styled-components";
import { connect } from "react-redux";
import { receiveUser, removeUser } from "../actions";

const NavBar = ({ receiveUser, removeUser }) => {
  const [signedIn, setSignedIn] = useState(false);
  // if (!signedIn) {
  return (
    <div>
      {signedIn ? (
        <AuthOptions>
          <SignOut signedIn={setSignedIn} removeUser={removeUser} />
        </AuthOptions>
      ) : (
        <AuthOptions>
          <SignIn signedIn={setSignedIn} receiveUser={receiveUser} />
          <SignUp signedIn={setSignedIn} receiveUser={receiveUser} />
        </AuthOptions>
      )}
    </div>
  );
};

export default connect(null, { receiveUser, removeUser })(NavBar);

const AuthOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
