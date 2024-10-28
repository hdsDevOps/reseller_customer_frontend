import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import SummaryDomainDetails from "../components/Summary/SummaryDomainDetails"
import DomainSummary from "../components/Summary/DomainSummary"

const Summary: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-6 p-4">
      {" "}
      <p
        className="absolute flex items-center gap-1 text-green-600 cursor-pointer left-4 top-2"
        onClick={() => navigate(-1)}
      >
        {" "}
        <IoChevronBackSharp /> Back to previous page{" "}
      </p>{" "}
      <div className="flex items-start justify-between w-full max-w-full gap-5 px-10 py-5 bg-white">
        {" "}
        <div className="w-[45%]">
          {" "}
          < SummaryDomainDetails/>{" "}
        </div>{" "}
        <div className="w-[45%]">
          {" "}
          <DomainSummary />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Summary;
