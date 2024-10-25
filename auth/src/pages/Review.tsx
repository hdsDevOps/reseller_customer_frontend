import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import ReviewForm from "../components/Review/ReviewForm";
import PaymentMethodForm from "../components/Review/PaymentMethodForm";
const Review = () => {
  const navigate = useNavigate;
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="items-start justify-center w-full">
          <div className="flex items-start justify-start gap-10 pl-10 mt-8">
            <button
              className="flex flex-row items-center justify-center "
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack />
              <h6 className="text-green-500 text-[15px]">
                Back to previous page
              </h6>
            </button>
            <div className="ml-[230px]">
              <h1 className="text-[30px] text-green-500 font-semibold ">
                Review and checkout
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-center justify-center mt-[70px]">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-[20px] font-light">Domain Domain.co.in</h1>
            <h1 className="text-[20px] font-light">₹648.00 yearly</h1>
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-2">
            <h1 className="text-[14px] font-light">
              Your annual plan will begin on june 25, 2024 you can{" "}
              <span> cancel at any time </span>
            </h1>
            <h1 className="text-[14px] font-light"> +application tax </h1>
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-2">
            <h1 className="text-[14px] font-light">
              charges starts today recurs yearly on june 25
            </h1>
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-start justify-start mt-[30px]">
          <h1 className="font-bold text-[20px]">Customer Info</h1>
          <div className="mt-4 ml-10">
            <h1 className="font-semibold text-[15px] flex flex-row items-center justify-center mr-2">
              Account Type
              <GoInfo className="ml-2 mt-" />
            </h1>
            <p className="text-[13px] text-gray-500 mt-2">Organization</p>
            <h1 className="font-semibold text-[15px] flex flex-row items-center justify-center mt-8">
              Tax information
              <GoInfo className="ml-2 mt-" />
            </h1>
          </div>
        </div>
        <ReviewForm />
        
        <PaymentMethodForm />
      </div>
    </>
  );
};

export default Review;
