import React, { useRef } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import Style from "../Styles/StripeCard.module.css";

function StripeCardComponent({
  showBillingFunc,
  stripeCardStatus,
  setStripeCardStatus,
  isSubmitted,
  cardRequired,
}) {
  const elements = useElements();
  const stripe = useStripe();
  const buttonRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // const payload = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });

    const payload = await stripe.createToken(elements.getElement(CardElement));

    setStripeCardStatus(payload);

    // console.log("[PaymentMethod]", payload);
  };

  return (
    <>
      <CardElement
        className={`card ${Style.StripeElementInput}`}
        options={{ hidePostalCode: true }}
        onFocus={() => {
          showBillingFunc(true);
        }}
        onBlur={() => {
          // buttonRef.current.click();
        }}
        onChange={() => {
          setStripeCardStatus({ status: true });
        }}
      />
      {cardRequired &&
        isSubmitted &&
        Object.keys(stripeCardStatus).length === 0 && (
          <p className={Style.cardError}>This field is required</p>
        )}
      {cardRequired &&
        isSubmitted &&
        Object.keys(stripeCardStatus).length > 0 &&
        stripeCardStatus?.error && (
          <p className={Style.cardError}>{stripeCardStatus?.error?.message}</p>
        )}
      <button
        onClick={handleSubmit}
        disabled={!stripe || !elements}
        style={{ display: "none" }}
        ref={buttonRef}
      >
        Pay
      </button>
    </>
  );
}

function StripeCardElement({
  showBillingFunc,
  stripeCardStatus,
  setStripeCardStatus,
  isSubmitted,
  cardRequired,
}) {
  return (
    <div className={Style.stripeContainer}>
      <StripeCardComponent
        showBillingFunc={showBillingFunc}
        stripeCardStatus={stripeCardStatus}
        setStripeCardStatus={setStripeCardStatus}
        isSubmitted={isSubmitted}
        cardRequired={cardRequired}
      />
    </div>
  );
}

export default StripeCardElement;
