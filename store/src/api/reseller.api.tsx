import { resellerEndPoints } from "../constants/endPoint";
import { getApiCall, postApiCall } from "../services/resellerCrud.service";

async function checkDomainApi(domain:string): Promise<any> {
  try {
    const result = await getApiCall(resellerEndPoints.checkDomain+domain);
    return result;
  } catch (error: any) {
    throw error;
  }
};


export const userApis = {
  checkDomainApi,
};