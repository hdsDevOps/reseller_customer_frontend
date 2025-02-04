import React, { useEffect, useRef, useState } from 'react'
import { BiSolidEditAlt } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { TbInfoTriangleFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addBillingHistoryThunk, addEmailsThunk, addNewDomainThunk, addSettingThunk, addStaffThunk, addSubscriptionThunk, addToCartThunk, getDomainsListThunk, getPaymentMethodsThunk, getProfileDataThunk, hereMapSearchThunk, makeDefaultPaymentMethodThunk, makeEmailAdminThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk, stripePayThunk, udpateProfileDataThunk, useVoucherThunk } from 'store/user.thunk';
import { setCart, setDomains, setUserDetails, staffStatus, staffId, domainsState } from 'store/authSlice';
import { toast } from 'react-toastify';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { RiCloseFill } from 'react-icons/ri';
import useData from 'rsuite/esm/InputPicker/hooks/useData';
import { currencyList } from '../components/CurrencyList';
import StripeCheckout from "react-stripe-checkout";
import { PaystackButton } from "react-paystack";
import axios from 'axios';

const initialCartPrice = {
  total_year: 0,
  price: 0
};

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
      "name": "Vouchers",
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

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { customerId, domainsState, userDetails, defaultCurrencySlice } = useAppSelector(state => state.auth);
  console.log("domainsState...", domainsState);
  const [isChecked, setIsChecked] = useState(false);
  const [userData, setUserData] = useState(userDetails);
  console.log("userDetails...", userData);
  console.log(location.state);

  useEffect(() => {
    setUserData(userDetails);
  }, [userDetails]);

  console.log("location.state...", location.state);

  const cart = location.state?.cart;
  // console.log("cart...", cart);
  const appliedVoucher = location.state.voucher_code;
  console.log("appliedVoucher...", appliedVoucher);
  const [paymentMethodId, setPaymentMethodId] = useState("");

  const initialData = {
    customer_id: customerId,
    domain_name: location.state[0]?.product_name || "Domain",
    domain_type: "secondary",
    subscription_id: "",
    business_name: userDetails?.business_name,
    business_email: userDetails?.business_email,
    license_usage: "0",
    plan: "",
    payment_method: "",
    domain_status: true,
    billing_period: location.state[0]?.payment_cycle,
    renew_status: true,
    subscription_status: true
  };

  const [data, setData] = useState(initialData);
  // console.log("data...", data);

  const initialPrimaryContact = {
    first_name: userData?.first_name,
    last_name: userData?.last_name
  };
  
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

  const [primaryContact, setPrimaryContact] = useState(initialPrimaryContact);
  console.log("primaryContact...", primaryContact);
  const [primaryContactHover, setPrimaryContactHover] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [usedPlan, setUsedPlan] = useState<object|null>(null);
  console.log("usedPlan...", usedPlan);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  
  const [todayDate, setTodayDate] = useState("");
  const [domainExpiryDate, setDomainExpiryDate] = useState("");
  const [planExpiryDate, setPlanExpiryDate] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [stateDropdownOpen, setStateDropdownOpen] = useState<Boolean>(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<Boolean>(false);
  const [cartPrice, setCartPrice] = useState([initialCartPrice]);
  console.log("cartPrice...", cartPrice);
  const [workspacePrice, setWorkspacePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log("total price...", totalPrice);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0.00);
  console.log("finalTotalPrice...", finalTotalPrice);
  const [taxAmount, setTaxAmount] = useState(8.25);
  const [taxedPrice, setTaxedPrice] = useState(0.00);
  const [discountedPrice, setDiscountedPrice] = useState(0.00);
  const [preDiscountedPrice, setPreDiscountedPrice] = useState(0.00);
  const [paymentMethodHover, setPaymentMethodHover] = useState(false);
  const [nameAndAddressHover, setNameAndAddressHover] = useState(false);

  const [hereObject, setHereObject] = useState<object|null>(null);
  const [hereSearch, setHereSearch] = useState("");
  const [isHereDropdownOpen, setIsHereDropdownOpen] = useState(false);
  const [hereList, setHereList] = useState([]);
  const hereRef = useRef(null);

  useEffect(() => {
    if(typeof userDetails?.address === "object") {
      setHereObject(userDetails?.address);
    }
  }, [userDetails?.address]);

  useEffect(() => {
    setUserData({
      ...userData,
      address: hereObject,
      zipcode: hereObject?.address?.postalCode
    })
  }, [hereObject]);
  
  const [primaryDomain, setPrimaryDomain] = useState<object|null>(null);
  console.log("primaryDomain...", primaryDomain);
  const [allDataFilled, setAllDataFilled] = useState(false);

  useEffect(() => {
    if(
      userData?.business_name !== "" && userData?.business_name?.trim() !== "" && userData?.business_name !== null && userData?.business_name !== undefined &&
      userData?.first_name !== "" && userData?.first_name?.trim() !== "" && userData?.first_name !== null && userData?.first_name !== undefined &&
      userData?.last_name !== "" && userData?.last_name?.trim() !== "" && userData?.last_name !== null && userData?.last_name !== undefined &&
      userData?.address !== null && userData?.address !== undefined &&
      userData?.zipcode !== "" && userData?.zipcode?.trim() !== "" && userData?.zipcode !== null && userData?.zipcode !== undefined &&
      userData?.business_state !== "" && userData?.business_state?.trim() !== "" && userData?.business_state !== null && userData?.business_state !== undefined &&
      userData?.business_city !== "" && userData?.business_city?.trim() !== "" && userData?.business_city !== null && userData?.business_city !== undefined
    ) {
      setAllDataFilled(true);
    } else {
      setAllDataFilled(false);
    }
  }, [userData?.business_name, userData?.first_name, userData?.last_name, userData?.address,userData?.zipcode, userData?.business_state, userData?.business_city]);
  
  const getProfileData = async() => {
    try {
      const result = await dispatch(getProfileDataThunk({user_id: customerId, staff_id: staffId, is_staff: staffStatus})).unwrap();
      console.log("result...", result);
      await dispatch(setUserDetails(result?.customerData));
    } catch (error) {
      //
    }
  };

  const updateProfileData = async() => {
    try {
      const result = await dispatch(udpateProfileDataThunk({
        user_id: customerId,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userDetails?.email,
        phone_no: userDetails?.phone_no,
        address: userData?.address,
        state: userDetails?.state,
        city: userDetails?.city,
        country: userDetails?.country,
        password: '',
        business_name: userData?.business_name,
        business_state: userData?.business_state,
        business_city: userData?.business_city,
        zipcode: userData?.zipcode,
        staff_id: staffId,
        is_staff: staffStatus
      })).unwrap();
      // console.log("result...", result);
      await getProfileData();
      // toast.success("Business Information updated successfully");
      // navigate("/choose-your-domain", {state: { ...location.state}})
    } catch (error) {
      // toast.error("Error updating Business Information");
    }
  }

  useEffect(() => {
    if(countries?.length > 0 && userDetails?.country) {
      const findCountry = countries?.find(item => item?.name === userDetails?.country);
      if(findCountry) {
        setCountry(findCountry);
      }
    }
  }, [countries, userDetails?.country]);

  useEffect(() => {
    if(states?.length > 0 && userDetails?.business_state) {
      const findState = states?.find(item => item?.name === userData?.business_state);
      if(findState){
        setCountry(findState);
      }
    }
  }, [states, userDetails?.business_state]);

  useEffect(() => {
    if(countries?.length > 0 && userDetails?.business_city) {
      const findCity = countries?.find(item => item?.name === userData?.business_city);
      if(findCity) {
        setCountry(findCity);
      }
    }
  }, [countries, userDetails?.business_city]);
  
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
  const handleClickOutsideHere = (event: MouseEvent) => {
    if(hereRef.current && !hereRef.current.contains(event.target as Node)) {
      setIsHereDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideState);
    document.addEventListener('mousedown', handleClickOutsideCity);
    document.addEventListener('mousedown', handleClickOutsideHere);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideState);
      document.removeEventListener('mousedown', handleClickOutsideCity);
      document.removeEventListener('mousedown', handleClickOutsideHere);
    };
  }, []);

  useEffect(() => {
    if(hereList?.length > 0 && hereSearch !== "") {
      setIsHereDropdownOpen(true);
    }
  }, [hereList, hereSearch]);

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

  useEffect(() => {
    setPrimaryDomain(domainsState?.find(item => item?.domain_type === "primary"));
  }, [domainsState]);
    
  useEffect(() => {
    const dayToday = new Date();
    setTodayDate(format(dayToday, "yyyy-MM-dd"));

    const workspace_data = cart?.find(item => item?.product_type === "google workspace")?.payment_cycle;
    
    const planExpiryDateValue = new Date();
    if(workspace_data?.toLowerCase() === "yearly") {
      planExpiryDateValue.setFullYear(dayToday.getFullYear() + 1);
      setPlanExpiryDate(format(planExpiryDateValue, "yyyy-MM-dd"));
    } else {
      planExpiryDateValue.setDate(dayToday.getDate() + 30);
      setPlanExpiryDate(format(planExpiryDateValue, "yyyy-MM-dd"));
    }
    
    const domainExpiryDateValue = new Date();
    domainExpiryDateValue.setFullYear(dayToday.getFullYear() + 1);
    setDomainExpiryDate(format(domainExpiryDateValue, "yyyy-MM-dd"))
  }, [cart]);
    
  useEffect(() => {
    if(cart?.length > 0) {
      const total = cartPrice?.reduce((totalCart, item) => {
        let amount = parseFloat(item?.price) * parseInt(item?.total_year);
    
        console.log(`${item?.product_type}...`, totalCart + amount);
        return totalCart + amount;
      }, 0);
      console.log("cartTotal...", total);
      setTotalPrice(parseFloat(total.toFixed(2)));
      setTaxedPrice(parseFloat(((total * taxAmount) / 100).toFixed(2)));
      const discountedPercent = appliedVoucher === null
        ? 0.00
        : parseFloat(parseFloat(appliedVoucher?.voucher?.discount_rate)?.toFixed(2));
      const totalOutPrice = parseFloat((total + ((total * taxAmount) / 100)).toFixed(2));
      const discountedAMount = parseFloat(((totalOutPrice * discountedPercent) / 100).toFixed(2));
      setDiscountedPrice(discountedAMount);

      const finalDiscountedPrice = parseFloat((totalOutPrice - discountedAMount).toFixed(2));
      setFinalTotalPrice(finalDiscountedPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cart, appliedVoucher, cartPrice]);

  const getPlan = async() => {
    const workspaceCart = cart?.find(item => item?.product_type === "google workspace");
    if(workspaceCart) {
      try {
        const result = await dispatch(plansAndPricesListThunk({subscription_id: workspaceCart?.plan_name_id})).unwrap();
        setUsedPlan(result?.data[0]);
        const amountArray = result?.data[0]?.amount_details;
        const priceArray = amountArray?.find(amount => amount?.currency_code === defaultCurrencySlice)?.price;
        const finalArray = priceArray?.find(price => price?.type?.toLowerCase() === workspaceCart?.payment_cycle?.toLowerCase());
        setWorkspacePrice(finalArray?.discount_price);
      } catch (error) {
        setWorkspacePrice(0);
      }
    } else {
      const result = await dispatch(plansAndPricesListThunk({subscription_id: userDetails?.plan_name_id})).unwrap();
      setUsedPlan(result?.data[0]);
      const amountArray = result?.data[0]?.amount_details;
      const priceArray = amountArray?.find(amount => amount?.currency_code === defaultCurrencySlice)?.price;
      const finalArray = priceArray?.find(price => price?.type?.toLowerCase() === workspaceCart?.payment_cycle?.toLowerCase());
      setWorkspacePrice(finalArray?.discount_price);
    }
  };

  useEffect(() => {
    getPlan();
  }, [cart, defaultCurrencySlice, userDetails]);

  const getDomainPrice = () => {
    return 953.72;
  };

  const calculateCartAmount = (cart) => {
    if(cart?.length > 0) {
      const priceList = cart.map((item) => {
        if(item?.product_type === "google workspace"){
          return {total_year: item?.total_year, price: workspacePrice};
        } else if(item?.product_type?.toLowerCase() === "domain") {
          return {total_year: item?.total_year, price: item?.price[defaultCurrencySlice]};
        }
      });

      setCartPrice(priceList);
    } else {
      setCartPrice([initialCartPrice]);
    }
  };

  useEffect(() => {
    calculateCartAmount(cart);
  }, [cart, workspacePrice, defaultCurrencySlice]);

  useEffect(() =>{
    setData({
      ...data,
      customer_id: customerId,
    });
  }, [customerId]);

  const handleChangeContactFormData = () => {
    setUserData({
      ...userData,
      first_name: primaryContact?.first_name,
      last_name: primaryContact?.last_name
    });
    setIsOpenModal(false);
  };

  const getPaymentMethodsList = async() => {
    try {
      const result = await dispatch(getPaymentMethodsThunk({user_id: customerId})).unwrap();
      setPaymentMethods(result?.paymentMethods)
    } catch (error) {
      setPaymentMethods([]);
    }
  };

  useEffect(() => {
    getPaymentMethodsList();
  }, [customerId]);

  useEffect(() => {
    if(paymentMethods?.length > 0) {
      const defaultMethod = paymentMethods?.find(method  => method?.default);
      if(defaultMethod) {
        setPaymentMethod(defaultMethod?.method_name);
      } else {
        setPaymentMethod("");
      }
    } else {
      setPaymentMethod("");
    }
  }, [paymentMethods]);

  const today = new Date();
  const formattedDate = format(today, 'MMMM dd, yyyy');
  const formattedDate2 = format(today, 'MMMM dd');
  const [formattedDate3, setFormattedDate3] = useState(format(today, 'MMMM dd'));

  useEffect(() => {
    const dateFromNow = new Date(today);
    const paymentGoogle = cart?.find(item => item?.product_type === "google workspace");
    if(paymentGoogle) {
      if (paymentGoogle?.payment_cycle?.toLowerCase() === "yearly") {
        dateFromNow.setFullYear(dateFromNow.getFullYear() + 1);
        setFormattedDate3(format(dateFromNow, 'MMMM dd'));
      } else {
        dateFromNow.setDate(dateFromNow.getDate() + 30);
        setFormattedDate3(format(dateFromNow, 'MMMM dd'));
      }
    }
  })
  
  const formattedToday = format(today, 'yyyy-MM-dd');
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

  useEffect(() => {
    if(!location.state) {
      navigate('/dashboard')
    }
  }, [location.state]);

  const getHereMapData = async () => {
    try {
      const result = await dispatch(hereMapSearchThunk({address: hereSearch})).unwrap();
      // console.log("result...", result?.data?.items);
      setHereList(result?.data?.items);
    } catch (error) {
      setHereList([]);
    }
  };

  useEffect(() => {
    if(hereSearch !== "") {
      getHereMapData();
    }
  }, [hereSearch]);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const getUserDetails = async() => {
    try {
      const result = await dispatch(getProfileDataThunk({user_id: customerId})).unwrap();
      await dispatch(setUserDetails(result?.customerData));
    } catch (error) {
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  }

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
    { label: 'Business State', name: 'business_state', placeholder: 'Select your State', type: 'drowpdown', },
    { label: 'Business City*', name: 'business_city', placeholder: 'Select your City', type: 'drowpdown', },
  ];

  const getDomains = async() => {
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      await dispatch(setDomains(result?.data));
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

  console.log("domainsState...", domainsState);

  const addSubscriptionForWorkspace = async(item, result2) => {
    try {
      const planData = await dispatch(plansAndPricesListThunk({
        subscription_id: item?.plan_name_id
      })).unwrap();
      const subResult = await dispatch(addSubscriptionThunk({
        product_type: "google workspace",
        payment_cycle: item?.payment_cycle,
        customer_id: customerId,
        description: `purchase google workspace ${item?.product_name} ${item?.total_year}`,
        domain: [
          domainsState?.find(item => item?.domain_type === "primary")
          ? domainsState?.find(item => item?.domain_type === "primary")?.domain_name
          : cart?.find(item => item?.product_type === "domain")
          ? cart?.find(item => item?.product_type === "domain")?.product_name
          : ""
        ],
        last_payment: todayDate,
        next_payment: planExpiryDate,
        payment_method: paymentMethod,
        subscription_status: "auto renewal",
        plan_name_id: item?.plan_name_id,
        payment_details: [{
          type: `card`,
          card_type: `${
            paymentMethod === "Stripe"
            ? result2?.payment_method_details?.card?.brand
            : paymentMethod === "paystack"
            ? ""
            : ""
          }`,
          first_name: userData?.first_name,
          last_name: userData?.last_name,
          card_number: `${
            paymentMethod === "Stripe"
            ? "000000000000"+result2?.payment_method_details?.card?.last4
            : paymentMethod === "paystack"
            ? "0000000000000000"
            : "0000000000000000"
          }`,
          plan_id: planData?.data[0],
          domain: "",
          phone: userData?.phone_no,
          email: userData?.email,
          country: userData?.region,
          due_date: planExpiryDate,
        }],
        plan_name: usedPlan?.plan_name,
        workspace_status: item?.wokrspace_status === "trial" ? "trial" : "active",
        is_trial: false,
        license_usage: item?.total_year
      })).unwrap();
      console.log("result1...", subResult);
      if(subResult) {
        await addBillingHistory(item, result2, paymentMethod, "google workspace", subResult?.subscription_id);
      }
    } catch (error) {
      console.log(error);
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

  const addSubscriptionForDomain = async(item, result) => {
    const data = {
      product_type: "domain",
      payment_cycle: "Yearly",
      customer_id: customerId,
      description: "domain purchase",
      domain: [item?.product_name],
      last_payment: todayDate,
      next_payment: domainExpiryDate,
      payment_method: paymentMethod,
      subscription_status: "auto renewal",
      plan_name_id: "",
      payment_details: [{
        type: `card`,
        card_type: `${
          paymentMethod === "Stripe"
          ? result?.payment_method_details?.card?.brand
          : paymentMethod === "paystack"
          ? ""
          : ""
        }`,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        card_number: `${
          paymentMethod === "Stripe"
          ? "000000000000"+result?.payment_method_details?.card?.last4
          : paymentMethod === "paystack"
          ? "0000000000000000"
          : "0000000000000000"
        }`,
        plan_id: '',
        domain: item?.product_name,
        phone: userData?.phone_no,
        email: userData?.email,
        country: userData?.region,
        due_date: domainExpiryDate,
      }],
      plan_name: "",
      workspace_status: userData?.workspace ? userData?.workspace?.workspace_status : "trial",
      is_trial: false,
      license_usage: userData?.license_usage || cart?.find(item => item?.product_type === "google workspace")?.total_year
    };
    try {
      const subResult = await dispatch(addSubscriptionThunk(data)).unwrap();
      console.log("result2...", subResult);
      if(subResult) {
        await addBillingHistory(item, result, paymentMethod, "domain", subResult?.subscription_id);
        const domainData = await dispatch(addNewDomainThunk({
          customer_id: data?.customer_id,
          domain_name: item?.product_name,
          domain_type: cart?.find((item) => item?.product_type === "google workspace") ? cart?.find((item) => item?.product_type === "google workspace")?.workspace_status === "trial" ? "primary" : "secondary" : "secondary",
          subscription_id: "0",
          business_name: userData?.business_name,
          business_email: userData?.email,
          license_usage: cart?.find((item) => item?.product_type === "google workspace") ? cart?.find((item) => item?.product_type === "google workspace")?.total_year : userData?.license_usage ? userData?.license_usage : 0,
          plan: "0",
          payment_method: "Stripe",
          domain_status: true,
          billing_period: "Yearly",
          renew_status: "auto renewal",
          subscription_status: "auto renewal"
        })).unwrap();
        cart?.find((item) => item?.product_type === "google workspace")
        ? cart?.find((item) => item?.product_type === "google workspace")?.workspace_status === "trial"
          ? await dispatch(addEmailsThunk({
            user_id: customerId,
            domain_id: domainData?.domain_id,
            emails: [
              {
                first_name: userData?.first_name,
                last_name: userData?.last_name,
                email: cart?.find((item) => item?.product_type === "google workspace")?.emails?.username,
                password: cart?.find((item) => item?.product_type === "google workspace")?.emails?.password,
              }
            ]
          })).unwrap()
          : ""
        : "";
        cart?.find((item) => item?.product_type === "google workspace")
        ? cart?.find((item) => item?.product_type === "google workspace")?.workspace_status === "trial"
          ? await dispatch(makeEmailAdminThunk({domain_id: domainData?.domain_id, rec_id: cart?.find((item) => item?.product_type === "google workspace")?.emails?.username})).unwrap()
          : ""
        : "";
        await getDomains();
      }
    } catch (error) {
      console.log(error);
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

  const addSubscription = async(item) => {
    try {
      const result = await dispatch(addSubscriptionThunk({
        product_type: item?.product_type,
        payment_cycle: item?.payment_cycle,
        customer_id: customerId,
        description: item?.description || "google workspace",
        domain: [],
        last_payment: formattedToday,
        next_payment: item?.payment_cycle?.toLowerCase() === "yearly" ? yearFromToday() : monthFromToday(),
        payment_method: "VISA",
        subscription_status: "auto renewal",
        plan_name_id: "",
        payment_details: [{name: "asa", amount: location?.state?.price?.finalTotalPrice}],
        plan_name: "",
        workspace_status: "",
        is_trial: true
      })).unwrap();
      console.log("result3...", result);
    } catch (error) {
      console.log(error);
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

  const addDomain = async(item) => {
    try {
      const result = await dispatch(addNewDomainThunk({
        customer_id: customerId,
        domain_name: item?.product_name,
        domain_type: domainsState?.length > 0 ? "secondary" : "primary",
        subscription_id: "0",
        business_name: userData?.business_name,
        business_email: userData?.business_email || userData?.email,
        license_usage: domainsState?.length > 0 ? "0" : item?.total_year,
        plan: "0",
        payment_method: paymentMethod,
        domain_status: true,
        billing_period: "yearly",
        renew_status: true,
        subscription_status: true
      })).unwrap();
      console.log("result...", result);
    } catch (error) {
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getDomains();
    }
  };

  const updateCart = async() => {
    try {
      await dispatch(addToCartThunk({
        user_id: customerId,
        products: []
      })).unwrap();
      dispatch(setCart([]));
      // navigate('/add-cart');
    } catch (error) {
      console.log(error);
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

  const updateProfile = async() => {
    if(
      userData?.business_name !== "" && userData?.business_name?.trim() !== "" && userData?.business_name !== null && userData?.business_name !== undefined &&
      userData?.first_name !== "" && userData?.first_name?.trim() !== "" && userData?.first_name !== null && userData?.first_name !== undefined &&
      userData?.last_name !== "" && userData?.last_name?.trim() !== "" && userData?.last_name !== null && userData?.last_name !== undefined &&
      userData?.address !== "" && userData?.address !== null && userData?.address !== undefined &&
      userData?.zipcode !== "" && userData?.zipcode?.trim() !== "" && userData?.address !== null && userData?.address !== undefined &&
      userData?.business_state !== "" && userData?.business_state?.trim() !== "" && userData?.business_state !== null && userData?.business_state !== undefined &&
      userData?.business_city !== "" && userData?.business_city?.trim() !== "" && userData?.business_city !== undefined && userData?.business_city !== null
    ) {
      try {
        await dispatch(udpateProfileDataThunk({
          user_id: customerId,
          first_name: userData?.first_name,
          last_name: userData?.last_name,
          email: userData?.email,
          phone_no: userData?.phone_no,
          address: userData?.address,
          state: userData?.state,
          city: userData?.city,
          country: userData?.country,
          business_name: userData?.business_name,
          business_state: userData?.business_state,
          business_city: userData?.business_city,
          zipcode: userData?.zipcode,
          staff_id: staffId,
          is_staff: staffStatus
        })).unwrap();
      } catch (error) {
        //
      }
    } else {
      toast.warning("Input fields cannot be empty.");
    }
  };

  const updatePaymentMethod = async() => {
    const setDefaultPaymentMethod = paymentMethods?.find(method => method?.method_name === paymentMethod);
    if(!setDefaultPaymentMethod?.default) {
      try {
        const result = await dispatch(makeDefaultPaymentMethodThunk({
          user_id: customerId,
          payment_method_id: setDefaultPaymentMethod?.id
        })).unwrap();
        console.log("result...", result);
      } catch (error) {
        //
      }
    } else {
      //
    }
  };

  const useVoucher = async() => {
    if(appliedVoucher === null) {
      //
    } else {
      try {
        const result = await dispatch(useVoucherThunk({record_id: appliedVoucher?.id})).unwrap();
        console.log("result....", result);
      } catch (error) {
        //
      }
    }
  }

  const addBillingHistory = async(item, paymentResult, madePaymentMethod, product_type, subscriptionId) => {
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
        product_type: product_type,
        description: product_type?.toLowerCase() === "google workspace"
        ? `purchase google workspace ${item?.product_name} ${item?.total_year}`
        : product_type?.toLowerCase() === "domain"
        ? "purchase domain"
        : "",
        domain: product_type?.toLowerCase() === "google workspace"
        ? item?.workspace_status === "trial"
          ? cart?.find(item2 => item2?.product_type === "domain")?.product_name || ""
          : domainsState?.find(item2 => item2?.domain_type === "primary")?.domain_name || ""
        : product_type?.toLowerCase() === "domain"
        ? item?.product_name
        : "",
        payment_method: madePaymentMethod,
        payment_status: "Success",
        amount: `${currencyList?.find(item2 => item2?.name === defaultCurrencySlice)?.logo}${finalTotalPrice}`,
        transaction_data: paymentResult,
        subscription_id: subscriptionId
      }));
    } catch (error) {
      console.log("error");
    }
  };

  const makePayment = async(token) => {
    if(
      userData?.business_name !== "" && userData?.business_name?.trim() !== "" && userData?.business_name !== null && userData?.business_name !== undefined &&
      userData?.first_name !== "" && userData?.first_name?.trim() !== "" && userData?.first_name !== null && userData?.first_name !== undefined &&
      userData?.last_name !== "" && userData?.last_name?.trim() !== "" && userData?.last_name !== null && userData?.last_name !== undefined &&
      userData?.address !== "" && userData?.address !== null && userData?.address !== undefined &&
      userData?.zipcode !== "" && userData?.zipcode?.trim() !== "" && userData?.address !== null && userData?.address !== undefined &&
      userData?.business_state !== "" && userData?.business_state?.trim() !== "" && userData?.business_state !== null && userData?.business_state !== undefined &&
      userData?.business_city !== "" && userData?.business_city?.trim() !== "" && userData?.business_city !== undefined && userData?.business_city !== null
    ) {
      const productNameTotal = await cart.filter(item => item.product_name).map(item => item.product_name);
      const productNameJoined = await productNameTotal.join(" and ")
      const body = {
        token,
        product: {
          name: `${userData?.first_name} ${userData?.last_name}`,
          price: finalTotalPrice,
          // price: 10,
          productBy: "test",
          currency: defaultCurrencySlice,
          description: `purchasing ${productNameJoined}`,
          domain: cart?.find(item => item?.product_type?.toLowerCase() === "domain") ? {
            domain_name: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.product_name || "",
            type: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.workspace_status || "",
            year: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.total_year || ""
          } : "",
          workspace: cart?.find((item) => item?.product_type === "google workspace") ? {
            plan: usedPlan || "",
            license_usage: cart?.find((item) => item?.product_type === "google workspace")?.total_year,
            plan_period: cart?.find((item) => item?.product_type === "google workspace")?.payment_cycle,
            trial_plan: cart?.find((item) => item?.product_type === "google workspace")?.workspace_status === "trial" ? "yes" : "no"
          } : "",
          customer_id: customerId,
          email: userData?.email,
          voucher: appliedVoucher === null ? "" : appliedVoucher?.id
        }
      };
      const headers={
        "Content-Type":"application/json"
      };
      try {
        setProcessingModalOpen(true);
        const result = await dispatch(stripePayThunk(body)).unwrap();
        console.log("result...", result);
        const prevCart = [...cart];
        if(result?.message === "Payment successful") {
          setTimeout(async() => {
            // navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: result?.charge}});
            await updateProfileData();
            cart?.map(async(item) => {
              if(item?.product_type?.toLowerCase() === "google workspace") {
                const workspaceSubscription = await addSubscriptionForWorkspace(item, result?.charge);
                console.log(workspaceSubscription);
                // await addBillingHistory(item, result?.charge, "Stripe", "google workspace", workspaceSubscription?.subscription_id);
                // await dispatch(addBillingHistoryThunk({
                //   user_id: customerId,
                //   transaction_id: result?.charge?.balance_transaction,
                //   date: todayDate,
                //   invoice: result?.charge?.payment_method_details?.card?.network_transaction_id,
                //   product_type: "google workspace",
                //   description: `purchase google workspace ${item?.product_name} ${item?.total_year}`,
                //   domain: item?.workspace_status === "trial"
                //   ? cart?.find(item2 => item2?.product_type === "domain")?.product_name || ""
                //   : domainsState?.find(item2 => item2?.domain_type === "primary")?.domain_name || "",
                //   payment_method: "Stripe",
                //   payment_status: "Success",
                //   amount: `${currencyList?.find(item2 => item2?.name === defaultCurrencySlice)?.logo}${finalTotalPrice}`,
                //   transaction_data: result?.charge,
                //   subscription_id: domainSubscription?.subscription_id
                // }));
                if(item?.workspace_status === "trial") {
                  await dispatch(makeDefaultPaymentMethodThunk({user_id: customerId, payment_method_id: paymentMethodId}));
                  // const role = await dispatch(addSettingThunk({user_type: "Super Admin", user_id: customerId, permissions: superAdminPermissions})).unwrap();
                  // // settingId
                  // await dispatch(addStaffThunk({user_id: customerId, first_name: userData?.first_name, last_name: userData?.last_name, email: userData?.email, phone_no: userData?.phone_no, user_type_id: role?.settingId}));
                  
                }
              } else if(item?.product_type?.toLowerCase() === "domain") {
                const domainSubscription = await addSubscriptionForDomain(item, result?.charge);
                // await addBillingHistory(item, result?.charge, "Stripe", "domain", domainSubscription?.subscription_id);
                // await dispatch(addBillingHistoryThunk({
                //   user_id: customerId,
                //   transaction_id: result?.charge?.balance_transaction,
                //   date: todayDate,
                //   invoice: result?.charge?.payment_method_details?.card?.network_transaction_id,
                //   product_type: "domain",
                //   description: `purchase domain ${item?.product_name}`,
                //   domain: item?.product_name,
                //   payment_method: "Stripe",
                //   payment_status: "Success",
                //   amount: `${currencyList?.find(item2 => item2?.name === defaultCurrencySlice)?.logo}${finalTotalPrice}`,
                //   transaction_data: result?.charge,
                //   subscription_id: domainSubscription?.subscription_id
                // }));
                const domainData = await dispatch(addNewDomainThunk({
                  customer_id: data?.customer_id,
                  domain_name: item?.product_name,
                  domain_type: cart?.find((item) => item?.product_type === "google workspace") ? cart?.find((item) => item?.product_type === "google workspace")?.workspace_status === "trial" ? "primary" : "secondary" : "secondary",
                  subscription_id: "0",
                  business_name: userData?.business_name,
                  business_email: userData?.email,
                  license_usage: cart?.find((item) => item?.product_type === "google workspace") ? cart?.find((item) => item?.product_type === "google workspace")?.total_year : userData?.license_usage ? userData?.license_usage : 0,
                  plan: "0",
                  payment_method: "Stripe",
                  domain_status: true,
                  billing_period: "Yearly",
                  renew_status: "auto renewal",
                  subscription_status: "auto renewal"
                })).unwrap();
                cart?.find((item) => item?.product_type === "google workspace")
                ? cart?.find((item) => item?.product_type === "google workspace")?.workspace_status === "trial"
                  ? await dispatch(addEmailsThunk({
                    user_id: customerId,
                    domain_id: domainData?.domain_id,
                    emails: [
                      {
                        first_name: userData?.first_name,
                        last_name: userData?.last_name,
                        email: cart?.find((item) => item?.product_type === "google workspace")?.emails?.username,
                        password: cart?.find((item) => item?.product_type === "google workspace")?.emails?.password,
                      }
                    ]
                  })).unwrap()
                  : ""
                : "";
                cart?.find((item) => item?.product_type === "google workspace")
                ? cart?.find((item) => item?.product_type === "google workspace")?.workspace_status === "trial"
                  ? await dispatch(makeEmailAdminThunk({domain_id: domainData?.domain_id, rec_id: cart?.find((item) => item?.product_type === "google workspace")?.emails?.username})).unwrap()
                  : ""
                : "";
                await getDomains();
              }
            });
            await updateCart();
            await setProcessingModalOpen(false);
            await navigate('/download-invoice-pdf', {state : {result, prevCart, body, payment_method: "Stripe", amount_details: {finalTotalPrice, totalPrice, taxAmount, taxedPrice, discountedPrice}, region: userDetails?.country}});
          }, 3000);
        } else {
          toast.error("Error on payment method");
          setTimeout(() => {
            navigate('/add-cart');
          }, 1500);
        }
      } catch (error) {
        toast.error("Error on payment method");
        setTimeout(() => {
          navigate('/add-cart');
        }, 1500);
      }
    } else {
      toast.warning("Input fields cannot be empty.");
    }
  };

  const payStackConfig = {
    reference: (new Date()).getTime().toString(),
    email: userData?.email,
    amount: finalTotalPrice * 100,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    channels: ['card']
  };
  
  
  const body = {
    reference: (new Date()).getTime().toString(),
    email: userData?.email,
    amount: finalTotalPrice,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    name: `${userData?.first_name} ${userData?.last_name}`,
    description: `purchasing ${cart?.filter(item => item.product_name)?.map(item => item.product_name)?.join(" and ")}`,
    domain: {
      domain_name: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.product_name || "",
      type: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.workspace_status || "",
      year: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.total_year || ""
    },
    workspace: {
      plan: usedPlan || "",
      license_usage: cart?.find((item) => item?.product_type === "google workspace")?.total_year,
      plan_period: cart?.find((item) => item?.product_type === "google workspace")?.payment_cycle,
      trial_plan: cart?.find((item) => item?.product_type === "google workspace")?.workspace_status === "trial" ? "yes" : "no"
    },
    customer_id: customerId,
    voucher_id: appliedVoucher === null ? "" : appliedVoucher?.id
  };

  const handlePaystackSuccessAction = async(reference) => {
    if(
      userData?.business_name !== "" && userData?.business_name?.trim() !== "" &&
      userData?.first_name !== "" && userData?.first_name?.trim() !== "" &&
      userData?.last_name !== "" && userData?.last_name?.trim() !== "" &&
      userData?.address !== "" && userData?.address !== null && userData?.address !== undefined &&
      userData?.zipcode !== "" && userData?.zipcode?.trim() !== "" &&
      userData?.business_state !== "" && userData?.business_state?.trim() !== "" &&
      userData?.business_city !== "" && userData?.business_city?.trim() !== ""
    ) {
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
        setTimeout(async() => {
          await updateProfileData();
          // navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: reference}});
          cart?.map(async(item) => {
            if(item?.product_type?.toLowerCase() === "google workspace") {
              await addSubscriptionForWorkspace(item, result?.charge);
              // await addBillingHistory(item, result?.charge, "Stripe", "google workspace");
            } else if(item?.product_type?.toLowerCase() === "domain") {
              await addSubscriptionForDomain(item, result?.charge);
              // await addBillingHistory(item, result?.charge, "Stripe", "domain");
            }
          })
          // setIsLicenseModalOpen(false);
          await updateCart();
          setProcessingModalOpen(false);
          // navigate('/download-invoice-pdf', {state : {result, prevCart}});
        }, 3000);
      } else {
        toast.error("Error on payment method");
        setTimeout(() => {
          navigate('/add-cart');
        }, 1500);
      }
    } else {
      toast.warning("Input fields cannot be empty.");
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
      <div className="flex flex-col w-full">
        <div className="flex max-[700px]:flex-col items-center justify-start min-[700px]:gap-10 max-[700px]:gap-2 mt-8">
          <button
            className="flex flex-row items-center justify-center gap-3"
            onClick={() => navigate(-1)}
            type='button'
          >
            <IoIosArrowBack />
            <h6 className="text-green-500 text-[15px]">
              Back to previous page
            </h6>
          </button>
          <h1 className="text-[30px] text-green-500 font-semibold ">
            Review and checkout
          </h1>
        </div>

        <div className='grid grid-cols-1 max-w-[961px] w-full mx-auto'>
          <div className='grid grid-cols-1 max-w-[961px] w-full'>
            {
              cart?.map((item, index) => (
                <div className='flex min-[768px]:flex-row max-[768px]:flex-col gap-2 justify-between w-full' key={index}>
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-2'>
                      <h4 className="font-inter font-normal text-xl text-black">{item?.product_type}</h4>
                      {/* <h4 className="font-inter font-normal text-xl text-black">{item?.product_name}</h4> */}
                    </div>
                    <p>Your {
                      item?.payment_cycle?.toLowerCase() === "yearly"
                      ? "annual plan"
                      : item?.payment_cycle?.toLowerCase() === "monthly"
                      ? "monthly plan"
                      : "yearly plan with monthly billing"
                    } will begin {formattedDate}. You can <span className='text-[#12A833]'>cancel at any time</span>.</p>
                    <p>Charges today and recurs {
                      item?.payment_cycle?.toLowerCase() === "yearly"
                      ? `yearly on ${formattedDate2}`
                      : `next month on ${formattedDate3}`
                    } .</p>
                  </div>
                  <div className='w-[140px] max-[768px]:w-full flex flex-col items-end text-end'>
                    <p className='font-inter font-normal text-xl text-black'>
                      {
                        item?.product_type === "google workspace"
                        ? `${item?.total_year} x ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${workspacePrice}`
                        : item?.product_type === "domain"
                          ?`${item?.total_year} x ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${item?.price[defaultCurrencySlice]}`
                        : `${item?.total_year} x ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${item?.price}`
                      }
                    </p>
                    <p className='font-inter font-medium text-base text-black'>+applicable tax</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="w-full grid grid-cols-1 items-start justify-start mt-[30px] col-span-1">
            <h1 className="font-inter font-semibold text-base text-black min-[500px]:pl-4 max-[500px]:pl-0">Customer Info</h1>
            <div className="mt-4 min-[500px]:pl-10 max-[500px]:pl-1 w-full flex flex-col justify-start items-start">
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
                              setData({
                                ...data,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={data[form.name]}
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
                              setData({
                                ...data,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={data[form.name]}
                          />
                        </div>
                      )
                    }
                  })
                } */}

                <p className='font-inter font-normal text-xs text-[#12A833] py-3 border-b border-[#E4E4E4] w-full mb-2'>Add a GST identification number (GSTIN) (optional) </p>

                <h1 className="font-inter font-semibold text-sm flex flex-row items-center justify-center mr-2 relative mb-3">
                  Name and address
                  <GoInfo className="ml-2 w-4 h-4" onMouseOver={() => {setNameAndAddressHover(true)}} onMouseLeave={() => {setNameAndAddressHover(false)}} />
                  {
                    nameAndAddressHover && (
                      <div className="absolute bg-white w-[220px] top-5 left-[13px] rounded-md z-10">
                        <p className="bg-[#12A83330] px-4 py-3 w-full font-inter font-medium text-[10px] text-black rounded-md">This is the legal address of your organization or home</p>
                      </div>
                    )
                  }
                </h1>

                <div className='w-full flex flex-col mt-2'>
                  {
                    bottomForm?.map((form, index) => {
                      if(form.name === "business_state") {
                        return (
                          <div
                            className='flex flex-col mb-2 w-full mx-auto relative'
                            ref={stateRef}
                          >
                            <label
                              className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2 text-[#8A8A8A]'
                            >Business State</label>
                            <input
                              type="text"
                              name="business_state"
                              required
                              className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                              onChange={(e) => {
                                setUserData({
                                  ...userData,
                                  business_state: '',
                                  business_city: '',
                                });
                                setStateName(e.target.value);
                                setCityName('');
                                setState({});
                                setCity({});
                              }}
                              value={userData?.business_state || stateName}
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
                                          setUserData({
                                            ...userData,
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
                              className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2 text-[#8A8A8A]'
                            >Business City</label>
                            <input
                              type="text"
                              name="business_city"
                              required
                              className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                              onChange={(e) => {
                                setUserData({
                                  ...userData,
                                  business_city: '',
                                });
                                setCityName(e.target.value);
                                setCity({});
                              }}
                              value={userData?.business_city || cityName}
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
                                          setUserData({
                                            ...userData,
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
                      } else if(form.name === "address") {
                        return (
                          <div
                            className='flex flex-col mb-3 w-full mx-auto relative'
                            ref={hereRef}
                          >
                            <label
                              className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2 text-[#8A8A8A]'
                            >Address</label>
                            <input
                              type="text"
                              name="address"
                              required
                              className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                              onChange={(e) => {
                                setUserData({
                                  ...userData,
                                  address: null,
                                });
                                setHereSearch(e.target.value);
                                setHereObject(null);
                              }}
                              value={hereObject?.title || hereSearch}
                              onFocus={() => {setIsHereDropdownOpen(true)}}
                              placeholder="Search your business city"
                              // cypress-name={item.name+"_input"}
                            />
                            {
                              isHereDropdownOpen && (
                                <div className='w-full bg-[#E4E4E4] overflow-y-auto z-[10] px-2 border border-[#8A8A8A1A] rounded-md max-h-32 overflow-auto'>
                                  {
                                    hereList?.map((street, idx) => (
                                      <p
                                        key={idx}
                                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                        dropdown-name="country-dropdown"
                                        onClick={() => {
                                          setHereObject(street);
                                          setHereSearch("");
                                          setIsHereDropdownOpen(false);
                                        }}
                                      >{street?.title}</p>
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
                                setUserData({
                                  ...userData,
                                  [e.target.name]: e.target.value
                                })
                              }}
                              value={userData[form.name]}
                              required
                            />
                          </div>
                        )
                      }
                    })
                  }
                </div>

                <div className="flex flex-col items-start justify-start w-full gap-2 mb-4">
                  <h1 className="font-inter font-semibold text-sm flex flex-row items-center justify-center mr-2 relative">
                    Primary Contact
                    <GoInfo className="ml-2 w-4 h-4" onMouseOver={() => {setPrimaryContactHover(true)}} onMouseLeave={() => {setPrimaryContactHover(false)}} />
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
                          first_name: userData?.first_name,
                          last_name: userData?.last_name
                        });
                        setIsOpenModal(true);
                      }}
                    />
                  </h1>
                  <div className="flex flex-col">
                    <p className="font-inter font-normal texte-xs text-[#8A8A8A]">{userData?.first_name} {userData?.last_name}</p>
                    <p className="font-inter font-normal texte-xs text-[#8A8A8A]">{userData?.email}</p>
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
                        onChange={() => {
                          setPaymentMethod(method?.method_name);
                          setPaymentMethodId(method?.id);
                        }}
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
                <a href="#" className="font-semibold text-green-500">
                  Google Workspace Agreement
                </a>
                ,{" "}
                <a href="#" className="font-semibold text-green-500">
                  Google Workspace purchase Agreement
                </a>
                , and{" "}
                <a href="#" className="font-semibold text-green-500 ">
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
            ?
              paymentMethod?.toLowerCase() === "stripe"
              ? (
                <button
                  className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto"
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
                  >Agree and continue</StripeCheckout>
                </button>
              ) : paymentMethod?.toLowerCase() === "paystack"
              ? (
                <button
                  className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto"
                  type="button"
                  // onClick={() => {() => initializePayment(handleSuccess, handleClose)}}
                >
                  <PaystackButton {...componentProps} />
                </button>
              ) : (
                <button
                  className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto"
                  type="button"
                  onClick={() => {toast.warning("Please select a payment method")}}
                >
                  Agree and continue
                </button>
              )
            : (
              <button
                className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto"
                type="button"
                onClick={() => {toast.warning("Please fill all the data")}}
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
            className="relative z-50 focus:outline-none"
            onClose={() => {
              setIsOpenModal(false);
              setPrimaryContact(initialPrimaryContact);
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
                          setPrimaryContact(initialPrimaryContact);
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
                        value={useData?.email}
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
                        setPrimaryContact(initialPrimaryContact);
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
            <div className="fixed inset-0 bg-white top-0 bottom-0 left-0 right-0 z-50 w-screen overflow-y-auto">
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
  )
}

export default Review