import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiLockKeyFill } from "react-icons/pi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import VoucherCodeInput from "./VoucherCodeInput";
import AvailableVoucher from "./AvailableVoucher"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addEmailsWithoutLoginThunk, addNewDomainWithoutLoginThunk, addSubscriptionWithoutLoginThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, setUserAuthTokenToLSThunk, setUserIdToLSThunk, udpateBusinessDataThunk } from "store/user.thunk";
import { format } from "date-fns";
import { currencyList } from "../CurrencyList";

interface AppliedVoucher {
  voucher_code: string;
  discount_rate: Number;
}

interface Voucher {
  voucher: AppliedVoucher;
}

const DomainSummary = ({state, plan}:any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  console.log("plan...", plan);

  const [showVoucherInput, setShowVoucherInput] = useState(false);
  const [showAvailableVoucher, setShowAvailableVoucher] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  // console.log("applied voucher...", appliedVoucher);
  const [selectedVoucher] = useState<Voucher | null>(null);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log("total price...", totalPrice);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0.00);
  const [taxAmount, setTaxAmount] = useState(8.25);
  const [taxedPrice, setTaxedPrice] = useState(0.00);
  const [discountedPrice, setDiscountedPrice] = useState(0.00);
  const [preDiscountedPrice, setPreDiscountedPrice] = useState(0.00);
  // console.log({totalPrice, finalTotalPrice, taxAmount, taxedPrice, discountedPrice});
  const vouchers = [
    { voucher_code: "HORD6290", discount_rate: 8.60 },
    { voucher_code: "HORD6291", discount_rate: 8.60 },
    { voucher_code: "HORD6292", discount_rate: 8.60 },
    { voucher_code: "HORD6293", discount_rate: 8.60 },
  ];
  const [voucherCodeSearch, setVoucherCodeSearch] = useState("");
  
  const [today, setToday] = useState("");
  const [domainExpiryDate, setDomainExpiryDate] = useState("");
  const [planExpiryDate, setPlanExpiryDate] = useState("");
  
  useEffect(() => {
    const dayToday = new Date();
    setToday(format(dayToday, "yyyy-MM-dd"));

    const trial = parseInt(state.plan.trial_period || 0);
    const planExpiryDateValue = new Date();
    planExpiryDateValue.setDate(dayToday.getDate() + trial);
    setPlanExpiryDate(format(planExpiryDateValue, "yyyy-MM-dd"));
    
    const domainExpiryDateValue = new Date();
    domainExpiryDateValue.setFullYear(dayToday.getFullYear() + 1);
    setDomainExpiryDate(format(domainExpiryDateValue, "yyyy-MM-dd"))
  }, []);
  
  const getLicenseAmount = (array, period) => {
    const priceArray = array?.find(item => item?.currency_code === defaultCurrencySlice)?.price;
    const amount = priceArray?.find(item => item?.type === period)?.discount_price;
    return amount;
  };

  useEffect(() => {
    if(state.selectedDomain !== "") {
      const total = 648.00;
      setTotalPrice(parseFloat(total.toFixed(2)));
      setTaxedPrice(parseFloat(((total * taxAmount) / 100).toFixed(2)));
      const discountedPercent = isVoucherApplied
        ? appliedVoucher === null
          ? 0.00
          : parseFloat(appliedVoucher?.voucher?.discount_rate?.toFixed(2))
        : 0.00;
      const totalOutPrice = parseFloat((total + ((total * taxAmount) / 100)).toFixed(2));
      const discountedAMount = parseFloat(((totalOutPrice * discountedPercent) / 100).toFixed(2));
      setDiscountedPrice(discountedAMount);

      const preDiscountedPercent = appliedVoucher === null
        ? 0.00
        : parseFloat(appliedVoucher?.voucher?.discount_rate?.toFixed(2));
      const preTotalOutPrice = parseFloat((total + ((total * taxAmount) / 100)).toFixed(2));
      const preDiscountedAMount = parseFloat(((preTotalOutPrice * preDiscountedPercent) / 100).toFixed(2));
      setPreDiscountedPrice(preDiscountedAMount);

      const finalDiscountedPrice = parseFloat((totalOutPrice - discountedAMount).toFixed(2));
      setFinalTotalPrice(finalDiscountedPrice);
    } else {
      setTotalPrice(0);
    }
  }, [isVoucherApplied, appliedVoucher]);

  const handleVoucherInputSubmit = (e) => {
    e.preventDefault();
    const voucherFind = vouchers?.find(item => item?.voucher_code?.toLowerCase() === voucherCode?.toLowerCase());
    if(voucherFind){
      setAppliedVoucher({voucher: voucherFind});
      setShowVoucherInput(false);
    } else {
      toast.error(`No voucher found with voucher code: ${voucherCode}`);
    }
  };

  const handleApplyClick = () => {
    setIsVoucherApplied(true);
  };

  const handleSubmitPurchase = async(e) => {
    e.preventDefault();
    navigate('/Review', {state: {customer_id: state.customer_id, formData: state.formData, license_usage: state.license_usage, plan: state.plan, period: state.period, selectedDomain: state.selectedDomain, token: state.token, emailData: state.emailData, from: state.from, price: finalTotalPrice, currency: defaultCurrencySlice}})
  }

  return (
    <div className="">
      {showAvailableVoucher ? (
        <div className="inset-0 z-10 bg-white">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-between w-full ">
              <h2 className="text-2xl font-bold">All Vouchers</h2>
              <button onClick={() => setShowAvailableVoucher(false)} className="text-gray-500 hover:text-gray-700">
                <IoMdClose size={24} />
              </button>
            </div>
      
            <div className="flex w-full mt-5 mb-5">
              <input
                type="text"
                placeholder="Enter voucher code"
                className="flex-grow p-3 border-2 border-black border-dashed focus:outline-none focus:ring-0"
                value={voucherCodeSearch}
                onChange={e => {setVoucherCodeSearch(e.target.value);}}
              />
              <button className="px-4 py-3 text-white transition-colors bg-black hover:bg-gray-800">
                Check
              </button>
            </div>
      
            <div className="w-full space-y-6">
              {
                vouchers?.filter(item => item?.voucher_code?.toLowerCase().includes(voucherCodeSearch?.toLowerCase()))?.length > 0
                ? vouchers?.filter(item => item?.voucher_code?.toLowerCase().includes(voucherCodeSearch?.toLowerCase()))?.map((voucher, index) => (
                  <div key={index} className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="flex items-center justify-center gap-10">
                        <div className="px-5 py-3 font-medium text-green-800 bg-green-200 border-2 border-gray-400 border-dashed">
                          <h1 className="font-bold text-black">{voucher?.voucher_code}</h1>
                        </div>
                        <span className="font-bold text-[15px]">Save {voucher?.discount_rate}%</span>
                      </div>
                      <div className="flex items-center">
                        {voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code && isVoucherApplied ? (
                          <span className="text-gray-500 text-[20px] font-bold ">Applied</span>
                        ) : (
                          <button
                            type="button"
                            className="text-green-600 hover:text-green-700 text-[20px] font-bold"
                            onClick={e => {
                              e.preventDefault();
                              setAppliedVoucher({voucher: voucher});
                              setShowAvailableVoucher(false);
                              setIsVoucherApplied(false);
                            }}
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
                : (
                  <p className="font-inter font-normal text-black text-base text-center">No Vouchers...</p>
                )
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white">
          <h2 className="text-[27px] text-black font-bold">Summary</h2>

          {/* plan details */}
          <div className="summary-domain-details items-start mt-5">
            <div className="flex flex-col">
              <h5 className="text-[25px] font-bold items-center">
                {state.plan.plan_name} <span className="text-[15px] font-light">(Google Workspace)</span>
              </h5>
              <p className="text-[11px] font-extralight text-gray-400">
                {state.license_usage} users, {
                  state.period === "Yearly Subscription with monthly billing" ? "Yearly Subscription with monthly billing" :
                  `${state.period} commitment`
                }
              </p>
            </div>
            <div className="flex">
              <p className="font-inter font-normal text-xs text-red-600 line-through text-nowrap flex items-center my-auto">
                <span className="font-inter font-normal text-xs text-red-600">{state.license_usage} x&nbsp;</span>
                {/* <span><RiCloseFill className="w-3 h-3 text-red-600" /></span> */}
                <span className="font-inter font-normal text-xs text-red-600">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}</span>
                <span className="font-inter font-normal text-xs text-red-600">{getLicenseAmount(plan?.amount_details, state.period)}</span>
              </p>
              <p className="text-[26px] font-medium ml-2">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}0.00</p>
            </div>
          </div>

          {/* domain details */}
          <div className="summary-domain-details items-start mt-5">
            <div>
              <h5 className="text-[25px] font-bold">
                {state.selectedDomain} <span className="text-[15px] font-light items-center">(Domain)</span>
              </h5>
              <p className="text-[11px] font-extralight text-gray-400">
                1 year commitment
              </p>
            </div>
            <p className="text-[26px] font-medium">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}648.00</p>
          </div>

          <div className="summary-domain-details items-start mt-4 text-start w-full">
            <div className="summary-domain-details-items">
              <button
                type="button"
                className="text-[rgb(22,163,74)] text-[18px] underline font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  setShowVoucherInput(!showVoucherInput);
                }}
              >
                Have a voucher code?
              </button>
              {showVoucherInput && <VoucherCodeInput onClose={() => setShowVoucherInput(false)} handleSubmit={handleVoucherInputSubmit} handleVoucherCodeChange={e => setVoucherCode(e.target.value)} voucherCode={voucherCode} />}
            </div>
            <button
              className="ml-4 text-xs text-gray-500 rounded-[6px] px-3 py-2 bg-green-100 summary-domain-details-items"
              onClick={() => setShowAvailableVoucher(true)}
            >
              Available vouchers
            </button>
          </div>

          {appliedVoucher && (
            <div className="bg-transparent border border-gray-500 rounded-md p-4 flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <div
                  className="px-6 rounded-sm text-xs"
                  style={{
                    border: "2px dashed gray",
                    backgroundColor: "#12A83333",
                    paddingTop: "0.65rem",
                    paddingBottom: "0.65rem",
                  }}
                >
                  {appliedVoucher?.voucher?.voucher_code}
                </div>
                <p className="text-green-500">
                  {isVoucherApplied ? `Saved ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${discountedPrice}` : `You will save ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${preDiscountedPrice}`}!
                </p>
              </div>
              <p
                className={`font-bold text-xl cursor-pointer ${
                  isVoucherApplied ? "text-gray-500" : "text-green-500"
                }`}
                onClick={!isVoucherApplied ? handleApplyClick : undefined} 
              >
                {isVoucherApplied ? "Applied" : "Apply"}
              </p>
            </div>
          )}

          {/* Rest of the DomainSummary content */}
          <div className="mt-16 flex justify-between text-[18px] font-bold">
            <p>Subtotal</p>
            <p>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{totalPrice}</p>
          </div>

          <div className="mt-3 flex justify-between items-center text-[16px]">
            <p className="flex items-center">
              Tax ({taxAmount}%)
              <IoInformationCircleOutline className="text-greenbase text-[23px]" />
            </p>
            <p>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{taxedPrice}</p>
          </div>

          <div className="mt-6 border-t border-gray-300"></div>

          <div className="flex justify-between mt-4 text-xl font-bold">
            <p>Total</p>
            <p>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{finalTotalPrice}</p>
          </div>
          <button
            className="flex items-center justify-center w-full gap-3 py-3 mt-6 font-semibold text-center text-white bg-green-600 rounded-md"
            type="button"
            onClick={(e) => {handleSubmitPurchase(e)}}
          >
            <PiLockKeyFill className="text-[20px]" /> Submit Purchase
          </button>

          <div className="flex items-center justify-center w-full gap-1 mt-8 font-bold">
            <AiFillSafetyCertificate className="text-[30px]" />
            <h5 className="text-[22px]">Safe & Secure Payment</h5>
          </div>
          <div className="w-[100%] flex items-center justify-center text-center mt-3">
            <p className="w-[65%] text-gray-400 text-[15px]">
              By purchasing, you accept the <span className="font-bold text-green-600">Customer Agreement</span> and
              acknowledge reading the <span className="font-bold text-green-600">Privacy Policy</span>. You also
              agree to Auto renewal of your yearly subscription, which
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