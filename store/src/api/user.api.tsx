import { endPoints } from "../constants/endPoint";
import { getApiCall, postApiCall } from "../services/crud.service";

async function userLoginApi(
  email: string,
  password: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.login, {
      email,
      password,
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resendLoginOtpApi(
  customer_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resendLoginOtp, { customer_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyLoginOtpApi(
  customer_id: string,
  otp: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyLoginOtp, { customer_id, otp });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function forgetPasswordApi(
  email: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.forgetPassword, { email });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resendForgetPasswordOtpApi(
  email: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resendForgetPasswordOtp, { email });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyForgetPasswordOtpApi(
  email: string,
  otp: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyForgetPasswordOtp, { email, otp });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resetPasswordApi(
  email: string,
  password: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resetPassword, { email, password });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resgiterCustomerApi(
  email: string,
  password: string,
  business_phone_number: string,
  first_name: string,
  last_name: string,
  business_name: string,
  region: string,
  street_name: string,
  state: string,
  city: string,
  zipcode: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resgiterCustomer, { email, password, business_phone_number, first_name, last_name, business_name, region, street_name, state, city, zipcode });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resendRegisterOtpApi(
  customer_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resendRegisterOtp, { customer_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyRegisterOtpApi(
  customer_id: string,
  otp: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyRegisterOtp, { customer_id, otp });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getStaffListApi(
  user_type_id: string,
  user_id: string,
  search_text: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getStaffList, { user_type_id, user_id, search_text });
    return result;
  } catch (error: any) {
    throw error;
  }
};


export const userApis = {
  userLoginApi,
  resendLoginOtpApi,
  verifyLoginOtpApi,

  forgetPasswordApi,
  resendForgetPasswordOtpApi,
  verifyForgetPasswordOtpApi,
  resetPasswordApi,

  resgiterCustomerApi,
  resendRegisterOtpApi,
  verifyRegisterOtpApi,

  getStaffListApi,
};