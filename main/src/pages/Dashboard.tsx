import React, { useEffect, useRef, useState } from "react";
import BusinessEmail from "../components/BusinessEmail";
import SubscriptionModal from "../components/SubscriptionModal";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addToCartThunk, cancelSubscriptionThunk, changeAutoRenewThunk, getBase64ImageThunk, getBillingHistoryThunk, getDomainsListThunk, getPaymentMethodsThunk, getPaymentSubscriptionsListThunk, getStaffIdFromLSThunk, getStaffStatusFromLSThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, makeDefaultPaymentMethodThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { Download, Plus, X } from "lucide-react";
import { format } from "date-fns";
import html2canvas from 'html2canvas-pro';
import jsPDF from "jspdf";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { currencyList } from "../components/CurrencyList";
import { setCart, setCustomerId, setStaffId, setStaffStatus, setTokenDetails } from "store/authSlice";
import './Dashboard.css';

const inititalCancel = {
  number: 0,
  reason: ""
};

const initialExpiryData = {
  plan_name: "",
  is_trial: "",
  days: 30,
  date: format(new Date(), "dd-MM-yyyy"),
}

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c";
// const logo = "";
const stripeImage = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/stripe.png?alt=media&token=23bd6672-665c-4dfb-9d75-155abd49dc58";
const paystackImage = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/paystack.png?alt=media&token=8faf3870-4256-4810-9844-5fd3c147d7a3";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { customerId, userDetails, cartState, defaultCurrencySlice,token, rolePermission, isAdmin } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  // console.log("state...", location.state);
  const isInitialRender = useRef(true);
  useEffect(() => {
    // if (isInitialRender.current) {
    //   isInitialRender.current = false;
    //   return;
    // }
    
    if(location.state) {
      if(location.state?.from === "otp") {
      
        toast.success(`Successfully logged`);
        navigate(location.pathname, { replace: true, state: {} });
        // toast.success(`Successfully logged in ${Math.random() * 3}`);
        // console.log(`Successfully logged in ${Math.random() * 3}`)
      } else if(location.state?.from === "registration") {
        toast.success("Successfully registered");
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state]);

  useEffect(() => {
    const checkPermission = (label:String) => {
      if(rolePermission?.length > 0) {
        // console.log(rolePermission?.find(item => item?.name === label))
        const permissionStatus = rolePermission?.find(item => item?.name === label)?.value;
        if(permissionStatus) {
          //
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    checkPermission("Dashboard");
  }, [rolePermission]);
  
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [subscriptionsList, setSubscriptionList] = useState([]);
  // console.log("subscriptionsList...", subscriptionsList);
  const [subscription, setSubscription] = useState<object | null>(null);
  console.log("subscription...", subscription);
  // console.log("user details...", userDetails);

  const [selectedDomain, setSelectedDomain] = useState<object|null>(null);
  // console.log("selectedDomain...", selectedDomain);
  // console.log("userDetails...", userDetails);
  const [activeStatus, setActiveStatus] = useState<Boolean>(false);
  const [showList, setShowList] = useState(false);
  const listRef= useRef(null);

  const showListTable = [
    { label: "Update Plan", type: "link", link: "/upgrade-plan", },
    { label: "Update payment method", type: "modal", link: "", },
    { label: "Renew Plan", type: "link", link: "/upgrade-plan", },
    { label: "Turn off auto-renew", type: "modal", link: "", },
    { label: "View payment details", type: "link", link: "/view-payment-details", },
    { label: "View Invoice", type: "modal", link: "", },
    { label: "Cancel Subscription", type: "modal", link: "", },
    { label: "Transfer Subscription", type: "modal", link: "", },
  ];const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [cancelReason, setCancelReason] = useState(inititalCancel);
  const [invoiceData, setInvoiceData] = useState<object|null>(null);
  console.log("invoiceData...", invoiceData);
  const pdfRef = useRef(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  // console.log("paymentMethods...", paymentMethods);
  const [subscriptionId, setSubscriptionId] = useState("");
  
  const [processingModalOpen, setProcessingModalOpen] = useState(false);

  const [activePlan, setActivePlan] = useState<object|null>(null);
  // console.log("activePlan...", activePlan);

  const [billingHistoryList, setBillingHistoryList] = useState([]);
  console.log("billingHistoryList...", billingHistoryList);
  const [billingHistoryData, setBillingHistoryData] = useState<object|null>(null);
  console.log("billingHistoryData...", billingHistoryData);
  const [renewalStatus, setRenewalStatus] = useState(false);
  // console.log("renewalStatus...", renewalStatus);

  const [isExpirySectionOpen, setIsExpirySectionOpen] = useState(false);
  const [expiryData, setExpiryData] = useState(initialExpiryData);
  // console.log("expiryData...", expiryData);

  const [base64ImageLogo, setBase64ImageLogo] = useState("");
  // console.log("base64ImageLogo...", base64ImageLogo);
  const [paymentMethodImage, setPaymentMethodImage] = useState("");
  // console.log("paymentMethodImage...", paymentMethodImage);

  const getBase64ImageLogo = async() => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: logo})).unwrap();
      setBase64ImageLogo(result?.base64);
    } catch (error) {
      setBase64ImageLogo("");
    }
  };

  useEffect(() => {
    getBase64ImageLogo();
  }, []);

  const getBase64ImagePaymentMethod = async(url:string) => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: url})).unwrap();
      setPaymentMethodImage(result?.base64);
    } catch (error) {
      setPaymentMethodImage("");
    }
  };

  useEffect(() => {
    if(billingHistoryData !== null && paymentMethods?.length > 0) {
      const paymentGatewayImage = paymentMethods?.find(item => item?.method_name?.toLowerCase() === billingHistoryData?.payment_method?.toLowerCase())?.method_image;
      getBase64ImagePaymentMethod(paymentGatewayImage);
    }
  }, [paymentMethods, billingHistoryData]);

  useEffect(() => {
    const getExpiryDate = () => {
      if(userDetails?.workspace) {
        const miliseconds = parseInt(userDetails?.workspace?.next_payment?._seconds) * 1000 + parseInt(userDetails?.workspace?.next_payment?._nanoseconds) / 1e6;

        const date = new Date(miliseconds);
        // const date = new Date();
        const today = new Date();

        const timeDifference = Math.abs(date - today);
        const isNegative = (date - today) < 0;
        // console.log("timeDifference...", timeDifference);
        const days = Math.floor(timeDifference / (1000*60*60*24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        if(isNegative) {
          setExpiryData({
            ...expiryData,
            days: -1,
            date: format(new Date(), "dd-MM-yyyy")
          });
          setIsExpirySectionOpen(true);
        } else {
          if(days < 3) {
            setExpiryData({
              ...expiryData,
              days: days,
              date: format(date, "dd-MM-yyyy")
            });
            setIsExpirySectionOpen(true);
          } else {
            setExpiryData(initialExpiryData);
            setIsExpirySectionOpen(false);
          }
        }
      } else {
        setExpiryData(initialExpiryData);
        setIsExpirySectionOpen(false);
      }
    }

    getExpiryDate();
  }, [userDetails]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const tokenResult = await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
        await dispatch(setTokenDetails(tokenResult));
        const customerIdResult = await dispatch(getUserIdFromLSThunk()).unwrap();
        await dispatch(setCustomerId(customerIdResult));
        const staffIdResult = await dispatch(getStaffIdFromLSThunk()).unwrap();
        await dispatch(setStaffId(staffIdResult));
        const staffStatusResult = await dispatch(getStaffStatusFromLSThunk()).unwrap();
        await dispatch(setStaffStatus(staffStatusResult === "true" ? true : false));
      } catch (error) {
        // console.error("Error fetching token:", error);
        navigate('/login');
      }
    };

    getUserDetails();
  }, [token, dispatch, navigate]);

  const getBillingHistoryList = async() => {
    try {
      const result = await dispatch(getBillingHistoryThunk({user_id: customerId, start_date: "", end_date: "", domain: "", sortdata:{sort_text: "", order: "asc"}})).unwrap();
      setBillingHistoryList(result?.data);
    } catch (error) {
      setBillingHistoryList([]);
    }
  };

  useEffect(() => {
    getBillingHistoryList();
  }, [customerId]);

  const getPlanNameById = async() => {
    try {
      const result = await dispatch(plansAndPricesListThunk({
        subscription_id: userDetails?.workspace?.plan_name_id
      })).unwrap();
      setActivePlan(result?.data[0]);
    } catch (error) {
      // console.log(error);
      setActivePlan(null);
      if(error?.error == "Request failed with status code 401") {
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
    getPlanNameById();
  }, [userDetails]);
  
  useEffect(() => {
    if(billingHistoryList?.length > 0 && invoiceData !== null) {
      const foundData = billingHistoryList?.find(item => item?.subscription_id === invoiceData?.id);
      setBillingHistoryData(foundData);
    } else {
      setBillingHistoryData(null);
    }
  }, [billingHistoryList, invoiceData]);
    
  const handleClickOutsideListeRef = (event: MouseEvent) => {
    if(listRef.current && !listRef.current.contains(event.target as Node)) {
      setShowList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideListeRef);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideListeRef);
    };
  }, []);
  
  const openProcessingModal = () => {
    setProcessingModalOpen(true);
  };

  // const updateInvoiceData = (data) => {
  //   setInvoiceData(data.length > 0 ? data[data.length - 1] : null);
  // }

  const formatDate2 = (datee) => {

    const date = new Date(datee);
    // const date = new Date();

    const formattedDate = format(date, "yyyy-MM-dd");
    return formattedDate;
  };

  const renewalDate = (datee) => {
    const miliseconds = parseInt(datee?._seconds) * 1000 + parseInt(datee?._nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();
    const today = new Date();
    // console.log({date, today})

    if(date < today) {
      setRenewalStatus(true);
    } else {
      setRenewalStatus(false);
    }
  };

  useEffect(() => {
    renewalDate(userDetails?.workspace?.next_payment);
  }, [userDetails?.workspace?.next_payment]);

  const getAmount = (amount, period) => {
    const amountDetails =  amount?.find(item => item?.currency_code === defaultCurrencySlice);
    if(amountDetails === undefined) {
      return {type: '', price: 0, discount_price: 0};
    } else {
      return amountDetails?.price?.find(item => item?.type === period);
    }
  };

  const cartAddAmount = (item, period) => {
    const data = getAmount(item?.amount_details, period);
    return data;
  };

  const renewalAddToCart = async(e) => {
    e.preventDefault();
    const cartItems = cartState?.filter(item => item?.product_type === "google workspace" ? !item : item);
    // console.log(cartAddAmount(activePlan, userDetails?.workspace?.payment_cycle)?.discount_price)
    const newCart = [
      ...cartItems,
      {
        payment_cycle: userDetails?.workspace?.payment_cycle,
        price: activePlan?.amount_details,
        currency: defaultCurrencySlice,
        product_name: activePlan?.plan_name,
        product_type: "google workspace",
        total_year: userDetails?.license_usage,
        plan_name_id: activePlan?.id,
        workspace_status: "active",
        is_trial: true
      }
    ];
    // console.log({newCart, item});
    try {
      await dispatch(addToCartThunk({
        user_id: customerId,
        products: newCart
      })).unwrap();
      dispatch(setCart(newCart));
      // console.log(newCart)
      navigate('/add-cart');
    } catch (error) {
      // console.log(error);
      toast.error(error?.message || "Error renewing plan");
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      setShowList(false);
    }
  };
  
  const downloadInvoice = async() => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,  // Allow CORS requests for images
      allowTaint: true, 
    });
    const imgData = canvas.toDataURL('image/png');

    if (imgData.startsWith('data:image/png;base64,')) {
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = 210;
      const PdfHeight = 297;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const scaleFactor = Math.min(pdfWidth / imgWidth, PdfHeight / imgHeight);

      const adjustedWidth = (imgWidth * scaleFactor) - 10;
      const adjustedHeight = (imgHeight * scaleFactor) - 10;

      const xOffset = (pdfWidth - adjustedWidth) / 2;
      const yOffset = (PdfHeight - adjustedHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, 0, adjustedWidth, adjustedHeight);

      pdf.save('invoice.pdf');
    } else {
      console.error("Image data is invalid or empty", imgData);
    };
  };

  const getPaymentMethods = async() => {
    try {
      const result = await dispatch(getPaymentMethodsThunk({user_id: customerId})).unwrap();
      setPaymentMethods(result?.paymentMethods);
    } catch (error) {
      if(error?.message == "Request failed with status code 401") {
        setPaymentMethods([]);
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
    getPaymentMethods();
  }, [customerId]);

  const updateDefaultPaymentMethod = async(id:string) => {
    try {
      const result = await dispatch(makeDefaultPaymentMethodThunk({
        user_id: customerId,
        payment_method_id: id
      })).unwrap();
      setTimeout(() => {
        
        toast.success(result?.message);
      }, 1000);
    } catch (error) {
      if(error?.message == "Request failed with status code 401") {
        
        toast.error(error?.message || "Error making default payment method");
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getPaymentMethods();
    }
  };

  const cancelSubscription = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(cancelSubscriptionThunk({
        product_type: "google workspace",
        subscription_id: subscriptionId,
        customer_id: customerId,
        reason: cancelReason?.reason,
        subscription_status: "Cancel Requested"
      })).unwrap();
      // console.log("result...", result);
    } catch (error) {
      if(error?.message == "Request failed with status code 401") {
        
        toast.error(error?.message || "Error making default payment method");
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      setIsModalOpen(false);
      setModalType("");
      setCancelReason(inititalCancel);
      setSubscriptionId("");
    }
  };

  useEffect(() => {
    const checkDate = () => {
      if(userDetails?.workspace) {
        const miliseconds = parseInt(userDetails?.workspace?.next_payment?._seconds) * 1000 + parseInt(userDetails?.workspace?.next_payment?._nanoseconds) / 1e6;
        const date = new Date(miliseconds);
        const today = new Date();
        if(today < date) {
          setActiveStatus(true);
        } else {
          setActiveStatus(false);
        }
      } else {
        setActiveStatus(false);
      }
    };

    checkDate();
  }, [userDetails]);

  const getDomainsList = async() => {
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      if(result?.data) {
        result?.data?.find((item) => item?.domain_type === "primary" ? setSelectedDomain(item) : null);
      }
    } catch (error) {
      setSelectedDomain({});
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  }

  useEffect(() => {
    getDomainsList();
  }, [customerId]);

  const getSubscriptionList = async() => {
    try {
      const result = await dispatch(getPaymentSubscriptionsListThunk({
        customer_id: customerId, start_date: "", end_date: "", domain_name: ""
      })).unwrap();
      setSubscriptionList(result?.subscriptions);
    } catch (error) {
      setSubscriptionList([]);
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
    getSubscriptionList();
  }, [customerId]);

  useEffect(() => {
    if(subscriptionsList?.length > 0) {
      const data = subscriptionsList?.find(item => item?.product_type === "google workspace");
      if(data) {
        setSubscription(data);
      } else {
        setSubscription(null);
      }
    } else {
      setSubscription(null);
    }
  }, [subscriptionsList]);

  const formatDate = (seconds, nanoseconds) => {
    const miliseconds = parseInt(seconds) * 1000 + parseInt(nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();

    const formattedDate = format(date, "MMM dd, yyyy");
    return formattedDate;
  };

  const formatDateInvoice = (datee) => {
    const date = new Date(datee);

    if(date == "Invalid Date") {
      return {top: "Invalid Date", bottom: ""};
    } else {
      return {top: format(date, "MMM dd, yyyy"), bottom: format(date, "h:mm:ss a")}
    }
  };

  const formatExpiryDate = (seconds, nanoseconds) => {
    const miliseconds = parseInt(seconds) * 1000 + parseInt(nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();
    const today = new Date();

    const timeDifference = today - date;
    const days = timeDifference / (1000 * 60 * 60 *24);
    if(today > date) {
      return {expired: true, days: parseInt(days)};
    } else {
      return {expired: false, days: 0};
    }
  };

  // console.log("user details", userDetails)

  useEffect(() => {
    if(userDetails?.workspace) {
      // console.log("format expiry...",formatExpiryDate(userDetails?.workspace?.next_payment?._seconds, userDetails?.workspace?.next_payment?._nanoseconds));
    }
  }, [userDetails])  

  const changeAutoRenewStatus = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(changeAutoRenewThunk({subscription_id: subscriptionId, status: subscription?.subscription_status === "auto renewal" ? "Manual" : "auto renewal", product_type: "google workspace"})).unwrap();
      // console.log("result....", result);
      
      toast.success("Auto Renew Status updated");
    } catch (error) {
      if(error?.message == "Request failed with status code 401") {
        
        toast.error(error?.message || "Auto Renew Status updation failed");
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getSubscriptionList();
      setIsModalOpen(false);
      setModalType("");
      setSubscriptionId("");
    }
  };

  return (
    <div>
      {
        isExpirySectionOpen && !isAdmin && (
          <div className="warning-box">
            <div className={`${
              expiryData?.days < 0
              ? "expired-warning"
              : expiryData?.days >= 0 && expiryData?.days < 3
              ? "expire-warning"
              : ""
            } common-warning`}>
              <p className="font-inter font-normal text-lg text-black">Your {userDetails?.workspace?.workspace_status === "trial" ? "free trial" : "plan"} {expiryData?.days >= 0 ? "will be expired" : "has been expired"} {expiryData?.days > 0 ? `in ${expiryData?.days} days ` : expiryData?.days === 0 ? "today" : ""}{expiryData?.days !== 0 ? `on ${expiryData?.date}` : ""}.</p>
              <button
                type="button"
                className={`px-6 py-2 ${
                  expiryData?.days < 0
                  ? "text-[#12A833]"
                  : expiryData?.days >= 0 && expiryData?.days < 3
                  ? "text-[#FF0000]"
                  : ""
                } border border-[#E02424] font-inter font-semibold text-sm rounded-[40px]`}
                onClick={(e) => renewalAddToCart(e)}
              >{
                expiryData?.days < 0
                ? "Renew Plan"
                : expiryData?.days >= 0 && expiryData?.days < 3
                ? "Pay now"
                : ""
              }</button>
            </div>
            <button
              type="button"
              onClick={() => {setIsExpirySectionOpen(false)}}
              className="w-4 h-4 text-[#919191] hover:text-slate-300"
            ><X /></button>
          </div>
        )
      }
      <main className="min-h-screen pb-1">
        <h2 className="text-sm sm:text-xl lg:text-4xl font-medium text-green-500">
          Welcome to your Dashboard
        </h2>

        <div className="overflow-x-auto mt-6">
          {
            subscription !== null ? (
              <table className="min-w-full  rounded-t-md border-b border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Product Type
                    </th>
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Payment Cycle
                    </th>
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Description
                    </th>
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Domain
                    </th>
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Last Payment
                    </th>
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Next Payment
                    </th>
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Billing Status
                    </th>
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Payment Method
                    </th>
                    <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-xs text-gray-400 relative">
                    <td className="px-2 pb-10 pt-3">Google workspace</td>
                    <td className="px-2 pb-10 pt-3 text-center">{subscription?.payment_cycle}</td>
                    <td className="px-2 pb-10 pt-3 text-center">{subscription?.description}</td>
                    <td className="px-2 pb-10 pt-3 text-center">{subscription?.domain[0]}</td>
                    <td className="px-2 pb-10 pt-3 text-center">{formatDate(subscription?.last_payment?._seconds, subscription?.last_payment?._nanoseconds)}</td>
                    <td className="px-2 pb-10 pt-3 text-center">{formatDate(subscription?.next_payment?._seconds, subscription?.next_payment?._nanoseconds)}</td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      <button
                        className={`w-[80px] h-[30px] rounded hover:text-white capitalize ${
                          userDetails?.workspace?.workspace_status === "trial"
                          ? expiryData?.days < 0
                            ? "bg-gray-300 text-gray-700 border-2 border-gray-500 hover:bg-gray-700"
                            :"text-green-500 border-2 border-green-500 hover:bg-green-500"
                          : formatExpiryDate(userDetails?.workspace?.next_payment?._seconds, userDetails?.workspace?.next_payment?._nanoseconds)?.expired
                          ? "bg-gray-300 text-gray-700 border-2 border-gray-500 hover:bg-gray-700"
                          : subscription?.subscription_status === "Cancelled"
                          ? "text-red-700 border-2 border-red-500 hover:bg-red-500"
                          : subscription?.subscription_status === "Expired"
                          ? "bg-gray-300 text-gray-700 border-2 border-gray-500 hover:bg-gray-700"
                          : subscription?.subscription_status === "Cancel Requested"
                          ? "text-yellow-600 border-2 border-yellow-600 hover:bg-gray-300"
                          : subscription?.subscription_status?.toLowerCase() === "manual"
                          ? "text-yellow-600 border-2 border-yellow-600 hover:bg-gray-300"
                          : "text-green-500 border-2 border-green-500 hover:bg-green-500"
                        }`}
                      >{
                        userDetails?.workspace?.workspace_status === "trial"
                        ? expiryData?.days < 0
                          ? "Expired"
                          : expiryData?.days === 0
                          ? "Expired today"
                          : expiryData?.days === 1
                          ? "1 day due"
                          :  expiryData?.days < 10
                          ? `${expiryData?.days} days due`
                          : "Free Trial"
                        : formatExpiryDate(userDetails?.workspace?.next_payment?._seconds, userDetails?.workspace?.next_payment?._nanoseconds)?.expired
                        ? formatExpiryDate(userDetails?.workspace?.next_payment?._seconds, userDetails?.workspace?.next_payment?._nanoseconds)?.days === 0
                          ? "Expired today"
                          :  formatExpiryDate(userDetails?.workspace?.next_payment?._seconds, userDetails?.workspace?.next_payment?._nanoseconds)?.days === 1
                          ? "1 day due"
                          : formatExpiryDate(userDetails?.workspace?.next_payment?._seconds, userDetails?.workspace?.next_payment?._nanoseconds)?.days < 10
                          ? `${formatExpiryDate(userDetails?.workspace?.next_payment?._seconds, userDetails?.workspace?.next_payment?._nanoseconds)?.days} days due`
                          :  "Expired"
                        : subscription?.subscription_status
                      }</button>
                    </td>
                    <td className="px-2 pb-10 pt-3 items-center align-middle flex justify-center content-center">
                      <div className="inline-block">
                        <img
                          src={
                            subscription?.payment_method?.toLowerCase() === "stripe"
                            ? stripeImage
                            : subscription?.payment_method?.toLowerCase() === "paystack"
                            ? paystackImage
                            : ""
                          }
                          alt="subscription?.payment_method"
                          className="h-6 mr-1 inline-block"
                        />
                        <p className="text-[0.75rem] text-gray-600 font-semibold inline-block">
                        {/* % 10000 */}
                          {"..."}{
                            Number(subscription?.payment_details[subscription?.payment_details?.length - 1]?.card_number) % 10000
                          }
                        </p>
                      </div>
                    </td>
                    <td className="px-2 pb-10 pt-3 text-right">
                      <button className={`w-6 h-6 rounded-full border-2 ${isAdmin ? "border-[#8A8A8A]" : "border-green-500"} flex justify-center items-center`} type="button" onClick={() => setShowList(!showList)} disabled={isAdmin}>
                        <p className="mb-2">...</p>
                      </button>
                    </td>
                  </tr>
                  {
                    showList && (
                      <div
                        className="p-2 w-80 max-w-[12rem] absolute right-1 -mt-10 z-50"
                        onClick={(e) => {e.stopPropagation()}}
                        ref={listRef}
                      >
                        <ul className="bg-gray-100 rounded-xl shadow-md space-y-2 flex-grow flex-col items-start justify-center p-1">
                          {
                            showListTable.map((list, idx) => {
                              if(list?.type === "link") {
                                if(list?.label === "View payment details") {
                                  return (
                                    <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={() => {navigate(list?.link, {state: subscription})}}>{list?.label}</li>
                                  )
                                } else if(list?.label === "Renew Plan") {
                                  if(renewalStatus) {
                                    return (
                                      <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={(e) => renewalAddToCart(e)}>{list?.label}</li>
                                    )
                                  }
                                } else if(list?.label === "Update Plan") {
                                  if(userDetails?.workspace?.workspace_status === "trial") {
                                    if(renewalStatus) {
                                      return (
                                        <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={(e) => renewalAddToCart(e)}>{list?.label}</li>
                                      )
                                    }
                                  } else {
                                    return (
                                      <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={() => {navigate(list?.link, {state: subscription})}}>{list?.label}</li>
                                    )
                                  }
                                } else {
                                  if(subscription?.product_type?.toLowerCase() === "google workspace") {
                                    return (
                                      <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={() => {navigate(list?.link, {state: subscription})}}>{list?.label}</li>
                                    )
                                  }
                                }
                              } else if(list?.type === "modal") {
                                if(list?.label === "Cancel Subscription" || list?.label === "Transfer Subscription") {
                                  if(subscription?.product_type?.toLowerCase() === "google workspace") {
                                    return (
                                      <li
                                        key={idx}
                                        className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-not-allowed bg-slate-300 opacity-50"
                                        // onClick={() => {
                                        //   setIsModalOpen(true);
                                        //   setModalType(list?.label);
                                        //   setSubscriptionId(detail?.id)
                                        //   if(list?.label === "View Invoice") {
                                        //     setInvoiceData(subscription);
                                        //   } else {
                                        //     setInvoiceData(null);
                                        //   }
                                        // }}
                                      >{list?.label}</li>
                                    )
                                  }
                                } else if(list?.label === "Turn off auto-renew") {
                                  return (
                                    <li
                                      key={idx}
                                      className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer"
                                      onClick={() => {
                                        setShowList(false);
                                        setIsModalOpen(true);
                                        setModalType(list?.label);
                                        setSubscriptionId(subscription?.id)
                                        if(list?.label === "Turn off auto-renew") {
                                          setInvoiceData(subscription);
                                        } else {
                                          setInvoiceData(null);
                                        }
                                      }}
                                    >{
                                      subscription?.subscription_status === "auto renewal" ? list?.label : "Turn on auto-renew"
                                    }</li>
                                  )
                                } else {
                                  return (
                                    <li
                                      key={idx}
                                      className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer"
                                      onClick={() => {
                                        setShowList(false);
                                        setIsModalOpen(true);
                                        setModalType(list?.label);
                                        if(list?.label === "View Invoice") {
                                          setInvoiceData(subscription);
                                        } else {
                                          setInvoiceData(null);
                                        }
                                      }}
                                    >{list?.label}</li>
                                  )
                                }
                              } else {
                                return (
                                  <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer">{list?.label}</li>
                                )
                              }
                            })
                          }
                        </ul>
                      </div>
                    )
                  }
                </tbody>
              </table>
            ) : (
              <div className="my-[10px] w-full bg-[#F8F7F7] rounded-[10px] drop-shadow-custom py-2 pb-4 px-4 flex flex-col">
                <h3 className="font-inter font-medium small:text-[28px] text-xl text-black text-nowrap">Add Subscription</h3>
                <p className="font-inter font-normal small:text-base text-sm text-black w-full pt-1 pb-3 border-b-2 border-black drop-shadow-custom">It seems you don’t have subscriptions</p>
                <button
                  type="button"
                  className="max-w-[220px] bg-[#12A833] rounded-[10px] font-plus-jakarta-sans font-bold small:text-base text-sm text-white gap-1 items-center flex justify-center small:px-4 px-1 py-2 mt-3 mb-2"
                  onClick={() => {navigate('/choose-your-plan')}}
                  cypress-name="add-subscription-button"
                >
                  <Plus />
                  <span>Add Subscription</span>
                </button>
              </div>
            )
          }
        </div>
        {
          isAdmin ? (
            <div>
              <div className="">
                <BusinessEmail data={selectedDomain} getDomainsList={getDomainsList} />
              </div>
              <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
            </div>
          ) : selectedDomain === null
          ? (<></>)
          : activeStatus
          ? (
            <div style={{marginTop: '20px'}}>
              <div className="">
                <BusinessEmail data={selectedDomain} getDomainsList={getDomainsList} />
              </div>
              <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
            </div>
          )
          : userDetails?.workspace
          ? (
            <div className="relative pointer-events-none" style={{marginTop: '20px'}}>
              <div className="pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-inter font-semibold text-[40px] text-[#E02424] z-20">Expired !!!</div>
                <div className="absolute bg-gray-400 bg-opacity-50 z-10 top-0 left-0 bottom-0 right-0 backdrop-blur-sm"></div>
                <BusinessEmail data={selectedDomain} getDomainsList={getDomainsList} />
              </div>
              <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
            </div>
          ) : (<></>)
        }

        {
          isModalOpen && modalType === "Update payment method" ?
          (
            <Dialog
              open={isModalOpen}
              as="div"
              className="relative z-40 focus:outline-none"
              onClose={() => {
                setIsModalOpen(false);
                setModalType("");
              }}
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40 w-screen overflow-y-auto mt-16">
                <div className="flex min-h-full items-center justify-center py-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-[700px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <DialogTitle
                        as="h3"
                        className="min-[440px]:text-[28px] max-[440px]:text-[19px] font-semibold text-gray-900"
                      >Update payment method</DialogTitle>
                      <button
                        type='button'
                        className='text-3xl text-black'
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalType("");
                        }}
                      ><X /></button>
                    </div>

                    <div
                      className="mt-8"
                    >
                      <p
                        className="font-inter font-medium min-[440px]:text-xl max-[440px]:text-base text-[#222222] text-left"
                      >Update the payment method for the selected products: </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4 items-center justify-center">
                      {
                        paymentMethods.length > 0 ? paymentMethods?.map((method, index) => (
                          <div
                            className="rounded-lg flex flex-col items-center justify-center p-2"
                            style={{ width: "280px", height: "200px", border: "1px solid gray" }}
                            key={index}
                          >
                            <div className="flex gap-2 self-end my-2">
                              <p className="text-green-500">Mark as default</p>
                              <input
                                type="checkbox"
                                checked={method?.default}
                                onChange={() => {updateDefaultPaymentMethod(method?.id)}}
                                className="checkbox checkbox-xs rounded-sm border-green-500 [--chkbg:theme(colors.green.500)] [--chkfg:white] checked:border-green-500"
                              />
                            </div>
                            <div className="mb-10" style={{ width: "12rem", height: "7rem" }}>
                              <img src={method?.method_image} alt="stripe" className="w-full h-full" />
                            </div>
                          </div>
                        )) : (
                          <div
                            className="rounded-lg flex flex-col items-center justify-center p-2"
                            style={{ width: "20rem", height: "12rem", border: "1px solid gray" }}
                          >
                            No Data Available
                          </div>
                        )
                      }
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          ) : modalType === "View Invoice" ?
          (
            <Dialog
              open={isModalOpen}
              as="div"
              className="relative z-40 focus:outline-none"
              onClose={() => {
                setIsModalOpen(false);
                setModalType("");
                setInvoiceData(null);
                setBillingHistoryData(null);
              }}
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
                <div className="flex min-h-full items-center justify-center py-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-[600px] max-h-[600px] overflow-auto bg-white py-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                  >
                    <div className="w-full flex justify-between mb-3 px-4">
                      <Download
                        className="h-5 text-[#12A833] cursor-pointer"
                        onClick={() => {downloadInvoice()}}
                      />
                      <X
                        className="h-5 text-[#12A833] cursor-pointer"
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalType("");
                          setInvoiceData(null);
                          setBillingHistoryData(null);
                        }}
                      />
                    </div>
                    <div
                      className='max-w-[700px]'
                      ref={pdfRef}
                    >
                      <div
                        className='bg-white px-1 w-full mx-auto'
                      >
                        <div
                          className='relative h-40 bg-white overflow-hidden'
                        >
                          <div
                            style={{position: 'absolute', top: 0, width: "100%", height: "100%", backgroundColor: '#12A833', zIndex: '10', transform: 'skewY(-11deg)', transformOrigin: 'top left'}}
                          ></div>
                          <div
                            className='absolute top-0 right-0 w-[200px] h-[80%] bg-[#f4f4f6] opacity-50 transform -skew-y-[17deg] origin-top-left z-10'
                          ></div>
                          {/* <div
                            className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[300px]'
                          ></div>
                          <div
                            className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[390px]'
                          ></div> */}
                          <div className='absolute top-2 right-2 flex flex-row z-20 items-start'>
                            <div className='flex flex-col items-start'>
                              <p className='mr-1 text-white font-normal font-inter text-sm'>Date:</p>
                            </div>
                            <div className='flex flex-col items-start'>
                              <p className='mr-1 text-white font-normal font-inter text-sm p-0'>{formatDateInvoice(billingHistoryData?.date)?.top}</p>
                              <p className='mr-1 text-white font-normal font-inter text-sm p-0 mt-0'>{formatDateInvoice(billingHistoryData?.date)?.bottom}</p>
                            </div>
                          </div>
                          <div
                            className='absolute bottom-7 left-1/2 transform -translate-x-1/2 z-30'
                          >
                            <div
                              className='w-[60px] h-[60px] bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg'
                            >
                              <img
                                src={base64ImageLogo}
                                className='w-[51px] rounded-full object-cover'
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          className='text-center py-1 border-b border-black'
                        >
                          <h3 className='font-inter text-[black] text-lg'>Receipt from Hordanso LLC</h3>
                          <p className='font-inter text-[#B3B7B8] text-sm'>Receipt #{billingHistoryData?.invoice}</p>
                        </div>

                        <div
                          className='flex justify-between text-[#B3B7B8] px-20 py-5 w-full overflow-x-auto'
                        >
                          <table className="w-full min-w-[400px]">
                            <tbody>
                              <tr>
                                <td className="font-inter font-normal text-sm items-start text-start content-start">Inovice To</td>
                                <td className="flex flex-col font-inter font-normal text-sm text-black content-start">
                                  <p>{invoiceData?.payment_details[invoiceData?.payment_details?.length - 1]?.first_name} {invoiceData?.payment_details[invoiceData?.payment_details?.length - 1]?.last_name}</p>
                                  <p>{invoiceData?.payment_details[invoiceData?.payment_details?.length - 1].email}</p>
                                  <p>{invoiceData?.payment_details[invoiceData?.payment_details?.length - 1]?.region}</p>
                                </td>
                              </tr>
                              <tr>
                                <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Method</td>
                                <td>
                                  <img
                                    src={paymentMethodImage}
                                    alt={billingHistoryData?.payment_method}
                                    className="w-10 object-contain"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Cycle</td>
                                <td className="flex flex-col font-inter font-normal text-sm text-black content-start">{invoiceData?.payment_cycle}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div
                          className='flex justify-between text-[#B3B7B8] px-20 py-5 w-full overflow-x-auto'
                        >
                          <table className="w-full min-w-[400px]">
                            <thead>
                              <tr>
                                <th className="w-[150px] text-left border-b border-black">Description</th>
                                <th className="w-[50px] text-center border-b border-black">Qty</th>
                                <th className="w-[100px] text-center border-b border-black">
                                  {/* Unit Price */}
                                </th>
                                <th className="w-[100px] text-center border-b border-black">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* <tr>
                                <td className="font-inter font-normal text-sm text-black content-start text-left py-1 border-b border-black">Domain</td>
                                <td className="font-inter font-normal text-sm text-black content-start text-center py-1 border-b border-black">1</td>
                                <td className="font-inter font-normal text-sm text-black text-right py-1 border-b border-black">
                                  <div className="inline-block">
                                    <span className="inline-block">1</span>
                                    <X className="inline-block w-4 h-4 text-black mx-[2px]" />
                                    <span className="inline-block">{currencyList?.find(item => item?.name === data?.currency)?.logo}{parseFloat(data?.selectedDomain?.price[data?.currency])?.toFixed(2)}</span>
                                  </div>
                                </td>
                                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">{currencyList?.find(item => item?.name === data?.currency)?.logo}{data?.selectedDomain?.price[data?.currency]}</td>
                              </tr> */}
                              <tr>
                                <td className="font-inter font-normal text-sm text-black content-start text-left py-1 border-b border-black capitalize">{billingHistoryData?.description}</td>
                                <td className="font-inter font-normal text-sm text-black content-start text-center py-1 border-b border-black">
                                {/* {data?.license_usage} */}
                                1
                                </td>
                                <td className="font-inter font-normal text-sm text-black text-right py-1 border-b border-black">
                                  {/* <div className="inline-block">
                                    <span className="inline-block">{data?.license_usage}</span>
                                    <X className="inline-block w-4 h-4 text-black mx-[2px]" />
                                    <span className="inline-block">{currencyList?.find(item => item?.name === data?.currency)?.logo}{parseFloat(data?.plan?.amount_details?.find(amount => amount?.currency_code === data?.currency)?.price?.find(priceList => priceList?.type === data?.period)?.discount_price)?.toFixed(2)}</span>
                                  </div> */}
                                </td>
                                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                                  {billingHistoryData?.amount}
                                </td>
                              </tr>

                              {/* <tr>
                                <td></td>
                                <td></td>
                                <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Voucher</td>
                                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                                  -{currencyList?.find(item => item?.name === data?.currency)?.logo}
                                  {data?.discountedPrice}
                                </td>
                              </tr> */}

                              {/* <tr>
                                <td></td>
                                <td></td>
                                <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Tax</td>
                                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                                  {currencyList?.find(item => item?.name === data?.currency)?.logo}
                                  {data?.taxedPrice}
                                </td>
                              </tr> */}

                              {/* <tr>
                                <td></td>
                                <td></td>
                                <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Total</td>
                                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                                  {currencyList?.find(item => item?.name === data?.currency)?.logo}
                                  {data?.finalTotalPrice}
                                </td>
                              </tr> */}

                              {/* <tr>
                                <td></td>
                                <td></td>
                                <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Amount Charged</td>
                                <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                                  {currencyList?.find(item => item?.name === data?.currency)?.logo}
                                  {data?.finalTotalPrice}
                                </td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div
                        className='px-16 py-8'
                      >
                        <div
                          className='w-full h-px bg-[#9A9597] opacity-15'
                        ></div>

                        <h6
                          className='mt-4 text-[#7F8E96]'
                        >
                          If you have any questions, contact us at&nbsp;
                          <span className='text-[#12A833] font-medium'>stripe@hordanso.com</span>
                          &nbsp;or call us at&nbsp;
                          <span className='text-[#12A833] font-medium'>+1 469-893-0678</span>.
                        </h6>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          ) : modalType === "Cancel Subscription" ?
          (
            <Dialog
              open={isModalOpen}
              as="div"
              className="relative z-40 focus:outline-none"
              onClose={() => {
                setIsModalOpen(false);
                setModalType("");
                setCancelReason(inititalCancel);
                setSubscriptionId("");
              }}
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40 w-screen overflow-y-auto mt-16">
                <div className="flex min-h-full items-center justify-center py-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-[450px] rounded-xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] py-6 data-[closed]:opacity-0"
                  >
                    <div className="flex justify-between items-center mb-6 border-b border-gray-300 px-6 pb-4">
                      <DialogTitle
                        as="h3"
                        className="min-[440px]:text-[28px] max-[440px]:text-[19px] font-semibold text-gray-900"
                      >Cancel subscription</DialogTitle>
                      <button
                        type='button'
                        className='text-3xl text-black'
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalType("");
                          setCancelReason(inititalCancel);
                          setSubscriptionId("");
                        }}
                      ><X /></button>
                    </div>

                    <div
                      className="mt-2 px-6"
                    >
                      <p
                        className="font-inter font-medium min-[440px]:text-xl max-[440px]:text-base text-[#222222] text-left"
                      >Do you want to cancel your subscription?</p>
                    </div>

                    <div className="flex flex-col justify-start mt-4 px-6">
                      <div className="flex py-2">
                        <input type="radio" className="border border-gray-900 w-4 h-4" onClick={() => {setCancelReason({number: 1, reason: "Reason 1"})}} checked={cancelReason?.number === 1 ? true : false} />
                        <span className="ml-1 font-roboto font-normal text-sm text-black">Reason 1</span>
                      </div>
                      <div className="flex py-2">
                        <input type="radio" className="border border-gray-900 w-4 h-4" onClick={() => {setCancelReason({number: 2, reason: "Reason 2"})}} checked={cancelReason?.number === 2 ? true : false} />
                        <span className="ml-1 font-roboto font-normal text-sm text-black">Reason 1</span>
                      </div>
                      <div className="flex flex-col py-2">
                        <div className="flex">
                          <input type="radio" className="border border-gray-900 w-4 h-4" onClick={() => {setCancelReason({number: 3, reason: ""})}} checked={cancelReason?.number === 3 ? true : false} />
                          <span className="ml-1 font-roboto font-normal text-sm text-black">Other</span>
                        </div>
                        <textarea
                          disabled={cancelReason?.number === 3 ? false : true}
                          onChange={e => {
                            setCancelReason({
                              ...cancelReason,
                              reason: e.target.value,
                            });
                          }}
                          value={cancelReason?.number === 3 ? cancelReason?.reason : ""}
                          className="w-full bg-gray-100 border-0 rounded-md p-2 my-2"
                          placeholder="Please specify the reason to reject"
                        />
                      </div>
                    </div>

                    <div
                      className="flex flex-row justify-center items-center mt-4 px-6"
                    >
                      <button
                        className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#12A833] w-[79px] rounded-[10px]"
                        type="button"
                        onClick={(e) => {cancelSubscription(e)}}
                        disabled={cancelReason?.reason === "" ? true : false}
                      >Yes</button>
                      <button
                        className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#EE1010] w-[79px] ml-[60px] rounded-[10px]"
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalType("");
                          setCancelReason(inititalCancel);
                          setSubscriptionId("");
                        }}
                      >Cancel</button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          ) : modalType === "Transfer Subscription" ?
          (
            <Dialog
              open={isModalOpen}
              as="div"
              className="relative z-40 focus:outline-none"
              onClose={() => {
                setIsModalOpen(false);
                setModalType("");
              }}
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40 w-screen overflow-y-auto mt-16">
                <div className="flex min-h-full items-center justify-center py-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-[450px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <DialogTitle
                        as="h3"
                        className="min-[440px]:text-[28px] max-[440px]:text-[19px] font-semibold text-gray-900"
                      >Transfer Your Subscription</DialogTitle>
                      <button
                        type='button'
                        className='text-3xl text-black'
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalType("");
                        }}
                      ><X /></button>
                    </div>

                    <div
                      className="mt-8"
                    >
                      <p
                        className="font-inter font-medium min-[440px]:text-xl max-[440px]:text-base text-[#222222] text-left"
                      >Are you sure want to Transfer your Subscription ?</p>
                    </div>

                    <p className="font-inter font-medium min-[440px]:text-xl max-[440px]:text-base text-black opacity-60 text-left mt-4">
                      <input type="checkbox" className="border border-gray-900 w-4 h-4" />
                      <span className="ml-1">I want to transfer my domain with this subscription</span>
                    </p>

                    <div
                      className="flex flex-row justify-center items-center mt-14"
                    >
                      <button
                        className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#12A833] w-[79px] rounded-[10px]"
                        type="button"
                        // onClick={(e) => {deleteRole(e)}}
                        disabled
                      >Yes</button>
                      <button
                        className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#EE1010] w-[79px] ml-[60px] rounded-[10px]"
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalType("");
                        }}
                      >Cancel</button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          ) : modalType === "Turn off auto-renew" ?
          (
            <Dialog
              open={isModalOpen}
              as="div"
              className="relative z-40 focus:outline-none"
              onClose={() => {
                setIsModalOpen(false);
                setModalType("");
              }}
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40 w-screen overflow-y-auto mt-16">
                <div className="flex min-h-full items-center justify-center py-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-[450px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <DialogTitle
                        as="h3"
                        className="min-[440px]:text-[28px] max-[440px]:text-[19px] font-semibold text-gray-900"
                      >Turn Off Auto-Renew</DialogTitle>
                      <button
                        type='button'
                        className='text-3xl text-black'
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalType("");
                        }}
                      ><X /></button>
                    </div>

                    <div
                      className="mt-8"
                    >
                      <p
                        className="font-inter font-medium min-[440px]:text-xl max-[440px]:text-base text-[#222222] text-left"
                      >Are you sure want to turn off your Auto-Renew?</p>
                    </div>

                    <div
                      className="flex flex-row justify-center items-center mt-14"
                    >
                      <button
                        className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#12A833] w-[79px] rounded-[10px]"
                        type="button"
                        onClick={(e) => {changeAutoRenewStatus(e)}}
                      >Yes</button>
                      <button
                        className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#EE1010] w-[79px] ml-[60px] rounded-[10px]"
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalType("");
                        }}
                      >Cancel</button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          ) : ""
        }

        {
          processingModalOpen && (
            <Dialog
              open={processingModalOpen}
              as="div"
              className="relative z-10 focus:outline-none"
              onClose={() => {
                setProcessingModalOpen(true);
              }}
              // static
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center py-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-[930px] bg-white p-4 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                  >
                    <div className="flex justify-start pt-2 pb-4 items-center mb-6 border-b border-[#E4E4E4]">
                      <DialogTitle
                        as="h3"
                        className="font-montserrat font-medium text-base text-black"
                      >Your payment request is being processed...</DialogTitle>
                    </div>
                    <div className="pt-2 pb-4 w-full max-w-[600px] font-montserrat font-medium text-xs text-black">
                      <ul>
                        <li className="py-2">This is a secure payment gateway using 128 bit SSL encryption.</li>
                        <li className="py-2">When you submit the transaction, the server will take about 1 to 5 seconds to process, but it 
                        may take longer at certain times.</li>
                        <li className="py-2">Please do not press “Submit” button once again or the “Back” or “Refresh” buttons.</li>
                      </ul>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          )
        }
      </main>
    </div>
  );
};

export default Dashboard;
