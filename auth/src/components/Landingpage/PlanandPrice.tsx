import React from "react";
import PlanCard from "../PlanCards";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowDownLong } from "react-icons/fa6";
import { SmallButton } from "../../utils/buttons/Button";
import ProductivityAndCollaboration from "./ProductivityTable";
import { Link } from "react-router-dom";

const PlanandPrice = () => {
  return (
    <section className="w-full ms:px-16 px-4 max-w-screen-2xl mx-auto">
      <div className="py-[4.175rem] flex flex-col md:flex-row justify-center gap-4 items-center mx-auto">
          <div className="relative flex justify-center flex-1 w-full">
          <input className="bg-transparent border py-6 px-10  w-full rounded-md shadow-md font-normal text-2x" placeholder="Type your desired domain here."/>
          <div className="flex justify-center items-center absolute top-5 right-[2rem] hidden">
              <p className="text-2xl font-bold text-black">.com</p>
              <MdKeyboardArrowDown size={24} />
          </div>
          </div>
          <Link to="/DomainList">
          <button className="px-4 py-6 text-lg font-semibold text-white rounded-md bg-greenbase">Search Domain</button>
          </Link>
      </div>
      <PlanCard />
      <div className="flex flex-col items-center justify-center mx-auto mt-10">
        <p className="mb-2 text-xl font-medium text-greenbase">Compare plans in details</p>
        <FaArrowDownLong fill="#12A833"/>
      </div>
      
      <ProductivityAndCollaboration/>
    </section>
  );
};
export default PlanandPrice;
