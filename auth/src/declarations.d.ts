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
  export const verifyStaffLoginOtpThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const setUserAuthTokenToLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const setUserIdToLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const setStaffIdToLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const setStaffStatusToLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const getUserAuthTokenFromLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const getUserIdFromLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const getStaffIdFromLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;
  export const getStaffStatusFromLSThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserLoginPayload, {}>;

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
  export const getPromotionListThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const makeEmailAdminWithoutLoginThunk: import("@reduxjs/toolkit").AsyncThunk<any, UserRegisterPayload, {}>;
  export const verifyReCaptchaThunk;
  export const stripePayThunk;
  export const addBillingHistoryThunk;
  export const paystackPayThunk;
  export const hereMapSearchThunk;
  export const makeDefaultPaymentMethodThunk;
  export const getPaymentMethodsWithoutLoginThunk;
  export const makeDefaultPaymentMethodWithoutLoginThunk;
  export const addStaffWithoutLoginThunk;
  export const addSettingWithoutLoginThunk;
  export const getRoleIdFromLSThunk;
  export const setRoleIdToLSThunk;
  export const removeRoleIdFromLSThunk;

  export const getUserAuthTokenFromLSThunk;

  export const getHordansoAdminDetailsFromLSThunk;
  export const setHordansoAdminDetailsToLSThunk;
  export const removeHordansoAdminDetailsFromLSThunk;
  export const getBase64ImageThunk;
  export const getUsncDataThunk;
  export const getUsapDataThunk;
  export const getPaymentMethodsWithoutLoginThunk;
}


declare module 'store/authSlice' {
  import { PayloadAction, Slice } from '@reduxjs/toolkit';
  import { UserDetailsState } from 'store/authSlice';

  export const setTokenDetails: (payload: string) => PayloadAction<string>;
  export const setDefaultCurrencySlice: (payload: string) => PayloadAction<string>;
  // Other exports
  export const setWorkSpaceFlowSlice: (payload: string) => PayloadAction<string>;
  export const setRoleIdSlice;
  export const setIsAdminSlice;
  export const setAdminNameSlice;
}

declare module 'store/reseller.thunk' {
  import { createAsyncThunk } from "@reduxjs/toolkit";

  export const checkDomainThunk;
  export const domainAvailabilityThunk;
  export const registerDomainThunk;
}
// checkDomainThunk