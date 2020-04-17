import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const SignIn = ({
  receiveUser,
  updateAccountSidebarStatus,
  updateSignedInStatus,
}) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [showSignInError, setShowSignInError] = useState(false);
  const emailRules = {
    required: "Email is required.",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address.",
    },
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
      console.log("USER SIGN IN STATUS 200 ?");
      receiveUser(user);
      console.log("POST RECEIVE USER SIGN IN !");
      updateAccountSidebarStatus(false);
      // updateSignedInStatus(true);
    }
    if (res.status === 400) {
      console.log("ERROR LOGGING IN USER: ", res);
      setShowSignInError(true);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" placeholder="Email" ref={register(emailRules)} />
        {errors.email && <span>{errors.email.message}</span>}
        <Input name="password" placeholder="Password" ref={register} />
        <SignInButton type="submit">Sign In</SignInButton>
      </Form>
    </div>
  );
};

export default SignIn;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 5px;
`;

const SignInButton = styled.button`
  padding: 10px;
  background-blend-mode: color;
  background-color: black;
  color: white;
  font-size: 13px;
  font-weight: 600;
`;

const CreateAccountButton = styled.button`
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
`;
