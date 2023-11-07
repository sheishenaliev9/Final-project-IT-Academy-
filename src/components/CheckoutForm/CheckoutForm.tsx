// CheckoutForm.tsx

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      console.error("Card element is undefined");
      return;
    }

    try {
      const { token } = await stripe.createToken(cardElement);

      const response = await axios.post(
        "https://restaurant--xrisent.repl.co/api/v1/payment/create_payment/",
        {
          amount: 1000,
          currency: "usd",
          userid: "user123",
          order_id: "order123",
          token: token?.id,
        }
      );

      if (response.data && response.data.success) {
        const { client_secret } = response.data;

        await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: cardElement,
          },
        });
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};
