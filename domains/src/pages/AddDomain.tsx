import { ArrowLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const AddDomain: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state: any) => state.auth);

  return (
    <div>
      <main>
        <Link to="/domain">
          <h2 className="text-green-500 font-medium text-sm sm:text-md lg:text-2xl flex items-center mb-3">
            <ArrowLeft className="text-sm sm:text-md lg:text-2xl" /> Add existing domains
          </h2>
        </Link>
        {/* <p>
          This is your Domain where you can manage your account ={" "}
          {userAuthStatus}
        </p> */}
        <div className="flex items-center gap-1 text-sm sm:text-md md:text-lg">
          <Link to="/domain">Domain</Link>
          <ChevronRight />
          <p className="text-green-500">Add existing domains</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 mt-10">
          <div className="pb-4 text-center">
            <h1 className="font-semibold text-[18px] md:text-3xl">
              Next, We'll Setup Your Domain
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-lg">
              Your domain will be your website's address.
            </p>
            <p className="text-gray-600 mt-1 text-sm md:text-lg">
              You can create a new domain, use one you already own, or make one
              later.
            </p>
          </div>
          <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col max-w-xl w-full">
            <div className="bg-gray-100 p-3 rounded-t-md">
              <h2 className="font-semibold text-sm md:text-lg">
                Use a Domain You Own
              </h2>
            </div>
            <form className="p-3 mt-8 flex flex-col gap-4 bg-white flex-1">
              <input
                type="text"
                placeholder="domain.co.in"
                className="border-2 border-gray-200 bg-transparent rounded-lg p-[.65rem] focus:border-green-500 focus:outline-none"
              />
              <p className="text-gray-400 text-sm">
                Enter your existing domain name.
              </p>
            </form>
            <div className="p-4 flex flex-start">
              <Link to="/domain-details">
              <button
                type="button"
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 ease-in-out"
              >
                Next
              </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddDomain;
