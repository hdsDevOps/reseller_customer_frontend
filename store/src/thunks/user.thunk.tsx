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

export const makeUserLoginThunk = createAsyncThunk(
  "users/makeUserLogin",
  async ({ email, password, login_user_type }: any) => {
    return await userApis.checkUserCredentialsApi(
      email,
      password,
      login_user_type
    );
  }
);