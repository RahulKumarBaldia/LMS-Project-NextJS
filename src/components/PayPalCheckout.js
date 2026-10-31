"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout({ courseId, onSuccess }) {
  const [status, setStatus] = useState("");

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <div>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ courseId }),
            });
            const order = await res.json();
            if (!res.ok) throw new Error(order.message || "Create order failed");
            return order.id;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
            const result = await res.json();
            if (res.ok && result.status === "COMPLETED") {
              setStatus("Payment successful, you are enrolled ✅");
              if (onSuccess) onSuccess();
            } else {
              setStatus("Payment failed ❌");
            }
          }}
          onError={(err) => setStatus("Error: " + err.message)}
        />
        {status && <p>{status}</p>}
      </div>
    </PayPalScriptProvider>
  );
}