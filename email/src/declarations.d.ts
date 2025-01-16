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
  export const setUserDetails;
  export const setUserAuthStatus: (state: UserDetailsState, action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>) => void;
  export const resetUserSlice: () => UserDetailsState;

  export const actions: {
    setTokenDetails: (payload: string) => PayloadAction<string>;
    setUserDetails: (payload: any) => PayloadAction<any>;
    setUserAuthStatus: (payload: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE') => PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>;
    resetUserSlice: () => PayloadAction<void>;
  }

  export default authSlice.reducer;
  export const setSaveCards;
}



declare module 'store/user.thunk' {
  export const getDomainsListThunk;
  export const removeUserAuthTokenFromLSThunk;
  export const changeEmailStatusThunk;
  export const deleteEmailThunk;
  export const makeEmailAdminThunk;
  export const updateEmailUserDataThunk;
  export const resetEmailPasswordThunk;
  export const updateLicenseUsageThunk;
  export const getProfileDataThunk;
  // Add more thunk declarations as needed
  export const savedCardsListThunk;
  export const deleteCardThunk;
  export const getVouchersListThunk;
  export const plansAndPricesListThunk;
  export const useVoucherThunk;
}
