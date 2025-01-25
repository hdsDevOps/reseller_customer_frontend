import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import ReviewForm from "../components/Review/ReviewForm";
import PaymentMethodForm from "../components/Review/PaymentMethodForm";
import { useAppDispatch, useAppSelector } from "store/hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { BiSolidEditAlt } from "react-icons/bi";
import { TbInfoTriangleFilled } from "react-icons/tb";
import { getPaymetnMethodsThunk, paystackPayThunk, plansAndPricesListThunk, stripePayThunk, udpateBusinessDataThunk } from "store/user.thunk";
import { format } from "date-fns";
import { currencyList } from "../components/CurrencyList";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseFill } from "react-icons/ri";
import StripeCheckout from "react-stripe-checkout";
import { PaystackButton } from "react-paystack";

const initialTaxForm = {
  tax_status: 'Business',
  pan_number: '',
  tan_number: '',
};

const initialContact = {
  first_name: '',
  last_name: ''
};

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location state...", location.state);
  const dispatch = useAppDispatch();

  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  const [data, setData] = useState(location.state);
  console.log("data...", data);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  console.log("payment methods...", paymentMethods);
  const [paymentMethodHover, setPaymentMethodHover] = useState(false);

  const [addressDetails, setAddressDetails] = useState(location.state.formData);
  // console.log("addressDetails...", addressDetails);

  const [planDate, setPlanDate] = useState(format(new Date(), "MMMM dd"));

  useEffect(() => {
    const today = new Date();
    // console.log("today before...", today);
    const trialPeriod = Number(data?.plan?.trial_period);
    
    today.setDate(today?.getDate() + trialPeriod);
    // console.log("today after...", today);
    
    setPlanDate(format(today, "MMMM dd"));
  }, [data?.period]);

  useEffect(() => {
    setData({
      ...data,
      formData: addressDetails
    });
  }, [addressDetails]);

  const initialEdit = {
    first_name: data?.formData?.first_name,
    last_name: data?.formData?.last_name,
    phone_no: data?.formData?.phone_no,
    business_name: data?.formData?.business_name,
    business_state: data?.formData?.business_state,
    business_city: data?.formData?.business_city,
    zipcode: data?.formData?.zipcode,
    country: data?.formData?.country
  };
  
  const [isChecked, setIsChecked] = useState(false);

  const plan = location.state?.plan;
  // console.log("plan...", plan);
  
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCitites] = useState([]);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});
  // console.log({country, state, city});
  // console.log("countries...", countries);
  // console.log("states...", states);
  // console.log("cities...", cities);
  // console.log({countryName, stateName, cityName});
  const [taxForm, setTaxForm] = useState(initialTaxForm);

  const topForm = [
    { label: 'Tax status', name: 'tax_status', placeholder: 'Select your text status', type: 'select', },
    { label: 'PAN (optional)', name: 'pan_number', placeholder: 'Enter your PAN number', type: 'text', },
    { label: 'TAN (optional)', name: 'tan_number', placeholder: 'Enter your TAN number', type: 'text', },
  ];
  const bottomForm = [
    { label: 'Business name', name: 'business_name', placeholder: 'Enter your Business Name', type: 'text', },
    { label: 'First Name', name: 'first_name', placeholder: 'Enter your First Name', type: 'text', },
    { label: 'Last Name', name: 'last_name', placeholder: 'Enter your Last Name', type: 'text', },
    { label: 'Address', name: 'address', placeholder: 'Enter your Address', type: 'text', },
    { label: 'Zip code', name: 'zipcode', placeholder: 'Enter your Zip Code', type: 'number', },
    { label: 'State', name: 'business_state', placeholder: 'Select your State', type: 'drowpdown', },
    { label: 'City*', name: 'business_city', placeholder: 'Select your City', type: 'drowpdown', },
  ];
  
  const getPriceAmount = (array, period) => {
    const priceArray = array?.find(item => item?.currency_code === defaultCurrencySlice)?.price;
    const amount = priceArray?.find(item => item?.type === period)?.discount_price;
    return amount;
  };

  const today = new Date();
  const formattedDate = format(today, 'MMMM dd, yyyy');
  const formattedDate2 = format(today, 'MMMM dd');
  
  const formattedToday = format(today, 'yyyy-MM-dd');
  
  const [todayDate, setTodayDate] = useState("");
  const [domainExpiryDate, setDomainExpiryDate] = useState("");
  const [planExpiryDate, setPlanExpiryDate] = useState("");

  const [processingModalOpen, setProcessingModalOpen] = useState(false);

  const [allDataFilled, setAllDataFilled] = useState(false);
  console.log("allDataFilled....", allDataFilled);

  useEffect(() => {
    if(
      data?.formData?.business_name !== "" && data?.formData?.business_name?.trim() !== "" && data?.formData?.business_name !== null && data?.formData?.business_name !== undefined &&
      data?.formData?.first_name !== "" && data?.formData?.first_name?.trim() !== "" && data?.formData?.first_name !== null && data?.formData?.first_name !== undefined &&
      data?.formData?.last_name !== "" && data?.formData?.last_name?.trim() !== "" && data?.formData?.last_name !== null && data?.formData?.last_name?.trim() !== undefined &&
      data?.formData?.address !== "" && data?.formData?.address?.trim() !== "" && data?.formData?.address !== null && data?.formData?.address?.trim() !== undefined &&
      data?.formData?.zipcode !== "" && data?.formData?.zipcode?.trim() !== "" && data?.formData?.zipcode !== null && data?.formData?.zipcode?.trim() !== undefined &&
      data?.formData?.business_state !== "" && data?.formData?.business_state?.trim() !== "" && data?.formData?.business_state !== null && data?.formData?.business_state?.trim() !== undefined &&
      data?.formData?.business_city !== "" && data?.formData?.business_city?.trim() !== "" && data?.formData?.business_city !== null && data?.formData?.business_city?.trim() !== undefined
    ) {
      setAllDataFilled(true);
    } else {
      setAllDataFilled(false);
    }
  }, [data?.formData?.business_name, data?.formData?.first_name, data?.formData?.last_name, data?.formData?.address,data?.formData?.zipcode, data?.formData?.business_state, data?.formData?.business_city]);
    
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
  }, []);

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
    if(countries?.length > 0) {
      const countryData = countries?.find(item => item?.name === data?.formData?.country);
      setCountry(countryData);
    };
  }, [countries, data?.formData?.country]);

  useEffect(() => {
    if(states?.length > 0) {
      const stateData = states?.find(item => item?.name === data?.formData?.business_state);
      setState(stateData);
    };
  }, [states, data?.formData?.business_state]);

  const getPaymentMethodsList = async() => {
    try {
      const result = await dispatch(getPaymetnMethodsThunk()).unwrap();
      setPaymentMethods(result?.data);
    } catch (error) {
      setPaymentMethods([]);
    }
  };

  useEffect(() => {
    getPaymentMethodsList();
  }, []);

  const [countryDropdownOpen, setCountryDropdownOpen] = useState<Boolean>(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState<Boolean>(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<Boolean>(false);
  // console.log("isDropdownOpen", isDropdownOpen);
  const [isNumberValid, setIsNumberValid] = useState(false);
  // console.log({isNumberValid});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [primaryContact, setPrimaryContact] = useState(initialContact);
  // console.log("primaryContact...", primaryContact);
  
  const [domainPrice, setDomainPrice] = useState(0);
  const [primaryContactHover, setPrimaryContactHover] = useState(false);

  useEffect(() => {
    setDomainPrice(data?.selectedDomain?.price[defaultCurrencySlice]);
  }, [defaultCurrencySlice, state]);

  const handleChangeContactFormData = () => {
    setData({
      ...data,
      formData: {
        ...data.formData,
        first_name: primaryContact.first_name,
        last_name: primaryContact.last_name
      }
    });
    setAddressDetails({
      ...addressDetails,
      first_name: primaryContact.first_name,
      last_name: primaryContact.last_name
    });
    setIsOpenModal(false);
    setPrimaryContact(initialContact);
  };
  
  const handleClickOutsideCountry = (event: MouseEvent) => {
    if(countryRef.current && !countryRef.current.contains(event.target as Node)) {
      setCountryDropdownOpen(false);
    }
  };
  const handleClickOutsideState = (event: MouseEvent) => {
    if(stateRef.current && !stateRef.current.contains(event.target as Node)) {
      setStateDropdownOpen(false);
    }
  };
  const handleClickOutsideCity = (event: MouseEvent) => {
    if(cityRef.current && !cityRef.current.contains(event.target as Node)) {
      setCityDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideCountry);
    document.addEventListener('mousedown', handleClickOutsideState);
    document.addEventListener('mousedown', handleClickOutsideCity);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCountry);
      document.removeEventListener('mousedown', handleClickOutsideState);
      document.removeEventListener('mousedown', handleClickOutsideCity);
    };
  }, []);

  useEffect(() => {
    if(countries.length > 0 && countryName !== "") {
      setCountryDropdownOpen(true);
    }
  }, [countries, countryName]);

  useEffect(() => {
    if(states.length > 0 && stateName !== "") {
      setStateDropdownOpen(true);
    }
  }, [states, stateName]);

  useEffect(() => {
    if(cities.length > 0 && cityName !== "") {
      setCityDropdownOpen(true);
    }
  }, [cities, cityName]);

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
      }
    };
    axios(config)
      .then(res => {
        setCountries(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        setCountries([]);
        console.log("error...", err);
      })
  }, []);
  
  useEffect(() => {
    if(country?.iso2 !== undefined) {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${country?.iso2}/states`,
        headers: {
          'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
        }
      };
      axios(config)
      .then(res => {
        setStates(res.data);
      })
      .catch(err => {
        setStates([]);
        console.log("error...", err);
      })
    } else {
      setStates([]);
    }
  }, [country]);
  
  useEffect(() => {
    if(country?.iso2 !== undefined && state?.iso2 !== undefined) {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${country?.iso2}/states/${state?.iso2}/cities`,
        headers: {
          'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
        }
      };
      axios(config)
      .then(res => {
        setCitites(res.data);
      })
      .catch(err => {
        setCitites([]);
        console.log("error...", err);
      })
    } else {
      setCitites([]);
    }
  }, [country, state]);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const makePayment = async(token) => {
    const body = {
      token,
      product: {
        name: `${data?.formData?.first_name} ${data?.formData?.last_name}`,
        price: data?.finalTotalPrice,
        productBy: "test",
        currency: defaultCurrencySlice,
        description: 'purchasing google workspace and domain',
        domain: {
          domain_name: data?.selectedDomain?.domain,
          type: "new",
          year: 1
        },
        workspace: {
          plan: data?.plan,
          license_usage: data?.license_usage,
          plan_period: data?.period,
          trial_plan: "yes"
        },
        customer_id: data?.customer_id,
        email: data?.email,
        voucher: data?.voucher?.voucher?.id || ""
      }
    };
    const headers={
      "Content-Type":"application/json"
    };
    try {
      setProcessingModalOpen(true);
      const result = await dispatch(stripePayThunk(body)).unwrap();
      console.log("result...", result);
      if(result?.message === "Payment successful") {
        navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: result?.charge, currency: defaultCurrencySlice, date: new Date() }});
      } else {
        toast.error("Error on payment method");
      }
    } catch (error) {
      toast.error("Error on payment method");
    }
  };

  const payStackConfig = {
    reference: (new Date()).getTime().toString(),
    email: data?.formData?.email,
    amount: data?.finalTotalPrice * 100,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: data?.formData?.first_name,
    lastName: data?.formData?.last_name,
    channels: ['card']
  };

  
  const body = {
    reference: (new Date()).getTime().toString(),
    email: data?.formData?.email,
    amount: data?.finalTotalPrice * 100,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: data?.formData?.first_name,
    lastName: data?.formData?.last_name,
    name: `${data?.formData?.first_name} ${data?.formData?.last_name}`,
    description: 'purchasing google workspace and domain',
    domain: {
      domain_name: data?.selectedDomain?.domain,
      type: "new",
      year: 1
    },
    workspace: {
      plan: data?.plan,
      license_usage: data?.license_usage,
      plan_period: data?.period,
      trial_plan: "yes" 
    },
    customer_id: data?.customer_id,
    voucher: data?.voucher?.voucher?.id || ""
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
      setProcessingModalOpen(true);
      // console.log(reference);
      navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: reference, currency: defaultCurrencySlice, date: new Date() }});
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
    text: 'Agree and continue',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <>
      <div
        className="flex flex-col w-full"
        // onSubmit={handleSubmit}
      >
        <div className="flex max-[700px]:flex-col items-center justify-start min-[700px]:gap-10 max-[700px]:gap-2 mt-8">
          <button
            className="flex flex-row items-center justify-center gap-3"
            onClick={() => {navigate('/summary', {state: data})}}
            type='button'
          >
            <IoIosArrowBack />
            <h6 className="text-green-500 text-[15px]">
              Back to previous page
            </h6>
          </button>
        </div>

        <div className='grid grid-cols-1 max-w-[961px] w-full mx-auto'>
          <h1 className="text-[30px] text-green-500 font-semibold ">
            Review and checkout
          </h1>
          <div className='grid grid-cols-1 max-w-[961px] w-full gap-4'>
            <div className='flex min-[768px]:flex-row max-[768px]:flex-col gap-2 justify-between w-full'>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <h4 className="font-inter font-normal text-xl text-black">{data?.plan?.plan_name}</h4>
                  {/* <h4 className="font-inter font-normal text-xl text-black">{item?.product_name}</h4> */}
                </div>
                <p>Your first {data?.plan?.trial_period} days are at no charge ( limited to 10 users). You can <span className='text-[#12A833]'>cancel at any time</span>.</p>
                <p>Recurs {data?.period?.toLowerCase() === "yearly" ? "yearly" : "monthly"} from {planDate}</p>
              </div>
              <div className='w-[140px] max-[768px]:w-full flex flex-col items-end text-end ml-auto'>
                <p className='font-inter font-normal text-xl text-black'>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{(parseFloat(getPriceAmount(data?.plan?.amount_details, data?.period))*data?.license_usage)?.toFixed(2)}&nbsp;{data?.period === "Yearly" ? "yearly" : "monthly"}</p>
                <p className='font-inter font-medium text-base text-black'>+applicable tax</p>
              </div>
            </div>

            <div className='flex min-[768px]:flex-row max-[768px]:flex-col gap-2 justify-between w-full'>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2'>
                  <h4 className="font-inter font-normal text-xl text-black">Domain</h4>
                  <h4 className="font-inter font-normal text-xl text-black">{data?.selectedDomain?.domain}</h4>
                </div>
                <p>Your annual plan will begin {formattedDate}. You can <span className='text-[#12A833]'>cancel at any time</span>.</p>
                <p>Charges today and recurs yearly on {formattedDate2}</p>
              </div>
              <div className='w-[140px] max-[768px]:w-full flex flex-col items-end text-end justify-end ml-auto'>
                <p className='font-inter font-normal text-xl text-black text-end ml-auto'>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{domainPrice} yearly</p>
                <p className='font-inter font-medium text-base text-black text-end ml-auto'>+applicable tax</p>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 items-start justify-start mt-[30px] col-span-1">
            <h1 className="font-inter font-semibold text-base text-black min-[500px]:pl-4 max-[500px]:pl-0">Customer Info</h1>
            <div className="mt-4 min-[500px]:pl-10 max-[500px]:pl-1 w-full flex flex-col justify-start items-start">
              {/* COMMENTED OUT, cuz WE DON'T STORE THESE VALUES */}
              {/* ACCOUNT TYPE */}
              {/* <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
                Account Type
                <GoInfo className="ml-2" />
              </h1>
              <p className="font-inter font-normal text-xs text-[#8A8A8A] mt-2">Organization</p>
              <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
                Tax information
                <GoInfo className="ml-2" />
              </h1> */}
              <div className="flex flex-col items-start justify-center w-full max-w-[600px] mt-3 gap-2">
                {/* COMMENTED OUT, cuz WE DON'T STORE THESE VALUES */}
                {/* TAX INFORMATION */}
                {/* {
                  topForm?.map((form, index) => {
                    if(form.type === "select") {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <select
                            name={form?.name}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setTaxForm({
                                ...taxForm,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={taxForm[form.name]}
                            required
                          >
                            <option value="Business" selected>Business</option>
                          </select>
                        </div>
                      )
                    } else {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <input
                            type={form.type}
                            name={form.name}
                            placeholder={form.placeholder}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setTaxForm({
                                ...taxForm,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={taxForm[form.name]}
                          />
                        </div>
                      )
                    }
                  })
                }

                <p className='font-inter font-normal text-xs text-[#12A833] py-3 border-b border-[#E4E4E4] w-full mb-2'>Add a GST identification number (GSTIN) (optional) </p> */}

                {/* CUSTOMER INFORMATION */}

                <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
                  Name and address
                  <GoInfo className="ml-2" />
                </h1>

                {
                  bottomForm.map((form, index) => {
                    if(form.name === "business_state") {
                      return (
                        <div
                          className='flex flex-col mb-2 w-full mx-auto relative'
                          ref={stateRef}
                        >
                          <label
                            className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                          >Business State</label>
                          <input
                            type="text"
                            name="business_state"
                            required
                            className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            onChange={(e) => {
                              setAddressDetails({
                                ...addressDetails,
                                business_state: '',
                                business_city: '',
                              });
                              setStateName(e.target.value);
                              setCityName('');
                              setState({});
                              setCity({});
                            }}
                            value={addressDetails?.business_state || stateName}
                            onFocus={() => {setStateDropdownOpen(true)}}
                            placeholder="Search your business state"
                            // cypress-name={item.name+"_input"}
                          />
                          {
                            stateDropdownOpen && (
                              <div className='w-full bg-[#E4E4E4] overflow-y-auto z-[10] px-2 border border-[#8A8A8A1A] rounded-md max-h-32 overflow-auto'>
                                {
                                  states?.filter(name => name?.name.toLowerCase().includes(stateName.toLowerCase())).map((state, idx) => (
                                    <p
                                      key={idx}
                                      className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                      dropdown-name="country-dropdown"
                                      onClick={() => {
                                        setAddressDetails({
                                          ...addressDetails,
                                          business_state: state?.name,
                                          business_city: ''
                                        });
                                        setStateName("");
                                        setCityName("");
                                        setState(state);
                                        setCity({});
                                        setStateDropdownOpen(false);
                                      }}
                                    >{state?.name}</p>
                                  ))
                                }
                              </div>
                            )
                          }
                        </div>
                      )
                    } else if(form.name === "business_city") {
                      return (
                        <div
                          className='flex flex-col mb-2 w-full mx-auto relative'
                          ref={cityRef}
                        >
                          <label
                            className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                          >Business City</label>
                          <input
                            type="text"
                            name="business_city"
                            required
                            className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            onChange={(e) => {
                              setAddressDetails({
                                ...addressDetails,
                                business_city: '',
                              });
                              setCityName(e.target.value);
                              setCity({});
                            }}
                            value={addressDetails?.business_city || cityName}
                            onFocus={() => {setCityDropdownOpen(true)}}
                            placeholder="Search your business city"
                            // cypress-name={item.name+"_input"}
                          />
                          {
                            cityDropdownOpen && (
                              <div className='w-full bg-[#E4E4E4] overflow-y-auto z-[10] px-2 border border-[#8A8A8A1A] rounded-md max-h-32 overflow-auto'>
                                {
                                  cities?.filter(name => name?.name.toLowerCase().includes(cityName.toLowerCase())).map((city, idx) => (
                                    <p
                                      key={idx}
                                      className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                      dropdown-name="country-dropdown"
                                      onClick={() => {
                                        setAddressDetails({
                                          ...addressDetails,
                                          business_city: city?.name
                                        });
                                        setCityName("");
                                        setCity(city);
                                        setCityDropdownOpen(false);
                                      }}
                                    >{city?.name}</p>
                                  ))
                                }
                              </div>
                            )
                          }
                        </div>
                      )
                    } else {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <input
                            type={form.type}
                            name={form.name}
                            placeholder={form.placeholder}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setAddressDetails({
                                ...addressDetails,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={addressDetails[form.name]}
                            required
                          />
                        </div>
                      )
                    }
                  })
                }

                <div className="flex flex-col items-start justify-start w-full gap-2 mb-4">
                  <h1 className="font-inter font-semibold text-sm flex flex-row items-center justify-center mr-2 relative">
                    Primary Contact
                    <GoInfo className="ml-2 w-4 h-4" onMouseOver={() => {setPrimaryContactHover(true)}} onMouseLeave={() => {setPrimaryContactHover(false)}}  />
                    {
                      primaryContactHover && (
                        <div className="absolute bg-white w-[220px] top-5 left-[13px] rounded-md">
                          <p className="bg-[#12A83330] px-4 py-3 w-full font-inter font-medium text-[10px] text-black rounded-md">This is your legal address of your organization or home</p>
                        </div>
                      )
                    }
                    <BiSolidEditAlt
                      className="ml-2 w-4 h-4"
                      onClick={() => {
                        setPrimaryContact({
                          first_name: data?.formData?.first_name,
                          last_name: data?.formData?.last_name
                        });
                        setIsOpenModal(true);
                      }}
                    />
                  </h1>
                  <div className="flex flex-col">
                    <p className="font-inter font-normal texte-xs text-[#8A8A8A]">{data?.formData?.first_name} {data?.formData?.last_name}</p>
                    <p className="font-inter font-normal texte-xs text-[#8A8A8A]">{data?.formData?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full relative">
            <div className="flex items-center mb-4 relative">
              <h2 className="text-lg font-bold">Payment method</h2>
              <GoInfo className="ml-2 w-4 h-4" onMouseOver={() => {setPaymentMethodHover(true)}} onMouseLeave={() => {setPaymentMethodHover(false)}}  />
              {
                paymentMethodHover && (
                  <div className="absolute bg-white w-[270px] top-7 left-7 rounded-md">
                    <p className="bg-[#12A83330] px-4 py-3 w-full font-inter font-medium text-[10px] text-black rounded-md">Available payment methods are determined by country and the type of payment selected in ‘How you pay’</p>
                  </div>
                )
              }
            </div>
            {/* Payment Options */}
            <div className="space-y-4">
              {
                paymentMethods?.length > 0 && paymentMethods?.map((method, index) => (
                  <label className="flex items-center justify-between p-2 cursor-pointer" key={index}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="option"
                        value={method?.method_name}
                        checked={paymentMethod === method?.method_name}
                        onChange={() => setPaymentMethod(method?.method_name)}
                        className="hidden"
                      />
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method?.method_name
                            ? "bg-green-500 border-green-500"
                            : "border-green-400"
                        }`}
                      >
                        {paymentMethod === method?.method_name && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-base font-medium capitalize">{method?.method_name}</span>
                    </div>
                    <div
                      className="w-16 h-16 bg-center bg-no-repeat bg-contain sm:w-20 sm:h-20"
                      style={{ backgroundImage: `url("${method?.method_image}")` }}
                    ></div>
                  </label>
                ))
              }
            </div>

            {/* WE ARE TAKING THIS INFO ON PAYMENT GATEWAY */}
            {/* Checkbox for Credit/Debit Card Address */}
            {/* <div className="flex items-center mb-4 space-x-3 ">
              <div
                className={`w-6 h-6 border-2 rounded-[5px] flex items-center justify-center cursor-pointer ${
                  isChecked ? "bg-green-500 border-green-500" : "border-green-500"
                }`}
                onClick={toggleCheckbox}
              >
                {isChecked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <label
                className="text-sm font-medium text-black cursor-pointer"
                onClick={toggleCheckbox}
              >
                Credit card or debit card details is the same as above
              </label>
            </div> */}

            {/* THIS SECTION IS COMMENTED OUT, cuz THE DATA ONLY REFLECTS FOR INDIA */}
            {/* Information Text */}
            {/* <div className="mb-4  w-[92%] ml-5 relative">
              <p className="text-[14px] text-gray-600 ">
                Reserve Bank of India requires that cards support automatic payments
                according to RBI regulations. If your card doesn't support automatic
                payments, you'll need to make manual payments or use a different card.
                We'll check your card in the next step.{" "}
                <a href="#" className="text-blue-600">
                  Learn more
                </a>
              </p>
              <TbInfoTriangleFilled className="absolute -left-8 top-1 text-[25px] text-yellow-400" />
            </div> */}

            {/* IRRELEVANT SECTION */}
            {/* Privacy Info */}
            {/* <div className="mb-4 w-[92%] ml-5 ">
              <p className="text-[11px] text-gray-400 ">
                The personal information that you provide here will be added to your
                payments profile. It will be stored securely and treated in accordance
                with the{" "}
                <a href="#" className="text-blue-600">
                  Google Privacy Policy
                </a>
                .
              </p>
            </div> */}

            {/* Terms and Conditions */}
            <div className="mb-6 w-[92%] ml-5 ">
              <p className="text-[15px]">
                By clicking{" "}
                <span className="font-bold text-black">Agree and continue</span>, you
                agree to the{" "}
                <a className="font-semibold text-green-500">
                  Google Workspace Agreement
                </a>
                ,{" "}
                <a className="font-semibold text-green-500">
                  Google Workspace purchase Agreement
                </a>
                , and{" "}
                <a className="font-semibold text-green-500 ">
                  Supplemental Terms and Conditions
                </a>{" "}
                for Google Workspace Free Trial Agreement.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-between w-full'>
          {
            allDataFilled
            ? paymentMethod?.toLowerCase() === "stripe"
              ? (
                <button type="button" className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto">
                  <StripeCheckout
                    name='Hordanso'
                    description="Purchasing google workspace and domain"
                    image="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899"
                    ComponentClass="div"
                    panelLabel="Submit"
                    // amount={data?.finalTotalPrice * 100}
                    // currency={defaultCurrencySlice}
                    stripeKey="pk_test_51HCGY4HJst0MFfZtYup1hAW3VcsAmcJJ4lwg9fDjPLvStToUiLixgF679sFDyWfVH1awUIU3UGOd2TyAYDUkJrPF002WD2USoG"
                    email={data?.formData?.email}
                    // billingAddress
                    token={makePayment}
                    allowRememberMe
                  >Agree and continue</StripeCheckout>
                </button>
              ) : paymentMethod?.toLowerCase() === "paystack"
              ? (
                <button
                  type="button"
                  className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto"
                  // onClick={() => {() => initializePayment(handleSuccess, handleClose)}}
                >
                  <PaystackButton {...componentProps} />
                </button>
              ) : (
                <button
                  type="button"
                  className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto"
                  onClick={() => {toast.warning("Please select a payment method")}}
                >
                  Agree and continue
                </button>
              )
            : (
              <button
                type="button"
                className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto"
                onClick={() => {toast.warning("Please fill all the inputs")}}
              >
                Agree and continue
              </button>
            )
          }
          <div
            className="absolute right-0 w-10 h-10 bg-center bg-no-repeat bg-contain bottom-11"
            style={{ backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/messaageIcon.png?alt=media&token=a078fd41-6617-4089-b891-b54970394dbf")` }}
          ></div>
        </div>
      </div>

      {
        isOpenModal && (
          <Dialog
            open={isOpenModal}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setIsOpenModal(false);
              setPrimaryContact(initialContact);
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <div className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[700px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >Edit Primary Contact Information</DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-black items-center'
                        onClick={() => {
                          setIsOpenModal(false);
                          setPrimaryContact(initialContact);
                        }}
                      ><RiCloseFill className="w-6 h-6" /></button>
                    </div>
                  </div>

                  <div
                    className="mt-8 px-8 grid grid-cols-1"
                  >
                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={e => {
                          setPrimaryContact({
                            ...primaryContact,
                            [e.target.name]: e.target.value
                          })
                        }}
                        value={primaryContact?.first_name}
                        placeholder="Enter first name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={e => {
                          setPrimaryContact({
                            ...primaryContact,
                            [e.target.name]: e.target.value
                          })
                        }}
                        value={primaryContact?.last_name}
                        placeholder="Enter last name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Email</label>
                      <input
                        type="email"
                        name="email"
                        disabled
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        value={data?.formData?.email}
                        placeholder="Enter first name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14 gap-5"
                  >
                    <button
                      className="py-[10px] rounded-[10px] bg-[#12A833] text-[#F0F0F3] align-middle focus:outline-none font-inter font-semibold text-base w-[105px]"
                      type="button"
                      onClick={() => {handleChangeContactFormData()}}
                    >Update</button>
                    <button
                      className="py-[10px] rounded-[10px] bg-[#E02424] text-[#F0F0F3] align-middle focus:outline-none font-inter font-semibold text-base w-[105px]"
                      type="button"
                      onClick={() => {
                        setIsOpenModal(false);
                        setPrimaryContact(initialContact);
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }

      {
        processingModalOpen && (
          <Dialog
            open={processingModalOpen}
            as="div"
            className="relative z-50 focus:outline-none"
            onClose={() => {
              setProcessingModalOpen(true);
            }}
            // static
          >
            <div className="fixed inset-0 top-0 bottom-0 left-0 right-0  bg-white z-50 w-screen overflow-y-auto">
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
    </>
  );
};

export default Review;
