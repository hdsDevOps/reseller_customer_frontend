// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getHordansoAdminDetailsFromLSThunk,
  getProfileDataThunk,
  getUserAuthTokenFromLSThunk,
  getUserIdFromLSThunk,
  makeUserLoginThunk,
  removeUserAuthTokenFromLSThunk,
  setUserIdToLSThunk
} from '../thunks/user.thunk';
import { userLocalStorage } from '../localStorage/user.storage';

const initialRolePermissions = [
  {
      name: "Dashboard",
      value: false
  },
  {
      name: "Profile",
      value: false
  },
  {
      name: "Domain",
      value: false
  },
  {
      name: "Payment Subscription",
      value: false
  },
  {
      name: "Email",
      value: false
  },
  {
      name: "Payment Method",
      value: false
  },
  {
      name: "Vouchers",
      value: false
  },
  {
      name: "My Staff",
      value: false
  },
  {
      name: "Billing History",
      value: false
  },
  {
      name: "Settings",
      value: false
  }
];

export interface Permission {
  name: string,
  value: Boolean
}

export interface UserDetailsState {
  userAuthStatus: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE';
  userDetails: any;
  staffDetails: any;
  userId: number | null;
  token: string | null;
  customerId: string | null;
  staffId: string | null;
  staffStatus: Boolean;
  resellerToken: string | null;
  cartState: [];
  domainsState: [];
  saveCardsState: [];
  paymentMethodsState: [];
  defaultCurrencySlice: string;
  workSpaceFlowSlice: object;
  billingHistoryFilterSlice: object|null;
  paymentDetailsFilterSlice: object|null;
  currentPageNumber: Number;
  itemsPerPageSlice: Number;
  metaDataSlice: object|null;
  roleId: string;
  rolePermission: Permission[];
  notificationsList: [];
  isAdmin: Boolean;
  adminName: string;
  expirationTimeSlice: Number;
}

const initialState: UserDetailsState = {
  userAuthStatus: 'PENDING',
  userDetails: {},
  staffDetails: {},
  userId: null,
  token: '',
  customerId:'',
  staffId: '',
  staffStatus: false,
  resellerToken: '',
  cartState: [],
  domainsState: [],
  saveCardsState: [],
  paymentMethodsState: [],
  defaultCurrencySlice: 'USD',
  workSpaceFlowSlice: {},
  billingHistoryFilterSlice: null,
  paymentDetailsFilterSlice: null,
  currentPageNumber: 0,
  itemsPerPageSlice: 20,
  metaDataSlice: null,
  roleId: "",
  rolePermission: [...initialRolePermissions],
  notificationsList: [],
  isAdmin: false,
  adminName: "",
  expirationTimeSlice: 0
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setTokenDetails: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    setStaffDetails: (state, action: PayloadAction<any>) => {
      state.staffDetails = action.payload;
    },
    setCustomerId: (state, action: PayloadAction<any>) => {
      state.customerId = action.payload;
    },
    setStaffId: (state, action: PayloadAction<any>) => {
      state.staffId = action.payload;
    },
    setStaffStatus: (state, action: PayloadAction<any>) => {
      state.staffStatus = action.payload;
    },
    setCart: (state, action: PayloadAction<any>) => {
      state.cartState = action.payload;
    },
    setDomains: (state, action: PayloadAction<any>) => {
      state.domainsState = action.payload;
    },
    setSaveCards: (state, action: PayloadAction<any>) => {
      state.saveCardsState = action.payload;
    },
    setPaymentMethodsState: (state, action: PayloadAction<any>) => {
      state.paymentMethodsState = action.payload;
    },
    setUserAuthStatus: (state, action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>) => {
      state.userAuthStatus = action.payload;
    },
    setResellerToken: (state, action: PayloadAction<any>) => {
      state.resellerToken = action.payload;
    },
    setDefaultCurrencySlice: (state, action: PayloadAction<any>) => {
      state.defaultCurrencySlice = action.payload;
    },
    setWorkSpaceFlowSlice: (state, action: PayloadAction<any>) => {
      state.workSpaceFlowSlice = action.payload;
    },
    setBillingHistoryFilterSlice: (state, action: PayloadAction<any>) => {
      state.billingHistoryFilterSlice = action.payload;
    },
    setPaymentDetailsFilterSlice: (state, action: PayloadAction<any>) => {
      state.paymentDetailsFilterSlice = action.payload;
    },
    setCurrentPageNumberSlice: (state, action: PayloadAction<any>) => {
      state.currentPageNumber = action.payload;
    },
    setItemsPerPageSlice: (state, action: PayloadAction<any>) => {
      state.itemsPerPageSlice = action.payload;
    },
    setMetaDataSlice: (state, action: PayloadAction<any>) => {
      state.metaDataSlice = action.payload;
    },
    setRoleIdSlice: (state, action: PayloadAction<any>) => {
      state.roleId = action.payload;
    },
    setRolePermissionsSlice: (state, action: PayloadAction<any>) => {
      state.rolePermission = action.payload;
    },
    setNotificationsListSlice: (state, action: PayloadAction<any>) => {
      state.notificationsList = action.payload;
    },
    setIsAdminSlice: (state, action: PayloadAction<any>) => {
      // console.log("payload...", action.payload);
      state.isAdmin = action.payload?.adminStatus === "true" ? true : false;
      state.adminName = action.payload?.adminName;
      state.expirationTimeSlice = action.payload?.expiration;
    },
    resetUserSlice: (state) => {
      state.userAuthStatus = 'PENDING';
      state.userDetails = {};
      state.userId = null;
      state.token = ''; 
    },
  },
  extraReducers: builder => {

    builder.addCase(makeUserLoginThunk.pending, state => {
      // state.userAuthStatus = 'PENDING';
    });

    builder.addCase(
      makeUserLoginThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.customerId = action.payload.customer_id;
      },
    );

    builder.addCase(makeUserLoginThunk.rejected, state => {
      // state.userAuthStatus = 'UN_AUTHORIZED';
    });

    //-------------

    builder.addCase(getUserAuthTokenFromLSThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(getUserAuthTokenFromLSThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.userAuthStatus = 'AUTHORIZED';
      state.token = action.payload;
    });

    builder.addCase(getUserAuthTokenFromLSThunk.rejected, state => {
      // state.userAuthStatus = 'UN_AUTHORIZED';
      state = initialState;
    });

    //-------------

    builder.addCase(getUserIdFromLSThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(getUserIdFromLSThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.userAuthStatus = 'AUTHORIZED';
      state.customerId = action.payload;
    });

    builder.addCase(getUserIdFromLSThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });

    //-------------

    builder.addCase(getHordansoAdminDetailsFromLSThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
      // state.isAdmin = false;
    });

    builder.addCase(getHordansoAdminDetailsFromLSThunk.fulfilled, (state, action: PayloadAction<any>) => {
      // console.log("action.payload...", action.payload);
      const data = JSON.parse(action.payload);
      if(data !== null || data !== undefined || data !== "") {
        state.userAuthStatus = 'AUTHORIZED';
        state.isAdmin = data?.adminStatus === "true" ? true : false;
        state.adminName = data?.adminName;
        state.expirationTimeSlice = data?.expiration;
      }
    });

    builder.addCase(getHordansoAdminDetailsFromLSThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
      state.isAdmin = false;
      state.adminName = "";
      state.expirationTimeSlice = 0;
    });

    //-------------

    builder.addCase(removeUserAuthTokenFromLSThunk.pending, state => {
      // state.userAuthStatus = 'PENDING';
    });

    builder.addCase(removeUserAuthTokenFromLSThunk.fulfilled, (state) => {
      // state.userAuthStatus = 'AUTHORIZED';
      state = initialState;
    });

    builder.addCase(removeUserAuthTokenFromLSThunk.rejected, state => {
      // state.userAuthStatus = 'UN_AUTHORIZED';
    });

    //-------------

    builder.addCase(getProfileDataThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(getProfileDataThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.userAuthStatus = 'AUTHORIZED';
      state.userDetails = action.payload.customerData;
    });

    builder.addCase(getProfileDataThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });

    //-------------
  }, 
});

export const { setTokenDetails, setUserDetails, setStaffDetails, setUserAuthStatus,  setResellerToken, resetUserSlice, setCart, setDomains, setSaveCards, setPaymentMethodsState, setDefaultCurrencySlice, setWorkSpaceFlowSlice, setCustomerId, setStaffId, setStaffStatus, setBillingHistoryFilterSlice, setPaymentDetailsFilterSlice, setCurrentPageNumberSlice, setItemsPerPageSlice, setMetaDataSlice, setRoleIdSlice, setNotificationsListSlice, setIsAdminSlice, setRolePermissionsSlice } = authSlice.actions;

export default authSlice.reducer;
