import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const StripeTopUpForm = ({ onTopUp,closeForm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [Amount, setAmount] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      alert(error?.message);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      onTopUp(Amount);
      setAmount("");
    }
  }

  console.log(Amount);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded flex flex-col gap-6 shadow"
      >
        <CardElement className="p-2 border rounded" />
        <div className="flex flex-col">
          <div className="flex flex-row">
            <label htmlFor="myAmount"></label>
            <input
              id="myAmount"
              name="amount"
              value={Amount}
              onChange={(e) => setAmount(e.target.value)}
              type="text"
              placeholder="Enter amount"
              className="p-3 text-black rounded-sm w-full"
            />
          </div>

          {/* Make Top-up Button */}
          <button
            className="p-2 bg-green-800 rounded-sm text-white font-semibold"
            disabled={!stripe}
          >
            Make Top-up
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeForm}
            className="mt-2 p-2 bg-red-600 hover:bg-red-700 rounded-sm text-white font-semibold"
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default StripeTopUpForm;
