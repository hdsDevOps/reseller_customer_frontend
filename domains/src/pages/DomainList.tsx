import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, CircleEllipsis, CirclePlus, Trash2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import EmailModal from './EmailModal';
import ActionModal from '../components/ActionModal';
import "../domain.css";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getDomainsListThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { initialState } from 'store/authSlice';
import { toast } from 'react-toastify';
import { addEmailsThunk } from 'store/reseller.thunk';

const intialEmail = {
    user_id:"",
    domain_id:"",
    first_name:"",
    last_name:"",
    email:"",
    password:""
}

const DomainList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { customerId } = useAppSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [actionModalType, setActionModalType] = useState<string>("Cancel");
  const [actionModalStyle, setActionModalStyle] = useState<React.CSSProperties | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [domainsList, setDomainsList] = useState([]);
  console.log("domainsList...", domainsList);
  const [emailsList, setEmailsList] = useState([intialEmail]);
  console.log("emailList...", emailsList);
  const [licenseUsage, setLicenseUsage] = useState(0);
  const [domainId, setDomainId] = useState("");
  const [showList, setShowList] = useState("");
  const listRef = useRef(null);
  const modalRef = useRef(null);

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

  const onClickTableList = (e, label:string) => {
    if(label === "Update payment method") {
      navigate('/payment-method');
    } else if(label === "Cancel Domain") {
      setIsActionModalOpen(true);
      setActionModalType("Cancel");
    } else if(label === "Transfer Domain") {
      setIsActionModalOpen(true);
      setActionModalType("Transfer");
    }
  }

  useEffect(() => {
    const getDomainsList = async() => {
      try {
        const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
        setDomainsList(result?.data);
      } catch (error) {
        setDomainsList([]);
        if(error?.message == "Invalid token") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }
    getDomainsList();
  }, []);

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
      setShowList("");
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideOfModal);
    return() => {
      document.removeEventListener('mousedown', handleClickOutsideOfModal);
    };
  }, []);

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
    setEmailsList((prev) => {
      const array = [...prev];
      array[index] = {
        ...array[index],
        [field]: value
      }
      return array;
    })
  };

  const handleDeleteEmail = (index) => {
    if(emailsList.length === 1) {
      setEmailsList([intialEmail]);
    } else {
      setEmailsList(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleEmailSubmit = async(e) => {
    // e.preventDeault();
    try {
      const result = await dispatch(addEmailsThunk({
        user_id: customerId,
        domain_id: domainId,
        emails: emailsList
      })).unwrap();
      console.log("result...", result);
    } catch (error) {
      toast.error("Error updating emails");
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

  return (
    <div>
      <main>
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between w-full">
          <div className="text-sm text-green-500 sm:text-lg md:text-2xl">Domain</div>
          <div className="flex gap-2 md:gap-8">
            <Link
              to="/add-domain"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-opacity-90 sm-max:text-xs"
            >
              Add Existing Domain
            </Link>
            <Link
              to="/buy-domain"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-opacity-90 sm-max:text-xs"
            >
              Buy Domain
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {
            domainsList.length > 0 ? (
              domainsList?.map((domain, index) => (
                <div key={index} className="flex flex-col bg-gray-100 rounded-sm w-full p-4">
                  <div className="flex min-[500px]:flex-row flex-col items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold text-xl md:text-lg sm-max:text-xs self-start">{domain?.domain_name}</h3>
                    <button
                      className="px-4 py-2 md:px-3 sm-max:px-2 sm-max:text-xs bg-green-600 text-white font-medium rounded-md hover:bg-opacity-90"
                      onClick={() => {
                        setIsModalOpen(true);
                        setEmailsList(domain?.emails?.length > 0 ? domain?.emails : [intialEmail]);
                        setLicenseUsage(domain?.license_usage);
                        setDomainId(domain?.id)
                      }}
                    >
                      Add Emails
                    </button>
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
                                  <td className="p-2 text-gray-800 sm-max:text-xs w-[22%]" key={index}>{domain?.emails ? domain?.emails?.length : 0}/{domain[row]}</td>
                                )
                              } else if (row === "button") {
                                return (
                                  <td className="p-2 text-center w-[8%] relative" key={index}>
                                    <button
                                      type='button'
                                      className="w-6 h-6"
                                      onClick={() => {toggleList(domain?.id)}}
                                    >
                                      <CircleEllipsis className='w-6 h-6 text-[#12A833]' />
                                    </button>
                                    {
                                      showList === domain?.id && (
                                        <div
                                          className='absolute right-0 rounded-3xl bg-white border-2 w-[214px]'
                                          ref={listRef}
                                        >
                                          <ul className='text-left w-full h-fit p-2 pl-6'>
                                            {
                                              showListTable.map((list, idx) => (
                                                <li
                                                  className='font-roboto font-medium text-[14px] text-[#222222] p-1 cursor-pointer'
                                                  key={idx}
                                                  onClick={(e) => {onClickTableList(e, list.label)}}
                                                >{list.label}</li>
                                              ))
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
                    {/* <Link to={`/email?domain=${encodeURIComponent(data[0].domain)}`} className="text-green-600 font-medium hover:text-opacity-90 flex items-center">
                      View More <ChevronRight size="20" />
                    </Link> */}
                  </div>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )
          }
        </div>
      </main>
      {/* <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      {
        isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
            <div className="bg-gray-100 rounded-xl shadow-md p-6 w-11/12 max-w-3xl relative">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Add Email</h1>
                <div className="flex items-center">
                  <p className="text-sm text-green-500 mr-1">Add {emailsList?.length}/{licenseUsage}</p>
                  <button
                    aria-label="Add Email"
                    className="text-green-500"
                    type='button'
                    onClick={() => {
                      if(emailsList?.length < licenseUsage) {
                        setEmailsList([...emailsList, intialEmail])
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
                  emailsList?.map((email, index) => (
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
                              // type={passwordVisible ? "text" : "password"}
                              placeholder="Enter password"
                              className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                            />
                            <label
                              htmlFor="password"
                              className="absolute bg-white -top-[10px] left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                            >
                              Password
                            </label>
                            <button
                              type="button"
                              // onClick={() => setPasswordVisible(!passwordVisible)}
                              // aria-label={
                              //   passwordVisible ? "Hide Password" : "Show Password"
                              // }
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                              {/* {passwordVisible ? (
                                <HiOutlineEye size={20} />
                              ) : (
                                <RiEyeCloseLine size={20} />
                              )} */}
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
                    setEmailsList([intialEmail]);
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
                onClick={() => {setIsActionModalOpen(false)}}
              >Yes</button>
              <button
                className='font-inter font-semibold text-base text-[#F0F0F3] items-center text-center w-[80px] h-10 rounded-[10px] bg-[#EE1010]'
                type='button'
                onClick={() => {setIsActionModalOpen(false)}}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainList;
