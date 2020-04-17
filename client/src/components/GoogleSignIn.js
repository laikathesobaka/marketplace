import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import googleConfig from "../googleConfig";
import styled from "styled-components";

const GoogleSignIn = ({ receiveUser, updateShowSignInError }) => {
  const onGoogleSuccess = async (googleRes) => {
    const res = await fetch("/signin/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: googleRes.profileObj.email,
        firstName: googleRes.profileObj.givenName,
        lastName: googleRes.profileObj.familyName,
      }),
    });
    const user = await res.json();
    if (res.status === 200) {
      receiveUser(user);
    }
    if (res.status === 400) {
      console.log("ERROR LOGGING IN USER: ", res);
      updateShowSignInError(true);
    }
  };
  const onGoogleFail = (googleRes) => {};
  return (
    <GoogleButtonContainer>
      <GoogleLogin
        clientId={googleConfig.clientID}
        buttonText="Continue with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFail}
        cookiePolicy={"single_host_origin"}
        style={{
          width: "inherit",
        }}
      />
    </GoogleButtonContainer>
  );
};

export default GoogleSignIn;

const GoogleButtonContainer = styled.div`
  margin-bottom: 20px;
`;
