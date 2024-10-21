import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";

const AddPayment: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState("saved");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>("stripe");

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const paymentImages: { [key: string]: string } = {
    stripe: "/images/stripe.png",
    paystack: "/images/paystack.png",
    paypal: "/images/paypal.png",
  };

  return (
    <div>
      <div className="flex justify-between max-w-md w-full text-xs sm:text-sm md:text-md">
        <button
          className={`flex-1 py-2 px-1 text-center rounded-l-md ${activeMethod === "saved" ? "bg-white text-green-500 shadow-sm" : "bg-white text-gray-800"}`}
          onClick={() => setActiveMethod("saved")}
        >
          Saved Payment Method
        </button>
        <button
          className={`flex-1 py-2 px-1 text-center rounded-r-md ${activeMethod === "other" ? "bg-white text-green-500 shadow-sm" : "bg-white text-gray-800"}`}
          onClick={() => setActiveMethod("other")}
        >
          Other Payment Methods
        </button>
      </div>

      <div className="rounded-b-lg rounded-tr-lg border p-3">
        {activeMethod === "saved" && (
          <div className="border-2 border-green-500 p-4 rounded-lg my-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="saved-method"
                  checked={selectedPaymentMethod === "saved"}
                  onChange={() => handlePaymentMethodChange("saved")}
                  className="mr-2 radio radio-xs radio-success"
                  aria-labelledby="saved-method-label"
                  defaultChecked
                />
                <label id="saved-method-label" className="flex items-center">
                  <img
                    src="/images/stripe.webp"
                    alt="Stripe"
                    className="w-14 h-8 mr-6"
                  />
                  <div className="flex flex-col">
                    <small className="text-xs font-bold text-gray-700">**** **** **** 4002</small>
                    <small className="text-[10px] text-gray-300">Expiry: 20/2024</small>
                    <small className="text-[10px] flex items-center gap-1 text-gray-300">
                      <MdOutlineMail /> billing@acme.corp
                    </small>
                  </div>
                </label>
              </div>
              <button className="bg-green-500 text-white text-xs rounded-3xl px-4 py-1 mx-auto block">
                Default
              </button>
              <RiDeleteBin6Line className="text-red-500 text-lg cursor-pointer" />
            </div>
          </div>
        )}

        {activeMethod === "other" && (
          <div>
            {Object.keys(paymentImages).map((method) => (
              <div className="flex items-center justify-between mb-2" key={method}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={method}
                    name="payment-method"
                    checked={selectedPaymentMethod === method || (method === "stripe" && selectedPaymentMethod === null)} // Check if method is 'stripe'
                    onChange={() => handlePaymentMethodChange(method)}
                    className="mr-2 radio radio-xs radio-success"
                    title={method.charAt(0).toUpperCase() + method.slice(1)}
                  />
                  <label htmlFor={method} className="mr-2">
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </label>
                </div>
                <div>
                  <img
                    src={paymentImages[method]}
                    alt={method.charAt(0).toUpperCase() + method.slice(1)}
                    className="w-14 h-8 border-2 border-gray-200 shadow-sm p-1 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMethod === "saved" && (
          <p className="text-green-500 text-sm text-left mt-4 cursor-pointer">
            Use another payment method
          </p>
        )}
      </div>
    </div>
  );
};

export default AddPayment;
