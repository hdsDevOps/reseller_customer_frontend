import React, { useEffect, useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import AddPayment from "./AddPaymentMethods";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addBillingHistoryThunk, deleteCardThunk, getProfileDataThunk, getVouchersListThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk, savedCardsListThunk, stripePayThunk, updateLicenseUsageThunk, useVoucherThunk } from "store/user.thunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setSaveCards, setUserDetails } from "store/authSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { currencyList } from "./CurrencyList";
import StripeCheckout from "react-stripe-checkout";
import { PaystackButton } from "react-paystack";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { format } from "date-fns";
import './licenseUsage.css';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  getDomainsList: () => void;
  selectedDomain: object|null;
  licenseRef: any;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose,getDomainsList, selectedDomain, licenseRef }) => {
  const navigate = useNavigate();
  const { userDetails, customerId, token, saveCardsState, paymentMethodsState, defaultCurrencySlice } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [numUsers, setNumUsers] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [subtotal, setSubtotal] = useState(0);
  const taxRate = 0.0825;
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0.00);
  const [discountRate, setDiscountRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [preDiscountRate, setPreDiscountRate] = useState(0);
  const [preDiscountAmount, setPreDiscountAmount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<object|null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<object|null>(null);

  const [activeMethod, setActiveMethod] = useState("saved");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>("");
  // console.log("selectedPaymentMethod...", selectedPaymentMethod);
  const [selectedCard, setSelectedCard] = useState<string | null>("");
  const [activeSubscriptionPlan, setActiveSubscriptionPlan] = useState({});
  // console.log(activeSubscriptionPlan);
  // console.log(userDetails);
  const [licensePrice, setLicensePrice] = useState(0);
  // console.log(licensePrice);
  // console.log({numUsers, licensePrice, subtotal, tax, total, preDiscountRate, preDiscountAmount, discountRate, discountAmount,});
  const [vouchers, setVouchers] = useState([]);
  const [voucherInputOpen, setVoucherInputOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  
  const [todayDate, setTodayDate] = useState("");
  const [domainExpiryDate, setDomainExpiryDate] = useState("");
  const [planExpiryDate, setPlanExpiryDate] = useState("");
  const [licenseHover, setLicenseHover] = useState(false);
  const [taxHover, setTaxHover] = useState(false);

  const dateFormat = (date) => {
    const miliseconds = parseInt(date?._seconds) * 1000 + parseInt(date?._nanoseconds) / 1e6;
    const foundDate =  new Date(miliseconds);
    const today = new Date(Date.now());
    if(foundDate > today) {
      return true;
    } else {
      return false;
    }
  };

  const dateFormat2 = (date) => {
    const miliseconds = parseInt(date?._seconds) * 1000 + parseInt(date?._nanoseconds) / 1e6;
    const foundDate =  new Date(miliseconds);
    console.log(foundDate)
    if(foundDate == "Invalid Date") {
      return "Invalid Date";
    } else {
      return format(foundDate, "yyyy-MM-dd");
    }
  };

  useEffect(() => {
    const dayToday = new Date();
    setTodayDate(format(dayToday, "yyyy-MM-dd"));

    setPlanExpiryDate(dateFormat2(userDetails?.workspace?.next_payment));
  }, [userDetails])

  useEffect(() => {
    if(paymentMethodsState?.length > 0) {
      const defaultPayment = paymentMethodsState?.find(method => method?.deafult);
      if(defaultPayment) {
        setSelectedPaymentMethod(defaultPayment?.method_name);
      } else {
        setSelectedPaymentMethod("");
      }
    } else {
      setSelectedPaymentMethod("");
    }
  }, [paymentMethodsState]);

  const getVouchersList = async() => {
    try {
      const result = await dispatch(getVouchersListThunk({customer_id: customerId})).unwrap();
      const list = [...result?.joinedData];
      const filteredList = list?.filter(item => dateFormat(item?.used_date));
      if(filteredList){
        setVouchers(filteredList);
      } else {
        setVouchers([]);
      }
    } catch (error) {
      setVouchers([]);
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    getVouchersList();
  }, [customerId]);

  const handleApplyClick = () => {
    setAppliedVoucher(selectedVoucher);
    setVoucherInputOpen(false);
  };

  const handleSearchVoucher = () => {
    if(vouchers?.length > 0) {
      const foundVoucher = vouchers?.find(item => item?.voucher?.voucher_code?.toLowerCase()?.includes(voucherCode?.toLowerCase()));
      if(foundVoucher) {
        setSelectedVoucher(foundVoucher);
      } else {
        setSelectedVoucher(null);
        toast.warning(`No voucher found with code ${voucherCode}`);
      }
    } else {
      setSelectedVoucher(null);
      toast.warning(`No voucher found with code ${voucherCode}`);
    }
  };

  const getCurrencyValue = () => {
    if(activeSubscriptionPlan?.amount_details?.length > 0) {
      const amounts = activeSubscriptionPlan?.amount_details;
      const amountData = amounts?.find(item => item?.currency_code === defaultCurrencySlice);
      if(amountData) {
        if(userDetails?.workspace?.payment_cycle) {
          const price = amountData?.price?.find(item => item?.type?.toLowerCase() === userDetails?.workspace?.payment_cycle?.toLowerCase());
          setLicensePrice(Number(price?.discount_price));
        } else {
          setLicensePrice(0);
        }
      } else {
        setLicensePrice(0);
      }
    }
  };

  useEffect(() => {
    getCurrencyValue();
  }, [activeSubscriptionPlan, userDetails, defaultCurrencySlice]);

  useEffect(() => {
    const getPlansAndPricesList = async(id:string) => {
      try {
        const result = await dispatch(plansAndPricesListThunk({subscription_id: id})).unwrap();
        setActiveSubscriptionPlan(result?.data[0]);
      } catch (error) {
        setActiveSubscriptionPlan({});
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }
    if(userDetails?.workspace?.plan_name_id){
      getPlansAndPricesList(userDetails?.workspace?.plan_name_id);
    } else {
      setActiveSubscriptionPlan({});
    }
  }, [userDetails]);

  useEffect(() => {
    const defaultCard = saveCardsState?.find(card => card?.is_default);
    if(defaultCard) {
      setSelectedCard(defaultCard?.uuid)
    } else {
      setSelectedCard("");
    }
  }, [saveCardsState]);

  useEffect(() => {
    const defaultPayment = paymentMethodsState?.find(method => method?.default);
    if(defaultPayment) {
      setSelectedPaymentMethod(defaultPayment?.method_name);
    } else {
      setSelectedPaymentMethod("");
    }
  }, [paymentMethodsState]);

  useEffect(() => {
    if(userDetails?.workspace?.workspace_status === "trial") {
      setSubtotal(0);
    } else {
      const sub_total = numUsers*licensePrice;
      setSubtotal(sub_total);
    }
  }, [numUsers, licensePrice, userDetails]);

  useEffect(() => {
    const tax_amount = subtotal * taxRate;
    setTax(tax_amount);
  }, [subtotal, taxRate]);

  useEffect(() => {
    const pre_discount_amount = (subtotal * preDiscountRate)/100;
    setPreDiscountAmount(pre_discount_amount);
  }, [subtotal, preDiscountRate]);

  useEffect(() => {
    const discount_amount = (subtotal * discountRate)/100;
    setDiscountAmount(discount_amount);
  }, [subtotal, discountRate]);

  useEffect(() => {
    const total_amount = subtotal + tax - discountAmount;
    setTotal(total_amount);
  }, [subtotal, tax, discountAmount]);

  useEffect(() => {
    if(selectedVoucher?.voucher?.discount_rate) {
      setPreDiscountRate(Number(selectedVoucher?.voucher?.discount_rate));
    } else {
      setPreDiscountRate(0);
    }
  }, [selectedVoucher]);

  useEffect(() => {
    if(appliedVoucher?.voucher?.discount_rate) {
      setDiscountRate(Number(appliedVoucher?.voucher?.discount_rate));
    } else {
      setDiscountRate(0);
    }
  }, [appliedVoucher]);

  const useVoucher = async() => {
    if(appliedVoucher) {
      try {
        const result = await dispatch(useVoucherThunk({record_id: appliedVoucher?.id})).unwrap();
        console.log("result...", result);
      } catch (error) {
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }
  };

  if (!isOpen) return null;

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentMethodChange2 = (uuid: string) => {
    setSelectedCard(uuid);
  };

  const getProfileData = async() => {
    if(token) {
      try {
        const result = await dispatch(getProfileDataThunk({user_id: customerId})).unwrap();
        await dispatch(setUserDetails(result?.customerData));
      } catch (error) {
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }
  };
  
  const changeLicenseUsage = async() => {
    try {
      if(numUsers > 0) {
        const originalLicense = parseInt(userDetails?.license_usage);
        const updatedLicense = originalLicense + numUsers;
        const result = await dispatch(updateLicenseUsageThunk({
          user_id: customerId,
          license_usage: updatedLicense
        })).unwrap();
        // console.log("result...", result);
        await useVoucher();
        setAppliedVoucher(null);
        setSelectedVoucher(null);
        setSubtotal(0);
        setNumUsers(0);
        toast.success(result?.message);
        onclose;
      } else {
        toast.warning("Number of user cannot be 0");
      }
    } catch (error) {
      onclose;
      toast.error("Error updating License Usage");
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getDomainsList();
      getProfileData();
      getVouchersList();
    }
  };

  const handleBuyLicenseUsage = e => {
    const count = Number(e.target.value);
    count < 0
    ? setNumUsers(0)
    : userDetails?.workspace?.workspace_status === "trial" 
      ? count + parseInt(userDetails?.license_usage) <= 10
        ? setNumUsers(count)
        : setNumUsers(10 - parseInt(userDetails?.license_usage))
      : setNumUsers(count);
  };

  function hideCardNumber(cardNumber) {
    const cardStr = String(cardNumber);
    const hiddenCard = cardStr.replace(/^(\d{8})/, "**** **** ");
    return hiddenCard;
  };

  const getCardsList = async() => {
    try {
      const result = await dispatch(savedCardsListThunk({user_id: customerId})).unwrap();
      await dispatch(setSaveCards(result?.cards));
    } catch (error) {
      //
    }
  };

  const deleteCard = async(id) => {
    try {
      const result = await dispatch(deleteCardThunk({user_id: customerId, rec_id: id})).unwrap();
      toast.success(result?.message);
    } catch (error) {
      toast.error("Error deleting card");
    } finally {
      getCardsList();
    }
  };

  const addBillingHistory = async(paymentResult, madePaymentMethod) => {
    try {
      await dispatch(addBillingHistoryThunk({
        user_id: customerId,
        transaction_id: `${
          madePaymentMethod === "Stripe"
          ? paymentResult?.balance_transaction
          : madePaymentMethod === "paystack"
          ? paymentResult?.transaction
          : ""
        }`,
        date: todayDate,
        invoice: `${
          madePaymentMethod === "Stripe"
          ? paymentResult?.payment_method_details?.card?.network_transaction_id
          : madePaymentMethod === "paystack"
          ? paymentResult?.reference
          : ""
        }`,
        customer_name: `${userDetails?.first_name} ${userDetails?.last_name}`,
        product_type: "user license",
        description: "purchase user license",
        domain: selectedDomain?.domain_name,
        payment_method: madePaymentMethod,
        payment_status: "Success",
        amount: `${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${total}`,
        transaction_data: paymentResult
      }));
    } catch (error) {
      console.log("error");
    }
  };

  const makePayment = async(token) => {
    const body = {
      token,
      product: {
        name: `${userDetails?.first_name} ${userDetails?.last_name}`,
        price: total,
        productBy: "test",
        currency: defaultCurrencySlice,
        description: 'purchasing user license',
        domain: "",
        workspace: {
          plan: activeSubscriptionPlan,
          license_usage: numUsers,
          plan_period: userDetails?.workspace?.payment_cycle,
          trial_plan: userDetails?.workspace?.workspace_status === "trial" ? "yes" : "no"
        },
        customer_id: customerId,
        email: userDetails?.email,
        voucher: appliedVoucher?.id
      }
    };
    const headers={
      "Content-Type":"application/json"
    };
    try {
      const result = await dispatch(stripePayThunk(body)).unwrap();
      console.log("result...", result);
      if(result?.message === "Payment successful") {
        setTimeout(() => {
          // navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: result?.charge}});
          addBillingHistory(result?.charge, "Stripe");
          changeLicenseUsage();
          onClose();
        }, 3000);
      } else {
        toast.error("Error on payment method");
      }
    } catch (error) {
      toast.error("Error on payment method");
    }
  };

  const payStackConfig = {
    reference: (new Date()).getTime().toString(),
    email: userDetails?.email,
    amount: total * 100,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: userDetails?.first_name,
    lastName: userDetails?.last_name,
    channels: ['card']
  };
  
  const body = {
    reference: (new Date()).getTime().toString(),
    email: userDetails?.email,
    amount: total * 100,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: userDetails?.first_name,
    lastName: userDetails?.last_name,
    name: `${userDetails?.first_name} ${userDetails?.last_name}`,
    description: 'purchasing user license',
    domain: "",
    workspace: {
      plan: activeSubscriptionPlan,
      license_usage: numUsers,
      plan_period: userDetails?.workspace?.payment_cycle,
      trial_plan: userDetails?.workspace?.workspace_status === "trial" ? "yes" : "no" 
    },
    customer_id: customerId,
    voucher: appliedVoucher?.id
  };

  const handlePaystackSuccessAction = async(reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    const response = await fetch('https://api.customer.gworkspace.withhordanso.com/paymentservices/payments/api/v1/make_paystack_payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const responseData = await response;
    if (responseData.status) {
      // console.log(reference);
      setTimeout(() => {
        // navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: reference}})
        changeLicenseUsage();
        addBillingHistory(reference, "paystack");
        onClose();
      }, 3000);
    } else {
      toast.error("Error on payment method");
    }
  };
  
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  };

  const componentProps = {
    ...payStackConfig,
    text: 'Submit',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full mx-2  max-h-[95vh] xl:max-h-full overflow-y-scroll" ref={licenseRef}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Add User License</h1>
          {/* <button className="flex items-center gap-1 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out py-2 px-4 rounded-lg text-xs sm:text-sm">
            Add to Cart <MdOutlineAddShoppingCart />
          </button> */}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-semibold">No. of additional user</p>
          <input
            type="number"
            value={numUsers}
            onChange={(e) => {handleBuyLicenseUsage(e)}}
            className="border-gray-300 border rounded p-2 w-16 text-center bg-white outline-none focus:ring-1 focus:ring-green-300"
            placeholder="No."
          />
        </div>

        {showDetails && (
          <>
            <div className="border-y border-gray-300 py-2 my-6">
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1 relative">
                  <p>
                    {numUsers + parseInt(userDetails?.license_usage)} users, Year subscription (price adjusted to current cycle)
                  </p>
                  <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold mr-1 cursor-pointer" onMouseOver={() => {setLicenseHover(true)}} onMouseLeave={() => {setLicenseHover(false)}}>
                    i
                  </span>
                  {
                    licenseHover && (
                      <div className="license-usage">
                        <p className="bg-[#12A83330] px-4 py-3 w-full font-inter font-medium text-[10px] text-black rounded-md">The price shown is prorated according to the time left in your current billing cycle.</p>
                      </div>
                    )
                  }
                </div>
                <span className="flex items-center font-semibold">
                  {
                    userDetails?.workspace?.workspace_status === "trial"
                    ? (
                      <p className="flex items-center content-center">
                        <p className="font-inter font-normal text-xs text-red-600 line-through text-nowrap flex items-center">
                          <span className="font-inter font-normal text-xs text-red-600">{numUsers} x&nbsp;</span>
                          {/* <span><RiCloseFill className="w-3 h-3 text-red-600" /></span> */}
                          <span className="font-inter font-normal text-xs text-red-600">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}</span>
                          <span className="font-inter font-normal text-xs text-red-600">{licensePrice?.toFixed(2)}</span>
                        </p>
                        {/* <p className="line-through inline-block">
                          <span className="inline-block">{numUsers}</span>
                          <span className="inline-block"><X className="text-black w-3 h-3" /></span>
                          <span className="inline-block">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{licensePrice?.toFixed(2)}</span>
                        </p> */}
                        <span className="mx-1 inline-block pt-[2px]">=</span>
                        <span className="inline-block pt-[2px]">0</span>
                      </p>
                    ) : (
                      <p className="inline-block">
                        <p className="inline-block">
                          <span className="inline-block">{numUsers}</span>
                          <X className="text-black w-3 h-3 inline-block" />
                          <span className="inline-block">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{licensePrice?.toFixed(2)}</span>
                        </p>
                        <span className="mx-1 inline-block">=</span>
                        <span className="inline-block">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{numUsers*licensePrice}</span>
                      </p>
                    )
                  }
                </span>
              </div>
              <p className="underline mb-4 font-semibold mt-2 cursor-pointer" onClick={() => {setVoucherInputOpen(true)}}>Enter voucher code</p>

              {
                voucherInputOpen && (
                  <div className="flex items-center justify-center w-full mt-7">
                    <input
                      type="text"
                      placeholder="Enter voucher code"
                      className="flex-grow p-3 border-2 border-black border-dashed focus:outline-none focus:ring-0"
                      value={voucherCode}
                      onChange={(e) => {setVoucherCode(e.target.value)}}
                    />
                    <button
                      className="px-4 py-3 text-white transition-colors bg-black hover:bg-gray-800"
                      type="button"
                      onClick={() => handleSearchVoucher()}
                    >
                      Check
                    </button>
                    <button className="w-6 h-6 my-auto" onClick={() => {
                      setVoucherInputOpen(false);
                      setVoucherCode("");
                    }}>
                      <X className="w-full h-full"/>
                    </button>
                  </div>
                )
              }
              
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
                      {selectedVoucher?.voucher?.voucher_code}
                    </div>
                    <p className="text-green-500">
                      {selectedVoucher?.voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code ? `Saved ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${discountAmount?.toFixed(2)}` : `You will save ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${preDiscountAmount?.toFixed(2)}`}!
                    </p>
                  </div>
                  <p
                    className={`font-bold text-xl cursor-pointer ${
                      selectedVoucher?.voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code ? "text-gray-500" : "text-green-500"
                    }`}
                    onClick={selectedVoucher?.voucher?.voucher_code !== appliedVoucher?.voucher?.voucher_code ? handleApplyClick : undefined} 
                  >
                    {selectedVoucher?.voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code ? "Applied" : "Apply"}
                  </p>
                </div>
              )}
            </div>

            <div className="border-b border-gray-300 py-2 mb-4">
              <div className="flex justify-between font-semibold mb-3">
                <span>Subtotal</span>
                <span>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center relative">
                  Tax (8.25%)
                  <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold mx-1 cursor-pointer" onMouseOver={() => {setTaxHover(true)}} onMouseLeave={() => {setTaxHover(false)}}>
                    i
                  </span>
                  {
                    taxHover && (
                      <div className="tax-hover">
                        <p className="bg-[#12A83330] px-4 py-3 w-full font-inter font-medium text-[10px] text-black rounded-md">Sales tax is calculated according to your billing address.</p>
                      </div>
                    )
                  }
                </div>
                <span className="gap-2">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{tax.toFixed(2)}</span>
              </div>
              {
                appliedVoucher && (
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      Voucher discount
                      <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold ml-1">
                        i
                      </span>
                    </div>
                    <span className="gap-2">{discountAmount > 0 ? "-" : ""}{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{discountAmount.toFixed(2)}</span>
                  </div>
                )
              }
            </div>
          </>
        )}

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
            <span>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{total.toFixed(2)}</span>
          </div>
        </div>

        {
          userDetails?.workspace?.workspace_status === "trial"
          ? (<></>) : (
            <div className="flex justify-between max-w-md w-full text-xs sm:text-sm md:text-md">
              <button
                className={`flex-1 py-2 px-1 text-center rounded-l-md ${activeMethod === "saved" ? "bg-white text-green-500 shadow-sm" : "bg-white text-gray-800"}`}
                type="button"
                onClick={() => setActiveMethod("saved")}
              >
                Saved Payment Method
              </button>
              <button
                className={`flex-1 py-2 px-1 text-center rounded-r-md ${activeMethod === "other" ? "bg-white text-green-500 shadow-sm" : "bg-white text-gray-800"}`}
                type="button"
                onClick={() => setActiveMethod("other")}
              >
                Other Payment Methods
              </button>
            </div>
          )
        }
  
        {
          userDetails?.workspace?.workspace_status === "trial"
          ? (
            <></>
          ) : (
            <div className="rounded-b-lg rounded-tr-lg border p-3">
              {activeMethod === "saved" && (
                <div className="border-2 border-green-500 p-4 rounded-lg my-4">
                  {
                    saveCardsState?.length > 0 ? saveCardsState?.map((card, index) => (
                      <div className="flex justify-between items-center mb-2" key={index}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="saved-method"
                            checked={activeMethod === "saved" && selectedCard === card?.uuid}
                            onChange={() => handlePaymentMethodChange2(card?.uuid)}
                            className="mr-2 radio radio-xs radio-success"
                            aria-labelledby="saved-method-label"
                            defaultChecked
                          />
                          <label id="saved-method-label" className="flex items-center">
                            <img
                              src="/images/stripe.webp"
                              alt="Stripe"
                              className="w-14 h-8 mr-6"
                            />
                            <div className="flex flex-col">
                              <small className="text-xs font-bold text-gray-700">{hideCardNumber(card?.card_id)}</small>
                              <small className="text-[10px] text-gray-300">Expiry: {card?.expiry_month}/{card?.expiry_year}</small>
                              <small className="text-[10px] flex items-center gap-1 text-gray-300">
                                {/* <MdOutlineMail /> billing@acme.corp */}
                                {card?.name}
                              </small>
                            </div>
                          </label>
                        </div>
                        {
                          card?.is_default && (
                            <button className="bg-green-500 text-white text-xs rounded-3xl px-4 py-1 mx-auto block">
                              Default
                            </button>
                          )
                        }
                        <RiDeleteBin6Line onClick={() => {deleteCard(card?.uuid)}} className="text-red-500 text-lg cursor-pointer" />
                      </div>
                    )) : (
                      <p className="text-center">No saved cards</p>
                    )
                  }
                </div>
              )}
      
              {activeMethod === "other" && (
                <div>
                  {
                    paymentMethodsState?.length > 0 && paymentMethodsState?.map((method, index) => (
                      <div className="flex items-center justify-between mb-2" key={index}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={method?.id}
                            name="payment-method"
                            checked={selectedPaymentMethod === method?.method_name} // Check if method is 'stripe'
                            onClick={() => {
                              setSelectedPaymentMethod(method?.method_name);
                              console.log(method?.method_name);
                            }}
                            className="mr-2 radio radio-xs radio-success"
                            title={method?.method_name}
                          />
                          <label htmlFor={method?.id} className="mr-2 capitalize">
                            {method?.method_name}
                          </label>
                        </div>
                        <div>
                          <img
                            src={method?.method_image}
                            alt={method?.method_name}
                            className="w-14 h-8 border-2 border-gray-200 shadow-sm p-1 rounded-md"
                          />
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
      
              {activeMethod === "saved" && (
                <p className="text-green-500 text-sm text-left mt-4 cursor-pointer" onClick={() => {setActiveMethod("other")}}>
                  Use another payment method
                </p>
              )}
            </div>
          )
        }

        <div className="flex justify-start gap-4 mt-4">
          {
            userDetails?.workspace?.workspace_status === "trial"
            ? (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                type="button"
                onClick={() => {changeLicenseUsage()}}
              >
                Submit
              </button>
            ) : selectedPaymentMethod?.toLowerCase() === "stripe"
            ? (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                type="button"
              >
                <StripeCheckout
                  name='Hordanso'
                  description="Purchasing google workspace and domain"
                  image="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899"
                  ComponentClass="div"
                  panelLabel="Submit"
                  // amount={data?.finalTotalPrice * 100}
                  // currency={defaultCurrencySlice}
                  stripeKey="pk_test_51HCGY4HJst0MFfZtYup1hAW3VcsAmcJJ4lwg9fDjPLvStToUiLixgF679sFDyWfVH1awUIU3UGOd2TyAYDUkJrPF002WD2USoG"
                  email={userDetails?.email}
                  // billingAddress
                  token={makePayment}
                  allowRememberMe
                >Submit</StripeCheckout>
              </button>
            ) : selectedPaymentMethod?.toLowerCase() === "paystack"
            ? (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                type="button"
                // onClick={() => {() => initializePayment(handleSuccess, handleClose)}}
              >
                <PaystackButton {...componentProps} />
              </button>
            ) : (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                type="button"
                onClick={() => {toast.warning("Please select a payment method")}}
              >
                Submit
              </button>
            )
          }
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => {
              onClose();
              setNumUsers(0);
              setAppliedVoucher(null);
              setSelectedVoucher(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
