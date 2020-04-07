import React, { useState } from "react";

import { useForm } from "react-hook-form";
import styled from "styled-components";

const CheckoutForm = ({ onSubmit }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [customerFormSuccess, setCustomerFormStatus] = useState(false);
  const nameRules = {
    required: "This field is required",
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "Can only contain letters.",
    },
  };
  const emailRules = {
    required: "Email is required.",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address.",
    },
  };

  return (
    <div>
      {console.log("customer form submit success? : ", customerFormSuccess)}
      Your Information
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          placeholder="First name"
          ref={register(nameRules)}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <br />
        <Input
          name="lastName"
          placeholder="Last name"
          ref={register(nameRules)}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <br />
        <Input name="email" placeholder="Email" ref={register(emailRules)} />
        {errors.email && <span>{errors.email.message}</span>}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CheckoutForm;

const Input = styled.input`
  white-space: pre-line;
`;
