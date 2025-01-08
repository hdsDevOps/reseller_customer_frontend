import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AvailableVoucher = ({ onClose, voucherCode, vouchers, handleVoucherCodeSearch, appliedVoucher, voucherCodeSearch, handleVoucherSelectSubmit }:any) => {

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-2xl font-bold">All Vouchers</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <IoMdClose size={24} />
        </button>
      </div>

      <div className="flex w-full mt-5 mb-5">
        <input
          type="text"
          placeholder="Enter voucher code"
          className="flex-grow p-3 border-2 border-black border-dashed focus:outline-none focus:ring-0"
          value={voucherCode}
          onChange={handleVoucherCodeSearch}
        />
        <button className="px-4 py-3 text-white transition-colors bg-black hover:bg-gray-800">
          Check
        </button>
      </div>

      <div className="w-full space-y-6">
        {
          vouchers?.filter(item => item?.voucher_code?.toLowerCase().includes(voucherCodeSearch?.toLowerCase()))?.map((voucher, index) => (
            <div key={index} className="flex flex-col items-start justify-center w-full">
              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex items-center justify-center gap-10">
                  <div className="px-5 py-3 font-medium text-green-800 bg-green-200 border-2 border-gray-400 border-dashed">
                    <h1 className="font-bold text-black">{voucher.code}</h1>
                  </div>
                  <span className="font-bold text-[15px]">Save {voucher.savings}</span>
                </div>
                <div className="flex items-center">
                  {voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code ? (
                    <span className="text-gray-500 text-[20px] font-bold ">Applied</span>
                  ) : (
                    <button
                      type="button"
                      className="text-green-600 hover:text-green-700 text-[20px] font-bold"
                      onClick={handleVoucherSelectSubmit}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
              <p className="text-[12px] w-[93%] text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor. sit amet, consectetur.
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AvailableVoucher;
