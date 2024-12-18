import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApis } from "../api/reseller.api";

export const checkDomainThunk = createAsyncThunk(
  "users/checkDomain",
  async (domain:string) => {
    return await userApis.checkDomainApi(domain);
  }
);