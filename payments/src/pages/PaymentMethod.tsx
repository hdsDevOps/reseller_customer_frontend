import React, { useState } from "react";
import Stripe from "../../public/images/stripe.png";
import Paystack from "../../public/images/paystack.png";

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("stripe");

  const selectedMethodHandler = (method: string) => {
    setSelectedMethod(method);
  }
  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-green-500 text-3xl font-medium">
          Payment method
        </h1>
        <p className="text-gray-900 text-sm">
          View & manage the payment method in your account
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-3 mt-8">
        <div
          className="rounded-lg flex flex-col items-center justify-center p-2"
          style={{ width: "20rem", height: "12rem", border: "1px solid gray" }}
        >
          <div className="flex gap-2 self-end my-2">
            <p className="text-green-500">Mark as default</p>
            <input
              type="checkbox"
              checked={selectedMethod === "stripe"}
              onChange={() => selectedMethodHandler("stripe")}
              className="checkbox checkbox-xs rounded-sm border-green-500 [--chkbg:theme(colors.green.500)] [--chkfg:white] checked:border-green-500"
            />
          </div>
          <div className="mb-10" style={{ width: "12rem", height: "7rem" }}>
            <img src={Stripe} alt="stripe" className="w-full h-full" />
          </div>
        </div>
        <div
          className="rounded-lg flex flex-col items-center justify-center p-2"
          style={{ width: "20rem", height: "12rem", border: "1px solid gray" }}
        >
          <div className="flex gap-2 self-end my-2">
            <p className="text-green-500">Mark as default</p>
            <input
              type="checkbox"
              checked={selectedMethod === "paystack"}
              onChange={() => selectedMethodHandler("paystack")}
              className="checkbox checkbox-xs rounded-sm border-green-500 [--chkbg:theme(colors.green.500)] [--chkfg:white] checked:border-green-500"
            />
          </div>
          <div className="mb-10" style={{ width: "12rem", height: "7rem" }}>
            <img src={Paystack} alt="paystack" className="w-full h-full" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PaymentMethod;
