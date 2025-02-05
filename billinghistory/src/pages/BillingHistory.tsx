import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
import { TiExportOutline } from "react-icons/ti";
// import PaymentModal from "../components/PaymentModal";
import DateSearch from "../components/DateSearch";
// import html2canvas from "html2canvas";
import html2canvas from 'html2canvas-pro';
import jsPDF from "jspdf";
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js'
import BillingInvoice from "../components/BillingInvoice";
import { ArrowRightLeft, ChevronRight, Download, X } from 'lucide-react';
import './invoice.css';
import './pagination.css';
import { getBase64ImageThunk, getBillingHistoryThunk, getDomainsListThunk, getPaymentSubscriptionsListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { setCurrentPageNumberSlice, setBillingHistoryFilterSlice, setItemsPerPageSlice } from "store/authSlice";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";


const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c";
// const logo = "";
const visa = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/visa-logo-grey.png?alt=media&token=00881596-2fad-4385-82bb-a0269ae4b4fb";
// const visa = "";

const stripeImageUrl = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/stripe.png?alt=media&token=23bd6672-665c-4dfb-9d75-155abd49dc58";
const paystackImageUrl = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/paystack.png?alt=media&token=8faf3870-4256-4810-9844-5fd3c147d7a3";

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

const BillingHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { customerId, billingHistoryFilterSlice, currentPageNumber, itemsPerPageSlice, rolePermission } = useAppSelector(state => state.auth);
  const domainRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [pdfDownload, setPdfDownload] = useState('hidden');
  const [domains, setDomains] = useState([]);
  // console.log(domains);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [search, setSearch] = useState("");
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [currentInvoiceData, setCurrentInvoiceData] = useState<object|null>(null);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [subscription, setSubscription] = useState<object|null>(null);
  // console.log("subscription...", subscription);
  
  const [base64ImageLogo, setBase64ImageLogo] = useState("");
  // console.log("base64ImageLogo...", base64ImageLogo);
  const [stripeImage, setStripeImage] = useState("");
  const [paystackImage, setPaystackImage] = useState("");
  // console.log("paymentMethodImage...", paymentMethodImage);

  const tableHeader = [
    {name: "Transaction ID", label: "transaction_id"},
    {name: "Date / Invoice", label: "created_at"},
    {name: "Product Type", label: "product_type"},
    {name: "Description", label: "description"},
    {name: "Domain", label: "domain"},
    {name: "Payment Method", label: "payment_method"},
    {name: "Status", label: ""},
    {name: "Amount", label: "amount"},
    {name: "Invoice", label: ""},
  ]
    
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

    checkPermission("Billing History");
  }, [rolePermission]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const initialFilter = {
    user_id: customerId,
    start_date: "",
    end_date: "",
    domain: "",
    sortdata: {
      sort_text: "",
      order: "asc"
    }
  };

  const [billingHistoryFilter, setBillingHistoryFilter] = useState(billingHistoryFilterSlice === null ? initialFilter : billingHistoryFilterSlice);
  // console.log("billingHistoryFilter...", billingHistoryFilter);

  useEffect(() => {
    const setBillingHistoryFilterToSlice = async() => {
      await dispatch(setBillingHistoryFilterSlice(billingHistoryFilter));
    };

    setBillingHistoryFilterToSlice();
  }, [billingHistoryFilter]);
  
  const getDomainsList = async() => {
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      setDomains(result?.data);
    } catch (error) {
      setDomains([]);
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
    getDomainsList();
  }, []);

  
  const handleClickOutside = (event: MouseEvent) => {
    if(domainRef.current && !domainRef.current.contains(event.target as Node)) {
      setDomainDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(domains.length > 0 && search !== "") {
      setDomainDropdownOpen(true);
    }
  }, [domains, search]);

  const [range, setRange] = useState<[Date | null, Date | null]|null>(null);
  // console.log("range...", range);
  
  const handleChange = (value: [Date | null, Date | null]) => {
    setRange(value);
  };

  const renderValue = (date: [Date, Date]) => {
    if (!date[0] || !date[1]) return "Select Date Range";
    return `${format(date[0], 'MMM d')} - ${format(date[1], 'MMM d, yyyy')}`;
  };

  useEffect(() => {
    if(range === null) {
      setBillingHistoryFilter({
        user_id: customerId,
        start_date: "",
        end_date: "",
        domain: selectedDomain
      });
    } else {
      setBillingHistoryFilter({
        user_id: customerId,
        start_date: `${range[0] === null ? "" : format(range[0], "yyyy-MM-dd")}`,
        end_date: `${range[1] === null ? "" : format(range[1], "yyyy-MM-dd")}`,
        domain: selectedDomain
      });
    }
  }, [customerId, selectedDomain, range]);

  const formatDate2 = (datee) => {

    const date = new Date(datee);
    // const date = new Date();

    const formattedDate = format(date, "yyyy-MM-dd");
    return formattedDate;
  };

  const [BillingDetails, setBillingDetails] = useState([]);
  console.log("billing details...", BillingDetails);

  const getBillingHistoryData = async() => {
    try {
      const result = await dispatch(getBillingHistoryThunk(billingHistoryFilter)).unwrap();
      setBillingDetails(result?.data);
    } catch (error) {
      setBillingDetails([]);
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

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { name: 'Transaction ID', selector: (row:any) => row.transaction_id, sortable: true},
    { name: 'Date / Invoice', selector: (row:any) => row.date, sortable: false},
    { name: 'Production Type', selector: (row:any) => row.product_type, sortable: true},
    { name: 'Description', selector: (row:any) => row.description, sortable: true},
    { name: 'Domain', selector: (row:any) => row.domain, sortable: true},
    { name: 'Payment Method', selector: (row:any) => row.payment_method, sortable: true},
    { name: 'Status', selector: (row:any) => row.payment_status, sortable: true},
    { name: 'Amount', selector: (row:any) => row.amount, sortable: true},
    { name: 'Invoice', sortable: false},
  ]);

  useEffect(() => {
    if(BillingDetails?.length > 0) {
      const newData = BillingDetails?.map((item) => ({
        transaction_id: item?.transaction_id,
        date: `${formatDate(item?.created_at?._seconds, item?.created_at?._nanoseconds)}\n${item?.invoice}`,
        product_type: item?.product_type,
        description: item?.description,
        domain: item?.domain,
        payment_method: item?.payment_method,
        amount: item?.amount,
      }))
    }
  }, [BillingDetails]);
  
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

  const getBase64ImageStripe = async() => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: stripeImageUrl})).unwrap();
      setStripeImage(result?.base64);
    } catch (error) {
      setStripeImage("");
    }
  };
  const getBase64ImagePaystack = async() => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: paystackImageUrl})).unwrap();
      setPaystackImage(result?.base64);
    } catch (error) {
      setStripeImage("");
    }
  };

  useEffect(() => {
    getBase64ImageStripe();
    getBase64ImagePaystack();
  }, []);
  
  const getSubscriptionList = async() => {
    try {
      const result = await dispatch(getPaymentSubscriptionsListThunk({customer_id: customerId, start_date: "", end_date: "", domain_name: ""})).unwrap();
      setSubscriptionList(result?.subscriptions);
    } catch (error) {
      setSubscriptionList([]);
    }
  };

  useEffect(() => {
    getSubscriptionList();
  }, [customerId]);

  useEffect(() => {
    if(subscriptionList?.length > 0 && currentInvoiceData) {
      setSubscription(subscriptionList?.find(item => item?.id === currentInvoiceData?.subscription_id));
    } else {
      setSubscription(null);
    }
  }, [subscriptionList, currentInvoiceData]);
  
  const [currentPage, setCurrentPage] = useState(billingHistoryFilterSlice === null ? 0 : currentPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageSlice);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = BillingDetails?.slice(indexOfFirstItem, indexOfLastItem);
  // console.log("currentItems...", currentItems);
  const totalPages = Math.ceil(BillingDetails?.length / itemsPerPage);
  // console.log({currentPage, totalPages, lenght: currentItems?.length});

  useEffect(() => {
    if(BillingDetails?.length > 0 && totalPages < currentPage + 1) {
      if(totalPages-1 < 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(totalPages-1);
      }
    }
  }, [totalPages, currentPage, BillingDetails]);

  useEffect(() => {
    const setCurrentPageNumberToSlice = async() => {
      await dispatch(setCurrentPageNumberSlice(currentPage));
    }

    setCurrentPageNumberToSlice();
  }, [currentPage]);

  useEffect(() => {
    const setItemsPerPageToSlice = async() => {
      await dispatch(setItemsPerPageSlice(itemsPerPage)).unwrap();
    }

    setItemsPerPageToSlice();
  }, [itemsPerPage]);

  useEffect(() => {
    getBillingHistoryData();
  }, [billingHistoryFilter]);

  const formatDate = (seconds, nanoseconds) => {
    const miliseconds = parseInt(seconds) * 1000 + parseInt(nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();

    const formattedDate = format(date, "MMM dd, yyyy, h:mm:ss a");
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

  const exportPdf = async() => {
    const element = await pdfRef.current;
    // console.log("element...", element);

    if(element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      // console.log(canvas);
      const imgData = canvas.toDataURL('image/png');
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

      pdf.save('revenue.pdf');
    } else {
      console.log("No element found.");
    }
  };

  const downloadInvoice = async() => {
    // console.log("clicked")
    const element = await invoiceRef.current;
    // console.log(element);
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

  return (
    <div className="flex flex-col gap-2 bg-white z-1">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-green-500 text-3xl font-medium">Billing History</h1>
        <p className="text-gray-900 text-sm">View your billing details and download invoices</p>
      </div>
      <div className="flex flex-col sm:flex-col md:flex-row  gap-4  justify-between p-4 bg-gray-100">
        <div className="flex flex-col sm:flex-col md:flex-row   gap-4">
          <DateRangePicker
            range={predefinedRanges}
            placeholder="Select Date Range"
            style={{ width: 200 }}
            onChange={handleChange}
            value={range}
            showHeader={false}
            renderValue={renderValue} // Custom render for the selected value
            calendarSnapping={true}
            cleanable
          />
          <div className="relative align-self-start" ref={domainRef}>
            <input
              type='text'
              className='border border-transparent bg-transparent text-gray-700 p-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 w-80'
              placeholder="Auto search domain list"
              name='serach'
              onChange={e => {
                setSelectedDomain("");
                setSearch(e.target.value);
              }}
              value={selectedDomain || search}
              onFocus={() => {setDomainDropdownOpen(true)}}
              cypress-name="city_input"
            />
            <IoIosArrowDown
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
                domainDropdownOpen ? "rotate-180" : ""
              }`}
              onClick={toggleDropdown}
            />
            {
              domainDropdownOpen && (
                <div className='w-full absolute mt-1 bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md max-h-32 overflow-auto'>
                  {
                    domains?.filter(name => name?.domain_name.toLowerCase().includes(search.toLowerCase())).map((domain, idx) => (
                      <p
                        key={idx}
                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                        onClick={() => {
                          setSelectedDomain(domain?.domain_name);
                          setSearch("");
                          setDomainDropdownOpen(false);
                        }}
                        dropdown-name="city-dropdown"
                      >{domain?.domain_name}</p>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
        <div className="flex items-center gap-0">
          
          <button
            className="text-green-500 border-2 border-green-500 rounded-md p-2 hover:bg-green-200 transition flex items-center gap-2"
            style={{
              backgroundColor:"#A7F3D0",
            }}
            type="button"
            onClick={() => {exportPdf()}}
          >
            <TiExportOutline className="text-green-500 text-xl rotate-180" />
            Export
          </button>
        </div>
      </div>

      <div className="flex justify-start items-center mt-3 relative bottom-2 right-0">
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
      
      {/* <DataTable columns={colDefs} data={BillingDetails} fixedHeader pagination style={{'white-space': 'nowrap'}} /> */}

      <div className="overflow-x-auto">
        <table className="min-w-[1360px] w-full" ref={pdfRef}>
          <thead>
            <tr className="bg-gray-100">
              {tableHeader.map((header, index) => (
                <th
                  key={index}
                  className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500 text-nowrap"
                >
                  {header?.name}
                  {
                    header?.label === "domain" ||
                    header?.label === "amount" ||
                    header?.label === "created_at"
                    ? (
                      <span className="ml-1"><button type="button" onClick={() => {
                        setBillingHistoryFilter({
                          ...billingHistoryFilter,
                          sortdata: {
                            sort_text: header?.label,
                            order: billingHistoryFilter?.sortdata?.sort_text === header?.label
                            ? billingHistoryFilter?.sortdata?.order === "desc"
                              ? "asc"
                              : "desc"
                            : "asc"
                          }
                        })
                      }}><ArrowRightLeft className="w-3 h-3" style={{rotate: "90deg"}} /></button></span>
                    ) : ""
                  }
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              BillingDetails?.length > 0 ? (currentItems?.map((detail, index) => (
                <React.Fragment key={index}>
                  <tr className="text-xs text-gray-400">
                    <td className="px-2 pb-10 pt-3 text-center text-green-500">
                      {detail?.transaction_id}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center flex flex-col" style={{width: '180px'}}>
                      {formatDate(detail?.created_at?._seconds, detail?.created_at?._nanoseconds)}
                      <small className="text-green-500 text-xs">{detail?.invoice}</small>
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center" style={{width: '180px'}}>
                      {detail?.product_type}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      {detail?.description}
                    </td>
  
                    <td className="px-2 pb-10 pt-3 text-center">
                      {detail?.domain}
                    </td>
  
                    <td className="px-2 pb-10 pt-3 text-center">
                      {/* <span className="flex items-center justify-center">
                        <img
                          src="/images/visa.png"
                          alt="Visa"
                          className="h-4 mr-1"
                        />
                        <span className="text-[0.75rem] text-gray-600 font-semibold">
                          {detail.paymentMethod}
                        </span>
                      </span> */}
                      {/* {detail?.payment_method} */}
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
                              detail?.transaction_data?.payment_method_details?.card?.last4 || "0000"
                            }
                          </>
                        ) : (
                          <span className="text-gray-800 font-bold text-3xl text-center">
                            -
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      <button className="bg-green-500 text-white hover:bg-opacity-95 w-[80px] h-[30px] rounded">
                        {detail?.payment_status}
                      </button>
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center text-green-500">
                      {detail?.amount}
                    </td>
                    <td className="cursor-pointer px-2 pb-10 pt-3">
                      <div className="w-full flex justify-center">
                        <button
                          type="button"
                          className="w-4 h-4 mx-auto"
                          onClick={() => {
                            setIsInvoiceOpen(true);
                            setCurrentInvoiceData(detail);
                          }}
                          // disabled={!rolePermissionsSlice?.billing_history?.download ? true : false}
                          cypress-name="invoice_download"
                        >
                          <FaDownload className="text-green-500 w-full h-full" />
                        </button>
                      </div>
                      {/* <div className={pdfDownload}>
                        <BillingInvoice pdfRef={invoiceRef} data={detail} />
                      </div> */}
                    </td>
                  </tr>
                </React.Fragment>
              ))) : (
                <tr>
                  <td colSpan={10} className="text-center">No Data Available</td>
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

      <Dialog
        open={isInvoiceOpen}
        as="div"
        className="relative z-40 focus:outline-none"
        onClose={() => {
          setIsInvoiceOpen(false);
          setCurrentInvoiceData(null);
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
                    setIsInvoiceOpen(false);
                    setCurrentInvoiceData(null);
                  }}
                />
              </div>
              <div
                className='max-w-[700px]'
                ref={invoiceRef}
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
                      <p className='mr-1 text-white font-normal font-inter text-sm p-0'>{formatDateInvoice(currentInvoiceData?.date)?.top}</p>
                      <p className='mr-1 text-white font-normal font-inter text-sm p-0 mt-0'>{formatDateInvoice(currentInvoiceData?.date)?.bottom}</p>
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
                  <p className='font-inter text-[#B3B7B8] text-sm'>Receipt #{currentInvoiceData?.invoice}</p>
                </div>

                <div
                  className='flex justify-between text-[#B3B7B8] px-20 py-5 w-full overflow-x-auto'
                >
                  <table className="w-full min-w-[400px]">
                    <tbody>
                      <tr>
                        <td className="font-inter font-normal text-sm items-start text-start content-start">Inovice To</td>
                        <td className="flex flex-col font-inter font-normal text-sm text-black content-start">
                          <p>{subscription?.payment_details[subscription?.payment_details?.length - 1]?.first_name} {subscription?.payment_details[subscription?.payment_details?.length - 1]?.last_name}</p>
                          <p>{subscription?.payment_details[subscription?.payment_details?.length - 1].email}</p>
                          <p>{subscription?.payment_details[subscription?.payment_details?.length - 1]?.region}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Method</td>
                        <td>
                          <img
                            src={
                              currentInvoiceData?.payment_method?.toLowerCase() === "stripe"
                              ? stripeImage
                              : currentInvoiceData?.payment_method?.toLowerCase() === "paystack"
                              ? paystackImage
                              : ""
                            }
                            alt={currentInvoiceData?.payment_method}
                            className="w-10 object-contain"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Cycle</td>
                        <td className="flex flex-col font-inter font-normal text-sm text-black content-start">{subscription?.payment_cycle}</td>
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
                        <td className="font-inter font-normal text-sm text-black content-start text-left py-1 border-b border-black capitalize">{currentInvoiceData?.description}</td>
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
                          {currentInvoiceData?.amount}
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
    </div>
  );
};

export default BillingHistory;
