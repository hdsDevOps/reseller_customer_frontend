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
  export const setUserDetails: (state: UserDetailsState, action: PayloadAction<any>) => void;
  export const setUserAuthStatus: (state: UserDetailsState, action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>) => void;
  export const resetUserSlice: () => UserDetailsState;

  export const actions: {
    setTokenDetails: (payload: string) => PayloadAction<string>;
    setUserDetails: (payload: any) => PayloadAction<any>;
    setUserAuthStatus: (payload: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE') => PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>;
    resetUserSlice: () => PayloadAction<void>;
  }

  export default authSlice.reducer;
}

declare module 'store/user.thunk' {
  export const addNewDomainThunk;
  export const removeUserAuthTokenFromLSThunk;
  export const getCartThunk;
  // Add more thunk declarations as needed
}