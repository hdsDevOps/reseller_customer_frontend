// src/index.tsx
import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import UserAuth from "./hoc/UserAuth.hoc";
import MainApp from "./pages";
import AuthApp from "auth/AuthApp";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getUserAuthTokenFromLSThunk, getUserIdFromLSThunk } from 'store/user.thunk';
import { setResellerToken } from 'store/authSlice';
import "auth/AuthCss";
import "./index.css";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, customerId, resellerToken } = useAppSelector((state) => state.auth);
  // const token ="vvggg"
  // console.log(token, "...token");
  // console.log("resellerToken...", resellerToken);

  useEffect(() => {
    const getUserAuthToken = async () => {
      try {
        await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
        await dispatch(getUserIdFromLSThunk()).unwrap();
      } catch (error) {
        // console.error("Error fetching token:", error);
        navigate('/login');
      }
    };

    getUserAuthToken();
  }, [token, dispatch, navigate]);

  useEffect(() => {
    const setResellerTokenValue = async() => {
      try {
        await dispatch(setResellerToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhYWMyNzEwOTkwNDljMGRmYzA1OGUwNjEyZjA4ZDA2YzMwYTA0MTUiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiY3VzdG9tZXIiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVzZWxsZXItZmEwYmEiLCJhdWQiOiJyZXNlbGxlci1mYTBiYSIsImF1dGhfdGltZSI6MTczNDUxMjcyOSwidXNlcl9pZCI6Im5CUHBRSkJmbTlYYWp0ZGFWZEMxUU5OZ29JajEiLCJzdWIiOiJuQlBwUUpCZm05WGFqdGRhVmRDMVFOTmdvSWoxIiwiaWF0IjoxNzM0NTEyNzI5LCJleHAiOjE3MzQ1MTYzMjksImVtYWlsIjoiaGVzaGFtLnJlemFAc2NoZW1hcGhpYy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJoZXNoYW0ucmV6YUBzY2hlbWFwaGljLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.CzDO7sFS-F9WbDtIM4MvMt3ug-0WH6O4_ng66FPoKgYVj2amuuy9aVdqfqgOm3o3jGoIZKaG2eahxNGkcifkrrWlv8x6l0EJ21ZrxjR0NEgE2oPiyyBq-PX9gcyVFF0XqqbUUuR_3GYG3LdnSq_twr-NH3k2gct3IR1r8avJml4kihfc_dlmYXBuYZGRc-YE8p-7auyjGwxv9OuLIELciO2yfglyRJE6WRVKLxBWPJVoJpU77hQ_7A6kniQq-2UPLdik70nkz0c0YMGqqoaCpT5RCEhyAFU3hLDmTxFkNKnjvjhkNkpYGzLWNmE97HN4qsS_rC4uoFFK86e_3YezAQ")).unwrap();
      } catch (error) {
        //
      }
    };
    setResellerTokenValue();
  }, [])

  return (
    <Suspense fallback={<h2>Loading.....</h2>}>
      {token ? <MainApp /> : <AuthApp />}
      {/* <MainApp /> */}
    </Suspense>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <UserAuth>
          <App />
        </UserAuth>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  rootElement
);
