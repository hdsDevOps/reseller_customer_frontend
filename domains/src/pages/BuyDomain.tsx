import { ArrowLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const BuyDomain: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state: any) => state.auth);

  return (
    <div>
      <main>
        <Link to="/domain">
          <h2 className="text-green-500 font-medium text-sm sm:text-md lg:text-2xl flex items-center mb-3">
            <ArrowLeft className="text-sm sm:text-md lg:text-2xl" /> Buy a
            domain
          </h2>
        </Link>
        
        <div className="flex items-center gap-1 text-sm sm:text-md md:text-lg">
          <Link to="/domain">Domain</Link>
          <ChevronRight />
          <p className="text-green-500">Buy a domain</p>
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
            <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col">
              <div className="bg-gray-100 p-3 rounded-t-md">
                <h2 className="font-semibold text-sm md:text-lg">
                  Create a New Domain
                </h2>
              </div>
              <form className="p-3 mt-8 flex flex-col gap-4 bg-white flex-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter your domain"
                    className={`flex-1 border-2 bg-transparent rounded-lg p-[.65rem] focus:border-green-500 focus:outline-none`}
                    value=""
                  />
                  <div className="flex gap-4">
                    <label htmlFor="domain-select" className="sr-only">
                      Choose a domain extension
                    </label>
                    <select
                      id="domain-select"
                      className="border-2 border-gray-200 bg-transparent rounded-lg p-[.65rem] focus:border-green-500 focus:outline-none"
                      aria-label="Choose a domain extension"
                    >
                      <option value=".com">.com</option>
                      <option value=".cc">.cc</option>
                      <option value=".org">.org</option>
                    </select>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Search available domain.</p>
              </form>
              <div className="p-4 flex flex-start">
                <Link to="/choose-domain">
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
        </div>
      </main>
    </div>
  );
};

export default BuyDomain;