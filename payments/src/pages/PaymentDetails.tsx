import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PaymentModal from "../components/PaymentModal";
import DateSearch from "../components/DateSearch";
import { addToCartThunk, cancelSubscriptionThunk, changeAutoRenewThunk, getBase64ImageThunk, getBillingHistoryThunk, getDomainsListThunk, getPaymentMethodsThunk, getPaymentSubscriptionsListThunk, makeDefaultPaymentMethodThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays } from "date-fns";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Download, X } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { setCart, setCurrentPageNumberSlice, setItemsPerPageSlice, setPaymentDetailsFilterSlice } from "store/authSlice";
import './pagination.css';
import ReactPaginate from "react-paginate";

interface RangeType<T> {
  label: string;
  value: [T, T] | ((value: T[]) => [T, T]);
  placement?: string;
  closeOverlay?: boolean;
  appearance?: string;
}

const predefinedRanges: RangeType<Date>[] = [
  { label: "Today", value: [new Date(), new Date()], placement: "left" },
  {
    label: "Yesterday",
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: "left",
  },
  {
    label: "This week",
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: "left",
  },
  {
    label: "Last week",
    value: [subDays(new Date(), 6), new Date()],
    placement: "left",
  },
  {
    label: "This month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "Last month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "This year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "Last year",
    value: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear(), 0, 0),
    ],
    placement: "left",
  },
  {
    label: "All time",
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: "left",
  },
];

const inititalCancel = {
  number: 0,
  reason: ""
};

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899";
// const logo = "";
const stripeImage = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/stripe.png?alt=media&token=23bd6672-665c-4dfb-9d75-155abd49dc58";
const paystackImage = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/paystack.png?alt=media&token=8faf3870-4256-4810-9844-5fd3c147d7a3";

const PaymentDetails: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customerId, paymentDetailsFilterSlice, itemsPerPageSlice, currentPageNumber, userDetails, defaultCurrencySlice, cartState, rolePermission, isAdmin } = useAppSelector(state => state.auth);

  console.log("customer id...", customerId);
  
  useEffect(() => {
    const checkPermission = (label:String) => {
      if(rolePermission?.length > 0) {
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

    checkPermission("Payment Subscription");
  }, [rolePermission]);

  const [initialFilter, setInitialFilter] = useState({
    customer_id: customerId,
    start_date: "",
    end_date: "",
    domain_name: ""
  });

  useEffect(() => {
    setInitialFilter({
      ...initialFilter,
      customer_id: customerId
    })
  }, [customerId]);

  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [paymentDetails, setPaymentDetails]= useState([]);
  console.log("payment details...", paymentDetails);
  const [filter, setFilter] = useState(paymentDetailsFilterSlice === null ? initialFilter : paymentDetailsFilterSlice);
  console.log("filter...", filter);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [domains, setDomains] = useState([]);
  // console.log("domains...", domains);
  const [type, setType] = useState("");
  const [domainDropdown, setDomainDropdown] = useState(false);
  const domainRef = useRef();
  const [showList, setShowList] = useState<number | null>(null);
  const listRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [cancelReason, setCancelReason] = useState(inititalCancel);
  const [invoiceData, setInvoiceData] = useState({});
  console.log("invoiceData...",invoiceData);
  const pdfRef = useRef(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  console.log("paymentMethods...", paymentMethods);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(paymentDetailsFilterSlice === null ? "" : paymentDetailsFilterSlice?.domain_name);

  const showListTable = [
    { label: "Update Plan", type: "link", link: "/upgrade-plan", },
    { label: "Update payment method", type: "modal", link: "", },
    { label: "Renew Plan", type: "link", link: "/upgrade-plan", },
    { label: "Turn off auto-renew", type: "modal", link: "", },
    { label: "View payment details", type: "link", link: "/view-payment-details", },
    { label: "View Invoice", type: "modal", link: "", },
    { label: "Cancel Subscription", type: "modal", link: "", },
    { label: "Transfer Subscription", type: "modal", link: "", },
  ];
  
  const [currentPage, setCurrentPage] = useState(paymentDetailsFilterSlice === null ? 0 : currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageSlice);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentDetails?.slice(indexOfFirstItem, indexOfLastItem);
  // console.log("currentItems...", currentItems);
  const totalPages = Math.ceil(paymentDetails?.length / itemsPerPage);
  // console.log({currentPage, totalPages, lenght: currentItems?.length});

  const [billingHistoryList, setBillingHistoryList] = useState([]);
  console.log("billingHistoryList...", billingHistoryList);
  const [billingHistoryData, setBillingHistoryData] = useState<object|null>(null);
  console.log("billingHistoryData...", billingHistoryData);
  const [renewalStatus, setRenewalStatus] = useState(false);

  const [activePlan, setActivePlan] = useState<object|null>(null);

  const [base64ImageLogo, setBase64ImageLogo] = useState("");
  // console.log("base64ImageLogo...", base64ImageLogo);
  const [paymentMethodImage, setPaymentMethodImage] = useState("");
  console.log("paymentMethodImage...", paymentMethodImage);

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

  const renewalDate = (datee) => {
    const miliseconds = parseInt(datee?._seconds) * 1000 + parseInt(datee?._nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();
    const today = new Date();
    console.log({date, today})

    if(date < today) {
      setRenewalStatus(true);
    } else {
      setRenewalStatus(false);
    }
  };

  useEffect(() => {
    renewalDate(userDetails?.workspace?.next_payment);
  }, [userDetails?.workspace?.next_payment]);

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
    console.log(cartAddAmount(activePlan, userDetails?.workspace?.payment_cycle)?.discount_price)
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
      navigate('/add-cart');
    } catch (error) {
      // console.log(error);
      toast.error("Error renewing plan");
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

  const getBillingHistoryList = async() => {
    try {
      const result = await dispatch(getBillingHistoryThunk({user_id: customerId, start_date: "", end_date: "", domain: ""})).unwrap();
      setBillingHistoryList(result?.data);
    } catch (error) {
      setBillingHistoryList([]);
    }
  };

  useEffect(() => {
    getBillingHistoryList();
  }, [customerId]);
  
  useEffect(() => {
    if(billingHistoryList?.length > 0 && invoiceData !== null) {
      const foundData = billingHistoryList?.find(item => item?.subscription_id === invoiceData?.id);
      console.log("foundData...", foundData);
      setBillingHistoryData(foundData);
    } else {
      setBillingHistoryData(null);
    }
  }, [billingHistoryList, invoiceData]);

  useEffect(() => {
    const setPaymentDetailsFilterToSlice = async() => {
      try {
        await dispatch(setPaymentDetailsFilterSlice(filter));
      } catch (error) {
        //
      }
    };

    setPaymentDetailsFilterToSlice();
  }, [filter]);

  useEffect(() => {
    if(paymentDetails?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, paymentDetails]);

  useEffect(() => {
    const setCurrentPageNumberToSlice = async() => {
      await dispatch(setCurrentPageNumberSlice(currentPage));
    }

    setCurrentPageNumberToSlice();
  }, [currentPage]);

  useEffect(() => {
    const setItemsPerPageToSlice = async() => {
      await dispatch(setItemsPerPageSlice(itemsPerPage));
    }

    setItemsPerPageToSlice();
  }, [itemsPerPage]);

  useEffect(() => {
    if(domains.length > 0 && type !== "") {
      setDomainDropdown(true);
    } else {
      setDomainDropdown(false);
    }
  }, [domains, type]);
  
  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if(domainRef.current && !domainRef.current.contains(event.target as Node)) {
      setDomainDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, []);

  useEffect(() =>{
    const getDomainsList = async() => {
      try {
        const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
        setDomains(result?.data);
      } catch (error) {
        setDomains([]);
      }
    };

    getDomainsList();
  }, [customerId]);

  const formatDate = (seconds, nanoseconds) => {
    const miliseconds = parseInt(seconds) * 1000 + parseInt(nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();

    const formattedDate = format(date, "MMM dd, yyyy");
    return formattedDate;
  };

  const formatDate2 = (datee) => {

    const date = new Date(datee);
    // const date = new Date();

    const formattedDate = format(date, "yyyy-MM-dd");
    return formattedDate;
  };

  useEffect(() => {
    if(range === null) {
      setFilter({
        ...filter,
        start_date: "",
        end_date: "",
      });
    } else {
      setFilter({
        ...filter,
        start_date: `${range[0] === null ? "" : format(range[0], "yyyy-MM-dd")}`,
        end_date: `${range[1] === null ? "" : format(range[1], "yyyy-MM-dd")}`,
      });
    }
  }, [range]);

  useEffect(() => {
    if(filter?.customer_id === "") {
      setFilter({
        ...filter,
        customer_id: customerId,
      });
    }
  }, [customerId, filter]);

  useEffect(() => {
    setFilter({
      ...filter,
      domain_name: selectedDomain,
    });
  }, [selectedDomain]);

  const getPaymentSubscriptionsList = async() => {
    try {
      console.log("filter...", filter);
      const result = await dispatch(getPaymentSubscriptionsListThunk(filter)).unwrap();
      setPaymentDetails(result?.subscriptions || []);
      console.log("result...", result?.subscriptions);
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
  };

  useEffect(() => {
    getPaymentSubscriptionsList();
  }, [filter]);

  const handleToggleModal = (index: number, button: HTMLElement) => {
    const { bottom, left } = button.getBoundingClientRect();
    setModalPosition({ top: bottom + window.scrollY + 10, left });
    setOpenModalIndex(openModalIndex === index ? null : index);
  };
  
  const handleChange = (value: [Date | null, Date | null]) => {
    setRange(value);
  };

  const renderValue = (date: [Date, Date]) => {
    if (!date[0] || !date[1]) return "Select Date Range";
    return `${format(date[0], 'MMM d')} - ${format(date[1], 'MMM d, yyyy')}`;
  };

  const toggleList = (id:number) => {
    setShowList((prev) => (prev === id ? null : id));
  };
  const handleClickOutsideOfList = e => {
    if(listRef.current && !listRef.current.contains(e.target)) {
      setShowList("");
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideOfList);
    return() => {
      document.removeEventListener('mousedown', handleClickOutsideOfList);
    };
  }, []);

  const updateInvoiceData = (data) => {
    console.log(data.length > 0 ? data[data.length - 1] : []);
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
        toast.error("Error making default payment method");
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
      console.log("result...", result);
    } catch (error) {
      if(error?.message == "Request failed with status code 401") {
        toast.error("Error making default payment method");
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getPaymentSubscriptionsList();
      setIsModalOpen(false);
      setModalType("");
      setCancelReason(inititalCancel);
      setSubscriptionId("");
    }
  };

  const changeAutoRenewStatus = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(changeAutoRenewThunk({subscription_id: subscriptionId, status: "Manual", product_type: "google workspace"})).unwrap();
      console.log("result....", result);
      toast.success("Auto Renew Status updated");
    } catch (error) {
      toast.error("Auto Renew Status updation failed");
      toast.error("Error making default payment method");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getPaymentSubscriptionsList();
      setIsModalOpen(false);
      setModalType("");
      setSubscriptionId("");
    }
  };

  const maskeCardNumber = (cardNumber) => {
    const formattedCardNumber = cardNumber?.replace(/(.{4})/g, "$1 ").trim();
    const parts = formattedCardNumber?.split(" ");
    const maskedParts = parts?.map((part, index) => (index < 3 ? "****" : part));
    return maskedParts?.join(" ");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 mb-6">
         <h1 className="text-green-500 text-3xl font-medium">
          Payment Subscription
        </h1>
        <p className="text-gray-900 text-sm">
          View, manage or cancel your subscriptions and services.
        </p>
      </div>
      <div className="flex items-start justify-between max-[375px]:px-2 min-[375px]:px-4 py-4 bg-gray-100 flex-col sm:flex-row md:flex-row gap-4">
        <div className="flex flex-col gap-4 sm:flex-col md:flex-row">
          <DateRangePicker
            ranges={predefinedRanges}
            placeholder="Select Date Range"
            style={{ width: 200 }}
            onChange={handleChange}
            value={range}
            showHeader={false}
            renderValue={renderValue} // Custom render for the selected value
            calendarSnapping={true}
            cleanable
          />
          <div className="relative" ref={domainRef}>
            <input
              type="text"
              value={selectedDomain || type}
              className="border border-transparent bg-transparent text-gray-700 p-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 w-auto"
              placeholder="Auto search domain list"
              onChange={(e) => {
                setSelectedDomain("");
                setType(e.target.value);
              }}
              onFocus={() => {setDomainDropdown(true)}}
            />
            <IoIosArrowDown
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              onClick={toggleDropdown}
            />
            {
              domainDropdown && (
                <div className="absolute w-full bg-gray-200">
                  {
                    domains.length > 0 && domains?.filter((history, idx, self) => self?.findIndex(h => h?.domain_name === history?.domain_name) === idx)?.filter(domain => domain?.domain_name?.toLowerCase().includes(type.toLowerCase()))?.map((domain, index) => (
                      <p key={index} className="px-1 font-inter cursor-pointer" onClick={() => {
                        setSelectedDomain(domain?.domain_name)
                        setType("");
                        setDomainDropdown(false);
                      }}>{domain?.domain_name}</p>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
        {/* <div className="flex min-[375px]:flex-row max-[375px]:flex-col items-center gap-0 ">
          <input
            type="text"
            className="border border-gray-300 rounded-l-sm bg-transparent text-gray-700 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Search..."
          />
          <button className="bg-green-500 text-white rounded-r-sm p-2 hover:bg-green-600 transition max-[375px]:w-full">
            Search
          </button>
        </div> */}
      </div>

      <div className="flex justify-start items-center mt-12 relative bottom-2 right-0">
        <div className="flex items-center gap-1">
          <select
            onChange={e => {
              setItemsPerPage(parseInt(e.target.value));
            }}
            value={itemsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20} selected>20</option>
            <option value={50}>50</option>
          </select>
          <label>items</label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#F7FAFF]">
              {[
                "Product Type",
                "Payment Cycle",
                "Description",
                "Domain",
                "Last Payment",
                "Next Payment",
                "Billing Status",
                "Payment Method",
                "Action",
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
            {
              paymentDetails.length > 0 ? currentItems.map((detail, index) => (
                <React.Fragment key={index}>
                  <tr className="text-xs text-gray-400 relative">
                    <td className="px-2 pb-10 pt-3 text-center">
                      {detail?.product_type}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      {detail?.domain !== "" ? detail?.payment_cycle : "Yearly"}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      {detail?.description}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      {detail?.domain !== "" ? detail?.domain : detail?.domain}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      {formatDate(detail?.last_payment?._seconds, detail?.last_payment?._nanoseconds)}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      {formatDate(detail?.next_payment?._seconds, detail?.next_payment?._nanoseconds)}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      <button
                        className={`w-[80px] h-[30px] rounded hover:text-white capitalize ${
                          detail?.subscription_status === "Cancelled"
                          ? "text-red-700 border-2 border-red-500 hover:bg-red-500"
                          : detail?.subscription_status === "Expired"
                          ? "bg-gray-300 text-gray-700 border-2 border-gray-500 hover:bg-gray-700"
                          : detail?.subscription_status === "Cancel Requested"
                          ? "text-yellow-600 border-2 border-yellow-600 hover:bg-gray-300"
                          : detail?.subscription_status?.toLowerCase() === "manual"
                          ? "text-yellow-600 border-2 border-yellow-600 hover:bg-gray-300"
                          : "text-green-500 border-2 border-green-500 hover:bg-green-500"
                        }`}
                      >
                        {detail?.subscription_status}
                      </button>
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      <span className="flex items-center justify-center">
                        {detail?.payment_method ? (
                          <>
                            <img
                              src={
                                detail?.payment_method?.toLowerCase() === "stripe"
                                ? stripeImage
                                : detail?.payment_method?.toLowerCase() === "paystack"
                                ? paystackImage
                                : ""
                              }
                              alt={detail?.payment_method}
                              className="h-6 object-contain"
                            />
                            {"..."}{
                              Number(detail?.payment_details[detail?.payment_details?.length - 1]?.card_number) % 10000
                            }
                          </>
                        ) : (
                          <span className="text-gray-800 font-bold text-3xl text-center">
                            -
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-2 pb-10 pt-3 flex items-center content-center justify-center">
                      <button
                        type="button"
                        disabled={isAdmin}
                        className={`w-6 h-6 rounded-full border-2 ${isAdmin ? "border-[#8A8A8A]" : "border-green-500"} flex justify-center  items-center content-center my-auto`}
                        onClick={() => {toggleList(index)}}
                      >
                        <p className="mb-2 items-center content-center">...</p>
                      </button>
                    </td>
                  </tr>
                  {
                    showList === index && (
                      <div
                        className="p-2 w-80 max-w-[12rem] absolute right-1 -mt-10 z-10"
                        onClick={(e) => {e.stopPropagation()}}
                        ref={listRef}
                      >
                        <ul className="bg-gray-100 rounded-xl shadow-md space-y-2 flex-grow flex-col items-start justify-center p-1">
                          {
                            showListTable.map((list, idx) => {
                              if(list?.type === "link") {
                                if(list?.label === "View payment details") {
                                  return (
                                    <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={() => {navigate(list?.link, {state: detail})}}>{list?.label}</li>
                                  )
                                } else if(list?.label === "Renew Plan") {
                                  if(detail?.product_type?.toLowerCase() === "google workspace") {
                                    if(renewalStatus) {
                                      return (
                                        <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={(e) => {renewalAddToCart(e)}}>{list?.label}</li>
                                      )
                                    }
                                  }
                                } else if(list?.label === "Update Plan") {
                                  if(detail?.product_type?.toLowerCase() === "google workspace") {
                                    if(userDetails?.workspace?.workspace_status !== "trial") {
                                      return (
                                        <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={(e) => renewalAddToCart(e)}>{list?.label}</li>
                                      )
                                    }
                                  }
                                } else {
                                  if(detail?.product_type?.toLowerCase() === "google workspace") {
                                    return (
                                      <li key={idx} className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer" onClick={() => {navigate(list?.link, {state: detail})}}>{list?.label}</li>
                                    )
                                  }
                                }
                              } else if(list?.type === "modal") {
                                if(list?.label === "Cancel Subscription") {
                                  if(detail?.product_type?.toLowerCase() === "google workspace") {
                                    return (
                                      <li
                                        key={idx}
                                        className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-not-allowed bg-slate-300 opacity-50"
                                        // onClick={() => {
                                        //   setIsModalOpen(true);
                                        //   setModalType(list?.label);
                                        //   setSubscriptionId(detail?.id);
                                        //   setInvoiceData({});
                                        // }}
                                      >{list?.label}</li>
                                    )
                                  } else if(detail?.product_type?.toLowerCase() === "domain")  {
                                    return (
                                      <li
                                        key={idx}
                                        className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-not-allowed bg-slate-300 opacity-50"
                                        // onClick={() => {
                                        //   setIsModalOpen(true);
                                        //   setModalType("Cancel Domain");
                                        //   setSubscriptionId(detail?.id);
                                        //   setInvoiceData({});
                                        // }}
                                      >Cancel Domain</li>
                                    )
                                  }
                                } else if(list?.label === "Transfer Subscription") {
                                  if(detail?.product_type?.toLowerCase() === "google workspace") {
                                    return (
                                      <li
                                        key={idx}
                                        className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-not-allowed bg-slate-300 opacity-50"
                                        // onClick={() => {
                                        //   setIsModalOpen(true);
                                        //   setModalType(list?.label);
                                        //   setSubscriptionId(detail?.id);
                                        //   setInvoiceData({});
                                        // }}
                                      >{list?.label}</li>
                                    )
                                  } else if(detail?.product_type?.toLowerCase() === "domain") {
                                    return (
                                      <li
                                        key={idx}
                                        className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-not-allowed bg-slate-300 opacity-50"
                                        // onClick={() => {
                                        //   setIsModalOpen(true);
                                        //   setModalType("Transfer Domain");
                                        //   setSubscriptionId(detail?.id);
                                        //   setInvoiceData({});
                                        // }}
                                      >Transfer Domain</li>
                                    )
                                  }
                                } else {
                                  return (
                                    <li
                                      key={idx}
                                      className="font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-pointer"
                                      onClick={() => {
                                        setIsModalOpen(true);
                                        setModalType(list?.label);
                                        setSubscriptionId(detail?.id);
                                        if(list?.label === "View Invoice") {
                                          setInvoiceData(detail);
                                        } else {
                                          setInvoiceData({});
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
                </React.Fragment>
              )) : (
                <tr>
                  <td colSpan={9} className="text-center">No Data Available</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <ReactPaginate
          breakLabel="..."
          nextLabel={(
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
              }}
              disabled={currentPage === totalPages - 1}
              className={`px-3 py-1 text-sm ${
                currentPage === totalPages - 1
                  ? "bg-transparent text-gray-300"
                  : "bg-transparent text-black hover:bg-green-500 hover:text-white"
              } rounded-r transition`}
            >
              Next
            </button>
          )}
          onPageChange={(event) => {
            setCurrentPage(event.selected);
            // console.log(event.selected);
          }}
          pageRangeDisplayed={2}
          pageCount={totalPages}
          previousLabel={(
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 0));
              }}
              disabled={currentPage === 0}
              className={`px-3 py-1 text-sm ${
                currentPage === 0
                  ? "bg-transparent text-gray-300"
                  : "bg-transparent text-black hover:bg-green-500 hover:text-white"
              } rounded-l transition`}
            >
              Prev
            </button>
          )}

          containerClassName="flex justify-start"

          renderOnZeroPageCount={null}
          className="pagination-class-name"

          pageClassName="pagination-li"
          pageLinkClassName="pagination-li-a"

          breakClassName="pagination-ellipsis"
          breakLinkClassName="pagination-ellipsis-a"

          activeClassName="pagination-active-li"
          activeLinkClassName	="pagination-active-a"
        />
      </div>
      
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
              setInvoiceData({});
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
                        setInvoiceData({});
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
                        <div
                          className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[300px]'
                        ></div>
                        <div
                          className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[390px]'
                        ></div>
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
              setSubscriptionId("");
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
                        setSubscriptionId("");
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
                        setSubscriptionId("");
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        ) : modalType === "Cancel Domain" ?
        (
          <Dialog
            open={isModalOpen}
            as="div"
            className="relative z-40 focus:outline-none"
            onClose={() => {
              setIsModalOpen(false);
              setModalType("");
              setSubscriptionId("");
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
                    >Cancel Domain</DialogTitle>
                    <button
                      type='button'
                      className='text-3xl text-black'
                      onClick={() => {
                        setIsModalOpen(false);
                        setModalType("");
                        setSubscriptionId("");
                      }}
                    ><X /></button>
                  </div>

                  <div
                    className="mt-8"
                  >
                    <p
                      className="font-inter font-medium min-[440px]:text-xl max-[440px]:text-base text-[#222222] text-left"
                    >Are you sure want to cancel your domain?</p>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14"
                  >
                    <button
                      className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#12A833] w-[79px] rounded-[10px]"
                      type="button"
                      // onClick={(e) => {changeAutoRenewStatus(e)}}
                    >Yes</button>
                    <button
                      className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#EE1010] w-[79px] ml-[60px] rounded-[10px]"
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setModalType("");
                        setSubscriptionId("");
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        ) : modalType === "Transfer Domain" ?
        (
          <Dialog
            open={isModalOpen}
            as="div"
            className="relative z-40 focus:outline-none"
            onClose={() => {
              setIsModalOpen(false);
              setModalType("");
              setSubscriptionId("");
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
                    >Transfer Domain</DialogTitle>
                    <button
                      type='button'
                      className='text-3xl text-black'
                      onClick={() => {
                        setIsModalOpen(false);
                        setModalType("");
                        setSubscriptionId("");
                      }}
                    ><X /></button>
                  </div>

                  <div
                    className="mt-8"
                  >
                    <p
                      className="font-inter font-medium min-[440px]:text-xl max-[440px]:text-base text-[#222222] text-left"
                    >Are you sure want to transfer your domain?</p>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14"
                  >
                    <button
                      className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#12A833] w-[79px] rounded-[10px]"
                      type="button"
                      // onClick={(e) => {changeAutoRenewStatus(e)}}
                    >Yes</button>
                    <button
                      className="font-inter font-semibold min-[440px]:text-base max-[440px]:text-sm text-[#F0F0F3] text-center items-center py-[10px] bg-[#EE1010] w-[79px] ml-[60px] rounded-[10px]"
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setModalType("");
                        setSubscriptionId("");
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        ) : ""
      }
    </div>
  );
};

export default PaymentDetails;
