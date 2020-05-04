import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { navigate } from "@reach/router";
import CardSection from "./CardSection";
import ShippingInfoSummary from "./ShippingInfoSummary";
import Loader from "./Loader";
import {
  getPaymentIntent,
  submitSubscription,
  submitOrder,
} from "../helpers/payment";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const filterPurchaseItemsBySubscription = (purchaseItems) => {
  const subscription = [];
  const oneOff = [];
  for (const item in purchaseItems) {
    if (purchaseItems[item].subscription) {
      subscription.push(purchaseItems[item]);
    } else {
      oneOff.push(purchaseItems[item]);
    }
  }
  return [subscription, oneOff];
};

const Purchase = ({
  customerFormInput,
  cartTotals,
  cart,
  products,
  user,
  fullName,
  address,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [
    subscriptionPurchaseItems,
    oneTimePurchaseItems,
  ] = filterPurchaseItemsBySubscription(cart);
  const stripe = useStripe();
  const elements = useElements();
  const customerName = `${customerFormInput.firstName} ${customerFormInput.lastName}`;
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: { email: user.email },
  });

  const emailRules = {
    required: "Email is required.",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address.",
    },
  };

  const processOneOffPayments = async (cardElement) => {
    const paymentIntent = await getPaymentIntent(cartTotals.oneTime.cost);
    const confirmPaymentRes = await stripe.confirmCardPayment(
      paymentIntent.clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName,
          },
        },
      }
    );
    if (confirmPaymentRes.paymentIntent.status === "succeeded") {
      return true;
    }
    if (confirmPaymentRes.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(confirmPaymentRes.error.message);
      return false;
    }
    return false;
  };

  const processSubscriptionPayments = async (cardElement, purchaseItems) => {
    const res = [];
    for (const purchaseItem of purchaseItems) {
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
        purchaseItem.total,
        customerFormInput.email,
        paymentMethodRes.paymentMethod.id
      );
      if (subscription.status === "active") {
        cart[purchaseItem.purchaseItemKey].subscriptionID = subscription.id;
        res.push(true);
      }
      if (subscription.status === "incomplete") {
        res.push(false);
      }
    }
    return res;
  };

  const handlePaymentSubmit = async (data, event) => {
    console.log("SUBMITTING PAYMENT !!!!!!!!!!!", data);
    event.preventDefault();
    setEmail(data.email);
    setIsLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (oneTimePurchaseItems.length) {
      const oneTimePaymentRes = await processOneOffPayments(cardElement);
      if (!oneTimePaymentRes) {
        setIsLoading(false);
        navigate("/fail");
      }
    }
    if (subscriptionPurchaseItems.length) {
      const subscriptionPaymentRes = await processSubscriptionPayments(
        cardElement,
        subscriptionPurchaseItems
      );
      if (subscriptionPaymentRes.every((res) => res)) {
        setIsLoading(false);
        navigate("/fail");
      }
    }

    try {
      const orderSubmitRes = await submitOrder(user, cart, cartTotals);
    } catch (err) {
      console.log("Error occurred submitting order :", err);
    }
    setIsLoading(false);
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
  };

  return (
    <div>
      <Loader active={isLoading} />
      <ShippingInfoSummary fullName={fullName} address={address} />
      <FormContainer>
        <form onSubmit={handleSubmit(handlePaymentSubmit)}>
          <Title>What's your payment information?</Title>
          <CardSection />
          <SubTitle>Where should we send your receipt?</SubTitle>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              name="email"
              placeholder="Email"
              ref={register(emailRules)}
            />
            {errors.email && <span>{errors.email.message}</span>}
            <PayButton type="submit" disabled={!stripe}>
              Place Order
            </PayButton>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default Purchase;

const PayButton = styled.button`
  margin-top: 50px;
  width: 200px;
  height: 40px;
  font-size: 13px;
  font-weight: 600;
  background-color: aliceblue;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  cursor: pointer;
  &:hover {
    background-color: #bdd8f1;
  }
`;

const Input = styled.input`
  width: 275px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-style: solid;
  border-color: #b9b7b7;
  border-width: 0.01em;
  padding: 12px;
  font-size: 13px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 280px;
  left: 110px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 200;
  padding-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 15px;
`;
