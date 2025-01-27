// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getUserAuthTokenFromLSThunk,
    getUserIdFromLSThunk,
    makeUserLoginThunk,
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
}

const initialState: UserDetailsState = {
  userAuthStatus: 'PENDING',
  userDetails: {},
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
      state.isAdmin = action.payload;
    },
    setAdminNameSlice: (state, action: PayloadAction<any>) => {
      state.adminName = action.payload;
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
      state.userAuthStatus = 'UN_AUTHORIZED';
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
  },
});

export const { setTokenDetails, setUserDetails, setUserAuthStatus,  setResellerToken, resetUserSlice, setCart, setDomains, setSaveCards, setPaymentMethodsState, setDefaultCurrencySlice, setWorkSpaceFlowSlice, setCustomerId, setStaffId, setStaffStatus, setBillingHistoryFilterSlice, setPaymentDetailsFilterSlice, setCurrentPageNumberSlice, setItemsPerPageSlice, setMetaDataSlice, setRoleIdSlice, setNotificationsListSlice, setIsAdminSlice, setAdminNameSlice, setRolePermissionsSlice } = authSlice.actions;

export default authSlice.reducer;
