import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const SelectedDomain: React.FC = () => {
  return (
    <div>
      <main>
        <Link to="/domain">
          <h2 className="text-green-500 font-medium text-sm sm:text-md lg:text-2xl flex items-center gap-1 mb-3">
            <FaArrowLeft className="text-sm sm:text-md lg:text-2xl" /> Domain
            Details
          </h2>
        </Link>
        <div className="h-full w-full flex flex-col justify-center items-center gap-6 pt-4 dm:pt-10">
          <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-1 p-0 md:px-7">
            <div className="bg-white w-full border border-black rounded-sm py-4 p-3 flex justify-between items-center text-sm md:text-lg">
              <div className="text-xs sm:text-lg font-semibold">
                domain.co.in
              </div>
              <div className="text-xs sm:text-lg flex items-center gap-2 font-semibold">
                <small className="text-green-500 font-normal">Available</small>
                <p>₹684.00/year</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-2 text-sm md:text-lg">
                <AiOutlineCheck className="text-green-500" />
                <p className="text-gray-600">
                  You'll use this domain to set up Google Workspace, create
                  professional email addresses like{" "}
                  <strong>sales@dboss.live</strong>, and sign in to Gmail, Docs,
                  Drive, Calendar, and more.
                </p>
              </div>

              <div className="flex items-start gap-2 text-sm md:text-lg">
                <AiOutlineCheck className="text-green-500" />
                <p className="text-gray-600">
                  You'll be able to purchase <strong>domain.co.in</strong> after
                  creating your Google Workspace account.
                </p>
              </div>
            </div>

            <div className="mt-8 text-sm md:text-lg">
              <p className="leading-6 text-gray-600">
                Domain name registration services will be provided by{" "}
                <span className="text-green-500">Squarespace Domains</span>,
                pursuant to the{" "}
                <span className="text-green-500">
                  Squarespace Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-green-500">
                  Squarespace Domain Registration Agreement
                </span>
                , which Google resells pursuant to its{" "}
                <span className="text-green-500">
                  Google Domain Reseller Agreement
                </span>
                . Initially, Google will manage your domain(s) on Squarespace's
                behalf. Once your domain is transitioned to Squarespace Domains,
                Google will share your name, contact information, and other
                domain-related information with Squarespace. You can review
                Squarespace's{" "}
                <span className="text-green-500"> Privacy Policy</span> for
                details on how they process your information. Google's{" "}
                <span className="text-green-500">Privacy Policy</span> describes
                how Google handles this information as a reseller. By clicking{" "}
                <span className="text-gray-600 font-bold text-xl">Next</span>{" "}
                you acknowledge receipt of Google'sPrivacy Policy and direct us
                to share this information with Squarespace.
              </p>
            </div>

            <button className="self-start flex items-center gap-1 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out py-2 px-4 rounded-lg mt-4 text-xs sm:text-sm md:text-lg">
              Add to Cart <MdOutlineAddShoppingCart />
            </button>

            <p className="text-xs sm:text-sm md:text-lg text-green-500 font-medium self-start mt-2">
              Want to use a new domain?
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectedDomain;
