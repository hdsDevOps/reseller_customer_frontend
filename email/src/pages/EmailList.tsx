import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronUp, CirclePlus, FilterX, Trash2, X } from "lucide-react";
import EmailModal from "../components/EmailModal";
import ActionModal from "../components/ActionModal";
import AddLicense from "../components/AddLicense";
import { getDomainsListThunk, removeUserAuthTokenFromLSThunk,addEmailsThunk, changeEmailStatusThunk, deleteEmailThunk, makeEmailAdminThunk, updateEmailUserDataThunk, resetEmailPasswordThunk, updateLicenseUsageThunk } from 'store/user.thunk';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';

import "../index.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { toast } from "react-toastify";
import { HiOutlineEye } from "react-icons/hi";
import { RiDeleteBin6Line, RiEyeCloseLine } from "react-icons/ri";
import AddPayment from "../components/AddPaymentMethods";
import { MdOutlineMail } from "react-icons/md";

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

  const { customerId } = useAppSelector(state => state.auth);
  // console.log("userId...", customerId);
  
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
  const [selectedDomain, setSelectedDomain] = useState({});
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
  const subtotal = 70.6;
  const taxRate = 0.0825;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const [activeMethod, setActiveMethod] = useState("saved");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>("stripe");

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
    // console.log("domain id...", domainId);
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      setDomains(result?.data);
      if(domainId !== "") {
        const data = result?.data?.find(item => item?.id === domainId);
        setSelectedDomain(data);
        // console.log(data);
      } else {
        const data = domains.find(item => item?.domain_type === "primary");
        setSelectedDomain(data || result?.data[0]);
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
  }, []);
  
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
  };

  const toggleStatus = async( domainId:string, email:string, status:Boolean ) => {
    try {
      const result = await dispatch(changeEmailStatusThunk({ domain_id: domainId, email: email, status: !status })).unwrap();
      console.log("result...", result);
    } catch (error) {
      toast.error("Error updating email status");
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

  const basicInformationTable = [
    { name: 'first_name', label: 'First Name', placholder: 'Enter your first name', type: 'text'},
    { name: 'last_name', label: 'Last Name', placholder: 'Enter your last name', type: 'text'},
    { name: 'email', label: 'Email', placholder: 'Enter your email id', type: 'text'},
  ];

  const handleUpdateEmailData = e => {
    setSelectedEmail({
      ...selectedEmail,
      [e.target.name]: e.target.value,
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

  const [passwordVisible, setPasswordVisible ] = useState([]);

  const togglePasswordVisibilty = (index) => {
    setPasswordVisible((prevState) =>
      prevState.map((visibility, i) => (i === index ? !visibility : visibility))
    );
  };

  const handleEmailDataChange = (index, field, value) => {
    setNewEmails((prev) => {
      const array = [...prev];
      array[index] = {
        ...array[index],
        [field]: value
      }
      return array;
    })
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

  const handleEmailSubmit = async(e) => {
    // e.preventDeault();
    console.log({
      user_id: customerId,
      domain_id: selectedDomain?.id,
      emails: newEmails
    })
    try {
      const result = await dispatch(addEmailsThunk({
        user_id: customerId,
        domain_id: selectedDomain?.id,
        emails: newEmails
      })).unwrap();
      toast.success(result?.message);
    } catch (error) {
      toast.error("Error adding email");
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
      console.log("result...", result);
    } catch (error) {
      toast.error("Error removing email");
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
      toast.error("Error making email admin");
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
      toast.error("Error updating user password");
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
      toast.error("Error udpating email");
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
  
  const changeLicenseUsage = async(e) => {
    e.preventDefault();
    try {
      if(numUsers > 0) {
        const originalLicense = parseInt(selectedDomain?.license_usage);
        const updatedLicense = originalLicense + numUsers;
        const result = await dispatch(updateLicenseUsageThunk({
          domain_id: selectedDomain?.id,
          license_usage: updatedLicense
        })).unwrap();
        // console.log("result...", result);
        toast.success(result?.message);
        setIsLicenseModalOpen(false);
      } else {
        toast.warning("Number of user cannot be 0");
      }
    } catch (error) {
      setIsLicenseModalOpen(false);
      toast.error("Error updating License Usage");
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

  return (
    <div>
      <main>
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex items-center justify-start">
            <div>
              <h2 className="text-green-500 text-sm sm:text-2xl">Email</h2>
              <p className="text-sm sm:text-md md:text-lg">
                Set up your email accounts here and you can add users and edit your admin details.
              </p>
            </div>
          </div>

          <div className="flex sm:justify-end justify-center">
            <div className="flex items-center space-x-1 relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search domain..."
                value={searchTerm}
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
                            setSearchDropdown(false);
                            setSearchTerm("");
                          }}
                        >{item2?.domain_name}</p>
                      ))
                    }
                  </div>
                )
              }
              <FilterX className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-[#F7FAFF] flex items-start justify-start gap-8 md:gap-0 md:justify-between flex-col md:flex-row mt-2 py-4 px-2">
            <div className="flex items-start flex-col sm:flex-row h-fit sm:h-24">
              <div className="mr-4 flex-shrink-0 h-full">
                <img
                  src="/images/google.jpg"
                  alt="Domain"
                  className="h-full w-full sm:w-auto object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-600">{selectedDomain?.domain_name}</p>
                <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-600">
                  {selectedDomain?.emails ? selectedDomain?.emails.length : 0}@{selectedDomain?.domain_name}.{" "}
                  <span className="text-xs sm:text-sm text-green-500 ml-3 cursor-pointer" onClick={() => setIsLicenseModalOpen(true)}>
                    Add user license
                  </span>
                </p>
                <p className="text-sm md:text-md text-gray-600">
                  Google Workspace Starter.{" "}
                  <span className="text-xs sm:text-sm text-green-500 ml-3 cursor-pointer" onClick={() => navigate('/upgrade-plan')}>
                    Upgrade plan
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:ml-4">
              <button
                className="border-2 border-green-500 text-green-500 bg-white px-4 py-2 rounded-md mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setIsModalOpen(true)}
              >
                Add Email
              </button>
              <p className="text-sm md:text-md">User Licenses: {selectedDomain?.emails ? selectedDomain?.emails.length : 0}/{selectedDomain?.license_usage}</p>
            </div>
          </div>

          <div className="mt-2">
            <div className="w-full overflow-x-auto">
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
                      <td className="p-2 text-gray-600 font-semibold text-xs sm:text-sm md:text-md flex items-center">
                        <span>{row?.first_name}&nbsp;{row?.last_name}</span>
                        {row?. is_admin ? (
                          <span className="p-2 text-gray-600 font-semibold text-xs sm:text-sm md:text-md flex items-center">
                            <ChevronRight />
                            <span className="text-gray-600 font-semibold text-xs sm:text-sm md:text-md">Admin</span>
                          </span>
                        ) : ""}
                      </td>
                      <td className="p-2 text-gray-500 text-xs sm:text-sm md:text-md">
                        {row?.email}
                      </td>
                      <td className="p-2 text-gray-800 text-xs sm:text-sm md:text-md">
                        <button
                          className={`relative w-24 h-10 rounded-md border-2 flex justify-center items-center ${
                            row?.status
                              ? "border-green-500 bg-green-500"
                              : "border-red-500 bg-red-500"
                          }`}
                          onClick={() => toggleStatus(selectedDomain?.id, row?.email, row?.status)}
                        >
                          <span className="text-white text-xs">
                            {row.status ? "Active" : "Inactive"}
                          </span>
                        </button>
                      </td>
                      <td className="p-2 text-center relative">
                        <button className="w-6 h-6 rounded-full border-2 border-green-500 flex justify-center items-center">
                          <p
                            className="mb-2"
                            onClick={(e) => toggleList(row?.uuid)}
                          >
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
        </div>
        {
          isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
              <div className="bg-gray-100 rounded-xl shadow-md p-6 w-11/12 max-w-3xl relative" ref={modalRef}>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">Add Email</h1>
                  <div className="flex items-center">
                    <p className="text-sm text-green-500 mr-1">Add {selectedDomain?.emails ? (selectedDomain?.emails?.length + newEmails.length) : newEmails?.length}/{selectedDomain?.license_usage}</p>
                    <button
                      aria-label="Add Email"
                      className="text-green-500"
                      type='button'
                      onClick={() => {
                        if((selectedDomain?.emails?.length + newEmails.length) < selectedDomain?.license_usage) {
                          setNewEmails([...newEmails, intialEmail])
                          setPasswordVisible([...passwordVisible, false]);
                        } else {
                          toast.warning("You have reached your maximum license usage.")
                        }
                      }}
                    >
                      <CirclePlus size={28} />
                    </button>
                  </div>
                </div>
                <div className='w-full max-h-[500px] overflow-y-auto flex flex-col gap-5'>
                  {
                    newEmails?.map((email, index) => (
                      
                      <div className="flex" key={index}>
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
                                value={email?.email}
                                onChange={(e) => {handleEmailDataChange(index, "email", e.target.value)} }
                              />
                              <label
                                htmlFor="username"
                                className="absolute bg-white -top-[10px] left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                              >
                                Email
                              </label>
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
              <form className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full mx-2  max-h-[95vh] xl:max-h-full overflow-y-scroll" onSubmit={changeLicenseUsage}>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold">Add User License</h1>
                  {/* <button className="flex items-center gap-1 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out py-2 px-4 rounded-lg text-xs sm:text-sm">
                    Add to Cart <MdOutlineAddShoppingCart />
                  </button> */}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-semibold">No. of additional user</p>
                  <input
                    type="number"
                    value={numUsers}
                    onChange={(e) => {
                      Number(e.target.value) < 0 ? setNumUsers(0) : setNumUsers(Number(e.target.value));
                    }}
                    className="border-gray-300 border rounded p-2 w-16 text-center bg-white outline-none focus:ring-1 focus:ring-green-300"
                    placeholder="No."
                  />
                </div>

                {showDetails && (
                  <>
                    <div className="border-y border-gray-300 py-2 my-6">
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1">
                          <p>
                            {numUsers} users, Year subscription (price adjusted to current cycle)
                          </p>
                          <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold mr-1">
                            i
                          </span>
                        </div>
                        <span className="flex items-center font-semibold">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <p className="underline mb-4 font-semibold mt-2">Enter voucher code</p>
                    </div>

                    <div className="border-b border-gray-300 py-2 mb-4">
                      <div className="flex justify-between font-semibold mb-3">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          Tax (8.25%)
                          <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold ml-1">
                            i
                          </span>
                        </div>
                        <span className="gap-2">₹{tax.toFixed(2)}</span>
                      </div>
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
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

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
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="saved-method"
                            checked={selectedPaymentMethod === "saved"}
                            onChange={() => handlePaymentMethodChange("saved")}
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
                              <small className="text-xs font-bold text-gray-700">**** **** **** 4002</small>
                              <small className="text-[10px] text-gray-300">Expiry: 20/2024</small>
                              <small className="text-[10px] flex items-center gap-1 text-gray-300">
                                <MdOutlineMail /> billing@acme.corp
                              </small>
                            </div>
                          </label>
                        </div>
                        <button className="bg-green-500 text-white text-xs rounded-3xl px-4 py-1 mx-auto block">
                          Default
                        </button>
                        <RiDeleteBin6Line className="text-red-500 text-lg cursor-pointer" />
                      </div>
                    </div>
                  )}
          
                  {activeMethod === "other" && (
                    <div>
                      {Object.keys(paymentImages).map((method) => (
                        <div className="flex items-center justify-between mb-2" key={method}>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={method}
                              name="payment-method"
                              checked={selectedPaymentMethod === method || (method === "stripe" && selectedPaymentMethod === null)} // Check if method is 'stripe'
                              onChange={() => handlePaymentMethodChange(method)}
                              className="mr-2 radio radio-xs radio-success"
                              title={method.charAt(0).toUpperCase() + method.slice(1)}
                            />
                            <label htmlFor={method} className="mr-2">
                              {method.charAt(0).toUpperCase() + method.slice(1)}
                            </label>
                          </div>
                          <div>
                            <img
                              src={paymentImages[method]}
                              alt={method.charAt(0).toUpperCase() + method.slice(1)}
                              className="w-14 h-8 border-2 border-gray-200 shadow-sm p-1 rounded-md"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
          
                  {activeMethod === "saved" && (
                    <p className="text-green-500 text-sm text-left mt-4 cursor-pointer">
                      Use another payment method
                    </p>
                  )}
                </div>

                <div className="flex justify-start gap-4 mt-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={() => {
                      setIsLicenseModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
                      className="w-full h-10 border border-[#E4E4E4] rounded-[10px] px-3"
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
                      className="w-full h-10 border border-[#E4E4E4] rounded-[10px] px-3"
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
      </main>
    </div>
  );
};

export default EmailList;
