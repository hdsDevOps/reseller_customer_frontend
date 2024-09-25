import React from "react";
import PlanCard from "../PlanCards";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowDownLong } from "react-icons/fa6";
import { SmallButton } from "../../utils/buttons/Button";
import ProductivityAndCollaboration from "./ProductivityTable";

const PlanandPrice = () => {
  return (
    <section className="w-full px-[4.375rem] max-w-screen-2xl mx-auto">
        <div className="py-[4.175rem] flex justify-center gap-4 items-center mx-auto">
            <div className="relative flex justify-center">
            <input className="bg-transparent border py-6 px-10 w-[69.688rem] rounded-md shadow-md font-normal text-2x" placeholder="Type your desired domain here."/>
            <div className="flex justify-center items-center absolute top-5 right-[2rem]">
                <p className="text-black font-bold text-2xl">.com</p>
                <MdKeyboardArrowDown size={24} />
            </div>
            </div>
            <button className="py-6 px-4 rounded-md bg-greenbase text-white text-lg font-semibold">Search Domain</button>
        </div>
      <PlanCard />
      <div className="flex flex-col justify-center items-center mx-auto mt-10">
        <p className="text-greenbase text-xl font-medium mb-2">Compare plans in details</p>
        <FaArrowDownLong fill="#12A833"/>
      </div>
      <div className="flex justify-end mx-auto px-8 py-7">
        <div className="flex flex-col gap-3 px-5 pt-5 border-[#8c8c8c] border-2 !border-r-0 ">
            <p className="font-normal text-lg">Business Starter</p>
            <SmallButton placeholder="Start trial" className="text-white"/>
        </div>
        <div className="flex flex-col gap-3 pb-7 border-[#8c8c8c] border-2 !border-r-0">
            <p className="text-greenbase text-xs font-normal bg-[#e7f6eb] flex justify-center px-2 py-2 w-full">MOST POPULAR</p>
            <div className="px-5 gap-3 flex flex-col">
            <p className="font-normal text-lg">Business Standard</p>
            <SmallButton placeholder="Start trial" className="!bg-[#F0F0F3] text-greenbase"/>
            </div>
        </div>
        <div className="flex flex-col gap-3 px-5 pt-5 border-[#8c8c8c] border-2">
            <p className="font-normal text-lg">Business Plus</p>
            <SmallButton placeholder="Start trial" className="!bg-[#F0F0F3] text-greenbase"/>
        </div>
      </div>
      <ProductivityAndCollaboration/>
    </section>
  );
};
export default PlanandPrice;
