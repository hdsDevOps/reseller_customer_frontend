import React from "react";
import PaymentForm from "../components/PaymentGateway/PaymentForm";

const PaymentGateway = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-end justify-end w-full mt-10 mr-20">
          <button className="py-2 px-4 rounded-[5px]  bg-slate-100">
            Cancel
          </button>
        </div>
        <div className="flex items-center justify-center mt-16">
          <h1 className="text-green-500 text-[25px] font-bold">Payment Gateway Screen</h1>
        </div>
        <PaymentForm/>
      </div>
    </>
  );
};

export default PaymentGateway;
