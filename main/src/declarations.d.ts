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
}

declare module 'store/authSlice' {
  import { PayloadAction, Slice } from '@reduxjs/toolkit';
  import { UserDetailsState } from 'store/authSlice';

  export const setTokenDetails: (payload: string) => PayloadAction<string>;
  // Other exports
}

}
