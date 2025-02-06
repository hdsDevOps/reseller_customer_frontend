import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, CircleEllipsis, CirclePlus, Trash2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import EmailModal from './EmailModal';
import ActionModal from '../components/ActionModal';
import "../domain.css";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getDomainsListThunk, removeUserAuthTokenFromLSThunk, addEmailsThunk, cancelDomainThunk } from 'store/user.thunk';
import { initialState } from 'store/authSlice';
import { toast } from 'react-toastify';
import { HiOutlineEye } from 'react-icons/hi';
import { RiEyeCloseLine } from 'react-icons/ri';
import './domainList.css';

const intialEmail = {
  first_name:"",
  last_name:"",
  email:"",
  phone_no: "",
  address: "",
  country: "",
  state: "",
  city: "",
  password:"",
  status: true,
  role: "User"
}

const DomainList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { customerId, userDetails, rolePermission, isAdmin } = useAppSelector(state => state.auth);
  // console.log("userDetails....", userDetails);
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

    checkPermission("Domain");
  }, [rolePermission]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [actionModalType, setActionModalType] = useState<string>("Cancel");
  const [actionModalStyle, setActionModalStyle] = useState<React.CSSProperties | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [domainsList, setDomainsList] = useState([]);
  // console.log("domainsList...", domainsList);
  const [emailsList, setEmailsList] = useState([intialEmail]);
  // console.log("emailList...", emailsList);
  const [licenseUsage, setLicenseUsage] = useState(0);
  const [domainId, setDomainId] = useState("");
  const [domainName, setDomainName] = useState("");
  const [showList, setShowList] = useState("");
  const listRef = useRef(null);
  const modalRef = useRef(null);
  const [newEmails, setNewEmails] = useState([]);
  // console.log("newEmails...", newEmails);
  const [emailClicked, setEmailClicked] = useState(false);
  const [newEmailsCount, setNewEmailsCount] = useState(0);
  const [addEmailDisabled, setAddEmailDisabled] = useState(true);
  // console.log(newEmailsCount);
  const [passwordVisible, setPasswordVisible ] = useState([]);
  const togglePasswordVisibilty = (index) => {
    setPasswordVisible((prevState) =>
      prevState.map((visibility, i) => (i === index ? !visibility : visibility))
    );
  }

  const showListTable = [
    { label: "Update payment method", },
    { label: "Cancel Domain", },
    { label: "Transfer Domain", },
  ];

  const headers: string[] = ["Domain", "Domain Types", "Business Email", "User Licenses", " "];
  const singleDomainTable = ["domain_name", "domain_type", "business_email", "license_usage", "button"]
  const domainData = {
    "ABC Business": [
      {
        domain: "domain.co.in",
        domainType: "Primary",
        businessEmail: "Robertclive@domain.co.in",
        userLicenses: "02/05"
      }
    ],
    "Schemaphic System India Pvt.Ltd.": [
      {
        domain: "schemaphic.com",
        domainType: "Secondary",
        businessEmail: "Robertclive@schemaphic.com",
        userLicenses: "03/05"
      }
    ]
  };

  const onClickTableList = (e, label:string, id: string) => {
    if(label === "Update payment method") {
      navigate('/payment-method');
    } else if(label === "Cancel Domain") {
      setIsActionModalOpen(true);
      setActionModalType("Cancel");
      setDomainId(id);
      setDomainName("");
    } else if(label === "Transfer Domain") {
      setIsActionModalOpen(true);
      setActionModalType("Transfer");
      setDomainId(id);
      setDomainName("");
    }
  };

  const getDomainsList = async() => {
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      setDomainsList(result?.data);
    } catch (error) {
      setDomainsList([]);
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

  useEffect(() => {
    getDomainsList();
  }, [customerId]);

  const toggleList = (domainId:string) => {
    setShowList((prev) => (prev === domainId ? "" : domainId));
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

  const handleClickOutsideOfModal = e => {
    if(modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
      setDomainId("");
      setDomainName("");
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideOfModal);
    return() => {
      document.removeEventListener('mousedown', handleClickOutsideOfModal);
    };
  }, []);

  useEffect(() => {
    if(userDetails?.workspace?.workspace_status === "trial") {
      const miliseconds = parseInt(userDetails?.workspace?.next_payment?._seconds) * 1000 + parseInt(userDetails?.workspace?.next_payment?._nanoseconds) / 1e6;
      const foundDate =  new Date(miliseconds);
      const today = new Date(Date.now());
      if(foundDate > today) {
        setAddEmailDisabled(false);
      } else {
        setAddEmailDisabled(true);
      }
    } else if(userDetails?.workspace?.workspace_status === "active") {
      const miliseconds = parseInt(userDetails?.workspace?.next_payment?._seconds) * 1000 + parseInt(userDetails?.workspace?.next_payment?._nanoseconds) / 1e6;
      const foundDate =  new Date(miliseconds);
      const today = new Date(Date.now());
      if(foundDate > today) {
        setAddEmailDisabled(false);
      } else {
        setAddEmailDisabled(true);
      }
    } else {
      setAddEmailDisabled(true);
    }
  }, [userDetails]);

  const handleOpenActionModal = (event: React.MouseEvent, domain: string) => {
    const rect = event.currentTarget.getBoundingClientRect(); // Get button position
    const style: React.CSSProperties = {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY}px`,
      right: "10px",
    };

    setIsActionModalOpen(true);
    setActionModalStyle(style);
    setSelectedDomain(domain);
  };

  const handleEmailDataChange = (index, field, value) => {
    if(field === "email") {
      setNewEmails((prev) => {
        const array = [...prev];
        array[index] = {
          ...array[index],
          email: value+`@${domainName}`
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
          domain_id: domainId,
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
        setDomainId("");
        setDomainName("");
        setNewEmails([]);
        setNewEmailsCount(0);
        setLicenseUsage(0);
        setPasswordVisible([]);
      }
    }
  };

  const handleModalSubmit = async(e) => {
    e.preventDefault();
    try {
      if(actionModalType === "Cancel") {
        const result = await dispatch(cancelDomainThunk({domain_id: domainId})).unwrap();
        console.log("result...", result);
        setIsActionModalOpen(false);
      } else if(actionModalType === "Transfer") {
        //
        setIsActionModalOpen(false);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error(actionModalType === "Cancel" ? "Error cancelling domain" : actionModalType === "Transfer" ? "Error transfering domain" : "");
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
      setIsActionModalOpen(false);
    } finally {
      setDomainId("");
      setDomainName("");
      getDomainsList();
    }
  }

  return (
    <div>
      <main>
        <div className="mb-4 domain-head w-full">
          <div className="text-sm text-green-500 sm:text-lg md:text-2xl">Domain</div>
          <div className="domain-buttons">
            <button
              type='button'
              // disabled={isAdmin}
              onClick={() => navigate("/add-domain")}
              // className={`px-4 py-2 ${isAdmin ? "bg-[#8A8A8A80]" : "bg-green-600"} text-white font-medium rounded-md shadow-sm hover:bg-opacity-90 sm-max:text-xs`}
              className={`px-4 py-2 bg-[#8A8A8A80] text-white font-medium rounded-md shadow-sm hover:bg-opacity-90 sm-max:text-xs`}
              disabled
            >
              Add Existing Domain
            </button>
            <button
              type='button'
              onClick={() => navigate("/buy-domain")}
              disabled={isAdmin}
              className={`px-4 py-2 ${isAdmin ? "bg-[#8A8A8A80]" : "bg-green-600"} text-white font-medium rounded-md shadow-sm hover:bg-opacity-90 sm-max:text-xs`}
            >
              Buy Domain
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {
            domainsList.length > 0 ? (
              domainsList?.map((domain, index) => (
                <div key={index} className="flex flex-col bg-gray-100 rounded-sm w-full p-4 relative">
                  <div className="add-email">
                    <h3 className="text-gray-600 font-semibold text-xl md:text-lg sm-max:text-xs self-start" style={{wordBreak: 'break-word', wordWrap: 'break-word', overflowWrap: 'break-word'}}>{domain?.domain_name}</h3>
                    {
                      domain?.domain_type === "primary" && (
                        <button
                          className={`px-4 py-2 md:px-3 sm-max:px-2 sm-max:text-xs ${
                            isAdmin
                            ? "bg-[#8A8A8A]"
                            : addEmailDisabled
                            ? "bg-[#8A8A8A]"
                            : "bg-green-600"
                          } text-white font-medium rounded-md hover:bg-opacity-90`}
                          onClick={() => {
                            setIsModalOpen(true);
                            setNewEmailsCount(
                              domain?.emails?.length > 0 ? parseInt(userDetails?.license_usage) - domain?.emails?.length : parseInt(userDetails?.license_usage)
                            );
                            setLicenseUsage(userDetails?.license_usage);
                            setDomainId(domain?.id);
                            setDomainName(domain?.domain_name);
                            setEmailsList(domain?.emails ? domain?.emails : []);
                          }}
                          disabled={isAdmin ? isAdmin : addEmailDisabled}
                        >
                          Add Emails
                        </button>
                      )
                    }
                  </div>
    
                  <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse">
                      <thead className="border border-gray-300 mb-4">
                        <tr>
                          {headers.map((header, index) => (
                            <th key={index} className="p-2 text-left text-gray-600 font-medium sm-max:text-xs">
                              {header}
                            </th>
                          ))}
                          <th className="p-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {
                            singleDomainTable.map((row, index) => {
                              if(row === "license_usage") {
                                return (
                                  <td className="p-2 text-gray-800 sm-max:text-xs w-[22%]" key={index}>{
                                    domain?.domain_type === "primary"
                                    ? `${
                                        domain?.emails
                                        ? domain?.emails?.length
                                        : 0
                                      }/${userDetails?.license_usage}`
                                    : ""
                                  }</td>
                                )
                              } else if (row === "button") {
                                return (
                                  <td className="p-2 text-center w-[8%]" key={index}>
                                    <button
                                      type='button'
                                      className="w-6 h-6"
                                      onClick={() => {toggleList(domain?.id)}}
                                      disabled={isAdmin}
                                    >
                                      <CircleEllipsis className={`w-6 h-6 ${isAdmin ? "text-[#8A8A8A]" : "text-[#12A833]"}`} />
                                    </button>
                                    {
                                      showList === domain?.id && (
                                        <div
                                          className='absolute right-0 rounded-lg py-2 bg-white border-2 w-[214px]'
                                          ref={listRef}
                                        >
                                          <ul className='text-left w-full h-fit'>
                                            {
                                              showListTable.map((list, idx) => {
                                                if(list?.label === "Cancel Domain" || list?.label === "Transfer Domain") {
                                                  return (
                                                    <li
                                                      className='font-inter font-normal text-sm text-[#262626] px-[10px] py-[5px] text-nowrap cursor-not-allowed bg-slate-300 opacity-50'
                                                      key={idx}
                                                      // onClick={(e) => {onClickTableList(e, list.label, domain?.id)}}
                                                    >{list.label}</li>
                                                  )
                                                } else {
                                                  return (
                                                    <li
                                                      className='font-roboto font-medium text-[14px] text-[#222222] p-1 cursor-pointer'
                                                      key={idx}
                                                      onClick={(e) => {onClickTableList(e, list.label, domain?.id)}}
                                                    >{list.label}</li>
                                                  )
                                                }
                                              })
                                            }
                                          </ul>
                                        </div>
                                      )
                                    }
                                  </td>
                                )
                              } else if(row === "business_email") {
                                return (
                                  <td className="p-2 text-gray-800 sm-max:text-xs w-[26%]" key={index}>{domain?.business_email}</td>
                                )
                              }  else {
                                return (
                                  <td className="p-2 text-gray-800 sm-max:text-xs w-[22%]" key={index}>{domain[row]}</td>
                                )
                              }
                            })
                          }
                        </tr>
                      </tbody>
                    </table>
                  </div>
    
                  <div className="my-4 border-t border-black"></div>
                  <div className="flex self-end text-xs sm:text-sm">
                    {
                      domain?.domain_type === "primary" && (
                        <Link to={`/email`} className="text-green-600 font-medium hover:text-opacity-90 flex items-center">
                          View More <ChevronRight size="20" />
                        </Link>
                      )
                    }
                  </div>
                </div>
              ))
            ) : (
              <div className='flex justify-center'>No Domains Available</div>
            )
          }
        </div>
      </main>
      {/* <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      {
        isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
            <div className="bg-gray-100 rounded-xl shadow-md p-6 w-11/12 max-w-3xl relative" ref={modalRef}>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Add Email</h1>
                <div className="flex items-center">
                  <p className="text-sm text-green-500 mr-1">Add {(emailsList?.length + newEmails.length)}/{licenseUsage}</p>
                  <button
                    aria-label="Add Email"
                    className="text-green-500"
                    type='button'
                    onClick={() => {
                      if((emailsList?.length + newEmails.length) < licenseUsage) {
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
                                @{domainName}
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
                >
                  Submit
                </button>
                <button
                  type="button"
                  aria-label="Delete"
                  className="px-4 py-2 md:px-6 sm-max:px-2 sm-max:text-xs bg-red-500 text-white font-medium rounded-md hover:bg-opacity-90"
                  onClick={() => {
                    setIsModalOpen(false);
                    setDomainId("");
                    setDomainName("");
                    setNewEmails([]);
                    setPasswordVisible([]);
                    setNewEmailsCount(0);
                    setLicenseUsage(0);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }
      {isActionModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='bg-white rounded-3xl shadow-lg max-w-[538px] p-5' ref={modalRef}>
            <div className='flex justify-between items-center w-full px-2'>
              <h3 className='font-inter font-medium text-[28px] text-[#0D121F]'>{actionModalType} Your Domain</h3>
              <X className='w-7 h-7 text-[#0D121F]' onClick={() => {setIsActionModalOpen(false)}} />
            </div>

            <h4 className='font-inter font-medium text-2xl text-[#222222] mt-10'>Are you sure want to {actionModalType} your domain?</h4>

            <div className='flex justify-center gap-10 mt-10'>
              <button 
                className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#12A833]'
                type='button'
                onClick={(e) => {handleModalSubmit(e)}}
              >Yes</button>
              <button
                className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#EE1010]'
                type='button'
                onClick={() => {
                  setIsActionModalOpen(false);
                  setDomainId("");
                  setDomainName("");
                }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainList;
