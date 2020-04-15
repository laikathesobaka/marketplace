import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import googleSignInButton from "../media/btn_google_signin.png";
import Cookie from "js-cookie";
import { GoogleLogin } from "react-google-login";
import googleConfig from "../googleConfig";

const SignInPopUp = ({ showPopUp, signedIn, receiveUser }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [showSignInError, setShowSignInError] = useState(false);

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
      signedIn(true);
    }
    if (res.status === 400) {
      console.log("ERROR LOGGING IN USER: ", res);
      setShowSignInError(true);
    }
  };
  const onGoogleFail = (googleRes) => {
    signedIn(false);
  };

  const onSubmit = async (data) => {
    const res = await fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const user = await res.json();
    if (res.status === 200) {
      receiveUser(user);
      signedIn(true);
    }
    if (res.status === 400) {
      console.log("ERROR LOGGING IN USER: ", res);
      setShowSignInError(true);
    }
  };
  const emailRules = {
    required: "Email is required.",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address.",
    },
  };

  return (
    <PopUp>
      <Close onClick={() => showPopUp(false)}>X</Close>
      <Title>Sign In</Title>
      <LogInOptions>
        <GoogleLogin
          clientId={googleConfig.clientID}
          buttonText="Sign in"
          onSuccess={onGoogleSuccess}
          onFailure={onGoogleFail}
          cookiePolicy={"single_host_origin"}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="email" placeholder="Email" ref={register(emailRules)} />
          {errors.email && <span>{errors.email.message}</span>}
          <input name="password" placeholder="Password" ref={register} />
          <input type="submit" />
        </form>
      </LogInOptions>

      {showSignInError && <div>Invalid email or passowrd.</div>}
    </PopUp>
  );
};

export default SignInPopUp;

export const PopUp = styled.div`
  position: fixed;
  padding: 10px;
  top: 50%;
  left: 50%;
  //   margin-top: -50px;
  //   margin-left: -100px;
  transform: translate(-50%, -50%);
  height: 50%;
  width: 40%;
  border-style: solid;
  border-color: black;
  border-width: 0.01em;
  background-color: white;
  z-index: 1;
  text-align: center;
`;

export const Close = styled.div`
  position: fixed;
  right: 10px;
`;

export const Title = styled.div`
  position: relative;
  top: 15%;
`;

const LogInOptions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20%;
  margin-top: 17%;
  text-align: center;
`;

const GoogleSignInButton = styled.img`
  //   position: fixed;
  //   transform: translate(-50%, -50%);
  width: 135px;
  margin-left: 11px;
  margin-bottom: 10px;
`;
