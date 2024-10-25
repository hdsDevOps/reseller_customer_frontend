import React, { useState } from "react";
import { TbInfoTriangleFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
const PaymentMethodForm = () => {
  const [selected, setSelected] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-[50%] relative">
      <h2 className="mb-4 text-lg font-bold">Payment method</h2>
      {/* Payment Options */}
      <div className="space-y-4">
        <label className="flex items-center justify-between p-2 cursor-pointer">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="option"
              value="stripe"
              checked={selected === "stripe"}
              onChange={() => setSelected("stripe")}
              className="hidden"
            />
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "stripe"
                  ? "bg-green-500 border-green-500"
                  : "border-green-400"
              }`}
            >
              {selected === "stripe" && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
            <span className="text-base font-medium">Stripe</span>
          </div>
          <div
            className="w-16 h-16 bg-center bg-no-repeat bg-contain sm:w-20 sm:h-20"
            style={{ backgroundImage: `url("/images/stripe.png")` }}
          ></div>
        </label>

        <label className="flex items-center justify-between p-2 cursor-pointer">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="option"
              value="paypal"
              checked={selected === "paypal"}
              onChange={() => setSelected("paypal")}
              className="hidden"
            />
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "paypal"
                  ? "bg-green-500 border-green-500"
                  : "border-green-400"
              }`}
            >
              {selected === "paypal" && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
            <span className="text-base font-medium">PayPal</span>
          </div>
          <div
            className="w-16 h-16 bg-center bg-no-repeat bg-contain sm:w-20 sm:h-20"
            style={{ backgroundImage: `url("/images/paypal.png")` }}
          ></div>
        </label>

        <label className="flex items-center justify-between p-2 cursor-pointer">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="option"
              value="paystack"
              checked={selected === "paystack"}
              onChange={() => setSelected("paystack")}
              className="hidden"
            />
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === "paystack"
                  ? "bg-green-500 border-green-500"
                  : "border-green-400"
              }`}
            >
              {selected === "paystack" && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
            <span className="text-base font-medium">Paystack</span>
          </div>
          <div
            className="w-16 h-16 bg-center bg-no-repeat bg-contain sm:w-20 sm:h-20"
            style={{ backgroundImage: `url("/images/paystack.png")` }}
          ></div>
        </label>
      </div>

      {/* Checkbox for Credit/Debit Card Address */}
      <div className="flex items-center mb-4 space-x-3 ">
        <div
          className={`w-6 h-6 border-2 rounded-[5px] flex items-center justify-center cursor-pointer ${
            isChecked ? "bg-green-500 border-green-500" : "border-green-500"
          }`}
          onClick={toggleCheckbox}
        >
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <label
          className="text-sm font-medium text-black cursor-pointer"
          onClick={toggleCheckbox}
        >
          Credit card or debit card details is the same as above
        </label>
      </div>

      {/* Information Text */}
      <div className="mb-4  w-[92%] ml-5 relative">
        <p className="text-[14px] text-gray-600 ">
          Reserve Bank of India requires that cards support automatic payments
          according to RBI regulations. If your card doesn't support automatic
          payments, you'll need to make manual payments or use a different card.
          We'll check your card in the next step.{" "}
          <a href="#" className="text-blue-600">
            Learn more
          </a>
        </p>
        <TbInfoTriangleFilled className="absolute -left-8 top-1 text-[25px] text-yellow-400" />
      </div>

      {/* Privacy Info */}
      <div className="mb-4 w-[92%] ml-5 ">
        <p className="text-[11px] text-gray-400 ">
          The personal information that you provide here will be added to your
          payments profile. It will be stored securely and treated in accordance
          with the{" "}
          <a href="#" className="text-blue-600">
            Google Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-6 w-[92%] ml-5 ">
        <p className="text-[15px]">
          By clicking{" "}
          <span className="font-bold text-black">Agree and continue</span>, you
          agree to the{" "}
          <a href="#" className="font-semibold text-green-500">
            Google Workspace Agreement
          </a>
          ,{" "}
          <a href="#" className="font-semibold text-green-500">
            Google Workspace purchase Agreement
          </a>
          , and{" "}
          <a href="#" className="font-semibold text-green-500 ">
            Supplemental Terms and Conditions
          </a>{" "}
          for Google Workspace Free Trial Agreement.
        </p>
      </div>

      {/* Submit Button */}
      <Link to="/PaymentGateway">
        <button className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Agree and continue
        </button>
      </Link>
      <div
        className="absolute right-0 w-10 h-10 bg-center bg-no-repeat bg-contain bottom-11"
        style={{ backgroundImage: `url("/images/messaageIcon.png")` }}
      ></div>
    </div>
  );
};

export default PaymentMethodForm;
