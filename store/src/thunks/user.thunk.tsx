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

export const resendLoginOtpThunk = createAsyncThunk(
  "users/makeUserLogin",
  async ({ customer_id }: any) => {
    return await userApis.resendLoginOtpApi( customer_id );
  }
);

export const verifyLoginOtpThunk = createAsyncThunk(
  "users/verifyLogin",
  async ({ customer_id, otp }: any) => {
    return await userApis.verifyLoginOtpApi( customer_id, otp );
  }
);

export const forgetPasswordThunk = createAsyncThunk(
  "users/forgetPassword",
  async ({ email }: any) => {
    return await userApis.forgetPasswordApi( email );
  }
);

export const resendForgetPasswordOtpThunk = createAsyncThunk(
  "users/resendForgetPasswordOtp",
  async ({ email }: any) => {
    return await userApis.resendForgetPasswordOtpApi( email );
  }
);

export const verifyForgetPasswordOtpThunk = createAsyncThunk(
  "users/verifyForgetPasswordOtp",
  async ({ email, otp }: any) => {
    return await userApis.verifyForgetPasswordOtpApi( email, otp );
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "users/resetPasswordOtp",
  async ({ email, password }: any) => {
    return await userApis.resetPasswordApi( email, password );
  }
);

export const resgiterCustomerThunk = createAsyncThunk(
  "users/resgiterCustomer",
  async ({ email, password, business_phone_number, first_name, last_name, business_name, region, street_name, state, city, zipcode  }: any) => {
    return await userApis.resgiterCustomerApi( email, password, business_phone_number, first_name, last_name, business_name, region, street_name, state, city, zipcode  );
  }
);

export const resendRegisterOtpThunk = createAsyncThunk(
  "users/resendRegisterOtp",
  async ({ customer_id  }: any) => {
    return await userApis.resendRegisterOtpApi( customer_id  );
  }
);

export const verifyRegisterOtpThunk = createAsyncThunk(
  "users/verifyRegisterOtp",
  async ({ customer_id, otp }: any) => {
    return await userApis.verifyRegisterOtpApi( customer_id, otp  );
  }
);

export const getDomainsListThunk = createAsyncThunk(
  "users/getDomainsList",
  async ({ customer_id }: any) => {
    return await userApis.getDomainsListApi( customer_id  );
  }
);

export const addNewDomainThunk = createAsyncThunk(
  "users/addNewDomain",
  async ({ customer_id, domain_name, domain_type, subscription_id, business_name, business_email, license_usage, plan, payment_method, domain_status, billing_period, renew_status, subscription_status }: any) => {
    return await userApis.addNewDomainApi( customer_id, domain_name, domain_type, subscription_id, business_name, business_email, license_usage, plan, payment_method, domain_status, billing_period, renew_status, subscription_status  );
  }
);

export const addEmailsThunk = createAsyncThunk(
  "users/addEmails",
  async ({ user_id, domain_id, emails }: any) => {
    return await userApis.addEmailsApi( user_id, domain_id, emails  );
  }
);

export const getCartThunk = createAsyncThunk(
  "users/getCart",
  async ({ user_id }: any) => {
    return await userApis.getCartApi( user_id );
  }
);

export const addToCartThunk = createAsyncThunk(
  "users/addToCart",
  async ({ user_id, products }: any) => {
    return await userApis.addToCartApi( user_id, products );
  }
);

export const getStaffListThunk = createAsyncThunk(
  "users/verifyLoginOtp",
  async ({ user_type_id, user_id, search_text }: any) => {
    return await userApis.getStaffListApi( user_type_id, user_id, search_text );
  }
);