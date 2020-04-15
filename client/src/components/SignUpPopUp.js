import React, { useState } from "react";
import { PopUp, Close, Title } from "./SignInPopUp";
import AuthErrorMsg from "./AuthErrorMsg";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { navigate } from "@reach/router";

const SignUpPopUp = ({ showPopUp, signedIn, receiveUser }) => {
  const [alreadyRegisteredErr, setAlreadyRegisteredErr] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = async (data) => {
    setEmail(data.email);
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    });
    const user = await res.json();
    if (res.status === 400 && user.alreadyRegistered) {
      setAlreadyRegisteredErr(true);
    }
    if (res.status === 200) {
      signedIn(true);
      receiveUser(user);
      showPopUp(false);
    }
  };
  const { register, handleSubmit, watch, errors } = useForm();
  const emailRules = {
    required: "Email is required.",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address.",
    },
  };
  const nameRules = {
    required: "This field is required",
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "Can only contain letters.",
    },
  };
  return (
    <PopUp>
      <Close onClick={() => showPopUp(false)}>X</Close>
      <Title>Sign Up</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="firstName"
          placeholder="First name"
          ref={register(nameRules)}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <input
          name="lastName"
          placeholder="Last name"
          ref={register(nameRules)}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <input name="email" placeholder="Email" ref={register(emailRules)} />
        {errors.email && <span>{errors.email.message}</span>}
        <input name="password" placeholder="Password" ref={register} />
        {/* <input
          name="confirmPassword"
          placeholder="Confirm Password"
          ref={register({ validate: (value) => value === watch("password") })}
        /> */}
        <br />
        <input type="submit" />
      </Form>
      {alreadyRegisteredErr && (
        <AuthErrorMsg
          message={`An account with email address ${email} already exits.`}
        />
      )}
    </PopUp>
  );
};

export default SignUpPopUp;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20%;
  margin-top: 17%;
`;
