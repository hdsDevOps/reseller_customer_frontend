// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getUserAuthTokenFromLSThunk,
    getUserIdFromLSThunk,
    makeUserLoginThunk,
    setUserIdToLSThunk
} from '../thunks/user.thunk';
import { userLocalStorage } from '../localStorage/user.storage';

export interface UserDetailsState {
  userAuthStatus: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE';
  userDetails: any;
  userId: number | null;
  token: string | null;
  customerId: string | null;
  resellerToken: string | null;
  cartState: [];
  domainsState: [];
  saveCardsState: [];
  paymentMethodsState: [];
  defaultCurrencySlice: string;
}

const initialState: UserDetailsState = {
  userAuthStatus: 'PENDING',
  userDetails: {},
  userId: null,
  token: '',
  customerId:'',
  resellerToken: '',
  cartState: [],
  domainsState: [],
  saveCardsState: [],
  paymentMethodsState: [],
  defaultCurrencySlice: 'USD',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setTokenDetails: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    setCustomerId: (state, action: PayloadAction<any>) => {
      state.customerId = action.payload;
    },
    setCart: (state, action: PayloadAction<any>) => {
      state.cartState = action.payload;
    },
    setDomains: (state, action: PayloadAction<any>) => {
      state.domainsState = action.payload;
    },
    setSaveCards: (state, action: PayloadAction<any>) => {
      state.saveCardsState = action.payload;
    },
    setPaymentMethodsState: (state, action: PayloadAction<any>) => {
      state.paymentMethodsState = action.payload;
    },
    setUserAuthStatus: (state, action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>) => {
      state.userAuthStatus = action.payload;
    },
    setResellerToken: (state, action: PayloadAction<any>) => {
      state.resellerToken = action.payload;
    },
    setDefaultCurrencySlice: (state, action: PayloadAction<any>) => {
      state.defaultCurrencySlice = action.payload;
    },
    resetUserSlice: (state) => {
      state.userAuthStatus = 'PENDING';
      state.userDetails = {};
      state.userId = null;
      state.token = '';
    },
  },
  extraReducers: builder => {

    builder.addCase(makeUserLoginThunk.pending, state => {
      // state.userAuthStatus = 'PENDING';
    });

    builder.addCase(
      makeUserLoginThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.customerId = action.payload.customer_id;
      },
    );

    builder.addCase(makeUserLoginThunk.rejected, state => {
      // state.userAuthStatus = 'UN_AUTHORIZED';
    });

  //-------------

    builder.addCase(getUserAuthTokenFromLSThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(getUserAuthTokenFromLSThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.userAuthStatus = 'AUTHORIZED';
      state.token = action.payload;
    });

    builder.addCase(getUserAuthTokenFromLSThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });

  //-------------

    builder.addCase(getUserIdFromLSThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(getUserIdFromLSThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.userAuthStatus = 'AUTHORIZED';
      state.customerId = action.payload;
    });

    builder.addCase(getUserIdFromLSThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });
  },
});

export const { setTokenDetails, setUserDetails, setUserAuthStatus,  setResellerToken, resetUserSlice, setCart, setDomains, setSaveCards, setPaymentMethodsState, setDefaultCurrencySlice } = authSlice.actions;

export default authSlice.reducer;
