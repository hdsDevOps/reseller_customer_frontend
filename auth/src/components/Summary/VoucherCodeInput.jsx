import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const VoucherCodeInput = ({ onClose }) => {
  const [voucherCode, setVoucherCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle voucher code submission (e.g., send to server or process)
    console.log("Voucher code submitted:", voucherCode);
  };

  return (
    <>
      <div className="flex">
        <form onSubmit={handleSubmit} className="flex items-center justify-center w-full mt-7">
          <div className="flex w-full ml-[70px]">
            <input
              type="text"
              placeholder="Enter voucher code"
              className="flex-grow p-3 border-2 border-black border-dashed focus:outline-none focus:ring-0"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button className="px-4 py-3 text-white transition-colors bg-black hover:bg-gray-800">
              Check
            </button>
          </div>
        </form>
        <button onClick={onClose}>
            <IoMdClose/>
        </button>
      </div>
    </>
  );
};

export default VoucherCodeInput;
