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
  verifyLoginOtpApi,

  getStaffListApi,
};