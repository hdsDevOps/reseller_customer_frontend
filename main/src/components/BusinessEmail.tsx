import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmailModal from "../components/EmailModal";
import ActionModal from "../components/ActionModal";
import AddLicense from "../components/AddLicense";
import "../index.css";
import { toast } from "react-toastify";
import { CirclePlus, Dot, Trash2, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addEmailsThunk, changeEmailStatusThunk, deleteEmailThunk, makeEmailAdminThunk, removeUserAuthTokenFromLSThunk, resetEmailPasswordThunk, updateEmailUserDataThunk } from "store/user.thunk";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";

const intialEmail = {
  first_name:"",
  last_name:"",
  email:"",
  password:""
}

const EmailList: React.FC = ({data, getDomainsList}) => {
  // console.log(data);
  const { customerId, userDetails } = useAppSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLicenseModalOpen, setisLicenseModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [selectedUserRole, setSelectedUserRole] = useState<string | undefined>();
  const [actionModalStyle, setActionModalStyle] = useState<React.CSSProperties>({
    position: 'absolute', // Specify the initial position
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(location.search);
  const domainName = params.get("domain") || "schemaphic.com";
  const [showList, setShowList] = useState("");
  const [selectedEmail, setSelectedEmail] = useState({});
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState<Boolean>(false);
  const [isMakeAdminModalOpen, setIsMakeAdminModalOpen] = useState<Boolean>(false);
  const [isResetUserPasswordModalOpen, setIsResetUserPasswordModalOpen] = useState<Boolean>(false);
  const [isRenameUserAccountModalOpen, setIsRenameUserAccountModalOpen] = useState<Boolean>(false);
  
  const modalRef = useRef(null);
  const listRef = useRef(null);
  const removeEmailRef = useRef(null);
  const makeAdminRef = useRef(null);
  const resetUserPasswordRef = useRef(null);
  const renameAccountRef = useRef(null);
  const [newEmails, setNewEmails] = useState([]);
  // console.log("newEmails...", newEmails);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [newEmailsCount, setNewEmailsCount] = useState(0);
  const [passwordVisible, setPasswordVisible ] = useState([]);
  const togglePasswordVisibilty = (index) => {
    setPasswordVisible((prevState) =>
      prevState.map((visibility, i) => (i === index ? !visibility : visibility))
    );
  };

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

  const toggleStatus = async( domainId:string, email:string, status:Boolean ) => {
    try {
      const result = await dispatch(changeEmailStatusThunk({ domain_id: domainId, email: email, status: !status })).unwrap();
      // console.log("result...", result);
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
  
  const toggleList = (emailId:string) => {
    setShowList((prev) => (prev === emailId ? "" : emailId));
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
      domain_id: data?.id,
      emails: newEmails
    })
    try {
      const result = await dispatch(addEmailsThunk({
        user_id: customerId,
        domain_id: data?.id,
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
      const result = await dispatch(deleteEmailThunk({domain_id: data?.id, uuid: selectedEmail?.uuid})).unwrap();
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
      const result = await dispatch(makeEmailAdminThunk({domain_id: data?.id, rec_id: selectedEmail?.email})).unwrap();
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
          domain_id: data?.id,
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
        domain_id: data?.id,
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
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideRenameAccount);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideRenameAccount);
    };
  }, []);

  return (
    <div className=" relative">
      <main>
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex items-center justify-start">
            <div>
              <h2 className="text-gray-700 text-sm sm:text-lg lg:text-2xl xl:text-3xl font-semibold">
                Business Email
              </h2>
              <p className="text-xs sm:text-sm md:text-md">
                Set up your business email accounts right here. You can also add
                users and edit your admin details.
              </p>
            </div>
          </div>

          <div className="flex flex-col border-2 border-gray-200 rounded-md mt-2">
            <div className="flex items-start justify-start gap-8 sm:gap-0 lg:justify-between flex-col lg:flex-row py-4 px-2">
              <div className="flex items-start flex-col md:flex-row ">
                <div className="md:mr-4 flex-shrink-0 h-full sm:h-24">
                  <img
                    src="/images/google.jpg"
                    alt="Domain"
                    className="h-full w-full max-w-[220px] sm:w-auto object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-600">
                    {data?.emails ? data?.emails.length : 0} users@{data?.domain_name}.{" "}
                    <span
                      className="text-xs sm:text-sm text-green-500 ml-3 font-normal cursor-pointer"
                      onClick={() => setisLicenseModalOpen(true)}
                    >
                      Add user license
                    </span>
                  </p>
                  <p className="text-sm md:text-md text-gray-600">
                    Google Workspace Starter.{" "}
                    <span
                      className="text-xs sm:text-sm text-green-500 ml-3 cursor-pointer"
                      onClick={() => navigate("/upgrade-plan")}
                    >
                      Update plan
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col  sm:mt-3 lg:mt-0">
                <button
                  className="border-2 border-green-500 text-green-500 bg-white px-4 py-2 rounded-3xl mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
                  type="button"
                  onClick={() => {window.open("https://accounts.google.com/AddSession/signinchooser?hl=en-GB&continue=https%3A%2F%2Fwww.google.com%3Fhl%3Den-GB&ec=GAlA8wE&ddm=1&flowName=GlifWebSignIn&flowEntry=AddSession")}}
                >
                  Go to Gmail
                </button>
                <button
                  className="border-2 border-green-500 text-green-500 bg-white px-4 py-2 rounded-3xl mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    setIsModalOpen(true);
                    setNewEmailsCount(
                      data?.emails?.length > 0 ? parseInt(userDetails?.license_usage) - data?.emails?.length : parseInt(userDetails?.license_usage)
                    );
                  }}
                >
                  Add Email
                </button>
                <p className="text-sm md:text-md">User Licenses: {data?.emails?.length > 0 ? data?.emails?.length : 0}/{userDetails?.license_usage}</p>
              </div>
            </div>

            <div className="mt-2">
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-200 mb-4">
                    <tr>
                      <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-semibold">
                        Name
                      </th>
                      <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-semibold">
                        Email
                      </th>
                      <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-semibold">
                        Status
                      </th>
                      <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.emails?.map((row, index) => (
                      <tr key={index} className="relative">
                        <td
                          className={`px-2 py-6 text-gray-600 font-semibold text-xs sm:text-sm md:text-md`}
                        >
                          <p className="text-gray-600 font-semibold text-xs sm:text-sm md:text-md flex">
                            <span>{row.first_name}&nbsp;{row.last_name}</span>
                            {
                              row?.is_admin ? (
                                <>
                                  <span><Dot /></span>
                                  <span>Admin</span>
                                </>
                              ) : ""
                            }
                          </p>
                        </td>
                        <td
                          className={`px-2 py-6 text-gray-500 text-xs sm:text-sm md:text-md`}
                        >
                          {row?.email}
                        </td>
                        <td
                          className={`px-2 py-6 text-gray-800 text-xs sm:text-sm md:text-md`}
                        >
                          <button
                            className={`relative w-[100px] h-6 rounded-full border-2 ${row?.status ? "bg-green-500" : "bg-red-600"} flex justify-center items-center text-white`}
                            type="button"
                            onClick={() => toggleStatus(data?.id, row?.email, row?.status)}
                          >
                            {
                              row?.status ? "Active" : "Inactive"
                            }
                          </button>
                        </td>
                        <td
                          className={`px-2 py-6 text-right`}
                        >
                          <button
                            onClick={() => toggleList(row?.uuid)} // Pass event to the handler
                            className="w-8 h-8 rounded-full border-2 border-green-500 flex justify-center items-center text-md"
                          >
                            <p
                              className="mb-2"
                            >
                              ...
                            </p>
                          </button>
                          {
                            showList === row?.uuid && (
                              <div
                                className="p-2 w-80 max-w-[12rem] absolute right-0 top-0 mt-14 z-10"
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
        </div>
        {
          isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
              <div className="bg-gray-100 rounded-xl shadow-md p-6 w-11/12 max-w-3xl relative" ref={modalRef}>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">Add Email</h1>
                  <div className="flex items-center">
                    <p className="text-sm text-green-500 mr-1">Add {(data?.emails?.length + newEmails.length)}/{userDetails?.license_usage}</p>
                    <button
                      aria-label="Add Email"
                      className="text-green-500"
                      type='button'
                      onClick={() => {
                        if((data?.emails?.length + newEmails.length) < userDetails?.license_usage) {
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
        
        <AddLicense
          isOpen={isLicenseModalOpen}
          onClose={() => setisLicenseModalOpen(false)}
          getDomainsList={() => getDomainsList()}
        />
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
