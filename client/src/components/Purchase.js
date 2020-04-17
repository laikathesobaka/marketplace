import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { navigate } from "@reach/router";
import CardSection from "./CardSection";
import { getPaymentIntent, submitSubscription } from "../helpers/stripe";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Purchase = ({
  customerFormInput,
  cartTotals,
  cart,
  products,
  user,
  fullName,
  address,
}) => {
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const customerName = `${customerFormInput.firstName} ${customerFormInput.lastName}`;
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: { email },
  });
  const emailRules = {
    required: "Email is required.",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address.",
    },
  };

  const handlePaymentSubmit = async (data, event) => {
    console.log("ON PAYMENT FORM SUBMIT DATA ", event);
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setEmail(data.email);
    const cardElement = elements.getElement(CardElement);
    let paymentSuccess;
    let oneTimePaymentRes;
    if (cartTotals.monthly.amount === 0 && cartTotals.oneTime.amount > 0) {
      const paymentIntentOneTime = await getPaymentIntent(
        cartTotals.oneTime.cost
      );
      console.log("PAYMENT INTENT RETURNED : ", paymentIntentOneTime);
      // Confirm payment for onetime products
      oneTimePaymentRes = await stripe.confirmCardPayment(
        paymentIntentOneTime.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: customerName,
            },
          },
        }
      );
      console.log("ONE TIME PAYMENT RES -------- ", oneTimePaymentRes);
      if (oneTimePaymentRes.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(oneTimePaymentRes.error.message);
      } else {
        if (oneTimePaymentRes.paymentIntent.status === "succeeded") {
          paymentSuccess = true;
        }
      }
    }
    if (cartTotals.monthly.amount > 0) {
      const paymentMethodRes = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: customerName,
        },
      });
      if (paymentMethodRes.error) {
        console.log(
          "Error occurred creating payment method: ",
          paymentMethodRes.error
        );
      }

      const subscription = await submitSubscription(
        cartTotals.monthly.cost,
        customerFormInput.email,
        paymentMethodRes.paymentMethod.id
      );
      if (subscription.status === "active") {
        paymentSuccess = true;
      }
    }
    console.log("PAYMENT SUCCCESS ?? ---------- ", paymentSuccess);
    if (paymentSuccess) {
      navigate("/success", {
        state: {
          address,
          email,
          cartTotals,
          cart,
          user,
          fullName,
          products,
        },
      });
    } else {
    }
  };

  return (
    <PaymentInfoContainer>
      <form onSubmit={handleSubmit(handlePaymentSubmit)}>
        <Title>What's your payment information?</Title>
        <CardSection />
        <SubTitle>Where should we send your receipt?</SubTitle>
        <Input name="email" placeholder="Email" ref={register(emailRules)} />
        {errors.email && <span>{errors.email.message}</span>}
        <PayButton type="submit" disabled={!stripe}>
          Place Order
        </PayButton>
      </form>
    </PaymentInfoContainer>
  );
};

export default Purchase;

const PayButton = styled.button`
  margin-top: 50px;
  width: 200px;
  height: 40px;
  background-color: deeppink;
  border-style: none;
  font-weight: 100;
  font-size: 15px;
`;

const Form = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 338px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-style: solid;
  border-width: 0.01em;
  padding: 12px;
  font-size: 13px;
`;
const PaymentInfoContainer = styled.div`
  padding-top: 40px;
  width: 40%;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 200;
  padding-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 15px;
`;
