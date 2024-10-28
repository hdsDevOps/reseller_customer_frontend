import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiLockKeyFill } from "react-icons/pi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import VoucherCodeInput from "./VoucherCodeInput";
import AvailableVoucher from "./AvailableVoucher"
import { Link } from "react-router-dom";
const DomainSummary = () => {
  const [showVoucherInput, setShowVoucherInput] = useState(false);
  const [showAvailableVoucher, setShowAvailableVoucher] = useState(false);

  return (
    <div className="relative">
      {showAvailableVoucher ? (
        <div className="absolute inset-0 z-10 bg-white">
          <AvailableVoucher onClose={() => setShowAvailableVoucher(false)} />
        </div>
      ) : (
        <div className="bg-white">
          <h2 className="text-[27px] text-black font-bold">Summary</h2>

          <div className="flex items-start justify-between mt-5">
            <div>
              <h5 className="text-[25px] font-bold">
                Domain.co.in <sup className="text-[15px] font-light">(Domain)</sup>
              </h5>
              <p className="text-[11px] font-extralight text-gray-400">
                1 year commitment
              </p>
            </div>
            <p className="text-[26px] font-medium">₹ 648.00</p>
          </div>

          <div className="flex items-start justify-between mt-4 text-start">
            <div>
              <a
                href="#"
                className="text-[rgb(22,163,74)] text-[18px] underline font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  setShowVoucherInput(!showVoucherInput);
                }}
              >
                Have a voucher code?
              </a>
              {showVoucherInput && <VoucherCodeInput onClose={() => setShowVoucherInput(false)} />}
            </div>
            <button
              className="ml-4 text-xs text-gray-500 rounded-[6px] px-3 py-2 bg-green-100"
              onClick={() => setShowAvailableVoucher(true)}
            >
              Available vouchers
            </button>
          </div>

          {/* Rest of the DomainSummary content */}
          <div className="mt-16 flex justify-between text-[18px] font-bold">
            <p>Subtotal</p>
            <p>₹648.00</p>
          </div>

          <div className="mt-3 flex justify-between items-center text-[16px]">
            <p className="flex items-center">
              Tax (8.25%)
              <IoInformationCircleOutline className="text-greenbase text-[23px]" />
            </p>
            <p>₹ 53.46</p>
          </div>

          <div className="mt-6 border-t border-gray-300"></div>

          <div className="flex justify-between mt-4 text-xl font-bold">
            <p>Total</p>
            <p>₹ 701.46</p>
          </div>
          <Link to="/Review">
          <button className="flex items-center justify-center w-full gap-3 py-3 mt-6 font-semibold text-center text-white bg-green-600 rounded-md">
            <PiLockKeyFill className="text-[20px]" /> Submit Purchase
          </button>
          </Link>

          <div className="flex items-center justify-center w-full gap-1 mt-8 font-bold">
            <AiFillSafetyCertificate className="text-[30px]" />
            <h5 className="text-[22px]">Safe & Secure Payment</h5>
          </div>
          <div className="w-[100%] flex items-center justify-center text-center mt-3">
            <p className="w-[65%] text-gray-400 text-[15px]">
              By purchasing, you accept the <span className="font-bold text-green-600">Customer Agreement</span> and
              acknowledge reading the <span className="font-bold text-green-600">Privacy Policy</span>. You also
              agree to Auto renewal of your yearly subscription for ₹467.64, which
              can be disabled at any time through your account. Your card details
              will be saved for future purchases and subscription renewals.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainSummary;