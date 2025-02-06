import { resellerEndPoints } from "../constants/endPoint";
import { getApiCall, postApiCall } from "../services/resellerCrud.service";

async function checkDomainApi(domain:string): Promise<any> {
  try {
    const result = await getApiCall(resellerEndPoints.checkDomain+domain);
    // console.log("domain api...", result, resellerEndPoints.checkDomain+domain);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function domainAvailabilityApi(domain:string): Promise<any> {
  try {
    const result = await getApiCall(resellerEndPoints.domainAvailability+domain);
    // console.log("domain api...", result, resellerEndPoints.checkDomain+domain);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function registerDomainApi(
  domain_name: string,
  years: Number,
  whois_privacy: string,
  auto_renew: string,
  portfolio: string,
  first_name: string,
  last_name: string,
  address: string,
  city: string,
  state: string,
  zip_code: string,
  country: string,
  email: string,
  phone_number: string,
  company: string,
  usnc: string,
  usap: string,
  customer_id: string
): Promise<any> {
  try {
    const result = await postApiCall(resellerEndPoints.registerDomain, {domain_name, years, whois_privacy, auto_renew, portfolio, first_name, last_name, address, city, state, zip_code, country, email, phone_number, company, usnc, usap, customer_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getDomainInfoApi(
  domain_name: string
): Promise<any> {
  try {
    const result = await postApiCall(resellerEndPoints.getDomainInfo, {domain_name});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function renewDomainApi(
  domain_name: string,
  years: Number
): Promise<any> {
  try {
    const result = await postApiCall(resellerEndPoints.renewDomain, {domain_name, years});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function activateAutoRenewApi(
  domain_name: string
): Promise<any> {
  try {
    const result = await postApiCall(resellerEndPoints.activateAutoRenew, {domain_name});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function removeAutoRenewApi(
  domain_name: string
): Promise<any> {
  try {
    const result = await postApiCall(resellerEndPoints.removeAutoRenew, {domain_name});
    return result;
  } catch (error: any) {
    throw error;
  }
};


export const userApis = {
  checkDomainApi,
  domainAvailabilityApi,
  registerDomainApi,
  getDomainInfoApi,
  renewDomainApi,
  activateAutoRenewApi,
  removeAutoRenewApi,
};