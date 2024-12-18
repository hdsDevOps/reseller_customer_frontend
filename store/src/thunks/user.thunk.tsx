import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApis } from "../api/user.api";

export const getUserAuthTokenFromLSThunk = createAsyncThunk(
  "users/getUserAuthTokenFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_AUTH_TOKEN");
  },
);

export const setUserAuthTokenToLSThunk = createAsyncThunk(
  "users/setUserAuthTokenToLSThunk",
  async ({token}: any) => {
    return localStorage.setItem("LS_KEY_AUTH_TOKEN", token);
  },
);

export const removeUserAuthTokenFromLSThunk = createAsyncThunk(
  "users/removeUserAuthTokenFromLS",
  async () => {
    return localStorage.removeItem("LS_KEY_AUTH_TOKEN");
  },
);

export const getUserIdFromLSThunk = createAsyncThunk(
  "users/getUserIdnFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_USER_ID");
  },
);

export const setUserIdToLSThunk = createAsyncThunk(
  "users/setUserIdToLS",
  async (customerId: string) => {
    return localStorage.setItem("LS_KEY_USER_ID", customerId);
  },
);

export const removeUserIdFromLSThunk = createAsyncThunk(
  "users/removeUserIdFromLS",
  async () => {
    return localStorage.removeItem("LS_KEY_USER_ID");
  },
);

export const makeUserLoginThunk = createAsyncThunk(
  "users/makeUserLogin",
  async ({ email, password }: any) => {
    return await userApis.userLoginApi( email, password, );
  }
);

export const verifyLoginOtpThunk = createAsyncThunk(
  "users/verifyLoginOtp",
  async ({ customer_id, otp }: any) => {
    return await userApis.verifyLoginOtpApi( customer_id, otp );
  }
);

export const getStaffListThunk = createAsyncThunk(
  "users/verifyLoginOtp",
  async ({ user_type_id, user_id, search_text }: any) => {
    return await userApis.getStaffListApi( user_type_id, user_id, search_text );
  }
);