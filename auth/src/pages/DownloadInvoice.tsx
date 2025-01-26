import { format } from "date-fns";
import { Check, Download, Plane, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addBillingHistoryThunk, addEmailsWithoutLoginThunk, addNewDomainWithoutLoginThunk, addSettingWithoutLoginThunk, addStaffWithoutLoginThunk, addSubscriptionWithoutLoginThunk, getPaymentMethodsWithoutLoginThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, makeDefaultPaymentMethodThunk, makeDefaultPaymentMethodWithoutLoginThunk, makeEmailAdminWithoutLoginThunk, plansAndPricesListThunk, setUserAuthTokenToLSThunk, setUserIdToLSThunk, udpateBusinessDataThunk } from "store/user.thunk";
import { currencyList } from "../components/CurrencyList";
import { setDefaultCurrencySlice } from "store/authSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import html2canvas from 'html2canvas-pro';
import jsPDF from "jspdf";

const superAdminPermissions = [
  {
      "name": "Dashboard",
      "value": true
  },
  {
      "name": "Profile",
      "value": true
  },
  {
      "name": "Domain",
      "value": true
  },
  {
      "name": "Payment Subscription",
      "value": true
  },
  {
      "name": "Email",
      "value": true
  },
  {
      "name": "Payment Method",
      "value": true
  },
  {
      "name": "Vouhcers",
      "value": true
  },
  {
      "name": "My Staff",
      "value": true
  },
  {
      "name": "Billing History",
      "value": true
  },
  {
      "name": "Settings",
      "value": true
  }
];

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899";

const DownloadInvoice: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // const { workSpaceFlowSlice } = useAppSelector(state => state.auth);
  // console.log("workSpaceFlowSlice...", workSpaceFlowSlice);

  const [invoiceModal, setInvoiceModal] = useState(false);
  const pdfRef = useRef(null);

  const data = location.state;
  console.log("data...", data);
  const [disabled, setDisabled] = useState(true);
    
  const today = new Date();
  const formattedDate = format(today, 'MMMM dd, yyyy');
  const formattedDate2 = format(today, 'MMMM dd');
  const formattedDate3 = format(today, 'dd-MM-yyyy HH.mm');
  
  const formattedToday = format(today, 'yyyy-MM-dd');
  
  const [todayDate, setTodayDate] = useState("");
  const [domainExpiryDate, setDomainExpiryDate] = useState("");
  const [planExpiryDate, setPlanExpiryDate] = useState("");
  console.log({todayDate, domainExpiryDate, planExpiryDate});
  const [paymentMethods, setPaymentMethods] = useState([]);
    
  useEffect(() => {
    const dayToday = new Date();
    setTodayDate(format(dayToday, "yyyy-MM-dd"));

    const trial = parseInt(location.state.plan.trial_period || 0);
    const planExpiryDateValue = new Date();
    planExpiryDateValue.setDate(dayToday.getDate() + trial);
    setPlanExpiryDate(format(planExpiryDateValue, "yyyy-MM-dd"));
    
    const domainExpiryDateValue = new Date();
    domainExpiryDateValue.setFullYear(dayToday.getFullYear() + 1);
    setDomainExpiryDate(format(domainExpiryDateValue, "yyyy-MM-dd"))
  }, [location.state]);

  const yearFromToday = () => {
    const aYaerFromNow = new Date(today);
    aYaerFromNow.setFullYear(today.getFullYear() + 1);
    return format(aYaerFromNow, "yyyy-MM-dd");
  };

  const customYearFromToday = (year) => {
    const aYaerFromNow = new Date(today);
    aYaerFromNow.setFullYear(today.getFullYear() + parseInt(year));
    return format(aYaerFromNow, "yyyy-MM-dd");
  };

  const monthFromToday = () => {
    const aYaerFromNow = new Date(today);
    aYaerFromNow.setDate(today.getDate() + 30);
    return format(aYaerFromNow, "yyyy-MM-dd");
  };

  const customDaysFromToday = (days) => {
    const aYaerFromNow = new Date(today);
    aYaerFromNow.setFullYear(today.getFullYear() + parseInt(year));
    return format(aYaerFromNow, "yyyy-MM-dd");
  };

  useEffect(() => {
    const saveAllData = async(e) => {
      try {
        await dispatch(udpateBusinessDataThunk({
          user_id: data?.customer_id,
          first_name: data?.formData?.first_name,
          last_name: data?.formData?.last_name,
          email: data?.formData?.email,
          phone_no: data?.formData?.phone_no,
          address: data?.formData?.address,
          state: '',
          city: '',
          country: data?.formData?.region,
          password: '',
          business_name: data?.formData?.business_name,
          business_state: data?.formData?.business_state,
          business_city: data?.formData?.business_city,
          business_zip_code: data?.formData?.business_zip_code,
          token: data?.token
        })).unwrap();
        const planData = await dispatch(plansAndPricesListThunk({subscription_id: data?.plan?.id})).unwrap();
        const domainSubscription = await dispatch(addSubscriptionWithoutLoginThunk({
          product_type: "domain",
          payment_cycle: "Yearly",
          customer_id: data?.customer_id,
          description: "domain purchase",
          domain: [data?.selectedDomain?.domain],
          last_payment: todayDate,
          next_payment: domainExpiryDate,
          payment_method: data?.payment_method,
          subscription_status: "auto renewal",
          plan_name_id: "",
          payment_details: [{
            type: `${
              data?.payment_method === "Stripe"
              ? data?.payment_result?.payment_method_details?.type
              : data?.payment_method === "paystack"
              ? "card"
              : ""
            }`,
            card_type: `${
              data?.payment_method === "Stripe"
              ? data?.payment_result?.payment_method_details?.card?.brand
              : data?.payment_method === "paystack"
              ? ""
              : ""
            }`,
            first_name: data?.formData?.first_name,
            last_name: data?.formData?.last_name,
            card_number: `${
              data?.payment_method === "Stripe"
              ? "000000000000"+data?.payment_result?.payment_method_details?.card?.last4
              : data?.payment_method === "paystack"
              ? "0000000000000000"
              : "0000000000000000"
            }`,
            plan_id: '',
            domain: data?.selectedDomain?.domain,
            phone: data?.formData?.phone_no,
            email: data?.formData?.email,
            country: data?.formData?.region,
            due_date: domainExpiryDate,
          }],
          plan_name: "",
          workspace_status: "",
          is_trial: false,
          license_usage: data?.license_usage,
          token: data?.token
        })).unwrap();
        const workspaceSubscription = await dispatch(addSubscriptionWithoutLoginThunk({
          product_type: "google workspace",
          payment_cycle: data?.period,
          customer_id: data?.customer_id,
          description: `google workspace purchase ${data?.plan?.plan_name}`,
          domain: [data?.selectedDomain?.domain],
          last_payment: todayDate,
          next_payment: planExpiryDate,
          payment_method: data?.payment_method,
          subscription_status: "auto renewal",
          plan_name_id: data?.plan?.id,
          payment_details: [{
            type: `${
              data?.payment_method === "Stripe"
              ? data?.payment_result?.payment_method_details?.type
              : data?.payment_method === "paystack"
              ? "card"
              : ""
            }`,
            card_type: `${
              data?.payment_method === "Stripe"
              ? data?.payment_result?.payment_method_details?.card?.brand
              : data?.payment_method === "paystack"
              ? ""
              : ""
            }`,
            first_name: data?.formData?.first_name,
            last_name: data?.formData?.last_name,
            card_number: `${
              data?.payment_method === "Stripe"
              ? "000000000000"+data?.payment_result?.payment_method_details?.card?.last4
              : data?.payment_method === "paystack"
              ? "0000000000000000"
              : "0000000000000000"
            }`,
            plan_id: planData?.data[0],
            domain: data?.selectedDomain?.domain?.domain,
            phone: data?.formData?.phone_no,
            email: data?.formData?.email,
            country: data?.formData?.region,
            due_date: planExpiryDate,
          }],
          plan_name: data?.plan?.plan_name,
          workspace_status: "trial",
          is_trial: false,
          license_usage: data?.license_usage,
          token: data?.token
        })).unwrap();
        console.log({domainSubscription, workspaceSubscription})
        const domainData = await dispatch(addNewDomainWithoutLoginThunk({
          customer_id: data?.customer_id,
          domain_name: data?.selectedDomain?.domain,
          domain_type: "primary",
          subscription_id: "0",
          business_name: data?.formData?.business_name,
          business_email: data?.formData?.email,
          license_usage: data?.license_usage,
          plan: "0",
          payment_method: data?.payment_method,
          domain_status: true,
          billing_period: "Yearly",
          renew_status: "auto renewal",
          subscription_status: "auto renewal",
          token: data?.token
        })).unwrap();
        await dispatch(addEmailsWithoutLoginThunk({
          user_id: data?.customer_id,
          domain_id: domainData?.domain_id,
          emails: [
            {
              first_name: data?.formData?.first_name,
              last_name: data?.formData?.last_name,
              email: `${data?.emailData?.username}`,
              password: data?.emailData?.password,
            }
          ],
          token: data.token
        })).unwrap();
        await dispatch(makeEmailAdminWithoutLoginThunk({domain_id: domainData?.domain_id, rec_id: `${data?.emailData?.username}`, token: data.token})).unwrap();
        await dispatch(addBillingHistoryThunk({
          user_id: data?.customer_id,
          transaction_id: `${
            data?.payment_method === "Stripe"
            ? data?.payment_result?.balance_transaction
            : data?.payment_method === "paystack"
            ? data?.payment_result?.transaction
            : ""
          }`,
          date: todayDate,
          invoice: `${
            data?.payment_method === "Stripe"
            ? data?.payment_result?.payment_method_details?.card?.network_transaction_id
            : data?.payment_method === "paystack"
            ? data?.payment_result?.reference
            : ""
          }`,
          customer_name: `${data?.formData?.first_name} ${data?.formData?.last_name}`,
          product_type: "domain",
          description: "domain purchase",
          domain: data?.selectedDomain?.domain,
          payment_method: data?.payment_method,
          payment_status: "Success",
          amount: `${currencyList?.find(item => item?.name === data?.currency)?.logo}${data?.selectedDomain?.price[data?.currency]}`,
          transaction_data: data?.payment_result,
          subscription_id: domainSubscription?.subscription_id
        }));
        await dispatch(addBillingHistoryThunk({
          user_id: data?.customer_id,
          transaction_id: `${
            data?.payment_method === "Stripe"
            ? data?.payment_result?.balance_transaction
            : data?.payment_method === "paystack"
            ? data?.payment_result?.transaction
            : ""
          }`,
          date: todayDate,
          invoice: `${
            data?.payment_method === "Stripe"
            ? data?.payment_result?.payment_method_details?.card?.network_transaction_id
            : data?.payment_method === "paystack"
            ? data?.payment_result?.reference
            : ""
          }`,
          product_type: "google workspace",
          description: `google workspace purchase ${data?.plan?.plan_name} ${data?.license_usage}`,
          domain: data?.selectedDomain?.domain,
          payment_method: data?.payment_method,
          payment_status: "Success",
          customer_name: `${data?.formData?.first_name} ${data?.formData?.last_name}`,
          amount: `${currencyList?.find(item => item?.name === data?.currency)?.logo}0`,
          transaction_data: data?.payment_result,
          subscription_id: workspaceSubscription?.subscription_id
        }));
        const methods = await dispatch(getPaymentMethodsWithoutLoginThunk({user_id: data?.customer_id, token: data?.token})).unwrap();
        // console.log(methods?.paymentMethods);
        const defaultPaymentId = methods?.paymentMethods?.find(item => item?.method_name === data?.payment_method)?.id;
        // console.log(defaultPaymentId);
        await dispatch(makeDefaultPaymentMethodWithoutLoginThunk({user_id: data?.customer_id, payment_method_id: defaultPaymentId, token: data?.token}));
        const role = await dispatch(addSettingWithoutLoginThunk({user_type: "Super Admin", user_id: data?.customer_id, permissions: superAdminPermissions, token: data?.token})).unwrap();
        // settingId
        await dispatch(addStaffWithoutLoginThunk({user_id: data?.customer_id, first_name: data?.formData?.first_name, last_name: data?.formData?.last_name, email: data?.formData?.email, phone_no: data?.formData?.phone_no, user_type_id: role?.settingId, token: data?.token}))
        setDisabled(false);
      } catch (error) {
        console.log("error");
        if(error?.message === "Error adding customer subscription"){
          handleGoToDashboard(e);
        }
      }
    };

    if(data && todayDate && domainExpiryDate && planExpiryDate) {
      saveAllData();
    } else {
      console.log("no data");
    }
  }, [data, todayDate, domainExpiryDate, planExpiryDate])

  const handleGoToDashboard = async(e) => {
    e.preventDefault();
    try {
      await dispatch(setUserAuthTokenToLSThunk({token: data?.token})).unwrap();
      await dispatch(setUserIdToLSThunk(data?.customer_id)).unwrap();
      navigate('/dashboard', {state: {from: 'otp'}});
    } catch (error) {
              
      toast.error("Error purchasing");
      console.log(error)
    } finally {
      try {
        await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
        await dispatch(getUserIdFromLSThunk()).unwrap();
        navigate('/dashboard', {state: {from: 'subscribe'}})
      } catch (error) {
        console.log("Error on token");
      }
    }
  };

  const getPaymentMethodsList = async() => {
    try {
      const methods = await dispatch(getPaymentMethodsWithoutLoginThunk({user_id: data?.customer_id, token: data?.token})).unwrap();
      setPaymentMethods(methods?.paymentMethods);
    } catch (error) {
      setPaymentMethods([]);
    }
  };

  useEffect(() => {
    getPaymentMethodsList();
  }, [data]);
  
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

      const adjustedWidth = imgWidth * scaleFactor;
      const adjustedHeight = imgHeight * scaleFactor;

      const xOffset = (pdfWidth - adjustedWidth) / 2;
      const yOffset = (PdfHeight - adjustedHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, adjustedWidth, adjustedHeight);

      pdf.save('invoice.pdf');
    } else {
      console.error("Image data is invalid or empty", imgData);
    };
  };

  return (
    <div>
      {
        disabled ? (
          <div className="fixed top-0 bottom-0 left-0 right-0 inset-0 bg-white z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center py-4">
              <div
                className="w-full max-w-[930px] bg-white p-4 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="flex justify-start pt-2 pb-4 items-center mb-6 border-b border-[#E4E4E4]">
                  <h3
                    className="font-montserrat font-medium text-base text-black"
                  >Your payment request is being processed...</h3>
                </div>
                <div className="pt-2 pb-4 w-full max-w-[600px] font-montserrat font-medium text-xs text-black">
                  <ul>
                    <li className="py-2">This is a secure payment gateway using 128 bit SSL encryption.</li>
                    <li className="py-2">When you submit the transaction, the server will take about 1 to 5 seconds to process, but it 
                    may take longer at certain times.</li>
                    <li className="py-2">Please do not press “Submit” button once again or the “Back” or “Refresh” buttons.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-w-full max-w-[500px] mx-auto py-1 border-b border-black0 flex items-center flex-col justify-center">
            <div className="p-[10px] rounded-full mx-auto w-32 h-32 bg-[#1251D4] bg-opacity-5">
              <div className="rounded-full bg-[#43C148] w-full h-full items-center align-middle">
                {/* <BiCheck className="w-20 h-20 text-white" /> */}
                <Check className="w-24 h-24 text-white mx-auto pt-[13px]" />
              </div>
            </div>

            <p className="mt-7 mb-5 font-inter font-normal text-base text-black">Your payment has been processed successfully.</p>

            <div className="min-w-full bg-white shadow-lg rounded-[20px] p-8">
              <div className="flex flex-col">
                {/* Date */}
                <div className="flex justify-between py-[10px] items-center align-middle">
                  <p className="font-inter font-normal text-base text-[#8A8A8A] text-left">Date</p>
                  <p className="font-inter font-normal text-base text-black text-end !mt-0">{formattedDate3}</p>
                </div>

                {/* Customer */}
                <div className="flex justify-between py-[10px]">
                  <p className="font-inter font-normal text-base text-[#8A8A8A] text-left">Customer</p>
                  <p className="font-inter font-normal text-base text-black text-end !mt-0">{data?.formData?.first_name} {data?.formData?.last_name}</p>
                </div>

                {/* Reference ID */}
                <div className="flex justify-between py-[10px]">
                  <p className="font-inter font-normal text-base text-[#8A8A8A] text-left">Reference ID</p>
                  <p className="font-inter font-normal text-base text-black text-end !mt-0">
                    {
                      data?.payment_method === "Stripe"
                      ? data?.payment_result?.payment_method_details?.card?.network_transaction_id
                      : data?.payment_method === "paystack"
                      ? data?.payment_result?.reference
                      : ""
                    }
                  </p>
                </div>

                {/* Payment method */}
                <div className="flex justify-between py-[10px]">
                  <p className="font-inter font-normal text-base text-[#8A8A8A] text-left">Payment method</p>
                  <p className="font-inter font-normal text-base text-black text-end !mt-0 capitalize">{data?.payment_method}</p>
                </div>

                {/* Items */}
                <div className="flex justify-between py-[10px]">
                  <p className="font-inter font-normal text-base text-[#8A8A8A] text-left">Items (2)</p>
                  <p className="font-inter font-normal text-base text-black text-end !mt-0 uppercase flex flex-col">
                    <span>{data?.selectedDomain?.domain}</span>
                    <span>{data?.plan?.plan_name}</span>
                  </p>
                </div>

                {/* Total */}
                <div className="flex justify-between mt-3 py-[10px]">
                  <p className="font-inter font-normal text-base text-[#1D1B23] text-left">Total</p>
                  <p className="font-inter font-normal text-base text-black text-end !mt-0">{currencyList?.find(item => item?.name === data?.currency)?.logo}{data?.finalTotalPrice}</p>
                </div>

                {/* Download invoice  */}
                <div className="flex justify-between mt-5 pt-[10px]">
                  <button type="button" className="font-inter font-semibold text-base text-[#12A833] underline text-left" onClick={() => {setInvoiceModal(true)}}>Download invoice</button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="font-inter font-semibold text-base text-[#F0F0F3] w-full max-w-[416px] text-center mx-auto py-2 my-5 rounded-[10px] bg-[#12A833]"
              onClick={(e) => handleGoToDashboard(e)}
            >Go to Dashboard</button>
          </div>
        )
      } 

      <Dialog
        open={invoiceModal}
        as="div"
        className="relative z-40 focus:outline-none"
        onClose={() => {
          setInvoiceModal(false);
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
                  className="h-5 text-[#12A833] cursor-pointer hover:text-[#E02424]"
                  onClick={() => {setInvoiceModal(false)}}
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
                      className='absolute top-0 w-full h-full bg-[#12A833] transform -skew-y-[11deg] origin-top-left z-10'
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
                          src={logo}
                          className='w-[51px] rounded-full object-cover'
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className='text-center py-1 border-b border-black'
                  >
                    <h3 className='font-inter text-[black] text-lg'>Receipt from Hordanso LLC</h3>
                    <p className='font-inter text-[#B3B7B8] text-sm'>Receipt #{
                      data?.payment_method === "Stripe"
                      ? data?.payment_result?.payment_method_details?.card?.network_transaction_id
                      : data?.payment_method === "paystack"
                      ? data?.payment_result?.reference
                      : ""
                    }</p>
                  </div>

                  <div
                    className='flex justify-between text-[#B3B7B8] px-20 py-5 w-full overflow-x-auto'
                  >
                    <table className="w-full min-w-[400px]">
                      <tbody>
                        <tr>
                          <td className="font-inter font-normal text-sm items-start text-start content-start">Inovice To</td>
                          <td className="flex flex-col font-inter font-normal text-sm text-black content-start">
                            <p>{data?.formData?.first_name} {data?.formData?.last_name}</p>
                            <p>{data?.formData?.email}</p>
                            <p>{data?.formData?.region}</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Method</td>
                           <td>
                            <img
                              src={paymentMethods?.find(item => item?.method_name?.toLowerCase() === data?.payment_method?.toLowerCase())?.method_image}
                              alt={data?.payment_method}
                              className="w-10 object-contain"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Cycle</td>
                          <td className="flex flex-col font-inter font-normal text-sm text-black content-start">{data?.period}</td>
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
                          <th className="w-[100px] text-center border-b border-black">Unit Price</th>
                          <th className="w-[100px] text-center border-b border-black">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
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
                        </tr>
                        <tr>
                          <td className="font-inter font-normal text-sm text-black content-start text-left py-1 border-b border-black">Google Workspace</td>
                          <td className="font-inter font-normal text-sm text-black content-start text-center py-1 border-b border-black">{data?.license_usage}</td>
                          <td className="font-inter font-normal text-sm text-black text-right py-1 border-b border-black">
                            <div className="inline-block">
                              <span className="inline-block">{data?.license_usage}</span>
                              <X className="inline-block w-4 h-4 text-black mx-[2px]" />
                              <span className="inline-block">{currencyList?.find(item => item?.name === data?.currency)?.logo}{parseFloat(data?.plan?.amount_details?.find(amount => amount?.currency_code === data?.currency)?.price?.find(priceList => priceList?.type === data?.period)?.discount_price)?.toFixed(2)}</span>
                            </div>
                          </td>
                          <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                            {currencyList?.find(item => item?.name === data?.currency)?.logo}
                            {
                              (parseInt(data?.license_usage) * parseFloat(data?.plan?.amount_details?.find(amount => amount?.currency_code === data?.currency)?.price?.find(priceList => priceList?.type === data?.period)?.discount_price)).toFixed(2)
                            }
                          </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td></td>
                          <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Voucher</td>
                          <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                            -{currencyList?.find(item => item?.name === data?.currency)?.logo}
                            {data?.discountedPrice}
                          </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td></td>
                          <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Tax</td>
                          <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                            {currencyList?.find(item => item?.name === data?.currency)?.logo}
                            {data?.taxedPrice}
                          </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td></td>
                          <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Total</td>
                          <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                            {currencyList?.find(item => item?.name === data?.currency)?.logo}
                            {data?.finalTotalPrice}
                          </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td></td>
                          <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Amount Charged</td>
                          <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                            {currencyList?.find(item => item?.name === data?.currency)?.logo}
                            {data?.finalTotalPrice}
                          </td>
                        </tr>
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

export default DownloadInvoice;
