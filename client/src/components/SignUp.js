import React, { useState, useEffect } from "react";
import SignUpPopUp from "./SignUpPopUp";
import FormErrorMsg from "./FormErrorMsg";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CreateAccountButton } from "./AccountSidebar";

const SignUp = ({
  receiveUser,
  updateAccountSidebarStatus,
  updateUserAuth,
  updateSignUpClicked,
}) => {
  const [alreadyRegisteredErr, setAlreadyRegisteredErr] = useState(false);
  const [email, setEmail] = useState("");
  // const [formError, setFormError] = useState("");
  // const [showFormError, setShowFormError] = useState(false);
  // const updateFormError = (formErr) => {
  //   setFormError(formErr);
  //   showFormError(true);
  // };

  const onSubmit = async (data) => {
    setEmail(data.email);
    const res = await fetch("/auth/signup", {
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
      const signInRes = await fetch("/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const signInUserRes = await signInRes.json();
      if (signInRes.status === 200) {
        receiveUser(signInUserRes);
        updateUserAuth({ authenticated: true });
        updateSignUpClicked(false);
        updateAccountSidebarStatus(false);
      }
      if (signInRes.status === 400) {
        // setShowSignInError(true);
        // updateFormError("Error occurred signing up.");
      }
    }
  };
  const { register, handleSubmit, watch, errors } = useForm();
  const emailRules = {
    required: "This field is required.",
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
  const passwordRules = {
    required: "This field is required",
    validate: {
      mustMatch: (value) => value === watch("password"),
    },
  };
  const getConfirmPasswordErrMsg = (err) => {
    return err.type === "mustMatch" ? (
      <FormErrorMsg message={"Passwords must match."} />
    ) : (
      <FormErrorMsg message={err.message} />
    );
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          placeholder="First name"
          ref={register(nameRules)}
        />
        {errors.firstName && (
          <FormErrorMsg message={errors.firstName.message} />
        )}

        <Input
          name="lastName"
          placeholder="Last name"
          ref={register(nameRules)}
        />
        {errors.lastName && <FormErrorMsg message={errors.lastName.message} />}

        <Input name="email" placeholder="Email" ref={register(emailRules)} />
        {errors.email && <FormErrorMsg message={errors.email.message} />}

        <Input name="password" placeholder="Password" ref={register} />
        {errors.password && <FormErrorMsg message={errors.password.message} />}

        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          ref={register(passwordRules)}
        />
        {errors.confirmPassword &&
          getConfirmPasswordErrMsg(errors.confirmPassword)}

        {alreadyRegisteredErr && (
          <FormErrorMsg
            message={`An account with email address ${email} already exits.`}
          />
        )}
        {console.log("ERRORS ------------ ", errors)}
        <CreateAccountButton type="submit">Create Account</CreateAccountButton>
      </Form>
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
