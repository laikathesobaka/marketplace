import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { navigate } from "@reach/router";
import CardSection from "./CardSection";
import { getPaymentIntent, submitSubscription } from "../helpers/stripe";
const Purchase = ({ customer, cartTotals }) => {
  const stripe = useStripe();
  const elements = useElements();
  const customerName = `${customer.firstName} ${customer.lastName}`;
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    let paymentSuccess;
    let oneTimePaymentRes;
    if (cartTotals.monthly.amount === 0 && cartTotals.oneTime.amount > 0) {
      const paymentIntentOneTime = await getPaymentIntent(
        cartTotals.oneTime.cost
      );
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
      if (oneTimePaymentRes.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(oneTimePaymentRes.error.message);
      } else {
        if (oneTimePaymentRes.status === "succeeded") {
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
        customer.email,
        paymentMethodRes.paymentMethod.id
      );
      if (subscription.status === "active") {
        paymentSuccess = true;
      }
    }

    if (paymentSuccess) {
      navigate(`/success`);
    } else {
      navigate(`/fail`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm Purchase</button>
    </form>
  );
};

export default Purchase;
