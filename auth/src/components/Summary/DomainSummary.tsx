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
import { addEmailsWithoutLoginThunk, addNewDomainWithoutLoginThunk, addSubscriptionWithoutLoginThunk, getPromotionListThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, setUserAuthTokenToLSThunk, setUserIdToLSThunk, udpateBusinessDataThunk } from "store/user.thunk";
import { format } from "date-fns";
import { currencyList } from "../CurrencyList";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import CustomerAgreement from "../CustomerAgreement";
import PrivacyPolicy from "../PrivacyPolicy";

interface AppliedVoucher {
  code: string;
  discount_rate: Number;
};

interface Voucher {
  voucher: AppliedVoucher;
};

const logoImage = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo-2.png?alt=media&token=9315e750-1f5d-4032-ba46-1aeafa340a75';
const logoImageSmall = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899';

const testingVouchers = [
  { code: "HORD6290", discount_rate: 7.60 },
  { code: "HORD6291", discount_rate: 8.60 },
  { code: "HORD6292", discount_rate: 9.60 },
  { code: "HORD6293", discount_rate: 10.60 },
];

const DomainSummary = ({state, plan}:any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  // console.log("plan...", plan);
  console.log("state...", state);

  const [showVoucherInput, setShowVoucherInput] = useState(false);
  const [showAvailableVoucher, setShowAvailableVoucher] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  console.log("applied voucher...", appliedVoucher);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log("total price...", totalPrice);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0.00);
  const [taxAmount, setTaxAmount] = useState(8.25);
  const [taxedPrice, setTaxedPrice] = useState(0.00);
  const [discountedPrice, setDiscountedPrice] = useState(0.00);
  const [preDiscountedPrice, setPreDiscountedPrice] = useState(0.00);
  // console.log({totalPrice, finalTotalPrice, taxAmount, taxedPrice, discountedPrice});
  // console.log({preDiscountedPrice});
  const [vouchers, setVouchers] = useState([]);
  // console.log("vouchers...", vouchers);
  const [voucherCodeSearch, setVoucherCodeSearch] = useState("");
  const [filteredVouchers, setFilteredVouchers] = useState([...vouchers]);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState("");

  const handleLegalModalClose = () => {
    setIsLegalModalOpen(false);
    setLegalModalType("");
  };

  useEffect(() => {
    const filtered = vouchers?.filter((voucher) =>
      voucher?.discount?.some((discount) => 
        discount?.currency_code === defaultCurrencySlice
      )
    );
    setFilteredVouchers([...filtered]);
  }, [vouchers, defaultCurrencySlice]);

  const getDiscountPrecent = (data) => {
    return data?.find(item => item?.currency_code === defaultCurrencySlice)?.amount;
  }

  const [taxHover, setTaxHover] = useState(false);
  const [voucherHover, setVoucherHover] = useState(false);
  
  const [today, setToday] = useState("");
  const [domainExpiryDate, setDomainExpiryDate] = useState("");
  const [planExpiryDate, setPlanExpiryDate] = useState("");

  const [domainPrice, setDomainPrice] = useState(0);

  useEffect(() => {
    setDomainPrice(state?.selectedDomain?.price[defaultCurrencySlice]);
  }, [defaultCurrencySlice, state]);
  
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

  const getPromotionList = async() => {
    try {
      const result = await dispatch(getPromotionListThunk({promotion_id: ""})).unwrap();
      setVouchers(result);
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    getPromotionList();
  }, []);

  useEffect(() => {
    if(state?.selectedDomain?.domain !== "") {
      const total = domainPrice;
      setTotalPrice(parseFloat(total.toFixed(2)));
      setTaxedPrice(parseFloat(((total * taxAmount) / 100).toFixed(2)));
      const discountedPercent = appliedVoucher === null
        ? 0.00
        : parseFloat(getDiscountPrecent(appliedVoucher?.voucher?.discount));
      const totalOutPrice = parseFloat((total + ((total * taxAmount) / 100)).toFixed(2));
      const discountedAMount = parseFloat(((totalOutPrice * discountedPercent) / 100).toFixed(2));
      setDiscountedPrice(discountedAMount);

      const preDiscountedPercent = selectedVoucher === null
        ? 0.00
        : parseFloat(getDiscountPrecent(selectedVoucher?.voucher?.discount));
      const preTotalOutPrice = parseFloat((total + ((total * taxAmount) / 100)).toFixed(2));
      const preDiscountedAMount = parseFloat(((preTotalOutPrice * preDiscountedPercent) / 100).toFixed(2));
      setPreDiscountedPrice(preDiscountedAMount);

      const finalDiscountedPrice = parseFloat((totalOutPrice - discountedAMount).toFixed(2));
      setFinalTotalPrice(finalDiscountedPrice);
    } else {
      setTotalPrice(0);
    }
  }, [appliedVoucher, selectedVoucher, domainPrice]);

  const handleVoucherInputSubmit = (e) => {
    e.preventDefault();
    const voucherFind = vouchers?.find(item => item?.code?.toLowerCase() === voucherCode?.toLowerCase());
    if(voucherFind){
      setSelectedVoucher({voucher: voucherFind});
      setShowVoucherInput(false);
    } else {
      toast.error(`No voucher found with voucher code: ${voucherCode}`);
    }
  };

  const handleApplyClick = () => {
    setAppliedVoucher(selectedVoucher);
  };

  const handleSubmitPurchase = async(e) => {
    e.preventDefault();
    navigate('/Review', {state: {customer_id: state.customer_id, formData: state.formData, license_usage: state.license_usage, plan: state.plan, period: state.period, selectedDomain: state.selectedDomain, token: state.token, emailData: state.emailData, from: state.from, price: totalPrice, discountedPrice: discountedPrice, taxedPrice: taxedPrice, finalTotalPrice: finalTotalPrice, currency: defaultCurrencySlice, voucher: appliedVoucher,  }});
  };

  const handleFilterCheckVoucher = (e) => {
    e.preventDefault();
    const voucherFilterList = vouchers?.filter(item => item?.code?.toLowerCase() === voucherCodeSearch?.toLowerCase());
    setFilteredVouchers(voucherFilterList);
  };

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
              <button
                className="px-4 py-3 text-white transition-colors bg-black hover:bg-gray-800"
                type="button"
                onClick={(e) => {handleFilterCheckVoucher(e)}}
              >
                Check
              </button>
            </div>
      
            <div className="w-full space-y-6">
              {
                vouchers?.length > 0
                ? filteredVouchers?.map((voucher, index) => (
                  <div key={index} className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="flex items-center justify-center gap-10">
                        <div className="px-5 py-3 font-medium text-green-800 bg-green-200 border-2 border-gray-400 border-dashed">
                          <h1 className="font-bold text-black">{voucher?.code}</h1>
                        </div>
                        <span className="font-bold text-[15px]">Save {getDiscountPrecent(voucher?.discount)}%</span>
                      </div>
                      <div className="flex items-center">
                        {voucher?.code === appliedVoucher?.voucher?.code && selectedVoucher?.voucher?.code === appliedVoucher?.voucher?.code ? (
                          <span className="text-gray-500 text-[20px] font-bold ">Applied</span>
                        ) : (
                          <button
                            type="button"
                            className="text-green-600 hover:text-green-700 text-[20px] font-bold"
                            onClick={e => {
                              e.preventDefault();
                              setSelectedVoucher({voucher: voucher});
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
                )) : (
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
                {state?.selectedDomain?.domain} <span className="text-[15px] font-light items-center">(Domain)</span>
              </h5>
              <p className="text-[11px] font-extralight text-gray-400">
                1 year commitment
              </p>
            </div>
            <p className="text-[26px] font-medium">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{domainPrice}</p>
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
            </div>
            <button
              className="ml-4 text-xs text-gray-500 rounded-[6px] px-3 py-2 bg-green-100 summary-domain-details-items"
              onClick={() => setShowAvailableVoucher(true)}
            >
              Available vouchers
            </button>
          </div>
          {showVoucherInput && <VoucherCodeInput onClose={() => setShowVoucherInput(false)} handleSubmit={handleVoucherInputSubmit} handleVoucherCodeChange={e => setVoucherCode(e.target.value)} voucherCode={voucherCode} />}

          {selectedVoucher && (
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
                  {selectedVoucher?.voucher?.code}
                </div>
                <p className="text-green-500">
                  {selectedVoucher?.voucher?.code === appliedVoucher?.voucher?.code ? `Saved ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${discountedPrice}` : `You will save ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${preDiscountedPrice}`}!
                </p>
              </div>
              <p
                className={`font-bold text-xl cursor-pointer ${
                  selectedVoucher?.voucher?.code === appliedVoucher?.voucher?.code ? "text-gray-500" : "text-green-500"
                }`}
                onClick={selectedVoucher?.voucher?.code !== appliedVoucher?.voucher?.code ? handleApplyClick : undefined} 
              >
                {selectedVoucher?.voucher?.code === appliedVoucher?.voucher?.code ? "Applied" : "Apply"}
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
              <IoInformationCircleOutline className="relative text-greenbase text-[23px] ml-1" onMouseOver={() => setTaxHover(true)} onMouseLeave={() => {setTaxHover(false)}} />
              {
                taxHover && (
                  <div onMouseOver={() => setTaxHover(true)} onMouseLeave={() => {setTaxHover(false)}} className="absolute flex flex-col">
                    <p className="font-inter font-medium text-base text-white bg-[#12A833] p-2 rounded-[10px] -mt-[120px] w-full max-w-[200px] z-10">Sales tax is calculated according to your billing address.</p>
                    <div className="w-7 h-7 bg-[#12A833] rotate-45 -mt-4 mx-auto"></div>
                  </div>
                )
              }
            </p>
            <p>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{taxedPrice}</p>
          </div>

          {
            appliedVoucher && (
              <div className="mt-3 flex justify-between items-center text-[16px]">
                <p className="flex items-center">
                  Voucher Discount
                  <IoInformationCircleOutline className="relative text-greenbase text-[23px] ml-1" onMouseOver={() => setVoucherHover(true)} onMouseLeave={() => {setVoucherHover(false)}} />
                  {
                    voucherHover && (
                      <div onMouseOver={() => setVoucherHover(true)} onMouseLeave={() => {setVoucherHover(false)}} className="absolute flex flex-col ml-10">
                        <p className="font-inter font-medium text-base text-white bg-[#12A833] p-2 rounded-[10px] -mt-[145px] w-full max-w-[200px] z-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis semper dolor. </p>
                        <div className="w-7 h-7 bg-[#12A833] rotate-45 -mt-4 mx-auto"></div>
                      </div>
                    )
                  }
                </p>
                <p>-{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{discountedPrice}</p>
              </div>
            )
          }

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
              By purchasing, you accept the{" "}
              <span className="text-green-500" onClick={() => {
                setIsLegalModalOpen(true);
                setLegalModalType("agreement");
              }}>Customer Agreement</span>{" "}
              and acknowledge reading the{" "}
              <span className="text-green-500" onClick={() => {
                setIsLegalModalOpen(true);
                setLegalModalType("privacy");
              }}>Privacy Policy.</span>{" "}
              You also agree to Auto renewal of your yearly subscription
              for, which can be disabled at any time through
              your account. Your card details will be saved for future
              purchases and subscription renewals.
            </p>
          </div>
        </div>
      )}
      

      {
        isLegalModalOpen && (
          <Dialog
            open={isLegalModalOpen}
            as="div"
            className="relative z-50 focus:outline-none"
            onClose={() => {
              setIsLegalModalOpen(false);
              setLegalModalType("");
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 w-screen overflow-y-auto">
              <div className="flex min-h-screen min-w-screen items-center justify-center">
                <DialogPanel
                  transition
                  className="h-screen w-screen overflow-y-auto bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >
                      <img
                        src={logoImage}
                        className="h-10 object-contain"
                        alt="logo"
                      />
                    </DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-black items-center'
                        onClick={() => {
                          setIsLegalModalOpen(false);
                          setLegalModalType("");
                        }}
                      ><RiCloseFill className="w-6 h-6" /></button>
                    </div>
                  </div>
                  {
                    legalModalType === "agreement"
                    ? <CustomerAgreement />
                    : legalModalType === "privacy"
                    ? <PrivacyPolicy />
                    : ''
                  }
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }
    </div>
  );
};

export default DomainSummary;