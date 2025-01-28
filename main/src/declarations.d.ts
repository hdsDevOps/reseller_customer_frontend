declare module "auth/AuthApp" {
  import React from 'react';
  const AuthApp: React.ComponentType<any>; // Adjust props type as per your component
  export default AuthApp;
}
declare module "domains/DomainApp" {
  import React from 'react';
  // Assuming DomainApp is a functional component or class component
  const DomainApp: React.ComponentType<any>; // Adjust props type as per your component
  export default DomainApp;
}
declare module "payments/PaymentApp" {
  import React from 'react';
  const PaymentApp: React.ComponentType<any>;
  export default PaymentApp;
}
declare module "billinghistory/HistoryApp" {
  import React from 'react';
  const HistoryApp: React.ComponentType<any>;
  export default HistoryApp;
}
declare module "settings/SettingsApp" {
  import React from 'react';
  // Assuming SettingsApp is a functional component or class component
  const SettingsApp: React.ComponentType<any>; // Adjust props type as per your component
  export default SettingsApp;
}
declare module "email/EmailApp" {
  import React from 'react';
  const PaymentApp: React.ComponentType<any>;
  export default PaymentApp;
}
// declare module "history/HistoryApp" {
//   import React from 'react';
//   const HistoryApp: React.ComponentType<any>;
//   export default HistoryApp;
// }
declare module 'store/user.storage' {
  export async function getUserTokenFromLocalStorage(): Promise<string>;
  export async function saveUserTokenToLocalStorage(token: string): Promise<void>;

  export const userLocalStorage: {
    getUserTokenFromLocalStorage: () => Promise<string>;
    saveUserTokenToLocalStorage: (token: string) => Promise<void>;
  };
}
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

declare module 'store/user.thunk' {
  export const getUserAuthTokenFromLSThunk: AsyncThunkAction<UserAuthToken, void, {}>;
  export const checkUserTokenThunk: AsyncThunkAction<CheckUserTokenResult, void, {}>;
  // Add more thunk declarations as needed
  export const getUserIdFromLSThunk;
  export const getStaffIdFromLSThunk;
  export const getStaffStatusFromLSThunk;
  export const removeUserIdFromLSThunk;
  export const removeStaffIdFromLSThunk;
  export const removeStaffStatusFromLSThunk;
  export const removeUserAuthTokenFromLSThunk;
  export const getDomainsListThunk;
  export const addEmailsThunk;
  export const getHordansoAdminDetailsFromLSThunk;
  
  export const changeEmailStatusThunk;
  export const deleteEmailThunk;
  export const makeEmailAdminThunk;
  export const updateEmailUserDataThunk;
  export const resetEmailPasswordThunk;
  export const updateLicenseUsageThunk;
  export const plansAndPricesListThunk;
  export const getProfileDataThunk;
  export const udpateProfileDataThunk;
  export const uploadProfilePhotoThunk;
  export const getCartThunk;
  export const addToCartThunk;
  export const getNotificationsListThunk;
  export const readNotificationThunk;
  export const toggleNotificationStatusThunk;
  export const getPaymentSubscriptionsListThunk;
  export const savedCardsListThunk;
  export const saveCardsThunk;
  export const getPaymentMethodsThunk;
  export const addBillingHistoryThunk;
  export const getProfileDataThunk;
  export const getPaymentMethodsThunk;
  export const makeDefaultPaymentMethodThunk;
  export const cancelSubscriptionThunk;
  export const changeAutoRenewThunk;
  export const getLandingPageThunk;
  export const deleteCardThunk;
  export const getVouchersListThunk;
  export const useVoucherThunk;
  export const stripePayThunk;
  export const paystackPayThunk;
  export const hereMapSearchThunk;
  export const getRoleIdFromLSThunk;
  export const getSettingsListThunk;
  export const getBillingHistoryThunk;
  export const verifyReCaptchaThunk;
  export const addSettingThunk;
}

declare module 'store/authSlice' {
  import { PayloadAction, Slice } from '@reduxjs/toolkit';
  import { UserDetailsState } from 'store/authSlice';

  export const setTokenDetails: (payload: string) => PayloadAction<string>;
  export const setCustomerId;
  export const setStaffId;
  export const setStaffStatus;
  export const setRoleIdSlice;
  export const setRolePermissionsSlice;
  // Other exports
  export const setCart: (payload: string) => PayloadAction<string>;
  export const setDomains: (payload: string) => PayloadAction<string>;
  export const setSaveCards: (payload: string) => PayloadAction<string>;
  export const setPaymentMethodsState: (payload: string) => PayloadAction<string>;
  export const setUserDetails: (payload: string) => PayloadAction<string>;
  export const setMetaDataSlice;
  export const setDefaultCurrencySlice;
  export const setNotificationsListSlice: (payload: any) => PayloadAction<any>;
  export const setAdminNameSlice;
  export const setIsAdminSlice;
}

declare module 'store/reseller.thunk' {
  import { createAsyncThunk } from "@reduxjs/toolkit";

  export const checkDomainThunk;
  export const domainAvailabilityThunk;
}