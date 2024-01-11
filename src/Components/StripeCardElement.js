import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Style from "../Styles/StripeCard.module.css";

function StripeCardComponent() {
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log("[PaymentMethod]", payload);
  };

  return (
    <>
      <CardElement className={`card ${Style.StripeElementInput}`} />
      <button
        onClick={handleSubmit}
        disabled={!stripe || !elements}
        style={{ display: "none" }}
      >
        Pay
      </button>
    </>
  );
}

const stripe = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

function StripeCardElement() {
  return (
    <div className={Style.stripeContainer}>
      <Elements stripe={stripe}>
        <StripeCardComponent />
      </Elements>
    </div>
  );
}

export default StripeCardElement;
