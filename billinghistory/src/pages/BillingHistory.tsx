import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
import { TiExportOutline } from "react-icons/ti";
// import PaymentModal from "../components/PaymentModal";
import DateSearch from "../components/DateSearch";

interface BillingDetail {
  TransactID: string;
  date_invoice: string;
  description: string;
  domain: string;
  productType: string;
  amount: string;
  status: string;
  invoice: JSX.Element;
  paymentMethod: string | null;
}

const BillingHistory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const BillingDetails: BillingDetail[] = [
    {
      TransactID: "6611**1b36",
      date_invoice: "Jan 30 2024",
      description: "Google Workspace starter",
      domain: "examplepetstore.com",
      productType: "Google workspace",
      amount: "₹3.00",
      status: "Paid",
      invoice: <FaDownload />,
      paymentMethod: "...2354",
    },
    {
      TransactID: "3611**1b39",
      date_invoice: "Jan 30 2024",
      description: "Purchase Google Domain",
      domain: "example-pet-store.com",
      productType: "Google domain",
      amount: "₹648.00",
      status: "Paid",
      invoice: <FaDownload />,
      paymentMethod: "...2354",
    },
    {
      TransactID: "7611**1b86",
      date_invoice: "Jan 30 2024",
      description: "Purchase Google <br /> Workspace standard plan & 2 domains",
      domain: "myownpersonaldomain.com, schemaphic.com",
      productType: "Google workspace + domain",
      amount: "₹648.00",
      status: "Paid",
      invoice: <FaDownload />,
      paymentMethod: "...2354",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-green-500 text-3xl font-medium">Billing History</h1>
        <p className="text-gray-900 text-sm">
          Set up your email accounts here and you can add users & edit your
          admin details.
        </p>
      </div>
      <div className="flex flex-col sm:flex-col md:flex-row  gap-4  justify-between p-4 bg-gray-100">
        <div className="flex flex-col sm:flex-col md:flex-row   gap-4">
          <DateSearch />
          <div className="relative align-self-start">
            <select
              className="border border-transparent bg-transparent text-gray-700 p-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 w-80"
              onClick={toggleDropdown}
            >
              <option value="" disabled selected hidden>
                Auto search domain list
              </option>
              <option value="option1" className="text-gray-300">
                Robertclive@schemaphic.com
              </option>
              <option value="option2" className="text-gray-300">
                Robertclive@domain.co.in
              </option>
              <option value="option3" className="text-gray-300">
                Robertclive@hordanso.com
              </option>
            </select>
            <IoIosArrowDown
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              onClick={toggleDropdown}
            />
          </div>
        </div>
        <div className="flex items-center gap-0">
          
          <button className="text-green-500 border-2 border-green-500 rounded-md p-2 hover:bg-green-200 transition flex items-center gap-2" style={{
            backgroundColor:"#A7F3D0",
          }}>
            <TiExportOutline className="text-green-500 text-xl rotate-180" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              {[
                "Transaction ID",
                "Date / Invoice",
                "Production Type",
                "Description",
                "Domain",
                "Payment Method",
                "Status",
                "Amount",
                "Invoice",
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
            {BillingDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <tr className="text-xs text-gray-400">
                  <td className="px-2 pb-10 pt-3 text-center text-green-500">
                    {detail.TransactID}
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center flex items-center flex-col">
                    {detail.date_invoice}
                    <small className="text-green-500 text-xs">12309864</small>
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    {detail.productType}
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detail.description.replace(
                          /<br\s*\/?>/gi,
                          "<br />"
                        ),
                      }}
                    />
                  </td>

                  <td className="px-2 pb-10 pt-3 text-center">
                    {detail.domain}
                  </td>

                  <td className="px-2 pb-10 pt-3 text-center">
                    <span className="flex items-center justify-center">
                      <img
                        src="/images/visa.png"
                        alt="Visa"
                        className="h-4 mr-1"
                      />
                      <span className="text-[0.75rem] text-gray-600 font-semibold">
                        {detail.paymentMethod}
                      </span>
                    </span>
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center">
                    <button className="bg-green-500 text-white hover:bg-opacity-95 w-[80px] h-[30px] rounded">
                      {detail.status}
                    </button>
                  </td>
                  <td className="px-2 pb-10 pt-3 text-center text-green-500">
                    {detail.amount}
                  </td>
                  <td className="px-2 pb-10 pt-3 cursor-pointer flex items-center justify-center text-green-500 text-xl">
                    {detail.invoice}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingHistory;
