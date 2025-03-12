import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronUp, CirclePlus, Dot, FilterX, Trash2, X } from "lucide-react";
import EmailModal from "../components/EmailModal";
import ActionModal from "../components/ActionModal";
import AddLicense from "../components/AddLicense";
import { getDomainsListThunk, removeUserAuthTokenFromLSThunk,addEmailsThunk, changeEmailStatusThunk, deleteEmailThunk, makeEmailAdminThunk, updateEmailUserDataThunk, resetEmailPasswordThunk, updateLicenseUsageThunk, getProfileDataThunk, savedCardsListThunk, deleteCardThunk, getVouchersListThunk, plansAndPricesListThunk, useVoucherThunk, addBillingHistoryThunk, stripePayThunk } from 'store/user.thunk';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';
import './licenseUsage.css';

import "../index.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { toast } from "react-toastify";
import { HiOutlineEye } from "react-icons/hi";
import { RiDeleteBin6Line, RiEyeCloseLine } from "react-icons/ri";
import AddPayment from "../components/AddPaymentMethods";
import { MdOutlineMail } from "react-icons/md";
import { setSaveCards, setUserDetails } from "store/authSlice";
import { currencyList } from "../components/CurrencyList";
import { format } from "date-fns";
import StripeCheckout from "react-stripe-checkout";
import { PaystackButton } from "react-paystack";
import './EmailList.css';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c";

const intialEmail = {
  first_name:"",
  last_name:"",
  email:"",
  password:""
}

const EmailList: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchRef = useRef();

  const { customerId, userDetails, saveCardsState, paymentMethodsState, token, defaultCurrencySlice, rolePermission, isAdmin } = useAppSelector(state => state.auth);
  // console.log("userId...", customerId);
  console.log("user details...", userDetails);
  // console.log("save Cards State...", saveCardsState);
  // console.log("paymentMethodsState...", paymentMethodsState);
  
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

    checkPermission("Email");
  }, [rolePermission]);

  useEffect(() => {
    if(isAdmin) {
      //
    } else {
      if(userDetails?.workspace?.workspace_status === "trial") {
        const miliseconds = parseInt(userDetails?.workspace?.next_payment?._seconds) * 1000 + parseInt(userDetails?.workspace?.next_payment?._nanoseconds) / 1e6;
        const foundDate =  new Date(miliseconds);
        const today = new Date(Date.now());
        if(foundDate > today) {
          //
        } else {
          navigate('/');
        }
      } else if(userDetails?.workspace?.workspace_status === "active") {
        const miliseconds = parseInt(userDetails?.workspace?.next_payment?._seconds) * 1000 + parseInt(userDetails?.workspace?.next_payment?._nanoseconds) / 1e6;
        const foundDate =  new Date(miliseconds);
        const today = new Date(Date.now());
        if(foundDate > today) {
          //
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  }, [userDetails]);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState<boolean>(false);
  const [selectedUserRole, setSelectedUserRole] = useState<string | undefined>();
  const [actionModalStyle, setActionModalStyle] = useState<React.CSSProperties>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDropdown, setSearchDropdown] = useState(false);
  const params = new URLSearchParams(location.search);
  const domainName = params.get("domain") || "schemaphic.com";
  const [domains, setDomains] = useState([]);
  // console.log("domains...", domains);
  const [selectedDomain, setSelectedDomain] = useState<object|null>(null);
  const [selectedDomain2, setSelectedDomain2] = useState<string>("");
  // console.log("selected domain...", selectedDomain);
  const [showList, setShowList] = useState("");
  const listRef = useRef(null);
  const [emailData, setEmailData] = useState([
    { name: "Robert Clive > Admin", email: "robertclive@", status: true, role: ".Admin" },
    { name: "Michel Henry", email: "michelhenry@", status: false, role: "" },
  ]);
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState<Boolean>(false);
  const [isMakeAdminModalOpen, setIsMakeAdminModalOpen] = useState<Boolean>(false);
  const [isResetUserPasswordModalOpen, setIsResetUserPasswordModalOpen] = useState<Boolean>(false);
  const [isRenameUserAccountModalOpen, setIsRenameUserAccountModalOpen] = useState<Boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState({});
  // console.log("selected Email...", selectedEmail);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const removeEmailRef = useRef(null);
  const makeAdminRef = useRef(null);
  const resetUserPasswordRef = useRef(null);
  const renameAccountRef = useRef(null);
  const [numUsers, setNumUsers] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [subtotal, setSubtotal] = useState(0);
  const taxRate = 0.0825;
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0.00);
  const [discountRate, setDiscountRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [preDiscountRate, setPreDiscountRate] = useState(0);
  const [preDiscountAmount, setPreDiscountAmount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<object|null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<object|null>(null);

  const [activeMethod, setActiveMethod] = useState("saved");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>("");
  const [selectedCard, setSelectedCard] = useState<string | null>("");
  const [activeSubscriptionPlan, setActiveSubscriptionPlan] = useState({});
  // console.log("activeSubscriptionPlan...",activeSubscriptionPlan);
  // console.log(userDetails);
  const [licensePrice, setLicensePrice] = useState(0);
  // console.log(licensePrice);
  // console.log({numUsers, licensePrice, subtotal, tax, total, preDiscountRate, preDiscountAmount, discountRate, discountAmount,});
  const [vouchers, setVouchers] = useState([]);
  const [voucherInputOpen, setVoucherInputOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  
  const [todayDate, setTodayDate] = useState("");
  const [domainExpiryDate, setDomainExpiryDate] = useState("");
  const [planExpiryDate, setPlanExpiryDate] = useState("");
  const [emailClicked, setEmailClicked] = useState(false);

  const dateFormat = (date) => {
    const miliseconds = parseInt(date?._seconds) * 1000 + parseInt(date?._nanoseconds) / 1e6;
    const foundDate =  new Date(miliseconds);
    const today = new Date(Date.now());
    if(foundDate > today) {
      return true;
    } else {
      return false;
    }
  };

  const dateFormat2 = (date) => {
    const miliseconds = parseInt(date?._seconds) * 1000 + parseInt(date?._nanoseconds) / 1e6;
    const foundDate =  new Date(miliseconds);
    // console.log(foundDate);
    // console.log(format(foundDate, "yyyy-MM-dd"));
    if(foundDate === "Invalid Date") {
      return "";
    } else {
      return format(foundDate, "yyyy-MM-dd");
    }
  };

  useEffect(() => {
    const dayToday = new Date();
    setTodayDate(format(dayToday, "yyyy-MM-dd"));
    
    if(userDetails?.workspace) {
      setPlanExpiryDate(dateFormat2(userDetails?.workspace?.next_payment));
      // dateFormat2(userDetails?.workspace?.next_payment);
    }
  }, [userDetails]);

  const getVouchersList = async() => {
    try {
      const result = await dispatch(getVouchersListThunk({customer_id: customerId})).unwrap();
      const list = [...result?.joinedData];
      const filteredList = list?.filter(item => dateFormat(item?.used_date));
      if(filteredList){
        setVouchers(filteredList);
      } else {
        setVouchers([]);
      }
    } catch (error) {
      setVouchers([]);
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
    getVouchersList();
  }, [customerId]);

  const handleApplyClick = () => {
    setAppliedVoucher(selectedVoucher);
    setVoucherInputOpen(false);
  };

  const handleSearchVoucher = () => {
    if(vouchers?.length > 0) {
      const foundVoucher = vouchers?.find(item => item?.voucher?.voucher_code?.toLowerCase()?.includes(voucherCode?.toLowerCase()));
      if(foundVoucher) {
        setSelectedVoucher(foundVoucher);
      } else {
        setSelectedVoucher(null);
        toast.warning(`No voucher found with code ${voucherCode}`);
      }
    } else {
      setSelectedVoucher(null);
      toast.warning(`No voucher found with code ${voucherCode}`);
    }
  };

  const getCurrencyValue = () => {
    if(activeSubscriptionPlan?.amount_details?.length > 0) {
      const amounts = activeSubscriptionPlan?.amount_details;
      const amountData = amounts?.find(item => item?.currency_code === defaultCurrencySlice);
      if(amountData) {
        if(userDetails?.workspace?.payment_cycle) {
          const price = amountData?.price?.find(item => item?.type?.toLowerCase() === userDetails?.workspace?.payment_cycle?.toLowerCase());
          setLicensePrice(Number(price?.discount_price));
        } else {
          setLicensePrice(0);
        }
      } else {
        setLicensePrice(0);
      }
    }
  };

  useEffect(() => {
    getCurrencyValue();
  }, [activeSubscriptionPlan, userDetails, defaultCurrencySlice]);

  useEffect(() => {
    const getPlansAndPricesList = async(id:string) => {
      try {
        const result = await dispatch(plansAndPricesListThunk({subscription_id: id})).unwrap();
        setActiveSubscriptionPlan(result?.data[0]);
      } catch (error) {
        setActiveSubscriptionPlan({});
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }
    if(userDetails?.workspace?.plan_name_id){
      getPlansAndPricesList(userDetails?.workspace?.plan_name_id);
    } else {
      setActiveSubscriptionPlan({});
    }
  }, [userDetails]);

  useEffect(() => {
    const defaultCard = saveCardsState?.find(card => card?.is_default);
    if(defaultCard) {
      setSelectedCard(defaultCard?.uuid)
    } else {
      setSelectedCard("");
    }
  }, [saveCardsState]);

  useEffect(() => {
    const defaultPayment = paymentMethodsState?.find(method => method?.default);
    if(defaultPayment) {
      setSelectedPaymentMethod(defaultPayment?.method_name);
    } else {
      setSelectedPaymentMethod("");
    }
  }, [paymentMethodsState]);

  useEffect(() => {
    if(userDetails?.workspace?.workspace_status === "trial") {
      setSubtotal(0);
    } else {
      const sub_total = numUsers*licensePrice;
      setSubtotal(sub_total);
    }
  }, [numUsers, licensePrice, userDetails]);

  useEffect(() => {
    const tax_amount = subtotal * taxRate;
    setTax(tax_amount);
  }, [subtotal, taxRate]);

  useEffect(() => {
    const pre_discount_amount = (subtotal * preDiscountRate)/100;
    setPreDiscountAmount(pre_discount_amount);
  }, [subtotal, preDiscountRate]);

  useEffect(() => {
    const discount_amount = (subtotal * discountRate)/100;
    setDiscountAmount(discount_amount);
  }, [subtotal, discountRate]);

  useEffect(() => {
    const total_amount = subtotal + tax - discountAmount;
    setTotal(total_amount);
  }, [subtotal, tax, discountAmount]);

  useEffect(() => {
    if(selectedVoucher?.voucher?.discount_rate) {
      setPreDiscountRate(Number(selectedVoucher?.voucher?.discount_rate));
    } else {
      setPreDiscountRate(0);
    }
  }, [selectedVoucher]);

  useEffect(() => {
    if(appliedVoucher?.voucher?.discount_rate) {
      setDiscountRate(Number(appliedVoucher?.voucher?.discount_rate));
    } else {
      setDiscountRate(0);
    }
  }, [appliedVoucher]);

  const useVoucher = async() => {
    if(appliedVoucher) {
      try {
        const result = await dispatch(useVoucherThunk({record_id: appliedVoucher?.id})).unwrap();
        console.log("result...", result);
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
    }
  };
  
  const getProfileData = async() => {
    if(token) {
      try {
        const result = await dispatch(getProfileDataThunk({user_id: customerId})).unwrap();
        await dispatch(setUserDetails(result?.customerData));
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
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const paymentImages: { [key: string]: string } = {
    stripe: "/images/stripe.png",
    paystack: "/images/paystack.png",
    paypal: "/images/paypal.png",
  };

  const getDomainsList = async() => {
    const domainId = selectedDomain?.id !== undefined
      ? selectedDomain?.id !== ""
        ? selectedDomain?.id : ""
      : "";
    console.log("domain id...", domainId);
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      setDomains(result?.data);
      if(domainId !== "") {
        const data = result?.data?.find(item => item?.id === domainId);
        setSelectedDomain(data);
        // console.log(data);
      } else {
        const data = result?.data?.find(item => item?.domain_type === "primary");
        setSelectedDomain(data);
      }
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
  }

  useEffect(() => {
    getDomainsList();
  }, [customerId]);
  
  const handleClickOutside = (event: MouseEvent) => {
    if(searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setSearchDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(searchTerm !== "" && domains.length > 0) {
      setSearchDropdown(true);
    }
  }, [searchTerm, domains]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSelectedDomain2("");
  };

  const toggleStatus = async( domainId:string, email:string, status:Boolean ) => {
    try {
      const result = await dispatch(changeEmailStatusThunk({ domain_id: domainId, email: email, status: !status })).unwrap();
      // console.log("result...", result);
      setTimeout(() => {
        toast.success("User status changed successfully");
      }, 1000);
    } catch (error) {
      toast.error(error?.message || "Error updating email status");
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getDomainsList();
    }
  };

  const navigate = useNavigate();
  
  const modalRef = useRef(null);
  const [newEmails, setNewEmails] = useState([]);
  // console.log("newEmails...", newEmails);
  const [newEmailsCount, setNewEmailsCount] = useState(0);
  const [licenseHover, setLicenseHover] = useState(false);
  const [taxHover, setTaxHover] = useState(false);
  const licenseRef = useRef(null);

  const basicInformationTable = [
    { name: 'first_name', label: 'First Name', placholder: 'Enter your first name', type: 'text'},
    { name: 'last_name', label: 'Last Name', placholder: 'Enter your last name', type: 'text'},
    { name: 'email', label: 'Email', placholder: 'Enter your email id', type: 'text'},
  ];

  const handleUpdateEmailData = e => {
    setSelectedEmail({
      ...selectedEmail,
      [e.target.name]: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
    });
  };
  
  const handleClickOutsideOfModal = e => {
    if(modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideOfModal);
    return() => {
      document.removeEventListener('mousedown', handleClickOutsideOfModal);
    };
  }, []);
  
  const handleClickOutsideOfLicense = e => {
    if(licenseRef.current && !licenseRef.current.contains(e.target)) {
      setIsLicenseModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideOfLicense);
    return() => {
      document.removeEventListener('mousedown', handleClickOutsideOfLicense);
    };
  }, []);

  const [passwordVisible, setPasswordVisible ] = useState([]);

  const togglePasswordVisibilty = (index) => {
    setPasswordVisible((prevState) =>
      prevState.map((visibility, i) => (i === index ? !visibility : visibility))
    );
  };

  const handleEmailDataChange = (index, field, value) => {
    if(field === "email") {
      setNewEmails((prev) => {
        const array = [...prev];
        array[index] = {
          ...array[index],
          email: value+`@${selectedDomain?.domain_name}`
        }
        return array;
      })
    } else if(field === "first_name" || field === "last_name") {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
      setNewEmails((prev) => {
        const array = [...prev];
        array[index] = {
          ...array[index],
          [field]: filteredValue
        }
        return array;
      })
    } else {
      setNewEmails((prev) => {
        const array = [...prev];
        array[index] = {
          ...array[index],
          [field]: value
        }
        return array;
      })
    }
  };

  const handleDeleteEmail = (index) => {
    if(newEmails.length === 1) {
      setNewEmails([]);
      setPasswordVisible([]);
    } else {
      setNewEmails(prev => prev.filter((_, i) => i !== index));
      setPasswordVisible(prev => prev.filter((_, i) => i !== index));
    }
  };

  const validateEmailData = () => {
    if(newEmails?.length > 0) {
      return newEmails?.every(item => {
        if(
          !item?.first_name?.trim() ||
          !item?.last_name?.trim() ||
          !item?.email?.trim() ||
          !item?.password?.trim()
        ) {
          return false;
        }
        const emailBeforeAt = item?.email.split('@')[0].trim();

        if(!emailBeforeAt) {
          return false;
        }
        return true;
      })
    }
  };

  const validateEmailPasswordLength = () => {
    if(newEmails?.length > 0) {
      return newEmails?.every(item => {
        if(item?.password?.length < 8) {
          return false;
        }
        return true;
      })
    }
  };

  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    // console.log({
    //   user_id: customerId,
    //   domain_id: selectedDomain?.id,
    //   emails: newEmails
    // })
    setEmailClicked(true);
    if(!validateEmailData()) {
      toast.warning("Please fill all the fields");
      setEmailClicked(false);
    } else if(!validateEmailPasswordLength()) {
      toast.warning("Minimum password lenght is 8");
      setEmailClicked(false);
    } else {
      try {
        const result = await dispatch(addEmailsThunk({
          user_id: customerId,
          domain_id: selectedDomain?.id,
          emails: newEmails
        })).unwrap();
        toast.success(result?.message);
      } catch (error) {
        toast.error(error?.message || "Error adding email");
        if(error?.message == "Authentication token is required") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      } finally {
        getDomainsList();
        setIsModalOpen(false);
        setNewEmails([]);
        setNewEmailsCount(0);
      }
    }
  };

  const toggleList = (emailId:string) => {
    setShowList((prev) => (prev === emailId ? "" : emailId));
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

  const handleRemoveEmailSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(deleteEmailThunk({domain_id: selectedDomain?.id, uuid: selectedEmail?.uuid})).unwrap();
      // console.log("result...", result);
      toast.success(result?.message);
    } catch (error) {
      toast.error(error?.message || "Error removing email");
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getDomainsList();
      setIsRemoveUserModalOpen(false);
    }
  };
  
  const handleClickOutsideRemoveEmail = (event: MouseEvent) => {
    if(removeEmailRef.current && !removeEmailRef.current.contains(event.target as Node)) {
      setIsRemoveUserModalOpen(false);
      setSelectedEmail({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideRemoveEmail);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideRemoveEmail);
    };
  }, []);

  const handleMakeAdminSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(makeEmailAdminThunk({domain_id: selectedDomain?.id, rec_id: selectedEmail?.email})).unwrap();
      toast.success(result?.message);
    } catch (error) {
      toast.error(error?.message || "Error making email admin");
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getDomainsList();
      setIsMakeAdminModalOpen(false);
    }
  };
  
  const handleClickOutsideMakeAdmin = (event: MouseEvent) => {
    if(makeAdminRef.current && !makeAdminRef.current.contains(event.target as Node)) {
      setIsMakeAdminModalOpen(false);
      setSelectedEmail({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMakeAdmin);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMakeAdmin);
    };
  }, []);

  const handleResetUserPasswordSubmit = async(e) => {
    e.preventDefault();
    if(
      password !== "" && password?.trim() !== "" &&
      confirmPassword !== "" && confirmPassword?.trim() !== ""
    ) {
      try {
        if(password !== confirmPassword) {
          toast.warning("Password and Confirm Password do not match");
        } else if(password.length < 8 || confirmPassword.length < 8) {
          toast.warning("Please enter a password with a minimum of lenght 8");
        } else {
          const result = await dispatch(resetEmailPasswordThunk({
            domain_id: selectedDomain?.id,
            rec_id: selectedEmail?.email,
            password: password
          })).unwrap();
          // console.log("result...", result);
          toast.success(result?.message);
          setIsResetUserPasswordModalOpen(false);
          setSelectedEmail({});
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        toast.error(error?.message || "Error updating user password");
        setIsResetUserPasswordModalOpen(false);
        setSelectedEmail({});
        setPassword("");
        setConfirmPassword("");
        if(error?.message == "Authentication token is required") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      } finally {
        getDomainsList();
      }
    } else {
      toast.warning("Input fields cannot be empty");
    }
  };
  
  const handleClickOutsideResetUserPassword = (event: MouseEvent) => {
    if(resetUserPasswordRef.current && !resetUserPasswordRef.current.contains(event.target as Node)) {
      setIsResetUserPasswordModalOpen(false);
      setSelectedEmail({});
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideResetUserPassword);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideResetUserPassword);
    };
  }, []);

  const handleRenameAccountSubmit = async(e) => {
    e.preventDefault();
    if(
      selectedEmail?.first_name !== "" && selectedEmail?.first_name?.trim() !== "" &&
      selectedEmail?.last_name !== "" && selectedEmail?.last_name?.trim() !== "" 
    ) {
      try {
        const result = await dispatch(updateEmailUserDataThunk({
          domain_id: selectedDomain?.id,
          uuid: selectedEmail?.uuid,
          first_name: selectedEmail?.first_name,
          last_name: selectedEmail?.last_name,
        })).unwrap();
        toast.success(result?.message);
        setIsRenameUserAccountModalOpen(false);
        setSelectedEmail({});
      } catch (error) {
        toast.error(error?.message || "Error udpating email");
        setIsRenameUserAccountModalOpen(false);
        setSelectedEmail({});
        if(error?.message == "Authentication token is required") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      } finally {
        getDomainsList();
      }
    } else {
      toast.warning("Please fill all the fields");
    }
  };
  
  const handleClickOutsideRenameAccount = (event: MouseEvent) => {
    if(renameAccountRef.current && !renameAccountRef.current.contains(event.target as Node)) {
      setIsRenameUserAccountModalOpen(false);
      setSelectedEmail({});
      setPassword("");
      setCountryName("");
      setStateName("");
      setCityName("");
      setCountry({});
      setState({});
      setCity({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideRenameAccount);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideRenameAccount);
    };
  }, []);
  
  const changeLicenseUsage = async() => {
    try {
      if(numUsers > 0) {
        const originalLicense = parseInt(userDetails?.license_usage);
        const updatedLicense = originalLicense + numUsers;
        const result = await dispatch(updateLicenseUsageThunk({
          user_id: customerId,
          license_usage: updatedLicense
        })).unwrap();
        // console.log("result...", result);
        await useVoucher();
        setAppliedVoucher(null);
        setSelectedVoucher(null);
        setSubtotal(0);
        setNumUsers(0);
        toast.success(result?.message);
      } else {
        toast.warning("Number of user cannot be 0");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating License Usage");
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getDomainsList();
      getProfileData();
      getVouchersList();
    }
  };

  function hideCardNumber(cardNumber) {
    const cardStr = String(cardNumber);
    const hiddenCard = cardStr.replace(/^(\d{8})/, "**** **** ");
    return hiddenCard;
  };

  const handleBuyLicenseUsage = e => {
    const count = Number(e.target.value);
    count < 0
    ? setNumUsers(0)
    : userDetails?.workspace?.workspace_status === "trial" 
      ? count + parseInt(userDetails?.license_usage) <= 10
        ? setNumUsers(count)
        : setNumUsers(10 - parseInt(userDetails?.license_usage))
      : setNumUsers(count);
  };

  const handleBuyLicenseUsageUp = () => {
    setNumUsers(prev => 
      userDetails?.workspace?.workspace_status === "trial"
      ? prev + 1 + parseInt(userDetails?.license_usage) <= 10
        ? prev + 1
        : prev
      : prev + 1
    )
  };

  const handleBuyLicenseUsageDown = () => {
    setNumUsers(prev => 
      prev - 1 < 0
        ? prev
        : prev - 1
    )
  };

  const getCardsList = async() => {
    try {
      const result = await dispatch(savedCardsListThunk({user_id: customerId})).unwrap();
      await dispatch(setSaveCards(result?.cards));
    } catch (error) {
      //
    }
  };

  const deleteCard = async(id) => {
    try {
      const result = await dispatch(deleteCardThunk({user_id: customerId, rec_id: id})).unwrap();
      toast.success(result?.message);
    } catch (error) {
      toast.error(error?.message || "Error deleting card");
    } finally {
      getCardsList();
    }
  };

  const addBillingHistory = async(paymentResult, madePaymentMethod) => {
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
        product_type: "user license",
        description: "purchase user license",
        domain: selectedDomain?.domain_name,
        payment_method: madePaymentMethod,
        payment_status: "Success",
        amount: `${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${total}`,
        transaction_data: paymentResult
      }));
    } catch (error) {
      console.log("error");
    }
  };

  const makePayment = async(token) => {
    const body = {
      token,
      product: {
        name: `${userDetails?.first_name} ${userDetails?.last_name}`,
        price: total,
        productBy: "test",
        currency: defaultCurrencySlice,
        description: 'purchasing user license',
        domain: "",
        workspace: {
          plan: activeSubscriptionPlan,
          license_usage: numUsers,
          plan_period: userDetails?.workspace?.payment_cycle,
          trial_plan: userDetails?.workspace?.workspace_status === "trial" ? "yes" : "no"
        },
        customer_id: customerId,
        email: userDetails?.email,
        voucher: appliedVoucher?.id
      }
    };
    const headers={
      "Content-Type":"application/json"
    };
    try {
      const result = await dispatch(stripePayThunk(body)).unwrap();
      console.log("result...", result);
      if(result?.message === "Payment successful") {
        setTimeout(() => {
          // navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: result?.charge}});
          addBillingHistory(result?.charge, "Stripe");
          changeLicenseUsage();
          setIsLicenseModalOpen(false);
        }, 3000);
      } else {
        toast.error("Error on payment method");
      }
    } catch (error) {
      toast.error(error?.message || "Error on payment method");
    }
  };

  const payStackConfig = {
    reference: (new Date()).getTime().toString(),
    email: userDetails?.email,
    amount: total * 100,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: userDetails?.first_name,
    lastName: userDetails?.last_name,
    channels: ['card']
  };
  
  const body = {
    reference: (new Date()).getTime().toString(),
    email: userDetails?.email,
    amount: total * 100,
    publicKey: 'pk_test_8f89b2c7e1b29dedea53c372de55e3c6e5d1a20e',
    currency: defaultCurrencySlice,
    firstName: userDetails?.first_name,
    lastName: userDetails?.last_name,
    name: `${userDetails?.first_name} ${userDetails?.last_name}`,
    description: 'purchasing user license',
    domain: "",
    workspace: {
      plan: activeSubscriptionPlan,
      license_usage: numUsers,
      plan_period: userDetails?.workspace?.payment_cycle,
      trial_plan: userDetails?.workspace?.workspace_status === "trial" ? "yes" : "no" 
    },
    customer_id: customerId,
    voucher: appliedVoucher?.id
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
      // console.log(reference);
      setTimeout(() => {
        // navigate('/download-invoice', {state: {...data, payment_method: paymentMethod, payment_result: reference}})
        changeLicenseUsage();
        addBillingHistory(reference, "paystack");
        setIsLicenseModalOpen(false);
      }, 3000);
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
    text: 'Submit',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    // <div>
      <>
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex flex-col justify-start">
            <h2 className="text-green-500 text-sm sm:text-2xl">Email</h2>
            <p className="text-sm sm:text-md md:text-lg">
              Set up your email accounts here and you can add users and edit your admin details.
            </p>
          </div>

          {/* <div className="email-search">
            <div className="flex items-center space-x-1 relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search domain..."
                value={searchTerm || selectedDomain2}
                onChange={handleSearchChange}
                className="bg-transparent border rounded px-2 py-1 relative"
                onFocus={() => {setSearchDropdown(true)}}
              />
              {
                searchDropdown && domains?.filter(item => item?.domain_name?.toLowerCase().includes(searchTerm?.toLowerCase())).length > 0 && (
                  <div className="absolute top-0 max-h-32 flex flex-col mt-8 bg-slate-200 py-1 w-[184px] overflow-y-auto z-[10]">
                    {
                   // countries?.filter(name => name?.name?.toLowerCase().includes(countryName.toLowerCase()))
                      domains?.filter(item => item?.domain_name?.toLowerCase().includes(searchTerm?.toLowerCase())).map((item2, index) => (
                        <p
                          key={index}
                          className="px-2 first:border-0 border-t border-white cursor-pointer"
                          onClick={() => {
                            setSelectedDomain(item2);
                            setSelectedDomain2(item2?.domain_name);
                            setSearchDropdown(false);
                            setSearchTerm("");
                          }}
                        >{item2?.domain_name}</p>
                      ))
                    }
                  </div>
                )
              }
              <FilterX
                className="text-green-500 cursor-pointer"
                size={24}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDomain2("");
                }}
              />
            </div>
          </div> */}

          <div className="flex flex-col border-2 border-gray-200 rounded-md mt-2">
            <div className="email-header">
              <div className="flex items-start flex-col md:flex-row ">
                <div className="md:mr-4 flex-shrink-0 h-full sm:h-24">
                  <img
                    src="/images/google.jpg"
                    alt="Domain"
                    className="h-full w-full max-w-[220px] sm:w-auto object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-600">{selectedDomain?.domain_name}</p>
                  {
                    selectedDomain?.domain_type === "primary" && (
                      <React.Fragment>
                        <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-600 inline-block items-center content-center">
                          <span className="inline-block items-center content-center">{userDetails?.license_usage ? userDetails?.license_usage : 0} users @{selectedDomain?.domain_name}</span>
                          <Dot className="inline-block items-center content-center" />
                          <button
                            type="button"
                            disabled={isAdmin}
                            className={`text-xs sm:text-sm ${isAdmin ? "text-[#8A8A8A]" : "text-green-500"} font-normal cursor-pointer inline-block items-center content-center`}
                            onClick={() => setIsLicenseModalOpen(true)}
                          >
                            Add user license
                          </button>
                        </p>

                        <p className="text-sm md:text-md text-gray-600">
                          <span className="inline-block items-center content-center">{activeSubscriptionPlan?.plan_name}</span>
                          {
                            userDetails?.workspace?.workspace_status !== "trial"
                            ? (
                              <>
                                <Dot className="inline-block items-center content-center" />
                                  <button
                                    type="button"
                                    className={`text-xs sm:text-sm ${isAdmin ? "text-[#8A8A8A]" : "text-green-500"} cursor-pointer inline-block items-center content-center`}
                                    onClick={() => {
                                      if(userDetails?.workspace?.workspace_status !== "trial") {
                                        navigate("/upgrade-plan")
                                      }
                                    }}
                                    disabled={isAdmin}
                                  >
                                    Update plan
                                  </button>
                              </>
                            ) : (
                              <>
                                <Dot className="inline-block items-center content-center" />
                                <button
                                  type="button"
                                  disabled={isAdmin}
                                  className="text-xs sm:text-sm text-slate-400 inline-block items-center content-center cursor-not-allowed"
                                  onClick={() => {toast.error("You cannot update plan during trial period")}}
                                >
                                  Update plan
                                </button>
                              </>
                            )
                          }
                          
                        </p>
                      </React.Fragment>
                    )
                  }
                </div>
              </div>

              {
                selectedDomain?.domain_type === "primary" && (
                  <div className="flex flex-col gap-4 md:ml-4">
                    <button
                      className={`border ${isAdmin ? "border-[#8A8A8A] text-[#8A8A8A]" : "border-[#12A833] text-[#12A833]"} bg-white px-4 py-2 rounded-[40px] mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105`}
                      onClick={() => setIsModalOpen(true)}
                      type="button"
                      disabled={isAdmin}
                      cypress-name="add-new-email-user-button"
                    >
                      Add Email
                    </button>
                    <p className="text-sm md:text-md">User Licenses: {selectedDomain?.emails ? selectedDomain?.emails.length : 0}/{userDetails?.license_usage}</p>
                  </div>
                )
              }
            </div>

            {
              selectedDomain?.domain_type === "primary" && (
                <div className="mt-2">
                  <div className="w-full overflow-x-auto h-full min-h-[300px]">
                    <table className="w-full border-collapse">
                      <thead className="bg-[#F7FAFF] mb-4">
                        <tr>
                          <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                            Name
                          </th>
                          <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                            Email
                          </th>
                          <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                            Status
                          </th>
                          <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDomain?.emails?.map((row, index) => (
                          <tr key={index} className="relative ">
                            <td className="p-2 text-gray-500 text-xs sm:text-sm md:text-md  font-semibold flex items-center content-center">
                              <p className="p-2 text-gray-600 font-semibold text-xs sm:text-sm md:text-md flex items-center">{row?.first_name}&nbsp;{row?.last_name}</p>
                              {row?.is_admin ? (
                                <p className="px-2 -mt-[1px] text-gray-600 font-semibold text-xs sm:text-sm md:text-md flex items-center">
                                  <ChevronRight />
                                  <span className="text-gray-600 font-semibold text-xs sm:text-sm md:text-md mt-[1px]">Admin</span>
                                </p>
                              ) : ""}
                            </td>
                            <td className="p-2 text-gray-500 text-xs sm:text-sm md:text-md">
                              {row?.email}
                            </td>
                            <td className="p-2 text-gray-800 text-xs sm:text-sm md:text-md">
                              <button 
                                className={`relative w-24 h-10 rounded-[10px] border-2 flex justify-center items-center ${
                                  isAdmin
                                  ? "bg-[#8A8A8A]"
                                  : row?.status
                                    ? "border-green-500 bg-green-500"
                                    : "border-red-500 bg-red-500"
                                }`}
                                onClick={() => toggleStatus(selectedDomain?.id, row?.email, row?.status)}
                                disabled={isAdmin}
                              >
                                <span className="text-white text-xs">
                                  {row.status ? "Active" : "Inactive"}
                                </span>
                              </button>
                            </td>
                            <td className="p-2 text-center relative">
                              <button
                                type="button"
                                onClick={(e) => toggleList(row?.uuid)}
                                disabled={isAdmin}
                                className={`w-6 h-6 rounded-full border-2 ${isAdmin ? "border-[#8A8A8A]" : "border-green-500"} flex justify-center items-center`}
                              >
                                <p className="mb-2">
                                  ...
                                </p>
                              </button>
                              {
                                showList === row?.uuid && (
                                  <div
                                    className="p-2 w-80 max-w-[12rem] absolute right-0 top-0 mt-9 z-10"
                                    style={actionModalStyle}
                                    onClick={(e) => {e.stopPropagation()}}
                                    ref={listRef}
                                  >
                                    <ul className="bg-gray-100 rounded-xl shadow-md space-y-2 flex-grow flex-col items-start justify-center">
                                      {row?.is_admin ? (
                                        <>
                                          <li>
                                            <button
                                              type="button"
                                              className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                                              onClick={() => {
                                                setIsResetUserPasswordModalOpen(true);
                                                setSelectedEmail(row);
                                              }}
                                            >
                                              Reset user password
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              type="button"
                                              className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                                              onClick={() => {
                                                setIsRenameUserAccountModalOpen(true);
                                                setSelectedEmail(row);
                                              }}
                                            >
                                              Rename user account
                                            </button>
                                          </li>
                                        </>
                                      ) : (
                                        <>
                                          <li>
                                            <button
                                              type="button"
                                              className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                                              onClick={() => {
                                                setIsRemoveUserModalOpen(true);
                                                setSelectedEmail(row);
                                              }}
                                            >
                                              Remove user account
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              type="button"
                                              className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                                              onClick={() => {
                                                setIsMakeAdminModalOpen(true);
                                                setSelectedEmail(row);
                                              }}
                                            >
                                              Make admin
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              type="button"
                                              className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                                              onClick={() => {
                                                setIsResetUserPasswordModalOpen(true);
                                                setSelectedEmail(row);
                                              }}
                                            >
                                              Reset user password
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              type="button"
                                              className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                                              onClick={() => {
                                                setIsRenameUserAccountModalOpen(true);
                                                setSelectedEmail(row);
                                              }}
                                            >
                                              Rename user account
                                            </button>
                                          </li>
                                        </>
                                      )}
                                    </ul>
                                  </div>
                                )
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        {
          isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
              <div className="bg-gray-100 rounded-xl shadow-md p-6 w-11/12 max-w-3xl relative" ref={modalRef} cypress-name="add-email-modal">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">Add Email</h1>
                  <div className="flex items-center">
                    <p className="text-sm text-green-500 mr-1">Add {selectedDomain?.emails ? (selectedDomain?.emails?.length + newEmails.length) : newEmails?.length}/{userDetails?.license_usage}</p>
                    <button
                      aria-label="Add Email"
                      className="text-green-500"
                      type='button'
                      onClick={() => {
                        if((selectedDomain?.emails?.length + newEmails.length) < userDetails?.license_usage) {
                          setNewEmails([...newEmails, intialEmail])
                          setPasswordVisible([...passwordVisible, false]);
                        } else {
                          toast.warning("You have reached your maximum license usage.")
                        }
                      }}
                      cypress-name="add-email-plus-button"
                    >
                      <CirclePlus size={28} />
                    </button>
                  </div>
                </div>
                <div className='w-full max-h-[500px] overflow-y-auto flex flex-col gap-5'>
                  {
                    newEmails?.map((email, index) => (
                      
                      <div className="flex" key={index} cypress-name="add-email-user-form">
                        <div className="bg-white p-4 rounded-xl shadow-inner flex-grow max-w-2xl border">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative sm:col-span-1 col-span-2">
                              <input
                                id="firstName"
                                type="text"
                                placeholder="Enter first name"
                                className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                                value={email?.first_name}
                                onChange={(e) => {handleEmailDataChange(index, "first_name", e.target.value)} }
                              />
                              <label
                                htmlFor="firstName"
                                className="absolute bg-white -top-[10px] left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                              >
                                First Name
                              </label>
                            </div>
                            <div className="relative sm:col-span-1 col-span-2">
                              <input
                                id="lastName"
                                type="text"
                                placeholder="Enter last name"
                                className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                                value={email?.last_name}
                                onChange={(e) => {handleEmailDataChange(index, "last_name", e.target.value)} }
                              />
                              <label
                                htmlFor="lastName"
                                className="absolute bg-white -top-[10px] left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                              >
                                Last Name
                              </label>
                            </div>
                            <div className="relative col-span-2">
                              <input
                                id="username"
                                type="text"
                                placeholder="Enter email id"
                                className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                                value={email?.email.split('@')[0]}
                                onChange={(e) => {handleEmailDataChange(index, "email", e.target.value.replace(/@/g, ''))} }
                              />
                              <label
                                htmlFor="username"
                                className="absolute bg-white -top-[10px] left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                              >
                                Email
                              </label>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                                @{selectedDomain?.domain_name}
                              </span>
                            </div>
                            <div className="relative col-span-2">
                              <input
                                id="password"
                                type={passwordVisible[index] ? "text" : "password"}
                                placeholder="Enter password"
                                className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                                value={email?.password}
                                onChange={(e) => {handleEmailDataChange(index, "password", e.target.value)} }
                              />
                              <label
                                htmlFor="password"
                                className="absolute bg-white -top-[10px] left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                              >
                                Password
                              </label>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibilty(index)}
                                aria-label={
                                  passwordVisible[index] ? "Hide Password" : "Show Password"
                                }
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              >
                                {passwordVisible[index] ? (
                                  <HiOutlineEye size={20} />
                                ) : (
                                  <RiEyeCloseLine size={20} />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ml-1 flex items-stretch">
                          <button
                            type="button"
                            aria-label="Delete"
                            className="bg-white border shadow-sm text-white p-4 rounded-xl flex items-center justify-center"
                            onClick={() => {handleDeleteEmail(index)}}
                          >
                            <Trash2 size={24} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    aria-label="Delete"
                    className="px-4 py-2 md:px-3 sm-max:px-2 sm-max:text-xs bg-green-600 text-white font-medium rounded-md hover:bg-opacity-90"
                    onClick={handleEmailSubmit}
                    cypress-name="save-email-users"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    className="px-4 py-2 md:px-6 sm-max:px-2 sm-max:text-xs bg-red-500 text-white font-medium rounded-md hover:bg-opacity-90"
                    onClick={() => {
                      setIsModalOpen(false);
                      setNewEmails([]);
                      setPasswordVisible([]);
                      setNewEmailsCount(0);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )
        }

        {
          isLicenseModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full mx-2  max-h-[95vh] xl:max-h-full overflow-y-scroll" ref={licenseRef}>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold">Add User License</h1>
                  {/* <button className="flex items-center gap-1 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out py-2 px-4 rounded-lg text-xs sm:text-sm">
                    Add to Cart <MdOutlineAddShoppingCart />
                  </button> */}
                </div>

                <div className="flex items-center justify-between mb-4 relative">
                  <p className="text-base font-semibold">No. of additional user</p>
                  <input
                    type="number"
                    value={numUsers}
                    onChange={(e) => {handleBuyLicenseUsage(e)}}
                    className="border-gray-300 border rounded p-2 w-16 text-center bg-white outline-none focus:ring-1 focus:ring-green-300 appearance-auto"
                    placeholder="No."
                  />
                  {/* <button type="button" className="absolute flex flex-col top-0 right-0" onClick={() => handleBuyLicenseUsageUp()}>
                    <IoMdArrowDropup />
                  </button>

                  <button type="button" className="absolute flex flex-col top-0 right-0" onClick={() => handleBuyLicenseUsageDown()}>
                    <IoMdArrowDropdown />
                  </button> */}
                </div>

                {showDetails && (
                  <>
                    <div className="border-y border-gray-300 py-2 my-6">
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1 relative">
                          <p>
                            {numUsers + parseInt(userDetails?.license_usage)} users, Year subscription (price adjusted to current cycle)
                          </p>
                          <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold mr-1 cursor-pointer" onMouseOver={() => {setLicenseHover(true)}} onMouseLeave={() => {setLicenseHover(false)}}>
                            i
                          </span>
                          {
                            licenseHover && (
                              <div className="license-usage">
                                <p className="bg-[#12A83330] px-4 py-3 w-full font-inter font-medium text-[10px] text-black rounded-md">The price shown is prorated according to the time left in your current billing cycle.</p>
                              </div>
                            )
                          }
                        </div>
                        <span className="flex items-center font-semibold">
                          {
                            userDetails?.workspace?.workspace_status === "trial"
                            ? (
                              <p className="flex items-center content-center">
                                <p className="font-inter font-normal text-xs text-red-600 line-through text-nowrap flex items-center">
                                  <span className="font-inter font-normal text-xs text-red-600">{numUsers} x&nbsp;</span>
                                  {/* <span><RiCloseFill className="w-3 h-3 text-red-600" /></span> */}
                                  <span className="font-inter font-normal text-xs text-red-600">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}</span>
                                  <span className="font-inter font-normal text-xs text-red-600">{licensePrice?.toFixed(2)}</span>
                                </p>
                                {/* <p className="line-through inline-block">
                                  <span className="inline-block">{numUsers}</span>
                                  <span className="inline-block"><X className="text-black w-3 h-3" /></span>
                                  <span className="inline-block">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{licensePrice?.toFixed(2)}</span>
                                </p> */}
                                <span className="mx-1 inline-block pt-[2px]">=</span>
                                <span className="inline-block pt-[2px]">0</span>
                              </p>
                            ) : (
                              <p className="inline-block">
                                <p className="inline-block">
                                  <span className="inline-block">{numUsers}</span>
                                  <X className="text-black w-3 h-3 inline-block" />
                                  <span className="inline-block">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{licensePrice?.toFixed(2)}</span>
                                </p>
                                <span className="mx-1 inline-block">=</span>
                                <span className="inline-block">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{numUsers*licensePrice}</span>
                              </p>
                            )
                          }
                        </span>
                        {/* <span className="flex items-center font-semibold">{numUsers} <X className="text-black w-3 h-3" /> {currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{licensePrice?.toFixed(2)}</span> */}
                      </div>
                      <p className="underline mb-4 font-semibold mt-2 cursor-pointer" onClick={() => {setVoucherInputOpen(true)}}>Enter voucher code</p>

                      {
                        voucherInputOpen && (
                          <div className="flex items-center justify-center w-full mt-7">
                            <input
                              type="text"
                              placeholder="Enter voucher code"
                              className="flex-grow p-3 border-2 border-black border-dashed focus:outline-none focus:ring-0"
                              value={voucherCode}
                              onChange={(e) => {setVoucherCode(e.target.value)}}
                            />
                            <button
                              className="px-4 py-3 text-white transition-colors bg-black hover:bg-gray-800"
                              type="button"
                              onClick={() => handleSearchVoucher()}
                            >
                              Check
                            </button>
                            <button className="w-6 h-6 my-auto" onClick={() => {
                              setVoucherInputOpen(false);
                              setVoucherCode("");
                            }}>
                              <X className="w-full h-full"/>
                            </button>
                          </div>
                        )
                      }
                      
                      {selectedVoucher && (
                        <div className="bg-transparent border border-gray-500 rounded-md p-4 flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="px-6 rounded-sm text-xs"
                              style={{
                                border: "2px dashed gray",
                                backgroundColor: "#12A83333",
                                paddingTop: "0.65rem",
                                paddingBottom: "0.65rem",
                              }}
                            >
                              {selectedVoucher?.voucher?.voucher_code}
                            </div>
                            <p className="text-green-500">
                              {selectedVoucher?.voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code ? `Saved ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${discountAmount?.toFixed(2)}` : `You will save ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}${preDiscountAmount?.toFixed(2)}`}!
                            </p>
                          </div>
                          <p
                            className={`font-bold text-xl cursor-pointer ${
                              selectedVoucher?.voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code ? "text-gray-500" : "text-green-500"
                            }`}
                            onClick={selectedVoucher?.voucher?.voucher_code !== appliedVoucher?.voucher?.voucher_code ? handleApplyClick : undefined} 
                          >
                            {selectedVoucher?.voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code ? "Applied" : "Apply"}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border-b border-gray-300 py-2 mb-4">
                      <div className="flex justify-between font-semibold mb-3">
                        <span>Subtotal</span>
                        <span>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{subtotal?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center relative">
                          Tax (8.25%)
                          <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold mx-1 cursor-pointer" onMouseOver={() => {setTaxHover(true)}} onMouseLeave={() => {setTaxHover(false)}}>
                            i
                          </span>
                          {
                            taxHover && (
                              <div className="tax-hover">
                                <p className="bg-[#12A83330] px-4 py-3 w-full font-inter font-medium text-[10px] text-black rounded-md">Sales tax is calculated according to your billing address.</p>
                              </div>
                            )
                          }
                        </div>
                        <span className="gap-2">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{tax.toFixed(2)}</span>
                      </div>
                      {
                        appliedVoucher && (
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              Voucher discount
                              <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold ml-1">
                                i
                              </span>
                            </div>
                            <span className="gap-2">{discountAmount > 0 ? "-" : ""}{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{discountAmount.toFixed(2)}</span>
                          </div>
                        )
                      }
                    </div>
                  </>
                )}

                <div className="border-b border-gray-300 py-2 mb-4">
                  <div className="flex justify-between font-bold">
                    <span className="flex items-center gap-2">
                      Total
                      <p 
                        className="text-green-500 font-normal cursor-pointer flex items-center"
                        onClick={() => setShowDetails(!showDetails)}
                      >
                        {showDetails ? (
                          <>
                            Hide details <ChevronUp className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Show details <ChevronDown className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </p>
                    </span>
                    <span>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{total.toFixed(2)}</span>
                  </div>
                </div>

                {
                  userDetails?.workspace?.workspace_status === "trial"
                  ? (<></>) : (
                    <>
                      <div className="flex justify-between max-w-md w-full text-xs sm:text-sm md:text-md">
                        <button
                          className={`flex-1 py-2 px-1 text-center rounded-l-md ${activeMethod === "saved" ? "bg-white text-green-500 shadow-sm" : "bg-white text-gray-800"}`}
                          type="button"
                          onClick={() => setActiveMethod("saved")}
                        >
                          Saved Payment Method
                        </button>
                        <button
                          className={`flex-1 py-2 px-1 text-center rounded-r-md ${activeMethod === "other" ? "bg-white text-green-500 shadow-sm" : "bg-white text-gray-800"}`}
                          type="button"
                          onClick={() => setActiveMethod("other")}
                        >
                          Other Payment Methods
                        </button>
                      </div>
                
                      <div className="rounded-b-lg rounded-tr-lg border p-3">
                        {activeMethod === "saved" && (
                          <div className="border-2 border-green-500 p-4 rounded-lg my-4">
                            {
                              saveCardsState?.length > 0 ? saveCardsState?.map((card, index) => (
                                <div className="flex justify-between items-center mb-2" key={index}>
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      id="saved-method"
                                      checked={activeMethod === "saved" && selectedCard === card?.uuid}
                                      onChange={() => handlePaymentMethodChange(card?.card_id)}
                                      className="mr-2 radio radio-xs radio-success"
                                      aria-labelledby="saved-method-label"
                                      defaultChecked
                                    />
                                    <label id="saved-method-label" className="flex items-center">
                                      <img
                                        src="/images/stripe.webp"
                                        alt="Stripe"
                                        className="w-14 h-8 mr-6"
                                      />
                                      <div className="flex flex-col">
                                        <small className="text-xs font-bold text-gray-700">{hideCardNumber(card?.card_id)}</small>
                                        <small className="text-[10px] text-gray-300">Expiry: {card?.expiry_month}/{card?.expiry_year}</small>
                                        <small className="text-[10px] flex items-center gap-1 text-gray-300">
                                          {/* <MdOutlineMail /> billing@acme.corp */}
                                          {card?.name}
                                        </small>
                                      </div>
                                    </label>
                                  </div>
                                  {
                                    card?.is_default && (
                                      <button className="bg-green-500 text-white text-xs rounded-3xl px-4 py-1 mx-auto block">
                                        Default
                                      </button>
                                    )
                                  }
                                  <RiDeleteBin6Line className="text-red-500 text-lg cursor-pointer" onClick={() => {deleteCard(card?.uuid)}} />
                                </div>
                              )) : (
                                <p className="text-center">No saved cards</p>
                              )
                            }
                          </div>
                        )}
                
                        {activeMethod === "other" && (
                          <div>
                            {
                              paymentMethodsState?.length > 0 && paymentMethodsState?.map((method, index) => (
                                <div className="flex items-center justify-between mb-2" key={index}>
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      id={method?.id}
                                      name="payment-method"
                                      checked={selectedPaymentMethod === method?.method_name} // Check if method is 'stripe'
                                      onClick={() => handlePaymentMethodChange(method?.method_name)}
                                      className="mr-2 radio radio-xs radio-success"
                                      title={method?.method_name}
                                    />
                                    <label htmlFor={method?.id} className="mr-2 capitalize">
                                      {method?.method_name}
                                    </label>
                                  </div>
                                  <div>
                                    <img
                                      src={method?.method_image}
                                      alt={method?.method_name}
                                      className="w-14 h-8 border-2 border-gray-200 shadow-sm p-1 rounded-md"
                                    />
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        )}
                
                        {activeMethod === "saved" && (
                          <p className="text-green-500 text-sm text-left mt-4 cursor-pointer" onClick={() => {setActiveMethod("other")}}>
                            Use another payment method
                          </p>
                        )}
                      </div>
                    </>
                  )
                }

                <div className="flex justify-start gap-4 mt-4">
                {
                  userDetails?.workspace?.workspace_status !== "trial"
                  ? selectedPaymentMethod?.toLowerCase() === "stripe"
                    ? (
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        type="button"
                      >
                        <StripeCheckout
                          name='Hordanso'
                          description="Purchasing google workspace and domain"
                          image={logo}
                          ComponentClass="div"
                          panelLabel="Submit"
                          // amount={data?.finalTotalPrice * 100}
                          // currency={defaultCurrencySlice}
                          stripeKey="pk_test_51HCGY4HJst0MFfZtYup1hAW3VcsAmcJJ4lwg9fDjPLvStToUiLixgF679sFDyWfVH1awUIU3UGOd2TyAYDUkJrPF002WD2USoG"
                          email={userDetails?.email}
                          // billingAddress
                          token={makePayment}
                          allowRememberMe
                        >Submit</StripeCheckout>
                      </button>
                    ) : selectedPaymentMethod?.toLowerCase() === "paystack"
                    ? (
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        type="button"
                        // onClick={() => {() => initializePayment(handleSuccess, handleClose)}}
                      >
                        <PaystackButton {...componentProps} />
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        type="button"
                        onClick={() => {toast.warning("Please select a payment method")}}
                      >
                        Submit
                      </button>
                    )
                  : (
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded"
                      type="button"
                      onClick={() => {changeLicenseUsage()}}
                    >
                      Submit
                    </button>
                  )
                }
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={() => {
                      setIsLicenseModalOpen(false);
                      setNumUsers(0);
                      setAppliedVoucher(null);
                      setSelectedVoucher(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )
        }
        {
          isRemoveUserModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
              <div className='bg-white rounded-3xl shadow-lg max-w-[538px] p-5' ref={removeEmailRef}>
                <div className='flex justify-between items-center w-full px-2'>
                  <h3 className='font-inter font-medium text-[28px] text-[#0D121F]'>Remove Email</h3>
                  <X className='w-7 h-7 text-[#0D121F] cursor-pointer' onClick={() => {
                    setIsRemoveUserModalOpen(false);
                    setSelectedEmail({});
                  }} />
                </div>

                <h4 className='font-inter font-medium text-2xl text-[#222222] mt-10'>Are you sure want to remove this email?</h4>

                <div className='flex justify-center gap-10 mt-10'>
                  <button 
                    className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#12A833]'
                    type='button'
                    onClick={(e) => {handleRemoveEmailSubmit(e)}}
                  >Yes</button>
                  <button
                    className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#EE1010]'
                    type='button'
                    onClick={() => {
                      setIsRemoveUserModalOpen(false);
                      setSelectedEmail({});
                    }}
                  >Cancel</button>
                </div>
              </div>
            </div>
          )
        }

        {
          isMakeAdminModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
              <div className='bg-white rounded-3xl shadow-lg max-w-[538px] p-5' ref={makeAdminRef}>
                <div className='flex justify-between items-center w-full px-2'>
                  <h3 className='font-inter font-medium text-[28px] text-[#0D121F]'>Remove Email</h3>
                  <X className='w-7 h-7 text-[#0D121F] cursor-pointer' onClick={() => {
                    setIsMakeAdminModalOpen(false);
                    setSelectedEmail({});
                  }} />
                </div>

                <h4 className='font-inter font-medium text-2xl text-[#222222] mt-10'>Are you sure want to make this email admin?</h4>

                <div className='flex justify-center gap-10 mt-10'>
                  <button 
                    className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#12A833]'
                    type='button'
                    onClick={(e) => {handleMakeAdminSubmit(e)}}
                  >Yes</button>
                  <button
                    className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#EE1010]'
                    type='button'
                    onClick={() => {
                      setIsMakeAdminModalOpen(false);
                      setSelectedEmail({});
                    }}
                  >Cancel</button>
                </div>
              </div>
            </div>
          )
        }

        {
          isResetUserPasswordModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
              <form className='bg-white rounded-3xl shadow-lg max-w-[538px] px-5 py-2' ref={resetUserPasswordRef} onSubmit={handleResetUserPasswordSubmit}>
                <div className='flex justify-between items-center w-full px-2 pb-4'>
                  <h3 className='font-inter font-medium text-[28px] text-[#0D121F]'>Reset User Password</h3>
                  <X className='w-7 h-7 text-[#0D121F] cursor-pointer' onClick={() => {
                    setIsResetUserPasswordModalOpen(false);
                    setSelectedEmail({});
                    setPassword("");
                    setConfirmPassword("");
                  }} />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="sm:col-span-1 col-span-2 flex flex-col relative w-full">
                    <label className="absolute font-inter font-normal text-sm text-[#8A8A8A] bg-white -mt-[11px] ml-4">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full h-10 border border-[#E4E4E4] rounded-[10px] pl-3 pr-8"
                      onChange={e => {setPassword(e.target.value)}}
                      value={password}
                    />
                    {
                      showPassword ? (
                        <button
                          type="button"
                          className="absolute right-2 mt-[11px]"
                          onClick={() => {setShowPassword(!showPassword)}}
                        >
                          <HiOutlineEye size={20} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="absolute right-2 mt-[11px]"
                          onClick={() => {setShowPassword(!showPassword)}}
                        >
                          <RiEyeCloseLine size={20} />
                        </button>
                      )
                    }
                  </div>

                  <div className="sm:col-span-1 col-span-2 flex flex-col relative w-full">
                    <label className="absolute font-inter font-normal text-sm text-[#8A8A8A] bg-white -mt-[11px] ml-4">Confirm Password</label>
                    <input
                      type={showCPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full h-10 border border-[#E4E4E4] rounded-[10px] pl-3 pr-8"
                      onChange={e => {setConfirmPassword(e.target.value)}}
                      value={confirmPassword}
                    />
                    {
                      showCPassword ? (
                        <button
                          type="button"
                          className="absolute right-2 mt-[11px]"
                          onClick={() => {setShowCPassword(!showCPassword)}}
                        >
                          <HiOutlineEye size={20} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="absolute right-2 mt-[11px]"
                          onClick={() => {setShowCPassword(!showCPassword)}}
                        >
                          <RiEyeCloseLine size={20} />
                        </button>
                      )
                    }
                  </div>
                </div>

                <div className='flex justify-center gap-10 mt-10'>
                  <button 
                    className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#12A833]'
                    type='submit'
                  >Update</button>
                  <button
                    className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#EE1010]'
                    type='button'
                    onClick={() => {
                      setIsResetUserPasswordModalOpen(false);
                      setSelectedEmail({});
                      setPassword("");
                      setConfirmPassword("");
                    }}
                  >Cancel</button>
                </div>
              </form>
            </div>
          )
        }

        {
          isRenameUserAccountModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
              <form className='bg-white rounded-3xl shadow-lg max-w-[891px] w-full' ref={renameAccountRef} onSubmit={handleRenameAccountSubmit}>
                <div className='flex justify-between items-center w-full px-5 py-3 border-b border-black'>
                  <h3 className='font-inter font-medium text-[28px] text-[#0D121F]'>Rename user account</h3>
                  <X className='w-7 h-7 text-[#0D121F] cursor-pointer' onClick={() => {
                    setIsRenameUserAccountModalOpen(false);
                    setSelectedEmail({});
                  }} />
                </div>

                <div className="p-5 grid grid-cols-3 gap-3 max-h-[400px] h-full overflow-y-auto">
                  <h6 className="col-span-3 md:text-left max-[768px]:text-center font-plus-jakarta-sans font-bold text-xl text-[#14213D]">Basic information</h6>

                  {
                    basicInformationTable.map((item, index) => (
                      <div className="md:col-span-1 col-span-3 flex flex-col relative w-full max-w-[400px] mx-auto" key={index}>
                        <label className="absolute font-inter font-normal text-sm text-[#8A8A8A] bg-white -mt-[11px] ml-4">{item.label}</label>
                        <input
                          type={item.type}
                          name={item.name}
                          placeholder={item.placholder}
                          className="w-full h-10 border border-[#E4E4E4] rounded-[10px] px-3"
                          onChange={handleUpdateEmailData}
                          value={selectedEmail[item.name]}
                          disabled={item.name === "email" ? true : false}
                        />
                      </div>
                    ))
                  }
                </div>

                <div className='flex justify-start gap-10 my-3 px-5'>
                  <button 
                    className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#12A833]'
                    type='submit'
                  >Update</button>
                </div>
              </form>
            </div>
          )
        }
      </>
    // </div>
  );
};

export default EmailList;
