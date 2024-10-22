// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getUserAuthTokenFromLSThunk,
    makeUserLoginThunk,
} from '../thunks/user.thunk';
import { userLocalStorage } from '../localStorage/user.storage';

export interface UserDetailsState {
  userAuthStatus: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE';
  userDetails: any;
  userId: number | null;
  token: string | null;
}

const initialState: UserDetailsState = {
  userAuthStatus: 'PENDING',
  userDetails: {},
  userId: null,
  token: '',
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
    setUserAuthStatus: (state, action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>) => {
      state.userAuthStatus = action.payload;
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
        state.token = action.payload?.data?.token;
        userLocalStorage.saveUserTokenToLocalStorage(
          action.payload?.data?.token
        );
      },
    );

    builder.addCase(makeUserLoginThunk.rejected, state => {
      // state.userAuthStatus = 'UN_AUTHORIZED';
    });

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
  },
});

export const { setTokenDetails, setUserDetails, setUserAuthStatus, resetUserSlice } = authSlice.actions;

export default authSlice.reducer;
