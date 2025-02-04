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
import { ArrowRightLeft, ChevronRight } from 'lucide-react';
import './invoice.css';
import './pagination.css';
import { getBase64ImageThunk, getBillingHistoryThunk, getDomainsListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays } from "date-fns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { setCurrentPageNumberSlice, setBillingHistoryFilterSlice, setItemsPerPageSlice } from "store/authSlice";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899";

const stripeImage = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/stripe.png?alt=media&token=23bd6672-665c-4dfb-9d75-155abd49dc58";
const paystackImage = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/paystack.png?alt=media&token=8faf3870-4256-4810-9844-5fd3c147d7a3";

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

      const adjustedWidth = (imgWidth * scaleFactor) - 10;
      const adjustedHeight = (imgHeight * scaleFactor) - 10;

      const xOffset = (pdfWidth - adjustedWidth) / 2;
      const yOffset = (PdfHeight - adjustedHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, 0, adjustedWidth, adjustedHeight);

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
                  className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500"
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
                              detail?.payment_details?.transaction_data?.payment_method_details?.card?.last4 || "0000"
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
                          onClick={() => {downloadInvoice()}}
                          // disabled={!rolePermissionsSlice?.billing_history?.download ? true : false}
                          cypress-name="invoice_download"
                        >
                          <FaDownload className="text-green-500 w-full h-full" />
                        </button>
                      </div>
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
    </div>
  );
};

export default BillingHistory;
