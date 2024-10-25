import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApis } from "../api/user.api";

export const getUserAuthTokenFromLSThunk = createAsyncThunk(
  "users/getUserAuthTokenFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_AUTH_TOKEN");
  },
);

export const checkUserTokenThunk = createAsyncThunk(
  'users/checkUserToken',
  async () => {
    return await userApis.checkUserTokenApi();
  },
);

export const makeUserRegisterThunk = createAsyncThunk(
  "users/makeUserRegister",
  async ({first_name,last_name,business_name,email,state,city,zipcode,password,street_name, region, phone_no }: any) => {
    return await userApis.userRegisterApi(
      first_name,last_name,business_name,email,state,city,zipcode,password,street_name, region, phone_no,
    );
  }
);

export const makeUserLoginThunk = createAsyncThunk(
  "users/makeUserLogin",
  async ({ email, password }: any) => {
    return await userApis.checkUserCredentialsApi(
      email,
      password
    );
  }
);

export const verifyOTPUserLoginThunk = createAsyncThunk(
  "users/verifyOTPUserLogin",
  async ({ customer_id, otp }: any) => {
    return await userApis.loginOtpverifyApi(
      customer_id,
      otp
    );
  }
);
