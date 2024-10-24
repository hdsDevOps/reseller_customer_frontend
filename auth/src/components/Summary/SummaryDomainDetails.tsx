import React from "react";
import { BiSolidEditAlt } from "react-icons/bi";
const SummaryDomainDetails = () => {
  return (
    <div className="">
      {/* Domain Details */}
      <div>
        <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
          Domain details
        </h2>
        <div className="mb-3 w-[220px]">
          <p className="text-gray-500">domain.co.in</p>
          <p className="text-gray-500">₹ 648.00 per year</p>
          <p className="text-gray-500">
            Your annual plan will begin <strong>June 25, 2024</strong>. You can{" "}
            <span className="text-blue-500 underline">cancel at any time</span>.
          </p>
          <p className="text-gray-500">
            Charges today and recurs yearly on June 25.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
            Contact Information
          </h2>
          <button className="text-green-600 underline hover:text-green-800">
            <BiSolidEditAlt className="text-[30px] font-extrabold" />
          </button>
        </div>
        <div className="mb-3 w-[220px]">
          <p className="text-gray-500">Robert Clive</p>
          <p className="text-gray-500">robertclive@gmail.com</p>
          <p className="text-gray-500">9874761230</p>
        </div>
      </div>

      {/* Business Information */}
      <div>
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
            Business information
          </h2>
          <button className="text-green-600 underline hover:text-green-800">
            <BiSolidEditAlt className="text-[30px] font-extrabold" />
          </button>
        </div>
        <div className="w-[220px]">
          <p className="text-gray-500">ABC Business</p>
          <p className="text-gray-500">
            Amherst St, College Row, College Street
          </p>
          <p className="text-gray-500">Kolkata 700009</p>
          <p className="text-gray-500">West Bengal</p>
          <p className="text-gray-500">India</p>
          <p className="text-gray-500">8777593945</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryDomainDetails;
