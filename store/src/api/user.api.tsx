import {endPoints} from '../constants/endPoint';
import {getApiCall, postApiCall} from '../services/crud.service';

async function checkUserCredentialsApi(
  email: string,
  password: string,
  login_user_type: number,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.login, {
      email,
      password,
      login_user_type,
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
  checkUserCredentialsApi,
  checkUserTokenApi,
};
