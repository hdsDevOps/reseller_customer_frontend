// src/index.tsx
import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import UserAuth from "./hoc/UserAuth.hoc";
import MainApp from "./pages";
// import AuthApp from "auth/AuthApp";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCartThunk, getDomainsListThunk, getHordansoAdminDetailsFromLSThunk, getLandingPageThunk, getNotificationsListThunk, getPaymentMethodsThunk, getProfileDataThunk, getRoleIdFromLSThunk, getSettingsListThunk, getStaffIdFromLSThunk, getStaffStatusFromLSThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, removeUserAuthTokenFromLSThunk, savedCardsListThunk } from 'store/user.thunk';
import { setCart, setCustomerId, setDefaultCurrencySlice, setDomains, setMetaDataSlice, setNotificationsListSlice, setPaymentMethodsState, setResellerToken, setRoleIdSlice, setRolePermissionsSlice, setSaveCards, setStaffDetails, setStaffId, setStaffStatus, setTokenDetails, setUserDetails } from 'store/authSlice';
import "auth/AuthCss";
import "./index.css";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import countryToCurrency, { Currencies, Countries } from "country-to-currency";
import { currencyList } from "./components/CurrencyList";
import { toast, ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import NoInternetPage from "./components/NoInternetPage";

const AuthApp = lazy(() => import("auth/AuthApp"));

 
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

const superAdminRolePermissions = [
  {
      name: "Dashboard",
      value: true
  },
  {
      name: "Profile",
      value: true
  },
  {
      name: "Domain",
      value: true
  },
  {
      name: "Payment Subscription",
      value: true
  },
  {
      name: "Email",
      value: true
  },
  {
      name: "Payment Method",
      value: true
  },
  {
      name: "Vouchers",
      value: true
  },
  {
      name: "My Staff",
      value: true
  },
  {
      name: "Billing History",
      value: true
  },
  {
      name: "Settings",
      value: true
  }
];

const hordansoAdminRolePermissions = [
  {
      name: "Dashboard",
      value: true
  },
  {
      name: "Profile",
      value: false
  },
  {
      name: "Domain",
      value: true
  },
  {
      name: "Payment Subscription",
      value: true
  },
  {
      name: "Email",
      value: true
  },
  {
      name: "Payment Method",
      value: false
  },
  {
      name: "Vouchers",
      value: true
  },
  {
      name: "My Staff",
      value: true
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

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, customerId, staffId, staffStatus, resellerToken, userDetails, metaDataSlice, defaultCurrencySlice, domainsState, notificationsList, roleId, rolePermission, isAdmin, adminName, expirationTimeSlice } = useAppSelector((state) => state.auth);

const [isOnline, setIsOnline] = useState<Boolean>(navigator.onLine);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // const isOnline = useNetworkStatus();
  // if (!isOnline) return (
  //   <div className="no_inter_container">
  //     <div>
  //         <i className="bi bi-wifi-off font_100"></i>
  //     </div>
  //     <h1 style={{ marginBottom: '5px' }}>Check your internet connection</h1>
  //     <div>
  //         <h4 style={{ margin: '0' }}> It appears to be disconnected</h4>
  //     </div>
  //   </div>
  // );
  
  // console.log({ customerId, token, isAdmin, adminName });
  // console.log({rolePermission});
  // console.log("notificationsList...", notificationsList);
  // const token ="vvggg"
  // console.log(token, "...token");
  // console.log("resellerToken...", resellerToken);
  // console.log("user details...", userDetails);
  // console.log({token, customerId, staffId, staffStatus});
  // console.log("meta data...", metaDataSlice);
  // console.log("defaultCurrencySlice...", defaultCurrencySlice);
  // console.log("domainsState...", domainsState?.find(item => item?.domain_type === "primary"));

  useEffect(() => {
    localStorage.setItem("last_visited_page", location.pathname);
  }, [location.pathname]);

  // useEffect(() => {
  //   const lastVisitedPage = localStorage.getItem("last_visited_page") || '/dashboard';

  //   const hasPermission = rolePermission.some(
  //     perm => perm.name === `${
  //       lastVisitedPage === "/profile"
  //       ? "Profile"
  //       :  lastVisitedPage === "/domain"
  //       ? "Domain"
  //       : lastVisitedPage === "/payment-subscription"
  //       ? "Payment Subscription"
  //       : lastVisitedPage === "/email"
  //       ? "Email"
  //       : lastVisitedPage === "/payment-method"
  //       ? "Payment Method"
  //       : lastVisitedPage === "/voucher"
  //       ? "Vouchers"
  //       : lastVisitedPage === "/my-staff"
  //       ? "My Staff"
  //       : lastVisitedPage === "/billing-history"
  //       ? "Billing History"
  //       : lastVisitedPage === "/settings"
  //       ? "Settings"
  //       : "Dashboard"
  //     }`
  //   );

  //   if(hasPermission) {
  //     navigate(lastVisitedPage)
  //   } else {
  //     navigate('/dashboard')
  //   }
  // }, [navigate])

  useEffect(() => {
    const getHordansoAdminDetails = async() => {
      try {
        await dispatch(getHordansoAdminDetailsFromLSThunk());
        await dispatch(getUserAuthTokenFromLSThunk());
        await dispatch(getUserIdFromLSThunk());
      } catch (error) {
        //
      }
    }

    getHordansoAdminDetails();
  }, [token, dispatch, navigate]);
  
  const exitAccess = async() => {
    try {
      await dispatch(removeUserAuthTokenFromLSThunk());
      // window.location.href=`${process.env.}`;
      window.location.href=`https://main.admin.gworkspace.withhordanso.com/customers`;
    } catch (error) {
      toast.error(error?.message || "Error exiting access");
    }
  };

  useEffect(() => {
    const expiryTime = new Date(expirationTimeSlice);
    const nowTime = new Date();
    // console.log({expirationTimeSlice, data})
    if(isAdmin) {
      if(expiryTime < nowTime) {
        exitAccess();
      }
    }
  }, [expirationTimeSlice, isAdmin, token, dispatch, navigate]);

  useEffect(() => {
    const getNotificationsList = async() => {
      if(token) {
        try {
          const result = await dispatch(getNotificationsListThunk({user_id: customerId, last_id: "", per_page: 5})).unwrap();
          // console.log("result...", result?.data);
          if(result?.data?.length > 0) {
            await dispatch(setNotificationsListSlice(result?.data));
          }
        } catch (error) {
          //
        }
      }
    };

    getNotificationsList();
  }, [customerId, token]);

  // console.log({roleId, customerId});
  
  useEffect(() => {
    const getRolePermission = async() => {
      if(isAdmin) {
        await dispatch(setRolePermissionsSlice(hordansoAdminRolePermissions));
      } else {
        if(customerId) {
          try {
            const result = await dispatch(getSettingsListThunk({user_type: "", user_id: customerId, sortdata: {sort_text: "", order: ""}})).unwrap();
            // console.log("result...", result?.settings);
            if(result) {
              if(staffStatus) {
                const permissions = result?.settings?.find(item => item?.id === roleId)?.permissions;
                // console.log("premissions...", permissions);
               if(permissions) {
                await dispatch(setRolePermissionsSlice(permissions));
               }
              } else {
                const permissions = result?.settings?.find(item => item?.user_type === "Super Admin")?.permissions;
                // console.log("premissions...", permissions);
                if(permissions) {
                  await dispatch(setRolePermissionsSlice(permissions));
                }
              }
            } else {
              // console.log("premissions...", initialRolePermissions);
                await dispatch(setRolePermissionsSlice(initialRolePermissions));
            }
          } catch (error) {
            // setRolePermissions(initialRolePermissions);
            await dispatch(setRolePermissionsSlice(initialRolePermissions));
          }
        }
      }
    };
    
    getRolePermission();
  }, [roleId, customerId, staffId, staffStatus, isAdmin]);

  useEffect(() => {
    const getIpData = async() => {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      const currency = countryToCurrency[data?.country_code];
      const findDefaultCurrency = currencyList.find(cash => cash.name === currency);
      if(findDefaultCurrency) {
        await dispatch(setDefaultCurrencySlice(findDefaultCurrency?.name));
      } else {
        await dispatch(setDefaultCurrencySlice("USD"));
      }
    };

    if(isOnline) {
      getIpData();
    }
  } , [isOnline]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const tokenResult = await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
        await dispatch(setTokenDetails(tokenResult));
        const customerIdResult = await dispatch(getUserIdFromLSThunk()).unwrap();
        await dispatch(setCustomerId(customerIdResult));
        const staffIdResult = await dispatch(getStaffIdFromLSThunk()).unwrap();
        await dispatch(setStaffId(staffIdResult));
        const staffStatusResult = await dispatch(getStaffStatusFromLSThunk()).unwrap();
        await dispatch(setStaffStatus(staffStatusResult === "true" ? true : false));
      } catch (error) {
        // console.error("Error fetching token:", error);
        navigate('/login');
      }
    };

    getUserDetails();
  }, [token, dispatch, navigate]);

  useEffect(() => {
    const getProfileData = async() => {
      if(token) {
        if(staffStatus) {
          try {
            const result = await dispatch(getProfileDataThunk({user_id: customerId, staff_id: staffId, is_staff: true})).unwrap();
            const customerResult = await dispatch(getProfileDataThunk({user_id: customerId, staff_id: "", is_staff: false})).unwrap();
            // console.log("result...", result);
            const roleData = await dispatch(getRoleIdFromLSThunk()).unwrap();
            await dispatch(setUserDetails(customerResult?.customerData));
            await dispatch(setStaffDetails(result?.customerData));
            await dispatch(setRoleIdSlice(roleData));
          } catch (error) {
            if(error?.message == "Request failed with status code 401") {
              try { 
                const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
                navigate('/home');
              } catch (error) {
                //
              }
            }
          }
        } else {
          try {
            const result = await dispatch(getProfileDataThunk({user_id: customerId, staff_id: "", is_staff: false})).unwrap();
            // console.log("result...", result);
            const roleData = await dispatch(getRoleIdFromLSThunk()).unwrap();
            await dispatch(setUserDetails(result?.customerData));
            await dispatch(setRoleIdSlice(roleData));
          } catch (error) {
            if(error?.message == "Request failed with status code 401") {
              try { 
                const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
                navigate('/home');
              } catch (error) {
                //
              }
            }
          }
        }
      }
    };

    getProfileData();
  }, [token, customerId, staffId, staffStatus, dispatch, navigate]);

  useEffect(() => {
    const getCartItems = async() => {
      if(token) {
        try {
          const result = await dispatch(getCartThunk({user_id: customerId})).unwrap();
          await dispatch(setCart(result?.cart));
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
    }
    getCartItems();
  }, [customerId, token]);

  useEffect(() => {
    const getDomains = async() => {
      if(token) {
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
      }
    };
    getDomains();
  }, [customerId, token]);

  useEffect(() => {
    const getsavedCards = async() => {
      if(token) {
        try {
          const result = await dispatch(savedCardsListThunk({user_id: customerId})).unwrap();
          await dispatch(setSaveCards(result?.cards));
          // console.log("result///", result)
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
    getsavedCards();
  }, [customerId, token]);

  useEffect(() => {
    const getPaymentMethodsState = async() => {
      if(token) {
        try {
          const result = await dispatch(getPaymentMethodsThunk({user_id: customerId})).unwrap();
          await dispatch(setPaymentMethodsState(result?.paymentMethods));
          // console.log("result///", result)
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
    getPaymentMethodsState();
  }, [customerId, token]);

  useEffect(() => {
    const getLandingPageData = async() => {
      try {
        const result = await dispatch(getLandingPageThunk()).unwrap();
        // console.log("result...", result?.data?.seo);
        await dispatch(setMetaDataSlice(result?.data?.seo));
      } catch (error) {
        //
      }
    };

    getLandingPageData();
  }, []);

  // useEffect(() => {
  //   const checkUserExists = async () => {
  //     console.log("called");
  //     try {
  //       const result = await dispatch(getProfileDataThunk({
  //         user_id: customerId, 
  //         staff_id: "", 
  //         is_staff: false
  //       })).unwrap();
  //       console.log("result...", result);
  //       if (!result?.customerData) {
  //         await dispatch(removeUserAuthTokenFromLSThunk());
  //       } else if(result?.customerData?.status === "inactive") {
  //         await dispatch(removeUserAuthTokenFromLSThunk());
  //       }
  //     } catch (error) {
  //       console.log("error...", error);
  //       await dispatch(removeUserAuthTokenFromLSThunk());
  //     }
  //   };

  //   const intervalId = setInterval(() => {
  //     checkUserExists();
  //   }, 300000);

  //   return () => clearInterval(intervalId);

  // }, [dispatch, customerId]);

  if (!isOnline) {
    return (
      // <div className="no_inter_container">
      //   <div>
      //     <i className="bi bi-wifi-off font_100"></i>
      //   </div>
      //   <h1 style={{ marginBottom: '5px' }}>Check your internet connection</h1>
      //   <div>
      //     <h4 style={{ margin: '0' }}> It appears to be disconnected</h4>
      //   </div>
      // </div>
      <NoInternetPage />
    )
  }
  
  return (
    <Suspense fallback={<h2>Loading.....</h2>}>
      {
        metaDataSlice && (
          <Helmet>
            <title>{metaDataSlice?.title}</title>
            <meta name="description" content={metaDataSlice?.desc?.join(", ")} />
            <meta name="keywords" content={metaDataSlice?.keywords?.join(", ")} />
            <meta property="og:image" content={metaDataSlice?.image_path} />
            <meta property="og:image:alt" content={metaDataSlice?.alt_image} />
            <meta property="og:url" content={metaDataSlice?.urllink} />
            <meta name="twitter:card" content={metaDataSlice?.alt_image} />
            <meta name="twitter:image" content={metaDataSlice?.image_path} />
            <meta itemProp="image" content={metaDataSlice?.image_path} />
          </Helmet>
        )
      }
      {
        token
        ? <MainApp />
        : <AuthApp />
      }
      {/* <MainApp /> */}
    </Suspense>
  );
  
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ReduxProvider>
        <BrowserRouter>
          <UserAuth>
            <App />
          </UserAuth>
        </BrowserRouter>
      </ReduxProvider>
    </HelmetProvider>
  </React.StrictMode>,
  rootElement
);
