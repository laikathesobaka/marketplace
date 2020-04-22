import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const CheckoutForm = ({ onSubmit, customerFormStatus, user }) => {
  const [customerFormSuccess, setCustomerFormStatus] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      address: user.address,
    },
  });
  const nameRules = {
    required: "This field is required",
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "Can only contain letters.",
    },
  };
  return (
    <div>
      {console.log("USER COMING INTO CHECKOUT FORM ", user.first_name)}
      <FormContainer>
        {console.log("customer form submit success? : ", customerFormSuccess)}
        <Title>Where's this order going?</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RowInput>
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
          </RowInput>
          {errors.lastName && <span>{errors.lastName.message}</span>}
          <Input name="address" placeholder="Address" ref={register} />
          <RowInput>
            <Input name="city" placeholder="City" ref={register} />
            <Input name="state" placeholder="State" ref={register} />
            <Input name="zipcode" placeholder="Zip code" ref={register} />
          </RowInput>
          <RowInput>
            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              ref={register}
            />
          </RowInput>
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </FormContainer>
    </div>
  );
};

export default CheckoutForm;

const SubmitButton = styled.button`
  margin-left: 3px;
  margin-top: 20px;
  width: 200px;
  padding: 10px;
  font-size: 13px;
  font-weight: 100;
  background-color: deeppink;
  border-style: none;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 200;
  padding-bottom: 20px;
`;

const RowInput = styled.div`
  display: flex;
  flex-direction: row;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const UserInfoSection = styled.div``;
const ShippingInfoSection = styled.div``;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const Input = styled.input`
  padding: 8px;
  margin: 3px 3px 3px 3px;
`;
