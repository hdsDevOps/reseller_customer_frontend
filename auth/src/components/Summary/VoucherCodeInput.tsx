import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const VoucherCodeInput = ({ onClose, handleSubmit, handleVoucherCodeChange, voucherCode }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center justify-center w-full mt-7">
        <input
          type="text"
          placeholder="Enter voucher code"
          className="flex-grow p-3 border-2 border-black border-dashed focus:outline-none focus:ring-0"
          value={voucherCode}
          onChange={handleVoucherCodeChange}
        />
        <button className="px-4 py-3 text-white transition-colors bg-black hover:bg-gray-800">
          Check
        </button>
        <button className="w-6 h-6 my-auto" onClick={onClose}>
          <IoMdClose className="w-full h-full"/>
        </button>
      </form>
    </>
  );
};

export default VoucherCodeInput;
