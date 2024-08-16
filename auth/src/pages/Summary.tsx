import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const Summary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
    <p
      className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
      onClick={() => navigate(-1)}
    >
      <IoChevronBackSharp /> Back to previous page
    </p>


      <div className="w-full max-w-full p-6 bg-white mt-4 flex items-center justify-between">
        <div>
          <h1>Plan</h1>
        </div>
        <div>
          <h1 className="text-3xl text-black font-bold">Summary</h1>
          <div className="flex">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl text-black font-bold">Busines Standard <span className="text-gray-400 font-light font-inter text-[20px]">(Google Workspace)</span> </h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl text-black font-bold">₹1,520</h1>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Summary;
