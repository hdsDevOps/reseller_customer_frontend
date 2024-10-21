import React, { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ChevronDown, ChevronUp } from "lucide-react";
import AddPayment from "./AddPaymentMethods";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  const [numUsers, setNumUsers] = useState<number>(2);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const subtotal = 70.6;
  const taxRate = 0.0825;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full mx-2  h-[95vh] xl:h-full overflow-y-scroll">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Add User License</h1>
          <button className="flex items-center gap-1 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out py-2 px-4 rounded-lg text-xs sm:text-sm">
            Add to Cart <MdOutlineAddShoppingCart />
          </button>
        </div>

        {showDetails && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-semibold">No. of additional user</p>
            <input
              type="number"
              value={numUsers}
              onChange={(e) => setNumUsers(Number(e.target.value))}
              className="border-gray-300 border rounded p-2 w-16 text-center bg-white outline-none focus:ring-1 focus:ring-green-300"
              placeholder="No."
            />
          </div>
        )}

        {showDetails && (
          <div className="border-y border-gray-300 py-2 my-6">
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-1">
                <p>
                  {numUsers} users, Year subscription (price adjusted to current cycle)
                </p>
                <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold mr-1">
                  i
                </span>
              </div>
              <span className="flex items-center font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <p className="underline mb-4 font-semibold mt-2">Enter voucher code</p>
          </div>
        )}

        <div className="border-b border-gray-300 py-2 mb-4">
          <div className="flex justify-between font-semibold mb-3">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              Tax (8.25%)
              <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold ml-1">
                i
              </span>
            </div>
            <span className="gap-2">₹{tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-b border-gray-300 py-2 mb-4">
          <div className="flex justify-between font-bold">
            <span className="flex items-center gap-2">
              Total
              <p 
                className="text-green-500 font-normal cursor-pointer flex items-center"
                onClick={() => setShowDetails(!showDetails)}
              >
                 {showDetails ? (
                  <>
                    Hide details <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show details <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </p>
            </span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <AddPayment />

        <div className="flex justify-start gap-4 mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
