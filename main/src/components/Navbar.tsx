import React, { useEffect, useState } from "react";
import {
  ChartLine,
  Mail,
  ClipboardList,
  Users,
  Ticket,
  CreditCard,
  PanelLeftClose,
  ShieldCheck,
  Settings,
  LogOut,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiCreditCard1 } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setRolePermissionsSlice, setTokenDetails } from "store/authSlice";
import { getSettingsListThunk, removeUserAuthTokenFromLSThunk, removeUserIdFromLSThunk } from 'store/user.thunk';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const initialRolePermissions = [
  {
      name: "Dashboard",
      value: false
  },
  {
      name: "Profile",
      value: false
  },
  {
      name: "Domain",
      value: false
  },
  {
      name: "Payment Subscription",
      value: false
  },
  {
      name: "Email",
      value: false
  },
  {
      name: "Payment Method",
      value: false
  },
  {
      name: "Vouchers",
      value: false
  },
  {
      name: "My Staff",
      value: false
  },
  {
      name: "Billing History",
      value: false
  },
  {
      name: "Settings",
      value: false
  }
];

const links = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <ChartLine className="w-5 h-5" />,
  },
  {
    path: "/domain",
    label: "Domain",
    icon: <ClipboardList className="w-5 h-5" />,
  },
  {
    path: "/email",
    label: "Email",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    path: "/voucher",
    label: "Vouchers",
    icon: <Ticket className="w-5 h-5" />,
  },
  {
    path: "/billing-history",
    label: "Billing History",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    path: "/payment-subscription",
    label: "Payment Subscription",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    path: "/payment-method",
    label: "Payment Method",
    icon: <CiCreditCard1 className="w-5 h-5" />,
  },
  {
    path: "/my-staff",
    label: "My Staff",
    icon: <Users className="w-5 h-5" />,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails, roleId, customerId, rolePermission, isAdmin, staffStatus, staffDetails } = useAppSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [username] = useState("Robert Clive"); // Replace with actual username
  const [email] = useState("roberclive@domain.co.in"); // Replace with actual email
  const [logOutModal, setLogOutModal] = useState(false);

  // console.log("user details...", userDetails);
  // console.log("role id...", roleId);

  // const [rolePermissions, setRolePermissions] = useState(initialRolePermissions);
  // console.log("rolePermissions...", rolePermission);

  const handleLogout = async () => {
    await dispatch(removeUserAuthTokenFromLSThunk());
    await dispatch(removeUserIdFromLSThunk());
    navigate("/");
    localStorage.clear();
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "relative flex items-center gap-2 p-2 rounded cursor-pointer bg-[#DCEBDFCC] pl-6 pr-4"
      : "flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#DCEBDFCC] pl-6 pr-4 w-full";
  };

  const getInitials = (name:string) => {
    return name?.split(' ').map(word => word.charAt(0).toUpperCase());
  };

  const checkPermission = (label:String) => {
    if(rolePermission?.length > 0) {
      // console.log(rolePermission?.find(item => item?.name === label))
      return rolePermission?.find(item => item?.name === label)?.value;
    } else {
      return false;
    }
  };

  return (
    <aside
      className={`fixed h-full sm:max-h-screen ${isAdmin ? "top-[80px]" : "top-3"} left-0 transition-all duration-300 ease-in-out bg-[#F0F0F0] text-black shadow-md flex flex-col ${
        isOpen ? "max-w-64 sm-max:max-w-64" : "max-w-20"
      } lg:max-w-64 w-full z-20`}
    >
      <div className="flex items-center relative p-4">
        {/* <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-black absolute top-24 -right-1"
        >
          {isOpen ? (
            <CircleChevronLeft className="size-3" />
          ) : (
            <CircleChevronRight className="size-3" />
          )}
        </button> */}
        <a
          className="lg:hidden text-[#12A833] absolute top-24 -right-[10px] cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <i className={`bi ${
            isOpen ? `bi-text-indent-right` : 'bi-text-indent-left'
          } text-white bg-[#12A833] border-[2px] border-[#12A833] rounded-full w-[21px] h-[21px] px-[2px]`}></i>
        </a>
      </div>
      <div className="p-[14px] flex-1 mt-2">
        <div className="bg-[#DAE8FF] shadow-sm p-[6px] rounded-md flex items-center gap-2 my-[10px]">
          {
            staffStatus ? staffDetails?.profile_image ? (
              <img
                src={staffDetails?.profile_image}
                alt="Profile"
                className="w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
              />
            ) : (
              <button className="relative p-2 bg-[#FF7272] hover:bg-opacity-90 rounded-full" type="button">
                <p className="text-white">{getInitials(staffDetails?.first_name || "J")}{getInitials(staffDetails?.last_name || "D")}</p>
              </button>
            ) : userDetails?.profile_image ? (
              <img
                src={userDetails?.profile_image}
                alt="Profile"
                className="w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
              />
            ) : (
              <button className="relative p-2 bg-[#FF7272] hover:bg-opacity-90 rounded-full" type="button">
                <p className="text-white">{getInitials(userDetails?.first_name || "J")}{getInitials(userDetails?.last_name || "D")}</p>
              </button>
            )
          }
          <div className={`flex items-center gap-2 overflow-hidden ${isOpen ? "flex" : "hidden  sm:flex"}`}>
            <div className="flex flex-col text-xs ml-2">
              <span className="font-medium text-gray-600">{
                staffStatus ? `${staffDetails?.first_name} ${staffDetails?.last_name}` : `${userDetails?.first_name} ${userDetails?.last_name}`
              }</span>
              <span className="text-gray-400">{staffStatus ? staffDetails?.email : userDetails?.email}</span>
            </div>
          </div>
        </div>
        <nav>
          <ul className="relative flex flex-col gap-2">
            {links?.map((link, index) => {
              // console.log(checkPermission(link?.label))
              if(checkPermission(link?.label)) {
                return(
                  <li key={index} className={getLinkClass(link?.path)}>
                    {location.pathname === link?.path && (
                      <div
                        className="absolute -left-8 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-lg"
                        style={{ marginLeft: "1rem" }}
                      ></div>
                    )}
                    <Link to={link?.path} className="flex items-center gap-2 w-full" cypress-name={link?.label}>
                      {React.cloneElement(link?.icon, {
                        className: `w-4 h-4 text-black ${
                          isOpen ? "w-5 h-5" : "w-4 h-4 text-black"
                        } ${
                          location.pathname === link?.path
                            ? "text-gray-600"
                            : "text-gray-500"
                        }`,
                      })}
                      <span
                        className={`text-sm ${
                          isOpen ? "block" : "hidden"
                        } lg:block`}
                      >
                        {link?.label}
                      </span>
                    </Link>
                  </li>
                )
              }
            })}
          </ul>
        </nav>
      </div>
      <div className="relative p-4 mt-auto">
        <div className="absolute top-0 left-0 right-0 w-full border-t-2 border-green-500 mb-2"></div>
        <button
          className="flex items-center gap-2 w-full p-2 rounded hover:bg-[#DCEBDFCC] text-green-500"
          // onClick={handleLogout}
          onClick={() => {setLogOutModal(true)}}
          cypress-name="log-out-button"
        >
          <LogOut
            className={`w-5 h-5 ${
              isOpen ? "w-6 h-6" : "w-5 h-5"
            } text-green-500`}
          />
          <span className={`${isOpen ? "block" : "hidden"} lg:block text-sm`}>
            Logout
          </span>
        </button>
      </div>
      <Dialog
        open={logOutModal}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => {
          setLogOutModal(false);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen mt-16">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
            transition
            className="w-full max-w-[400px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                as="h3"
                className="text-lg font-semibold text-gray-900"
                >Do you really want to log out?</DialogTitle>
                <div className='btn-close-bg'>
                <button
                  type='button'
                  className='text-3xl rotate-45 mt-[-8px] text-white'
                  onClick={() => {
                    setLogOutModal(false);
                  }}
                >+</button>
                </div>
              </div>
              <div className="flex justify-center gap-10">
                <button
                  type="button"
                  className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                  onClick={handleLogout}
                  cypress-name="log-out-customer-portal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLogOutModal(false);
                  }}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                >
                  No
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </aside>
  );
};

export default Sidebar;