import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApis } from "../api/reseller.api";

export const checkDomainThunk = createAsyncThunk(
  "users/checkDomain",
  async (domain:string) => {
    return await userApis.checkDomainApi(domain);
  }
);

export const domainAvailabilityThunk = createAsyncThunk(
  "users/domainAvailability",
  async (domain:string) => {
    return await userApis.domainAvailabilityApi(domain);
  }
);

export const registerDomainThunk = createAsyncThunk(
  "users/registerDomain",
  async ({domain_name, years, whois_privacy, auto_renew, portfolio, first_name, last_name, address, city, state, zip_code, country, email, phone_number, company, usnc, usap, customer_id}:any) => {
    return await userApis.registerDomainApi(domain_name, years, whois_privacy, auto_renew, portfolio, first_name, last_name, address, city, state, zip_code, country, email, phone_number, company, usnc, usap, customer_id);
  }
);

export const getDomainInfoThunk = createAsyncThunk(
  "users/getDomainInfo",
  async ({domain_name}:any) => {
    return await userApis.getDomainInfoApi(domain_name);
  }
);

export const renewDomainThunk = createAsyncThunk(
  "users/renewDomain",
  async ({domain_name, years}:any) => {
    return await userApis.renewDomainApi(domain_name, years);
  }
);

export const activateAutoRenewThunk = createAsyncThunk(
  "users/activateAutoRenew",
  async ({domain_name}:any) => {
    return await userApis.activateAutoRenewApi(domain_name);
  }
);

export const removeAutoRenewThunk = createAsyncThunk(
  "users/removeAutoRenew",
  async ({domain_name}:any) => {
    return await userApis.removeAutoRenewApi(domain_name);
  }
);