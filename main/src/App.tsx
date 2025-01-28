// src/index.tsx
import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import UserAuth from "./hoc/UserAuth.hoc";
import MainApp from "./pages";
import AuthApp from "auth/AuthApp";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCartThunk, getDomainsListThunk, getHordansoAdminDetailsFromLSThunk, getLandingPageThunk, getNotificationsListThunk, getPaymentMethodsThunk, getProfileDataThunk, getRoleIdFromLSThunk, getSettingsListThunk, getStaffIdFromLSThunk, getStaffStatusFromLSThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, removeUserAuthTokenFromLSThunk, savedCardsListThunk } from 'store/user.thunk';
import { setCart, setCustomerId, setDefaultCurrencySlice, setDomains, setMetaDataSlice, setNotificationsListSlice, setPaymentMethodsState, setResellerToken, setRoleIdSlice, setRolePermissionsSlice, setSaveCards, setStaffId, setStaffStatus, setTokenDetails, setUserDetails } from 'store/authSlice';
import "auth/AuthCss";
import "./index.css";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import countryToCurrency, { Currencies, Countries } from "country-to-currency";
import { currencyList } from "./components/CurrencyList";
import { toast, ToastContainer } from "react-toastify";

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
  const { token, customerId, staffId, staffStatus, resellerToken, userDetails, metaDataSlice, defaultCurrencySlice, domainsState, notificationsList, roleId, rolePermission, isAdmin, adminName, expirationTimeSlice } = useAppSelector((state) => state.auth);
  
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
      window.location.href=`http://localhost:4000/customers`;
    } catch (error) {
      toast.error("Error exiting access");
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
        try {
          const result = await dispatch(getSettingsListThunk({user_type: "", user_id: customerId})).unwrap();
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

    getIpData();
  } , []);

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
        try {
          const result = await dispatch(getProfileDataThunk({user_id: customerId, staff_id: staffId, is_staff: staffStatus})).unwrap();
          // console.log("result...", result);
          const roleData = await dispatch(getRoleIdFromLSThunk()).unwrap();
          await dispatch(setUserDetails(result?.customerData));
          await dispatch(setRoleIdSlice(roleData));
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

    getProfileData();
  }, [token, customerId, staffId, staffStatus]);

  useEffect(() => {
    const setResellerTokenValue = async() => {
      try {
        await dispatch(setResellerToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhYWMyNzEwOTkwNDljMGRmYzA1OGUwNjEyZjA4ZDA2YzMwYTA0MTUiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiY3VzdG9tZXIiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVzZWxsZXItZmEwYmEiLCJhdWQiOiJyZXNlbGxlci1mYTBiYSIsImF1dGhfdGltZSI6MTczNDUxMjcyOSwidXNlcl9pZCI6Im5CUHBRSkJmbTlYYWp0ZGFWZEMxUU5OZ29JajEiLCJzdWIiOiJuQlBwUUpCZm05WGFqdGRhVmRDMVFOTmdvSWoxIiwiaWF0IjoxNzM0NTEyNzI5LCJleHAiOjE3MzQ1MTYzMjksImVtYWlsIjoiaGVzaGFtLnJlemFAc2NoZW1hcGhpYy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJoZXNoYW0ucmV6YUBzY2hlbWFwaGljLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.CzDO7sFS-F9WbDtIM4MvMt3ug-0WH6O4_ng66FPoKgYVj2amuuy9aVdqfqgOm3o3jGoIZKaG2eahxNGkcifkrrWlv8x6l0EJ21ZrxjR0NEgE2oPiyyBq-PX9gcyVFF0XqqbUUuR_3GYG3LdnSq_twr-NH3k2gct3IR1r8avJml4kihfc_dlmYXBuYZGRc-YE8p-7auyjGwxv9OuLIELciO2yfglyRJE6WRVKLxBWPJVoJpU77hQ_7A6kniQq-2UPLdik70nkz0c0YMGqqoaCpT5RCEhyAFU3hLDmTxFkNKnjvjhkNkpYGzLWNmE97HN4qsS_rC4uoFFK86e_3YezAQ")).unwrap();
      } catch (error) {
        //
      }
    };
    setResellerTokenValue();
  }, []);

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
      {token ? <MainApp /> : <AuthApp />}
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
