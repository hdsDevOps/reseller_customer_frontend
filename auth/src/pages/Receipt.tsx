import React from "react";
import { GrCheckmark } from "react-icons/gr";
import { Link } from "react-router-dom";
const Receipt = () => {
  return (
    <>
      <div className="w-[40%] bg-white rounded-[10px] mt-5 mb-8">
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="flex items-center justify-center p-3 rounded-[200px] bg-green-500 mt-16">
            <GrCheckmark className="text-white" size={50} />
          </div>
          <div className="mt-3">
            <h1 className="font-bold text-[15px] text-black">
              Your Payment has been processed successfully
            </h1>
          </div>
          <div className="flex flex-col items-start justify-center w-full bg-white shadow-md py-7 px-[70px] mt-3">
            <div className="flex flex-row items-center justify-between w-full mb-3 text-gray-500">
              <h1>Date</h1>
              <h3 className="text-black">29.02.2024 12.01</h3>
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-3 text-gray-500">
              <h1>Customer</h1>
              <h3 className="text-black">Robert Clive</h3>
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-3 text-gray-500">
              <h1>Reference ID </h1>
              <h3 className="text-black">ADB453026151</h3>
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-3 text-gray-500">
              <h1>Payment Method</h1>
              <h3 className="text-black"> Visa Credit Card </h3>
            </div>

            <div className="flex flex-row items-start justify-between w-full mb-3 text-gray-500">
              <h1>Item(2)</h1>
              <div className="flex flex-col items-end justify-end gap-1">
                <h3 className="text-black">DOMAIN.CO.IN</h3>
                <h3 className="text-black">BUISNESS STANDARD</h3>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full pt-4 mt-2 mb-3 text-gray-500 border-t-2 border-gray-300 border-dashed">
              <h1 className="font-extrabold text-black"> Total </h1>
              <h3 className="font-extrabold text-green-500">₹692.86</h3>
            </div>

            <div className="flex items-start justify-start w-full mt-3">
              <h1 className="text-[12px] text-green-500 hover:text-green-800"><a href="#" className="underline hover:text-green-800 "> Download Invoice </a></h1>
            </div>
          </div>
          <Link to="/dashboard" className="flex items-center justify-center w-full">
          <button className="w-[68%] p-3 flex items-center justify-center bg-green-500 text-white rounded-[10px] my-7">
            Go To DashBoard
          </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Receipt;
