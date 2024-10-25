import { endPoints } from "../constants/endPoint";
import { getApiCall, postApiCall } from "../services/crud.service";

async function userRegisterApi(
  first_name: string,
  last_name: string,
  business_name: string,
  email: string,
  state: string,
  city: string,
  zipcode: string,
  password: string,
  street_name: string,
  region: string,
  phone_no: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.signup, {
      first_name,
      last_name,
      business_name,
      email,
      state,
      city,
      zipcode,
      password,
      street_name,
      region,
      phone_no,
    });
    return result;
  } catch (error: any) {
    throw error;
  }
}

async function checkUserCredentialsApi(
  email: string,
  password: string
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
}

async function loginOtpverifyApi(
  customer_id: string,
  otp: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.loginOtpverify, {
      customer_id,
      otp,
    });
    return result;
  } catch (error: any) {
    throw error;
  }
}

async function checkUserTokenApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.checkToken);
    return result;
  } catch (error: any) {
    throw error;
  }
}

export const userApis = {
  userRegisterApi,
  checkUserCredentialsApi,
  loginOtpverifyApi,
  checkUserTokenApi,
};
