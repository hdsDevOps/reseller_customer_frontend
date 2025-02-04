declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.webp';


declare module 'react-date-range' {
  import { ComponentType } from 'react';

  export const DateRangePicker: ComponentType<any>;
  export const Calendar: ComponentType<any>;
}

declare module 'rsuite/lib/DateRangePicker' {
  import { DateRangePickerProps } from 'rsuite';
  export const DateRangePicker: React.FC<DateRangePickerProps>;
}

declare module 'rsuite' {
  import { DateRangePickerProps } from 'rsuite';
  export const DateRangePicker: React.FC<DateRangePickerProps>;
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

declare module "store/reseller.thunk" {
  import { createAsyncThunk } from '@reduxjs/toolkit';
  export const checkDomainThunk;
  export const domainAvailabilityThunk;
}

declare module 'store/authSlice' {
  import { PayloadAction, Slice } from '@reduxjs/toolkit';
  
  export interface UserDetailsState {
    userAuthStatus: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE';
    userDetails: any;
    userId: number | null;
    token: string | null;
  }

  export const initialState: UserDetailsState;

  export const authSlice: Slice<UserDetailsState>;

  export const setTokenDetails: (state: UserDetailsState, action: PayloadAction<string>) => void;
  // export const setUserDetails: (state: UserDetailsState, action: PayloadAction<any>) => void;
  export const setUserAuthStatus: (state: UserDetailsState, action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>) => void;
  export const resetUserSlice: () => UserDetailsState;

  export const actions: {
    setTokenDetails: (payload: string) => PayloadAction<string>;
    setUserDetails: (payload: any) => PayloadAction<any>;
    setUserAuthStatus: (payload: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE') => PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>;
    resetUserSlice: () => PayloadAction<void>;
  }
  export const setCurrentPageNumberSlice: (payload: any) => PayloadAction<any>;
  export const setItemsPerPageSlice: (payload: any) => PayloadAction<any>;
  export const setPaymentDetailsFilterSlice: (payload: any) => PayloadAction<any>;
  export const setDomains: (payload: any) => PayloadAction<any>;
  export const setCart: (payload: any) => PayloadAction<any>;
  export const setCart: (payload: any) => PayloadAction<any>;
  export const setUserDetails;

  export default authSlice.reducer;
}

declare module 'store/user.thunk' {
  export const addNewDomainThunk;
  export const removeUserAuthTokenFromLSThunk;
  export const getCartThunk;
  export const addToCartThunk;
  export const getPaymentMethodsThunk;
  export const makeDefaultPaymentMethodThunk;
  export const getPaymentSubscriptionsListThunk;
  export const addSubscriptionThunk;
  export const changeAutoRenewThunk;
  export const cancelSubscriptionThunk;
  export const getDomainsListThunk;
  export const getVouchersListThunk;
  export const getProfileDataThunk;
  export const getPaymentMethodsThunk;
  // Add more thunk declarations as needed
  //
  export const useVoucherThunk;
  export const udpateProfileDataThunk;
  export const plansAndPricesListThunk;
  export const addBillingHistoryThunk;
  export const stripePayThunk;
  export const paystackPayThunk;
  export const getBillingHistoryThunk;
  export const getBillingHistoryThunk;
  export const addSettingThunk;
  export const addStaffThunk;
  export const addEmailsThunk;
  export const makeEmailAdminThunk;
  export const addNewDomainThunk;
  export const getLandingPageThunk;
  export const getBase64ImageThunk;
  export const hereMapSearchThunk;
}