import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";

const PaymentForm = () => {
  const [selectedProvider, setSelectedProvider] = useState("stripe");

  return (
    <>
      <div className="w-[45%] flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-500 mt-8 mb-4">
        {/* Payment Provider Selection */}
        <div className="flex items-center justify-between w-full">
          {/* PayPal */}
          <div
            className={`flex flex-col items-start justify-center pr-[90px] pl-3 pt-2 pb-2 gap-1 rounded-lg cursor-pointer border 
            ${
              selectedProvider === "paypal"
                ? "border-green-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedProvider("paypal")}
          >
            <div
              className="w-10 h-10 bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url("/images/paypal2.png")` }}
            ></div>
            <span className="text-sm">PayPal</span>
          </div>

          {/* Paystack */}
          <div
            className={`flex flex-col items-start justify-center pr-[90px] pl-3 pt-2 pb-2 gap-1 rounded-lg cursor-pointer border 
            ${
              selectedProvider === "paystack"
                ? "border-green-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedProvider("paystack")}
          >
            <div
              className="w-10 h-10 bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url("/images/paystack2.png")` }}
            ></div>
            <span className="text-sm">Paystack</span>
          </div>

          {/* Stripe */}
          <div
            className={`flex flex-col items-start justify-center pr-[90px] pl-3 pt-2 pb-2 gap-1 rounded-lg cursor-pointer border 
            ${
              selectedProvider === "stripe"
                ? "border-green-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedProvider("stripe")}
          >
            <div
              className="w-10 h-10 bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url("/images/stripe2.png")` }}
            ></div>
            <span className="text-sm">Stripe</span>
          </div>
          
          {/* Dropdown Arrow (for Stripe as default) */}
          <div
            className={`flex flex-col items-center justify-center pb-14 px-3 gap-2 rounded-lg cursor-pointer border 
            ${
              selectedProvider === "stripe"
                ? "border-green-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedProvider("stripe")}
          >
            <SlArrowDown className="text-[20px] font-bold" />
          </div>
        </div>

        {/* Card Details Form */}
        <form className="w-full mt-10">
          <div>
            <label className="block mb-1 text-sm font-semibold text-black">
              Card number
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className="w-full p-3 border border-gray-200 rounded-lg outline-0"
              />
              <div className="absolute flex gap-1 right-2 -top-10">
                <div
                  className="bg-center bg-no-repeat bg-contain w-36 h-36"
                  style={{ backgroundImage: `url("/images/visa.png")` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-black">
                Expiration
              </label>
              <input
                type="text"
                placeholder="Expiry date"
                className="w-full p-3 border border-gray-200 rounded-lg outline-0"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-black">
                CVC
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full p-3 border border-gray-200 rounded-lg outline-0"
                />
                <div
                  className="absolute w-[37px] h-[37px] bg-center bg-no-repeat bg-contain right-2 top-[10px]"
                  style={{ backgroundImage: `url("/images/card.png")` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-black">
              Country
            </label>
            <div className="relative">
              <select className="w-full p-3 border border-gray-200 rounded-lg appearance-none outline-0">
                <option value="india">India</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center w-full mb-5">
        <Link to="/Receipt">
          <button className="py-3 text-white font-bold px-20 rounded-[10px] bg-green-600">
            Submit
          </button>
        </Link>
      </div>
    </>
  );
};

export default PaymentForm;
