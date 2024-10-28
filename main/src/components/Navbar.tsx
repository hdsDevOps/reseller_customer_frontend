import React, { useState } from "react";
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
import { useAppDispatch } from "store/hooks";
import { setTokenDetails } from "store/authSlice";

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
    label: "Voucher",
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
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    localStorage.getItem("profileImage") || null
  );
  const [username] = useState("Robert Clive"); // Replace with actual username
  const [email] = useState("roberclive@domain.co.in"); // Replace with actual email

  const handleLogout = async () => {
    dispatch(setTokenDetails(""));
    navigate("/login");
    localStorage.clear();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem("profileImage", base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "relative flex items-center gap-2 p-2 rounded cursor-pointer bg-[#DCEBDFCC] pl-6 pr-4"
      : "flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#DCEBDFCC] pl-6 pr-4 w-full";
  };

  return (
    <aside
      className={`fixed h-full sm:max-h-screen top-0 left-0 transition-all duration-300 ease-in-out bg-[#F0F0F0] text-black shadow-md flex flex-col ${
        isOpen ? "max-w-64 sm-max:max-w-64" : "max-w-20"
      } lg:max-w-64 w-full z-40`}
    >
      <div className="flex items-center relative p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-black absolute top-24 -right-1"
        >
          {isOpen ? (
            <CircleChevronLeft className="size-3" />
          ) : (
            <CircleChevronRight className="size-3" />
          )}
        </button>
      </div>
      <div className="p-[14px] flex-1 mt-2">
        <div className="bg-[#DAE8FF] shadow-sm p-[6px] rounded-md flex items-center gap-2 my-[10px]">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profileImageUpload"
            />
            <label htmlFor="profileImageUpload">
              <img
                src={image ? (image as string) : "/default-profile.png"}
                alt="Profile"
                className="w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
              />
            </label>
          </div>
          <div className={`flex items-center gap-2 overflow-hidden ${isOpen ? "flex" : "hidden  sm:flex"}`}>
            <div className="flex flex-col text-xs ml-2">
              <span className="font-medium text-gray-600">{username}</span>
              <span className="text-gray-400">{email}</span>
            </div>
            <div className="text-gray-400 text-sm">
              <PanelLeftClose className="w-4 h-4" />
            </div>
          </div>
        </div>
        <nav>
          <ul className="relative flex flex-col gap-2">
            {links.map(({ path, label, icon }) => (
              <li key={path} className={getLinkClass(path)}>
                {location.pathname === path && (
                  <div
                    className="absolute -left-8 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-lg"
                    style={{ marginLeft: "1rem" }}
                  ></div>
                )}
                <Link to={path} className="flex items-center gap-2 w-full">
                  {React.cloneElement(icon, {
                    className: `w-4 h-4 text-black ${
                      isOpen ? "w-5 h-5" : "w-4 h-4 text-black"
                    } ${
                      location.pathname === path
                        ? "text-gray-600"
                        : "text-gray-500"
                    }`,
                  })}
                  <span
                    className={`text-sm ${
                      isOpen ? "block" : "hidden"
                    } lg:block`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative p-4 mt-auto">
        <div className="absolute top-0 left-0 right-0 w-full border-t-2 border-green-500 mb-2"></div>
        <button
          className="flex items-center gap-2 w-full p-2 rounded hover:bg-[#DCEBDFCC] text-green-500"
          onClick={handleLogout}
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
    </aside>
  );
};

export default Sidebar;