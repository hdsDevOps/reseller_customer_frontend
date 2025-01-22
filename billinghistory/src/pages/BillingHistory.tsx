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
import './invoice.css';
import { getBillingHistoryThunk, getDomainsListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { setCurrentPageNumberSlice, setBillingHistoryFilterSlice, setItemsPerPageSlice } from "store/authSlice";

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
  const { customerId, billingHistoryFilterSlice, currentPageNumber, itemsPerPageSlice } = useAppSelector(state => state.auth);
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const initialFilter = {
    user_id: customerId,
    start_date: "",
    end_date: "",
    domain: ""
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

  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
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

      const imgWidth = canvas.width / 2;
      const imgHeight = canvas.height / 2;

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);

      pdf.save('revenue.pdf');
    } else {
      console.log("No element found.");
    }
  };

  const downloadInvoice = async() => {
    await setPdfDownload("hidden-for-pdf");
    const element = invoiceRef.current;
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

      const adjustedWidth = imgWidth * scaleFactor;
      const adjustedHeight = imgHeight * scaleFactor;

      const xOffset = (pdfWidth - adjustedWidth) / 2;
      const yOffset = (PdfHeight - adjustedHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, adjustedWidth, adjustedHeight);

      pdf.save('invoice.pdf');
    } else {
      console.error("Image data is invalid or empty", imgData);
    };

    setPdfDownload('hidden');
  };
  return (
    <div className="flex flex-col gap-2 bg-white z-1">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-green-500 text-3xl font-medium">Billing History</h1>
        <p className="text-gray-900 text-sm">
          Set up your email accounts here and you can add users & edit your
          admin details.
        </p>
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
        <table className="min-w-[1360px] w-full" ref={pdfRef}>
          <thead>
            <tr className="bg-gray-100">
              {[
                "Transaction ID",
                "Date / Invoice",
                "Production Type",
                "Description",
                "Domain",
                "Payment Method",
                "Status",
                "Amount",
                "Invoice",
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
                      {detail?.payment_method}
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center">
                      <button className="bg-green-500 text-white hover:bg-opacity-95 w-[80px] h-[30px] rounded">
                        {detail?.payment_status}
                      </button>
                    </td>
                    <td className="px-2 pb-10 pt-3 text-center text-green-500">
                      {detail?.amount}
                    </td>
                    <td className="cursor-pointer flex justify-center">
                      <button
                        type="button"
                        className="flex items-center justify-center mt-3 w-4 h-4"
                        onClick={() => {downloadInvoice()}}
                        // disabled={!rolePermissionsSlice?.billing_history?.download ? true : false}
                        cypress-name="invoice_download"
                      >
                        <FaDownload className="text-green-500 w-full h-full" />
                      </button>
                      <div className={pdfDownload}>
                        <BillingInvoice pdfRef={invoiceRef} data={detail} />
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))) : (
                <tr>
                  <td colSpan={10}>No Data Available</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-12 relative bottom-2 right-0">
        {/* <div className="flex items-center gap-1">
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
        </div> */}
        <div className="flex">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 0));
            }}
            disabled={currentPage === 0}
            className={`px-3 py-1 text-sm ${
              currentPage === 0
                ? "bg-transparent text-gray-300"
                : "bg-transparent hover:bg-green-500 hover:text-white"
            } rounded-l transition`}
          >
            Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index);
              }}
              className={`px-3 py-1 text-sm mx-1 rounded ${
                currentPage === index
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-black hover:bg-green-500 hover:text-white"
              } transition`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
            }}
            disabled={currentPage === totalPages - 1}
            className={`px-3 py-1 text-sm ${
              currentPage === totalPages - 1
                ? "bg-transparent text-gray-300"
                : "bg-transparent hover:bg-green-500 hover:text-white"
            } rounded-r transition`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;
