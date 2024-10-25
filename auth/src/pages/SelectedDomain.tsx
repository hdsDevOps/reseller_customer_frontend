import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";

const SelectedDomain: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const domain = state?.selectedDomain;


  if (!domain) {
    return <div>No domain selected.</div>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-6 p-4">
      <p
        className="absolute flex items-center gap-1 text-green-600 cursor-pointer left-4 top-2"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <div className="flex flex-col items-center justify-center w-full max-w-3xl gap-1 p-7 xsm-max:px-0">
        <h1 className="mt-1 mb-4 text-3xl font-bold">The domain you want is available!</h1>

        <div className="flex items-center justify-between w-full p-4 bg-white border border-black rounded-sm">
          <div className="text-lg font-semibold">{domain.name}</div>
          <div className="text-lg font-semibold">
            <span className="font-normal text-green-500">Available</span> {domain.price}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-lg">
            <AiOutlineCheck className="self-start text-green-500"/>
            <p className="text-[16px]">You'll use this domain to set up Google Workspace, create professional email addresses like sales@dboss.live, and sign in to Gmail, Docs, Drive, Calendar, and more.</p>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <AiOutlineCheck className="text-green-500"/>
            <p className="text-[16px]">You'll be able to purchase <strong>{domain.name}</strong> after creating your Google Workspace account.</p>
          </div>
        </div>

        <div className="mt-8 text-gray-600 text-md">
          <p className="leading-6">
            Domain name registration services will be provided by <span className="text-green-500">Squarespace Domains</span>, pursuant to the <span className="text-green-500">Squarespace Terms of Service</span> and <span className="text-green-500">Squarespace Domain Registration Agreement</span>, which Google resells pursuant to its <span className="text-green-500">Google Domain Reseller Agreement</span>. Initially, Google will manage your domain(s) on Squarespace's behalf. Once your domain is transitioned to Squarespace Domains, Google will share your name, contact information, and other domain-related information with Squarespace. You can review Squarespace's <span className="text-green-500"> Privacy Policy</span> for details on how they process your information. Google's <span className="text-green-500">Privacy Policy</span> describes how Google handles this information as a reseller. By clicking <span className="text-xl font-bold text-gray-600">Next</span> you acknowledge receipt of Google'sPrivacy Policy and direct us to share this information with Squarespace.
          </p>
        </div>

        <button
          className="self-start px-4 py-2 mt-4 text-white bg-green-600 rounded-lg"
          // onClick={() => navigate('/signin-domain', { state: { selectedDomain: domain } })}
          onClick={()=> navigate("/summary")}
        >
          Next
        </button>
        <p className="self-start mt-1 text-xl font-bold text-green-600"><a href="/DomainDetails">Want to use a domain i already own</a></p>
      </div>
    </div>
  );
};

export default SelectedDomain;
