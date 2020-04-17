import React, { useState, useEffect } from "react";
import SignUpPopUp from "./SignUpPopUp";
import AuthErrorMsg from "./AuthErrorMsg";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CreateAccountButton } from "./AccountSidebar";

const SignUp = ({
  receiveUser,
  updateAccountSidebarStatus,
  updateSignedInStatus,
  updateSignUpClicked,
}) => {
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
    console.log("USER CREATION RES ", user);
    console.log("RES ---- ! ", res);
    if (res.status === 400 && user.alreadyRegistered) {
      setAlreadyRegisteredErr(true);
    }
    if (res.status === 200) {
      const signInRes = await fetch("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const signInUserRes = await signInRes.json();
      if (signInRes.status === 200) {
        console.log("POST SIGN UPUSER SIGN IN STATUS 200 ?");
        receiveUser(signInUserRes);
        updateAccountSidebarStatus(false);
      }
      if (signInRes.status === 400) {
        console.log("POST SIGN UP ERROR LOGGING IN USER: ", signInRes);
        // setShowSignInError(true);
      }
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
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          placeholder="First name"
          ref={register(nameRules)}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <Input
          name="lastName"
          placeholder="Last name"
          ref={register(nameRules)}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <Input name="email" placeholder="Email" ref={register(emailRules)} />
        {errors.email && <span>{errors.email.message}</span>}
        <Input name="password" placeholder="Password" ref={register} />
        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          ref={register({ validate: (value) => value === watch("password") })}
        />
        <CreateAccountButton type="submit">Create Account</CreateAccountButton>
      </Form>
      {alreadyRegisteredErr && (
        <AuthErrorMsg
          message={`An account with email address ${email} already exits.`}
        />
      )}
    </div>
  );
};

export default SignUp;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
