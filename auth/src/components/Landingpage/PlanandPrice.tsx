import React from "react";
import PlanCard from "../PlanCards";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowDownLong } from "react-icons/fa6";
import { SmallButton } from "../../utils/buttons/Button";
import ProductivityAndCollaboration from "./ProductivityTable";
import { Link } from "react-router-dom";

const PlanandPrice = () => {
  return (
    <section className="w-full max-md:px-3 md:px-10 lg:px-14">
      <div className="py-10 lg:py-16 flex justify-center gap-x-2 lg:gap-x-4 items-center w-full">
        <div className="relative flex justify-center items-center w-full">
          <input
            className="bg-transparent border px-3 py-3 lg:py-6 lg:px-10 w-full rounded-md shadow-md font-normal lg:text-2xl"
            placeholder="Type your desired domain here."
          />
          <div className="flex justify-center items-center absolute max-md:top-4 max-md:right-2 lg:top-5 lg:right-[2rem]">
            <p className="max-md:text-sm lg:text-2xl font-bold text-black">.com</p>
            <MdKeyboardArrowDown size={24} />
          </div>
        </div>
        <Link to="/DomainList">
          <button className="px-2 py-3 lg:px-4 lg:py-6 text-sm lg:text-lg font-semibold text-white rounded-md bg-greenbase text-nowrap">
            Search <span className="hidden lg:flex">Domain</span>
          </button>
        </Link>
      </div>
      <PlanCard />
      <div className="flex flex-col items-center justify-center mx-auto mt-10">
        <p className="mb-2 text-xl font-medium text-greenbase">
          Compare plans in details
        </p>
        <FaArrowDownLong fill="#12A833" />
      </div>
      <div className="flex max-md:flex-col lg:justify-end max-md:px-4 px-8 mx-auto py-7">
        <div className="flex flex-col max-sm:items-center gap-3 px-5 pt-5 max-md:pb-5 border-[#8c8c8c] border-2 md:!border-r-0 ">
          <p className="text-lg font-normal">Business Starter</p>
          <Link to="/subscribe">
            <SmallButton placeholder="Start trial" className="text-white" />
          </Link>
        </div>
        <div className="flex flex-col gap-3 pb-7 border-[#8c8c8c] border-2 max-md:!border-y-0 md:!border-r-0">
          <p className="text-greenbase text-xs font-normal bg-[#e7f6eb] flex justify-center px-2 py-2 w-full">
            MOST POPULAR
          </p>
          <div className="flex flex-col gap-3 px-5 max-md:items-center">
            <p className="text-lg font-normal">Business Standard</p>
            <SmallButton
              placeholder="Start trial"
              className="!bg-[#F0F0F3] text-greenbase"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 px-5 pt-5 max-md:items-center max-md:pb-5 border-[#8c8c8c] border-2">
          <p className="text-lg font-normal">Business Plus</p>
          <SmallButton
            placeholder="Start trial"
            className="!bg-[#F0F0F3] text-greenbase"
          />
        </div>
      </div>
      <ProductivityAndCollaboration />
    </section>
  );
};
export default PlanandPrice;
