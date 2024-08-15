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
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-1 p-7 xsm-max:px-0">
        <h1 className="text-3xl font-bold mt-1 mb-4">The domain you want is available!</h1>

        <div className="bg-white w-full border border-black rounded-sm p-4 flex justify-between items-center">
          <div className="text-lg font-semibold">{domain.name}</div>
          <div className="text-lg font-semibold">
            <span className="text-green-500 font-normal">Available</span> {domain.price}
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

        <div className="mt-8 text-md text-gray-600">
          <p className="leading-6">
            Domain name registration services will be provided by <span className="text-green-500">Squarespace Domains</span>, pursuant to the <span className="text-green-500">Squarespace Terms of Service</span> and <span className="text-green-500">Squarespace Domain Registration Agreement</span>, which Google resells pursuant to its <span className="text-green-500">Google Domain Reseller Agreement</span>. Initially, Google will manage your domain(s) on Squarespace's behalf. Once your domain is transitioned to Squarespace Domains, Google will share your name, contact information, and other domain-related information with Squarespace. You can review Squarespace's <span className="text-green-500"> Privacy Policy</span> for details on how they process your information. Google's <span className="text-green-500">Privacy Policy</span> describes how Google handles this information as a reseller. By clicking <span className="text-gray-600 font-bold text-xl">Next</span> you acknowledge receipt of Google'sPrivacy Policy and direct us to share this information with Squarespace.
          </p>
        </div>

        <button
          className="self-start bg-green-600 text-white py-2 px-4 rounded-lg mt-4"
          onClick={() => navigate('/signin-domain')}
        >
          Next
        </button>
        <p className="text-xl text-green-600 font-bold self-start mt-1">Want to use a domain i already own</p>
      </div>
    </div>
  );
};

export default SelectedDomain;
