import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PaymentModal from "../components/PaymentModal";
import DateSearch from "../components/DateSearch";

interface PaymentDetail {
  productType: string;
  paymentCycle: string;
  description: string;
  domain: string;
  lastPayment: string;
  nextPayment: string;
  billingStatus: string;
  paymentMethod: string | null;
}

const PaymentDetails: React.FC = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const paymentDetails: PaymentDetail[] = [
    {
      productType: "Google workspace",
      paymentCycle: "Monthly",
      description: "Purchase Google Workspace starter",
      domain: "examplepetstore.com",
      lastPayment: "Jan 30 2024",
      nextPayment: "Feb 30 2025",
      billingStatus: "Expired",
      paymentMethod: null,
    },
    {
      productType: "Domain",
      paymentCycle: "Yearly",
      description: "Purchase Google Domain",
      domain: "example-pet-store.com",
      lastPayment: "Jan 30 2024",
      nextPayment: "Jan 30 2025",
      billingStatus: "Cancelled",
      paymentMethod: null,
    },
    {
      productType: "Google workspace + domain",
      paymentCycle: "Yearly",
      description: "Purchase Google Workspace standard plan & 2 domains",
      domain: "myownpersonaldomain.com, schemaphic.com",
      lastPayment: "Jan 30 2024",
      nextPayment: "Jan 30 2025",
      billingStatus: "Auto-renew",
      paymentMethod: "...2354",
    },
  ];

  const handleToggleModal = (index: number, button: HTMLElement) => {
    const { bottom, left } = button.getBoundingClientRect();
    setModalPosition({ top: bottom + window.scrollY + 10, left });
    setOpenModalIndex(openModalIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-green-500 text-3xl font-medium">
          Payment Subscription
        </h1>
        <p className="text-gray-900 text-sm">
          View, manage or cancel your subscriptions and services.
        </p>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center gap-4">
        <DateSearch />
        <div className="relative">
          <select
            className="border border-transparent bg-transparent text-gray-700 p-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 w-80"
            onClick={toggleDropdown}
          >
            <option value="" disabled selected hidden>
              Auto search domain list
            </option>
            <option value="option1" className="text-gray-300">Robertclive@schemaphic.com</option>
            <option value="option2" className="text-gray-300">Robertclive@domain.co.in</option>
            <option value="option3" className="text-gray-300">Robertclive@hordanso.com</option>
          </select>
          <IoIosArrowDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            onClick={toggleDropdown}
          />
        </div>
      </div>
      <div className="flex items-center gap-0">
        <input
          type="text"
          className="border border-gray-300 rounded-l-sm bg-transparent text-gray-700 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="Search..."
        />
        <button className="bg-green-500 text-white rounded-r-sm p-2 hover:bg-green-600 transition">
          Search
        </button>
      </div>
    </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              {[
                "Product Type",
                "Payment Cycle",
                "Description",
                "Domain",
                "Last Payment",
                "Next Payment",
                "Billing Status",
                "Payment Method",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <tr className="text-xs text-gray-400">
                  <td className="px-2 pb-10 pt-3 text-center">
                    {detail.productType}
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    {detail.paymentCycle}
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    {detail.description}
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    {detail.domain}
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    {detail.lastPayment}
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    {detail.nextPayment}
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    <button
                      className={`w-[80px] h-[30px] rounded hover:text-white ${
                        detail.billingStatus === "Cancelled"
                          ? "text-red-700 border-2 border-red-500 hover:bg-red-500"
                          : detail.billingStatus === "Expired"
                          ? "bg-gray-300 text-gray-700 border-2 border-gray-500 hover:bg-gray-700"
                          : "text-green-500 border-2 border-green-500 hover:bg-green-500"
                      }`}
                    >
                      {detail.billingStatus}
                    </button>
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    <span className="flex items-center justify-center">
                      {detail.paymentMethod ? (
                        <>
                          <img
                            src="/images/visa.png"
                            alt="Visa"
                            className="h-4 mr-1"
                          />
                          <span className="text-[0.75rem] text-gray-600 font-semibold">
                            {detail.paymentMethod}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-800 font-bold text-3xl text-center">
                          -
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-2 pb-10 pt-3 flex items-center justify-center">
                    <button
                      className="w-6 h-6 rounded-full border-2 border-green-500 flex justify-center items-center"
                      onClick={(e) => handleToggleModal(index, e.currentTarget)}
                    >
                      <p className="mb-2">...</p>
                    </button>
                  </td>
                </tr>
                {openModalIndex === index && modalPosition && (
                  <PaymentModal
                    isOpen={true}
                    onClose={() => setOpenModalIndex(null)}
                    position={modalPosition}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;
