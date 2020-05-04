import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import FormErrorMsg from "./FormErrorMsg";

const SignIn = ({
  receiveUser,
  updateUserAuth,
  updateAccountSidebarStatus,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const [showSignInError, setShowSignInError] = useState(false);
  const emailRules = {
    required: "Email is required.",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address.",
    },
  };
  const passwordRules = {
    required: "Password is required",
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
      if (updateAccountSidebarStatus) {
        updateAccountSidebarStatus(false);
      }
      updateUserAuth({ authenticated: true });
    }

    if (res.status === 400) {
      setShowSignInError(true);
      updateUserAuth({ authenticated: false });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" placeholder="Email" ref={register(emailRules)} />
        {errors.email && <FormErrorMsg message={errors.email.message} />}
        <Input
          name="password"
          placeholder="Password"
          ref={register(passwordRules)}
        />
        {errors.password && <FormErrorMsg message={errors.password.message} />}
        {showSignInError && (
          <FormErrorMsg message={"Invalid email or password."} />
        )}
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
  cursor: pointer;
  padding: 10px;
  margin-top: 12px;
  color: black;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  font-weight: 600;
  background-color: aliceblue;
  font-size: 13px;
`;
