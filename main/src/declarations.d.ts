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
// declare module "email/EmailApp" {
//   import React from 'react';
//   // Assuming DomainApp is a functional component or class component
//   const DomainApp: React.ComponentType<any>; // Adjust props type as per your component
//   export default EmailApp;
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

declare module 'store/authSlice' {
  import { PayloadAction } from '@reduxjs/toolkit';
  import { UserDetailsState } from 'store/authSlice'; // Adjust the import path if necessary

  export const resetUserSlice: () => PayloadAction<void>;
}

