// src/index.tsx
import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import UserAuth from "./hoc/UserAuth.hoc";
import MainApp from "./pages";
import AuthApp from "auth/AuthApp";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCartThunk, getDomainsListThunk, getLandingPageThunk, getPaymentMethodsThunk, getProfileDataThunk, getStaffIdFromLSThunk, getStaffStatusFromLSThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, removeUserAuthTokenFromLSThunk, savedCardsListThunk } from 'store/user.thunk';
import { setCart, setCustomerId, setDomains, setMetaDataSlice, setPaymentMethodsState, setResellerToken, setSaveCards, setStaffId, setStaffStatus, setTokenDetails, setUserDetails } from 'store/authSlice';
import "auth/AuthCss";
import "./index.css";
import { HelmetProvider, Helmet } from 'react-helmet-async';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, customerId, staffId, staffStatus, resellerToken, userDetails, metaDataSlice } = useAppSelector((state) => state.auth);
  const [meta, setMeta] = useState({});
  // const token ="vvggg"
  // console.log(token, "...token");
  // console.log("resellerToken...", resellerToken);
  // console.log("user details...", userDetails);
  // console.log({token, customerId, staffId, staffStatus});
  console.log("meta data...", metaDataSlice);

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
          console.log("result...", result);
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
  }, [customerId]);

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
  }, [customerId]);

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
  }, [customerId]);

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
  }, [customerId]);

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
