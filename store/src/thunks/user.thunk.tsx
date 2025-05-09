import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApis } from "../api/user.api";

export const getUserAuthTokenFromLSThunk = createAsyncThunk(
  "users/getUserAuthTokenFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_AUTH_TOKEN");
  },
);

export const setUserAuthTokenToLSThunk = createAsyncThunk(
  "users/setUserAuthTokenToLSThunk",
  async ({token}: any) => {
    return localStorage.setItem("LS_KEY_AUTH_TOKEN", token);
  },
);

export const removeUserAuthTokenFromLSThunk = createAsyncThunk(
  "users/removeUserAuthTokenFromLS",
  async () => {
    // const clearLocalStorageExcept = (keysToKeep:string[]) => {
    //   Object.keys(localStorage).forEach((key:string) => {
    //     if (!keysToKeep.includes[key]) {
    //       localStorage.removeItem(key);
    //     }
    //   });
    // };

    // return clearLocalStorageExcept(["email", "password"]);
    return localStorage.clear();
  },
);

export const getUserIdFromLSThunk = createAsyncThunk(
  "users/getUserIdnFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_USER_ID");
  },
);

export const getStaffIdFromLSThunk = createAsyncThunk(
  "users/getStaffIdFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_STAFF_ID");
  },
);

export const getStaffStatusFromLSThunk = createAsyncThunk(
  "users/getStaffStatusnFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_STAFF_STATUS");
  },
);

export const getRoleIdFromLSThunk = createAsyncThunk(
  "users/getRoleIdFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_ROLE_ID");
  },
);

export const getHordansoAdminDetailsFromLSThunk = createAsyncThunk(
  "users/getHordansoAdminStatusFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_HORDANSO_ADMIN_DETAILS");
  },
);

export const setUserIdToLSThunk = createAsyncThunk(
  "users/setUserIdToLS",
  async (customerId: string) => {
    return localStorage.setItem("LS_KEY_USER_ID", customerId);
  },
);

export const setStaffIdToLSThunk = createAsyncThunk(
  "users/setStaffIdToLS",
  async (staffId: string) => {
    return localStorage.setItem("LS_KEY_STAFF_ID", staffId);
  },
);

export const setStaffStatusToLSThunk = createAsyncThunk(
  "users/setStaffStatusToLS",
  async (is_staff: string) => {
    return localStorage.setItem("LS_KEY_STAFF_STATUS", is_staff);
  },
);

export const setRoleIdToLSThunk = createAsyncThunk(
  "users/setRoleIdToLS",
  async (roleId: string) => {
    return localStorage.setItem("LS_KEY_ROLE_ID", roleId);
  },
);

export const setHordansoAdminDetailsToLSThunk = createAsyncThunk(
  "users/setHordansoAdminDetailsToLS",
  async ({hordansoAdminStatus,hordansoAdminName}: any) => {
    const now = new Date();
    const expirationTime = now.getTime() + 60*60*1000;
    const item = {
      adminStatus: hordansoAdminStatus === true ? "true" : "false",
      adminName: hordansoAdminName,
      expiration: expirationTime
    }
    return localStorage.setItem("LS_KEY_HORDANSO_ADMIN_DETAILS", JSON.stringify(item));
  },
);

export const removeUserIdFromLSThunk = createAsyncThunk(
  "users/removeUserIdFromLS",
  async () => {
    return localStorage.removeItem("LS_KEY_USER_ID");
  },
);

export const removeStaffIdFromLSThunk = createAsyncThunk(
  "users/removeStaffIdFromLS",
  async () => {
    return localStorage.removeItem("LS_KEY_STAFF_ID");
  },
);

export const removeStaffStatusFromLSThunk = createAsyncThunk(
  "users/removeStaffStatusFromLS",
  async () => {
    return localStorage.removeItem("LS_KEY_STAFF_STATUS");
  },
);

export const removeRoleIdFromLSThunk = createAsyncThunk(
  "users/removeRoleIdFromLS",
  async () => {
    return localStorage.removeItem("LS_KEY_ROLE_ID");
  },
);

export const removeHordansoAdminDetailsFromLSThunk = createAsyncThunk(
  "users/removeHordansoAdminDetailsFromLS",
  async () => {
    return localStorage.removeItem("LS_KEY_HORDANSO_ADMIN_DETAILS");
  },
);

export const makeUserLoginThunk = createAsyncThunk(
  "users/makeUserLogin",
  async ({ email, password }: any) => {
    return await userApis.userLoginApi( email, password, );
  }
);

export const resendLoginOtpThunk = createAsyncThunk(
  "users/makeUserLogin",
  async ({ customer_id }: any) => {
    return await userApis.resendLoginOtpApi( customer_id );
  }
);

export const verifyLoginOtpThunk = createAsyncThunk(
  "users/verifyLogin",
  async ({ customer_id, otp }: any) => {
    return await userApis.verifyLoginOtpApi( customer_id, otp );
  }
);

export const verifyStaffLoginOtpThunk = createAsyncThunk(
  "users/verifyStaffLoginOtp",
  async ({ otp, staff_id }: any) => {
    return await userApis.verifyStaffLoginOtpApi( otp,staff_id );
  }
);

export const forgetPasswordThunk = createAsyncThunk(
  "users/forgetPassword",
  async ({ email }: any) => {
    return await userApis.forgetPasswordApi( email );
  }
);

export const resendForgetPasswordOtpThunk = createAsyncThunk(
  "users/resendForgetPasswordOtp",
  async ({ email }: any) => {
    return await userApis.resendForgetPasswordOtpApi( email );
  }
);

export const verifyForgetPasswordOtpThunk = createAsyncThunk(
  "users/verifyForgetPasswordOtp",
  async ({ email, otp }: any) => {
    return await userApis.verifyForgetPasswordOtpApi( email, otp );
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "users/resetPasswordOtp",
  async ({ email, password }: any) => {
    return await userApis.resetPasswordApi( email, password );
  }
);

export const resgiterCustomerThunk = createAsyncThunk(
  "users/resgiterCustomer",
  async ({ email, password, phone_no, first_name, last_name, business_name, country, address, state, city, zipcode }: any) => {
    return await userApis.resgiterCustomerApi( email, password, phone_no, first_name, last_name, business_name, country, address, state, city, zipcode  );
  }
);

export const resendRegisterOtpThunk = createAsyncThunk(
  "users/resendRegisterOtp",
  async ({ customer_id  }: any) => {
    return await userApis.resendRegisterOtpApi( customer_id  );
  }
);

export const verifyRegisterOtpThunk = createAsyncThunk(
  "users/verifyRegisterOtp",
  async ({ customer_id, otp }: any) => {
    return await userApis.verifyRegisterOtpApi( customer_id, otp  );
  }
);

export const getDomainsListThunk = createAsyncThunk(
  "users/getDomainsList",
  async ({ customer_id }: any) => {
    return await userApis.getDomainsListApi( customer_id  );
  }
);

export const addNewDomainThunk = createAsyncThunk(
  "users/addNewDomain",
  async ({ customer_id, domain_name, domain_type, subscription_id, business_name, business_email, license_usage, plan, payment_method, domain_status, billing_period, renew_status, subscription_status }: any) => {
    return await userApis.addNewDomainApi( customer_id, domain_name, domain_type, subscription_id, business_name, business_email, license_usage, plan, payment_method, domain_status, billing_period, renew_status, subscription_status  );
  }
);

export const addNewDomainWithoutLoginThunk = createAsyncThunk(
  "users/addNewDomainWithoutLogin",
  async ({ customer_id, domain_name, domain_type, subscription_id, business_name, business_email, license_usage, plan, payment_method, domain_status, billing_period, renew_status, subscription_status, token }: any) => {
    return await userApis.addNewDomainWithoutLoginApi( customer_id, domain_name, domain_type, subscription_id, business_name, business_email, license_usage, plan, payment_method, domain_status, billing_period, renew_status, subscription_status, token );
  }
);

export const cancelDomainThunk = createAsyncThunk(
  "users/cancelDomain",
  async ({ domain_id }: any) => {
    return await userApis.cancelDomainApi( domain_id );
  }
);

export const updateLicenseUsageThunk = createAsyncThunk(
  "users/updateLicenseUsage",
  async ({ user_id, license_usage }: any) => {
    return await userApis.updateLicenseUsageApi( user_id, license_usage );
  }
);

export const addEmailsThunk = createAsyncThunk(
  "users/addEmails",
  async ({ user_id, domain_id, emails }: any) => {
    return await userApis.addEmailsApi( user_id, domain_id, emails  );
  }
);

export const addEmailsWithoutLoginThunk = createAsyncThunk(
  "users/addEmailsWithoutLogin",
  async ({ user_id, domain_id, emails, token }: any) => {
    return await userApis.addEmailsWithoutLoginApi( user_id, domain_id, emails, token );
  }
);

export const changeEmailStatusThunk = createAsyncThunk(
  "users/changeEmailStatus",
  async ({ domain_id, email, status }: any) => {
    return await userApis.changeEmailStatusApi( domain_id, email, status );
  }
);

export const deleteEmailThunk = createAsyncThunk(
  "users/deleteEmail",
  async ({ domain_id, uuid }: any) => {
    return await userApis.deleteEmailApi( domain_id, uuid );
  }
);

export const makeEmailAdminThunk = createAsyncThunk(
  "users/makeEmailAdmin",
  async ({ domain_id, rec_id }: any) => {
    return await userApis.makeEmailAdminApi( domain_id, rec_id );
  }
);

export const makeEmailAdminWithoutLoginThunk = createAsyncThunk(
  "users/makeEmailAdminWithoutLogin",
  async ({ domain_id, rec_id, token }: any) => {
    return await userApis.makeEmailAdminWithoutLoginApi( domain_id, rec_id, token );
  }
);

export const updateEmailUserDataThunk = createAsyncThunk(
  "users/updateEmailUserData",
  async ({ domain_id, uuid, first_name, last_name }: any) => {
    return await userApis.updateEmailUserDataApi( domain_id, uuid, first_name, last_name );
  }
);

export const resetEmailPasswordThunk = createAsyncThunk(
  "users/resetEmailPassword",
  async ({ domain_id, rec_id, password }: any) => {
    return await userApis.resetEmailPasswordApi( domain_id, rec_id, password );
  }
);

export const getCartThunk = createAsyncThunk(
  "users/getCart",
  async ({ user_id }: any) => {
    return await userApis.getCartApi( user_id );
  }
);

export const addToCartThunk = createAsyncThunk(
  "users/addToCart",
  async ({ user_id, products }: any) => {
    return await userApis.addToCartApi( user_id, products );
  }
);

export const getStaffListThunk = createAsyncThunk(
  "users/verifyLoginOtp",
  async ({ user_type_id, user_id, search_text, sortdata }: any) => {
    return await userApis.getStaffListApi( user_type_id, user_id, search_text, sortdata );
  }
);

export const addStaffWithoutLoginThunk = createAsyncThunk(
  "users/addStaffWithoutLogin",
  async ({ user_id, first_name, last_name, email, phone_no, user_type_id, token }: any) => {
    return await userApis.addStaffWithoutLoginApi( user_id, first_name, last_name, email, phone_no, user_type_id, token );
  }
);

export const addStaffThunk = createAsyncThunk(
  "users/addStaff",
  async ({ user_id, first_name, last_name, email, phone_no, user_type_id }: any) => {
    return await userApis.addStaffApi( user_id, first_name, last_name, email, phone_no, user_type_id );
  }
);

export const editStaffThunk = createAsyncThunk(
  "users/editStaff",
  async ({ id, first_name, last_name, email, phone_no, user_type_id }: any) => {
    return await userApis.editStaffApi( id, first_name, last_name, email, phone_no, user_type_id );
  }
);

export const deleteStaffThunk = createAsyncThunk(
  "users/deleteStaff",
  async ({ id }: any) => {
    return await userApis.deleteStaffApi( id );
  }
);

export const getSettingsListThunk = createAsyncThunk(
  "users/getSettingsList",
  async ({ user_type, user_id, sortdata }: any) => {
    return await userApis.getSettingsListApi( user_type, user_id, sortdata );
  }
);

export const addSettingWithoutLoginThunk = createAsyncThunk(
  "users/addSettingWithoutLogin",
  async ({ user_type, user_id, permissions, token }: any) => {
    return await userApis.addSettingWithoutLoginApi( user_type, user_id, permissions, token );
  }
);

export const addSettingThunk = createAsyncThunk(
  "users/addSetting",
  async ({ user_type, user_id, permissions }: any) => {
    return await userApis.addSettingApi( user_type, user_id, permissions );
  }
);

export const editSettingThunk = createAsyncThunk(
  "users/editSetting",
  async ({ user_type, id, permissions }: any) => {
    return await userApis.editSettingApi( user_type, id, permissions );
  }
);

export const deleteSettingThunk = createAsyncThunk(
  "users/deleteSetting",
  async ({ id }: any) => {
    return await userApis.deleteSettingApi( id );
  }
);

export const getVouchersListThunk = createAsyncThunk(
  "users/getVouchersList",
  async ({ customer_id }: any) => {
    return await userApis.getVouchersListApi( customer_id );
  }
);

export const useVoucherThunk = createAsyncThunk(
  "users/useVoucher",
  async ({ record_id }: any) => {
    return await userApis.useVoucherApi( record_id );
  }
);

export const getBillingHistoryThunk = createAsyncThunk(
  "users/getBillingHistory",
  async ({ user_id, start_date, end_date, domain, sortdata }: any) => {
    return await userApis.getBillingHistoryApi( user_id, start_date, end_date, domain, sortdata );
  }
);

export const addBillingHistoryThunk = createAsyncThunk(
  "users/addBillingHistory",
  async ({ user_id, transaction_id, date, invoice, product_type, description, domain, payment_method, payment_status, amount, transaction_data, subscription_id, customer_name }: any) => {
    return await userApis.addBillingHistoryApi( user_id, transaction_id, date, invoice, product_type, description, domain, payment_method, payment_status, amount, transaction_data, subscription_id, customer_name );
  }
);

export const plansAndPricesListThunk = createAsyncThunk(
  "users/plansAndPricesList",
  async ({ subscription_id }: any) => {
    return await userApis.plansAndPricesListApi( subscription_id );
  }
);

export const getProfileDataThunk = createAsyncThunk(
  "users/getProfileData",
  async ({ user_id, staff_id, is_staff }: any) => {
    return await userApis.getProfileDataApi( user_id, staff_id, is_staff );
  }
);

export const udpateProfileDataThunk = createAsyncThunk(
  "users/udpateProfileData",
  async ({ user_id, first_name, last_name, email, phone_no, address, state, city, country, password, business_name, business_state, business_city, zipcode, staff_id, is_staff }: any) => {
    return await userApis.udpateProfileDataApi( user_id, first_name, last_name, email, phone_no, address, state, city, country, password, business_name, business_state, business_city, zipcode, staff_id, is_staff );
  }
);

export const udpateBusinessDataThunk = createAsyncThunk(
  "users/udpateBusinessData",
  async ({ user_id, first_name, last_name, email, phone_no, address, state, city, country, password, business_name, business_state, business_city, business_zip_code, token }: any) => {
    return await userApis.udpateBusinessDataApi( user_id, first_name, last_name, email, phone_no, address, state, city, country, password, business_name, business_state, business_city, business_zip_code, token );
  }
);

export const uploadProfilePhotoThunk = createAsyncThunk(
  "users/uploadProfilePhoto",
  async ({ image, user_id, staff_id, is_staff }: any) => {
    return await userApis.uploadProfilePhotoApi( image, user_id, staff_id, is_staff );
  }
);

export const getPaymentMethodsThunk = createAsyncThunk(
  "users/getPaymentMethods",
  async ({ user_id }: any) => {
    return await userApis.getPaymentMethodsApi( user_id );
  }
);

export const makeDefaultPaymentMethodThunk = createAsyncThunk(
  "users/makeDefaultPaymentMethod",
  async ({ user_id, payment_method_id }: any) => {
    return await userApis.makeDefaultPaymentMethodApi( user_id, payment_method_id );
  }
);

export const getPaymentMethodsWithoutLoginThunk = createAsyncThunk(
  "users/getPaymentMethodsWithoutLogin",
  async ({ user_id, token }: any) => {
    return await userApis.getPaymentMethodsWithoutLoginApi( user_id, token );
  }
);

export const makeDefaultPaymentMethodWithoutLoginThunk = createAsyncThunk(
  "users/makeDefaultPaymentMethodWithoutLogin",
  async ({ user_id, payment_method_id, token }: any) => {
    return await userApis.makeDefaultPaymentMethodWithoutLoginApi( user_id, payment_method_id,token );
  }
);

export const getPaymentSubscriptionsListThunk = createAsyncThunk(
  "users/getPaymentSubscriptionsList",
  async ({ customer_id, start_date, end_date, domain_name }: any) => {
    return await userApis.getPaymentSubscriptionsListApi( customer_id, start_date, end_date, domain_name );
  }
);

export const addSubscriptionThunk = createAsyncThunk(
  "users/addSubscription",
  async ({ product_type, payment_cycle, customer_id, description, domain, last_payment, next_payment, payment_method, subscription_status, plan_name_id, payment_details, plan_name, workspace_status, is_trial, license_usage }: any) => {
    return await userApis.addSubscriptionApi( product_type, payment_cycle, customer_id, description, domain, last_payment, next_payment, payment_method, subscription_status, plan_name_id, payment_details, plan_name, workspace_status, is_trial, license_usage );
  }
);

export const addSubscriptionWithoutLoginThunk = createAsyncThunk(
  "users/addSubscriptionWithoutLogin",
  async ({ product_type, payment_cycle, customer_id, description, domain, last_payment, next_payment, payment_method, subscription_status, plan_name_id, payment_details, plan_name, workspace_status, is_trial, license_usage, token }: any) => {
    return await userApis.addSubscriptionWithoutLoginApi( product_type, payment_cycle, customer_id, description, domain, last_payment, next_payment, payment_method, subscription_status, plan_name_id, payment_details, plan_name, workspace_status, is_trial, license_usage, token );
  }
);

export const cancelSubscriptionThunk = createAsyncThunk(
  "users/cancelSubscription",
  async ({ product_type, subscription_id, customer_id, reason, subscription_status }: any) => {
    return await userApis.cancelSubscriptionApi( product_type, subscription_id, customer_id, reason, subscription_status );
  }
);

export const changeAutoRenewThunk = createAsyncThunk(
  "users/changeAutoRenew",
  async ({ subscription_id, status, product_type }: any) => {
    return await userApis.changeAutoRenewApi( subscription_id, status, product_type );
  }
);

export const getNotificationsListThunk = createAsyncThunk(
  "users/getNotificationsList",
  async ({ user_id, last_id, per_page }: any) => {
    return await userApis.getNotificationsListApi( user_id, last_id, per_page );
  }
);

export const readNotificationThunk = createAsyncThunk(
  "users/readNotification",
  async ({ notification_id, is_read }: any) => {
    return await userApis.readNotificationApi( notification_id, is_read );
  }
);

export const toggleNotificationStatusThunk = createAsyncThunk(
  "users/toggleNotificationStatus",
  async ({ user_id, status }: any) => {
    return await userApis.toggleNotificationStatusApi( user_id, status );
  }
);

export const savedCardsListThunk = createAsyncThunk(
  "users/savedCardsList",
  async ({ user_id }: any) => {
    return await userApis.savedCardsListApi( user_id );
  }
);

export const saveCardsThunk = createAsyncThunk(
  "users/saveCards",
  async ({ user_id, card }: any) => {
    return await userApis.saveCardsApi( user_id, card );
  }
);

export const deleteCardThunk = createAsyncThunk(
  "users/deleteCard",
  async ({ user_id, rec_id }: any) => {
    return await userApis.deleteCardApi( user_id, rec_id );
  }
);

export const getLandingPageThunk = createAsyncThunk(
  "users/getLandingPage",
  async () => {
    return await userApis.getLandingPageApi();
  }
);

export const getFaqsThunk = createAsyncThunk(
  "users/getFaqs",
  async () => {
    return await userApis.getFaqsApi();
  }
);

export const getBannerThunk = createAsyncThunk(
  "users/getBanner",
  async () => {
    return await userApis.getBannerApi();
  }
);

export const contactFormThunk = createAsyncThunk(
  "users/contactForm",
  async ({ first_name, last_name, email, phone_no, subject, message }:any) => {
    return await userApis.contactFormApi( first_name, last_name, email, phone_no, subject, message );
  }
);

export const getPaymetnMethodsThunk = createAsyncThunk(
  "users/getPaymetnMethods",
  async () => {
    return await userApis.getPaymetnMethodsApi();
  }
);

export const getPromotionListThunk = createAsyncThunk(
  "users/getPromotionList",
  async ({promotion_id}:any) => {
    return await userApis.getPromotionListApi(promotion_id);
  }
);

export const verifyReCaptchaThunk = createAsyncThunk(
  "users/verifyReCaptcha",
  async ({re_captcha_token}:any) => {
    return await userApis.verifyReCaptchaApi(re_captcha_token);
  }
);

export const stripePayThunk = createAsyncThunk(
  "users/stripePay",
  async (body:any) => {
    return await userApis.stripePayApi(body);
  }
);

export const paystackPayThunk = createAsyncThunk(
  "users/paystackPay",
  async (body:any) => {
    return await userApis.paystackPayApi(body);
  }
);

export const hereMapSearchThunk = createAsyncThunk(
  "users/hereMapSearch",
  async (address:any) => {
    return await userApis.hereMapSearchApi(address);
  }
);

export const getBase64ImageThunk = createAsyncThunk(
  "users/getBase64Image",
  async ({url}:any) => {
    return await userApis.getBase64ImageApi(url);
  }
);

export const getUsncDataThunk = createAsyncThunk(
  "users/getUsncData",
  async () => {
    return await userApis.getUsncDataApi();
  }
);

export const getUsapDataThunk = createAsyncThunk(
  "users/getUsapData",
  async () => {
    return await userApis.getUsapDataApi();
  }
);