declare module "store/ReduxProvider" {
  import { ComponentType, PropsWithChildren } from "react";
  const ReduxProvider: ComponentType<PropsWithChildren<{}>>;
  export default ReduxProvider;
}
declare module 'store/hooks' {
  import { AppDispatch, RootState } from './store'; // Adjust the import path as needed
  import { TypedUseSelectorHook } from 'react-redux';

  export const useAppDispatch: () => AppDispatch;
  export const useAppSelector: TypedUseSelectorHook<RootState>;
}

declare module "store/user.thunk" {
  import { createAsyncThunk } from "@reduxjs/toolkit";

  interface UserLoginPayload {
    email: string;
    password: string;
  }

  interface UserRegisterPayload {
    first_name: string;
    last_name: string;
    business_name: string;
    email: string;
    state: string;
    city: string;
    zipcode: string;
    password: string;
    street_name: string;
    region: string;
    phone_no: string;
  }

  interface LoginVerifyOtpPayload {
    customer_id: string;
    otp: string;
  }

  export const makeUserLoginThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const setUserAuthTokenToLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const setUserIdToLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const getUserAuthTokenFromLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const getUserIdFromLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;

  export const makeUserRegisterThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const getLandingPageThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const getFaqsThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const getBannerThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const contactFormThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const plansAndPricesListThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const resgiterCustomerThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const resendRegisterOtpThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const verifyRegisterOtpThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const udpateBusinessDataThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const addSubscriptionWithoutLoginThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const addNewDomainWithoutLoginThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const addEmailsWithoutLoginThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const plansAndPricesListThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const getPaymetnMethodsThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
}


declare module 'store/authSlice' {
  import { PayloadAction, Slice } from '@reduxjs/toolkit';
  import { UserDetailsState } from 'store/authSlice';

  export const setTokenDetails: (payload: string) => PayloadAction<string>;
  export const setDefaultCurrencySlice: (payload: string) => PayloadAction<string>;
  // Other exports
  export const setWorkSpaceFlowSlice: (payload: string) => PayloadAction<string>;
}

declare module 'store/reseller.thunk' {
  import { createAsyncThunk } from "@reduxjs/toolkit";

  export const checkDomainThunk;
}
// checkDomainThunk