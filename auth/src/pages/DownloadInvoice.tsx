import { format } from "date-fns";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addEmailsWithoutLoginThunk, addNewDomainWithoutLoginThunk, addSubscriptionWithoutLoginThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, makeEmailAdminWithoutLoginThunk, setUserAuthTokenToLSThunk, setUserIdToLSThunk, udpateBusinessDataThunk } from "store/user.thunk";
import { currencyList } from "../components/CurrencyList";

const DownloadInvoice: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // const { workSpaceFlowSlice } = useAppSelector(state => state.auth);
  // console.log("workSpaceFlowSlice...", workSpaceFlowSlice);

  const data = location.state;
  console.log("data...", data);
    
  const today = new Date();
  const formattedDate = format(today, 'MMMM dd, yyyy');
  const formattedDate2 = format(today, 'MMMM dd');
  const formattedDate3 = format(today, 'dd-MM-yyyy HH.mm');
  
  const formattedToday = format(today, 'yyyy-MM-dd');
  
  const [todayDate, setTodayDate] = useState("");
  const [domainExpiryDate, setDomainExpiryDate] = useState("");
  const [planExpiryDate, setPlanExpiryDate] = useState("");
  console.log({todayDate, domainExpiryDate, planExpiryDate})
    
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

  const handleGoToDashboard = async(e) => {
    e.preventDefault();
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
      await dispatch(addSubscriptionWithoutLoginThunk({
        product_type: "domain",
        payment_cycle: "Yearly",
        customer_id: data?.customer_id,
        description: "domain purchase",
        domain: [data?.selectedDomain],
        last_payment: todayDate,
        next_payment: domainExpiryDate,
        payment_method: "visa",
        subscription_status: "auto renewal",
        plan_name_id: "",
        payment_details: [{
          first_name: data?.formData?.first_name,
          last_name: data?.formData?.last_name,
          card_number: '123456789098',
          billing_detail_id: '',
        }],
        plan_name: "",
        workspace_status: "",
        is_trial: false,
        license_usage: data?.license_usage,
        token: data?.token
      })).unwrap();
      await dispatch(addSubscriptionWithoutLoginThunk({
        product_type: "google workspace",
        payment_cycle: data?.period,
        customer_id: data?.customer_id,
        description: "google workspace purchase",
        domain: [data?.selectedDomain],
        last_payment: todayDate,
        next_payment: planExpiryDate,
        payment_method: "visa",
        subscription_status: "auto renewal",
        plan_name_id: data?.plan?.id,
        payment_details: [{
          first_name: data?.formData?.first_name,
          last_name: data?.formData?.last_name,
          card_number: '123456789098',
          billing_detail_id: '',
        }],
        plan_name: data?.plan?.plan_name,
        workspace_status: "trial",
        is_trial: false,
        license_usage: data?.license_usage,
        token: data?.token
      })).unwrap();
      const domainData = await dispatch(addNewDomainWithoutLoginThunk({
        customer_id: data?.customer_id,
        domain_name: data?.selectedDomain,
        domain_type: "primary",
        subscription_id: "0",
        business_name: data?.formData?.business_name,
        business_email: data?.formData?.email,
        license_usage: data?.license_usage,
        plan: "0",
        payment_method: "visa",
        domain_status: true,
        billing_period: "Yearly",
        renew_status: "Auto-renwal",
        subscription_status: "Auto-renwal",
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
  }

  return (
    <div>
      <div className="min-w-full max-w-[500px] mx-auto py-10 flex items-center flex-col justify-center">
        <div className="p-[10px] rounded-full mx-auto w-32 h-32 bg-[#1251D4] bg-opacity-5">
          <div className="rounded-full bg-[#43C148] w-full h-full items-center align-middle">
            {/* <BiCheck className="w-20 h-20 text-white" /> */}
            <Check className="w-20 h-20 text-white mx-auto my-auto" />
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
              <p className="font-inter font-normal text-base text-black text-end !mt-0">A06453826151</p>
            </div>

            {/* Payment method */}
            <div className="flex justify-between py-[10px]">
              <p className="font-inter font-normal text-base text-[#8A8A8A] text-left">Payment method</p>
              <p className="font-inter font-normal text-base text-black text-end !mt-0">{data?.payment_method}</p>
            </div>

            {/* Items */}
            <div className="flex justify-between py-[10px]">
              <p className="font-inter font-normal text-base text-[#8A8A8A] text-left">Items (2)</p>
              <p className="font-inter font-normal text-base text-black text-end !mt-0 uppercase flex flex-col">
                <span>{data?.selectedDomain}</span>
                <span>{data?.plan?.plan_name}</span>
              </p>
            </div>

            {/* Total */}
            <div className="flex justify-between mt-3 py-[10px]">
              <p className="font-inter font-normal text-base text-[#1D1B23] text-left">Total</p>
              <p className="font-inter font-normal text-base text-black text-end !mt-0">{currencyList?.find(item => item?.name === data?.currency)?.logo}{data?.price}</p>
            </div>

            {/* Download invoice  */}
            <div className="flex justify-between mt-5 pt-[10px]">
              <button type="button" className="font-inter font-semibold text-base text-[#12A833] underline text-left">Download invoice</button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="font-inter font-semibold text-base text-[#F0F0F3] w-full max-w-[416px] text-center mx-auto py-2 my-5 rounded-[10px] bg-[#12A833]"
          onClick={(e) => handleGoToDashboard(e)}
        >Go to Dashboard</button>
      </div>
    </div>
  );
};

export default DownloadInvoice;
