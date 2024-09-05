import { createAsyncThunk } from "@reduxjs/toolkit";
// import { userLocalStorage } from "store/user.storage";
export const getUserAuthTokenFromLSThunk = createAsyncThunk(
  "users/getUserAuthTokenFromLS",
  async () => {
    return { token: "yu834834hhruer8334hhfurh" };
  }
);
