import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GoInfo } from "react-icons/go";
import { BiSolidEditAlt } from "react-icons/bi";

const ReviewForm = () => {
  return (
    <>
      <form className="flex flex-col items-start justify-center w-[45%] mt-3">
        <div className="relative w-full mb-5">
          <select
            id="tax"
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 appearance-none pr-10" // Added padding-right to create space for the arrow
          >
            <option value="business">Business</option>
            <option value="individual">Individual</option>
          </select>
          <label
            htmlFor="tax"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            Tax Status
          </label>
          {/* Arrow Icon */}
          <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
            <IoIosArrowDown className="text-gray-500" />
          </div>
        </div>

        <div className="relative w-full mb-5">
          <input
            type="text"
            id="pan"
            placeholder="ABCD1234A"
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 placeholder-black"
          />
          <label
            htmlFor="pan"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            {" "}
            PAN (Optional){" "}
          </label>
        </div>

        <div className="relative w-full mb-5">
          <input
            type="text"
            id="pan"
            placeholder="DELA02345T"
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 placeholder-black"
          />
          <label
            htmlFor="tan"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            {" "}
            TAN (Optional){" "}
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 border-b-2 border-green-500 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-green-500 bg-transparent border-0  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Add a GST identification number (GSTIN) (Optional)
          </label>
        </div>

        <h1 className="font-semibol text-[15px] flex flex-row items-center justify-center mb-4">
          Name and Address
          <GoInfo className="ml-2 mt-" />
        </h1>

        <div className="relative w-full mb-5">
          <input
            type="text"
            id="pan"
            placeholder="Abc Buisness "
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 placeholder-black"
          />
          <label
            htmlFor="tan"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            {" "}
            Buisness Name{" "}
          </label>
        </div>
        <div className="relative w-full mb-5">
          <input
            type="text"
            id="pan"
            placeholder="Robert Clive "
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 placeholder-black"
          />
          <label
            htmlFor="tan"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            {" "}
            Name{" "}
          </label>
        </div>

        <div className="relative w-full mb-5">
          <input
            type="text"
            id="pan"
            placeholder="Bandra Promenade "
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 placeholder-black"
          />
          <label
            htmlFor="tan"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            {" "}
            Address{" "}
          </label>
        </div>

        <div className="relative w-full mb-5">
          <input
            type="text"
            id="pan"
            placeholder="Mumbai "
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 placeholder-black"
          />
          <label
            htmlFor="tan"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            {" "}
            City*{" "}
          </label>
        </div>

        <div className="relative w-full mb-5">
          <input
            type="text"
            id="pan"
            placeholder="601249"
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 placeholder-black"
          />
          <label
            htmlFor="tan"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            {" "}
            Zipcode{" "}
          </label>
        </div>

        <div className="relative w-full mb-4">
          <select
            id="tax"
            className="w-full p-[11px] border-2 border-gray-300 rounded-[10px] outline-0 appearance-none pr-10" // Added padding-right to create space for the arrow
          >
            <option value="business">Maharashtra</option>
            <option value="individual">mumbai</option>
          </select>
          <label
            htmlFor="tax"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            State
          </label>
          {/* Arrow Icon */}
          <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
            <IoIosArrowDown className="text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full gap-2 mb-4">
          <h1 className="font-semibold text-[15px] flex flex-row items-center justify-center mr-2">
            Primary Contact
            <GoInfo className="ml-2" />
            <BiSolidEditAlt className="ml-2" />
          </h1>
          <h1 className="text-gray-500">Robert Clive</h1>
          <h1 className="text-gray-500">Robertclive@gmail.com</h1>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
