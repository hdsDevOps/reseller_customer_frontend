import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";

const FreeTrial: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
    <p
      className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
      onClick={() => navigate(-1)}
    >
      <IoChevronBackSharp /> Back to previous page
    </p>


      <div className="w-full max-w-lg p-6 border border-gray-300 rounded-xl bg-white mt-4">
        <h1 className="text-3xl font-medium mb-2">Trial Summary</h1>
        <hr className="border-gray-400 mb-4" />

        <div className="flex items-start gap-3 mb-4">
          <FaCrown className="text-green-500 text-4xl mb-2" />
          <div>
            <h2 className="text-3xl uppercase xsm-max:text-xl font-medium flex items-start gap-2 flex-col-reverse">
            <p className="text-xs text-gray-500 font-normal normal-case ">Yearly commitment</p>Business Standard</h2>
            
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-8 mt-14 mb-10">
          <div className="absolute left-1 top-[23%] bottom-0 h-[3rem] w-[2px] bg-green-600 xsm-max:h-[2.5rem] xsm-max:top-[22%]">
          </div>
          <div className="w-full flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 text-white rounded-full">
              </div>
              <div className="w-full flex items-center justify-between">
              <p className="text-xl xsm-max:text-sm">Starting Today</p>
              <p className="text-xl xsm-max:text-sm">30-days free trial</p>
              </div>
            </div>
          <div className="w-full flex items-center gap-2">
              <div className="w-3 h-3 bg-white border-2 border-green-600 text-white rounded-full">
              </div>
              <div className="w-full flex items-center justify-between">
              <p className="text-xl xsm-max:text-sm">Starting July 20, 2024</p>
              <p className="text-xl xsm-max:text-sm">₹8.10/month</p>
              </div>
            </div>
        </div>

        <ul className="text-xs text-gray-500 list-disc pl-5 mb-4">
          <li className="mb-6">To verify your payment method, you will be charged 2 INR, which will be refunded in 10 days.</li>
          <li className="mb-6">Cancel anytime in Subscription on Hordanso.</li>
          <li className="mb-6">You won't be charged if you cancel before your free trial ends, and we'll remind you 2days before.</li>
          <li className="mb-6">We'll charge 8.10 INR every month until you cancel. You can cancel renewal anytime before expire.</li>
        </ul>

        <p className="text-xs text-gray-500 mb-4">
          By clicking <span className="text-black">Start Free Trial</span> 
            you agree to the{" "}
            <a href="#" className="text-green-600">
              Google Workspace Agreement, Google Workspace purchase Agreement
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600">
              Supplemental Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600">
              Conditions for Google Workspace Free Trial Agreement.
            </a>.
        </p>

        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg" onClick={()=>navigate('/gemini-add')}>
          Start Free Trial
        </button>
      </div>
    </div>
  );
};

export default FreeTrial;
