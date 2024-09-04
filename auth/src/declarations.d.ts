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
    import { createAsyncThunk } from '@reduxjs/toolkit';
    export const makeUserLoginThunk: import("@reduxjs/toolkit").AsyncThunk<any, { email: string, password: string, login_user_type: string }, {}>;
  }

  declare module 'store/authSlice' {
    import { PayloadAction, Slice } from '@reduxjs/toolkit';
    import { UserDetailsState } from 'store/authSlice';
  
    export const setTokenDetails: (payload: string) => PayloadAction<string>;
    // Other exports
  }

