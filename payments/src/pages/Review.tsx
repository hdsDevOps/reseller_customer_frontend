import React, { useEffect, useState } from 'react'
import { BiSolidEditAlt } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { TbInfoTriangleFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addBillingHistoryThunk, addNewDomainThunk, addSubscriptionThunk, addToCartThunk, getDomainsListThunk, getPaymentMethodsThunk, getProfileDataThunk, makeDefaultPaymentMethodThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk, stripePayThunk, udpateProfileDataThunk, useVoucherThunk } from 'store/user.thunk';
import { setCart, setDomains, setUserDetails, staffStatus, staffId, domainsState } from 'store/authSlice';
import { toast } from 'react-toastify';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { RiCloseFill } from 'react-icons/ri';
import useData from 'rsuite/esm/InputPicker/hooks/useData';
import { currencyList } from '../components/CurrencyList';
import StripeCheckout from "react-stripe-checkout";
import { PaystackButton } from "react-paystack";

const initialCartPrice = {
  total_year: 0,
  price: 0
}

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { customerId, domainsState, userDetails, defaultCurrencySlice } = useAppSelector(state => state.auth);
  // console.log("domainsState...", domainsState);
  const [isChecked, setIsChecked] = useState(false);
  const [userData, setUserData] = useState(userDetails);
  console.log("userDetails...", userData);
  console.log(location.state);

  useEffect(() => {
    setUserData(userDetails);
  }, [userDetails]);

  const cart = location.state?.cart;
  // console.log("cart...", cart);
  const appliedVoucher = location.state.voucher_code;
  console.log("appliedVoucher...", appliedVoucher);

  const initialData = {
    customer_id: userDetails?.customer_id,
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
  }

  const [primaryContact, setPrimaryContact] = useState(initialPrimaryContact);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [usedPlan, setUsedPlan] = useState<object|null>(null);
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

  const [primaryDomain, setPrimaryDomain] = useState<object|null>(null);
  console.log("primaryDomain...", primaryDomain);

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
        const amountt = parseFloat(item?.price) * parseInt(item?.total_year);
        return totalCart + amountt;
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
    if(userDetails?.workspace?.workspace_status === "trial") {
      setWorkspacePrice(0);
    } else {
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
        setWorkspacePrice(0);
      }
    }
  };

  useEffect(() => {
    getPlan();
  }, [cart, defaultCurrencySlice]);

  const getDomainPrice = () => {
    return 953.72;
  };

  const calculateCartAmount = (cart) => {
    if(cart?.length > 0) {
      const priceList = cart.map((item) => {
        if(item?.product_type === "google workspace"){
          return {total_year: item?.total_year, price: workspacePrice};
        } else if(item?.product_type?.toLowerCase() === "domain") {
          return {total_year: item?.total_year, price: 953.72};
        }
      });

      setCartPrice(priceList);
    } else {
      setCartPrice([initialCartPrice]);
    }
  };

  useEffect(() => {
    calculateCartAmount(cart);
  }, [cart, workspacePrice]);

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
    { label: 'Business Zip code', name: 'business_zip_code', placeholder: 'Enter your Zip Code', type: 'number', },
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

  const addSubscriptionForWorkspace = async(item, result2) => {
    try {
      const planData = await dispatch(plansAndPricesListThunk({
        subscription_id: item?.plan_name_id
      })).unwrap();
      const result = await dispatch(addSubscriptionThunk({
        product_type: "google workspace",
        payment_cycle: item?.payment_cycle,
        customer_id: customerId,
        description: `purchase google workspace ${item?.product_type} ${item?.total_year}`,
        domain: [domainsState?.find(item => item?.domain_type === "primary")?.domain_name],
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
        workspace_status: "active",
        is_trial: false,
        license_usage: item?.total_year
      })).unwrap();
      console.log("result1...", result);
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
      plan_name_id: "0",
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
        plan_id: '0',
        domain: item?.product_name,
        phone: userData?.phone_no,
        email: userData?.email,
        country: userData?.region,
        due_date: domainExpiryDate,
      }],
      plan_name: "0",
      workspace_status: userData?.workspace?.workspace_status,
      is_trial: false,
      license_usage: userData?.license_usage
    };
    try {
      const result = await dispatch(addSubscriptionThunk(data)).unwrap();
      console.log("result2...", result);
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
      navigate('/add-cart');
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
      userData?.address !== "" && userData?.address?.trim() !== "" &&
      userData?.business_zip_code !== "" && userData?.business_zip_code?.trim() !== "" && userData?.address !== null && userData?.address !== undefined &&
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
          business_zip_code: userData?.business_zip_code,
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

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   if(cart.length > 0) {
  //     if(paymentMethod !== "") {
  //       await cart?.map((item) => {
  //         if(item?.product_type === "google workspace") {
  //           addSubscriptionForWorkspace(item);
  //         } else if(item?.product_type.toLowerCase() === "domain") {
  //           addDomain(item);
  //           addSubscriptionForDomain(item);
  //         } else {
  //           addSubscription(item);
  //         }
  //       });
  //       await updateCart();
  //       await updateProfile();
  //       await updatePaymentMethod();
  //       await useVoucher();
  //       getUserDetails();
  //     } else {
  //       toast.warning("Please select a payment method");
  //     }
  //   }
  //   else {
  //     navigate('/');
  //   }
  // };

  const addBillingHistory = async(item, paymentResult, madePaymentMethod, product_type) => {
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
        product_type: product_type,
        description: product_type?.toLowerCase() === "google workspace"
        ? `purchase google workspace ${item?.product_type} ${item?.total_year}`
        : product_type?.toLowerCase() === "domain"
        ? "purchase domain"
        : "",
        domain: product_type?.toLowerCase() === "google workspace"
        ? domainsState?.find(item2 => item2?.domain_type === "primary")?.domain_name
        : product_type?.toLowerCase() === "domain"
        ? item?.product_name
        : "",
        payment_method: madePaymentMethod,
        payment_status: "Success",
        amount: `${currencyList?.find(item2 => item2?.name === defaultCurrencySlice)?.logo}${finalTotalPrice}`,
        transaction_data: paymentResult
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
      userData?.address !== "" && userData?.address?.trim() !== "" &&
      userData?.business_zip_code !== "" && userData?.business_zip_code?.trim() !== "" && userData?.address !== null && userData?.address !== undefined &&
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
          domain: {
            domain_name: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.product_name || "",
            type: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.workspace_status || "",
            year: cart?.find(item => item?.product_type?.toLowerCase() === "domain")?.total_year || ""
          },
          workspace: {
            plan: usedPlan,
            license_usage: cart?.find((item) => item?.product_type === "google workspace")?.total_year,
            plan_period: cart?.find((item) => item?.product_type === "google workspace")?.payment_cycle,
            trial_plan: "no"
          },
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
        if(result?.message === "Payment successful") {
          setTimeout(async() => {
            // navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: result?.charge}});
            cart?.map((item) => {
              if(item?.product_type?.toLowerCase() === "google workspace") {
                addSubscriptionForWorkspace(item, result?.charge);
                addBillingHistory(item, result?.charge, "Stripe", "google workspace");
              } else if(item?.product_type?.toLowerCase() === "domain") {
                addSubscriptionForDomain(item, result?.charge);
                addBillingHistory(item, result?.charge, "Stripe", "domain");
              }
            })
            await updateCart();
            setProcessingModalOpen(false);
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
    amount: finalTotalPrice * 100,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    name: `${userData?.first_name} ${userData?.last_name}`,
    description: 'purchasing google workspace and domain',
    domain: {
      domain_name: primaryDomain?.domain_name,
      type: "new",
      year: 1
    },
    workspace: {
      plan: usedPlan,
      license_usage: cart?.find((item) => item?.product_type === "google workspace")?.total_year,
      plan_period: cart?.find((item) => item?.product_type === "google workspace")?.payment_cycle,
      trial_plan: "no"
    },
    customer_id: customerId,
    voucher_id: appliedVoucher === null ? "" : appliedVoucher?.id
  };

  const handlePaystackSuccessAction = async(reference) => {
    if(
      userData?.business_name !== "" && userData?.business_name?.trim() !== "" &&
      userData?.first_name !== "" && userData?.first_name?.trim() !== "" &&
      userData?.last_name !== "" && userData?.last_name?.trim() !== "" &&
      userData?.address !== "" && userData?.address?.trim() !== "" &&
      userData?.business_zip_code !== "" && userData?.business_zip_code?.trim() !== "" &&
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
          // navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: reference}});
          cart?.map(async(item) => {
            if(item?.product_type?.toLowerCase() === "google workspace") {
              await addSubscriptionForWorkspace(item, result?.charge);
              await addBillingHistory(item, result?.charge, "Stripe", "google workspace");
            } else if(item?.product_type?.toLowerCase() === "domain") {
              await addSubscriptionForDomain(item, result?.charge);
              await addBillingHistory(item, result?.charge, "Stripe", "domain");
            }
          })
          // setIsLicenseModalOpen(false);
          await updateCart();
          setProcessingModalOpen(false);
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
                    <p>Your annual plan will begin {formattedDate}. You can <span className='text-[#12A833]'>cancel at any time</span>.</p>
                    <p>Charges today and recurs {item?.payment_cycle} on {formattedDate2}.</p>
                  </div>
                  <div className='w-[140px] max-[768px]:w-full flex flex-col items-end text-end'>
                    <p className='font-inter font-normal text-xl text-black'>
                      {currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}
                      {
                        item?.product_type === "google workspace"
                        ? workspacePrice
                        : item?.price
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

                <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
                  Name and address
                  <GoInfo className="ml-2" />
                </h1>

                {
                  bottomForm.map((form, index) => {
                    if(form.name === "state") {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <select
                            name={form?.name}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={userData[form.name]}
                            required
                          >
                            <option value="West Bengal" selected>West Bengal</option>
                          </select>
                        </div>
                      )
                    } else if(form.name === "city") {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <select
                            name={form?.name}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={userData[form.name]}
                            required
                          >
                            <option value="Kolkata" selected>Kolkata</option>
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

                <div className="flex flex-col items-start justify-start w-full gap-2 mb-4">
                  <h1 className="font-inter font-semibold text-sm flex flex-row items-center justify-center mr-2">
                    Primary Contact
                    <GoInfo className="ml-2 w-4 h-4" />
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
            <h2 className="mb-4 text-lg font-bold">Payment method</h2>
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
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 w-screen overflow-y-auto">
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