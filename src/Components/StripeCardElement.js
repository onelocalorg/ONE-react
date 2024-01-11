import React from "react";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Style from "../Styles/StripeCard.module.css";

function StripeCardComponent({ showBillingFunc }) {
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
      <CardElement
        className={`card ${Style.StripeElementInput}`}
        onFocus={() => {
          showBillingFunc(true);
        }}
        onBlur={() => {
          console.log("");
        }}
      />
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

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function StripeCardElement({ showBillingFunc }) {
  return (
    <div className={Style.stripeContainer}>
      <Elements stripe={stripePromise}>
        <StripeCardComponent showBillingFunc={showBillingFunc} />
      </Elements>
    </div>
  );
}

export default StripeCardElement;
