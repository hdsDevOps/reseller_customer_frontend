import axios from "axios";
import { endPoints } from "../constants/endPoint";
import { getApiCall, postApiCall, postApiCall2, uploadImageApiCall } from "../services/crud.service";
import CustomError from "../customClass/CustomError.class";
import { apiError } from "../constants/apiError.const";

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

async function resendLoginOtpApi(
  customer_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resendLoginOtp, { customer_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyLoginOtpApi(
  customer_id: string,
  otp: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyLoginOtp, { customer_id, otp });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyStaffLoginOtpApi(
  otp: string,
  staff_id: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyStaffLoginOtp, { otp, staff_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function forgetPasswordApi(
  email: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.forgetPassword, { email });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resendForgetPasswordOtpApi(
  email: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resendForgetPasswordOtp, { email });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyForgetPasswordOtpApi(
  email: string,
  otp: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyForgetPasswordOtp, { email, otp });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resetPasswordApi(
  email: string,
  password: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resetPassword, { email, password });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resgiterCustomerApi(
  email: string,
  password: string,
  phone_no: string,
  first_name: string,
  last_name: string,
  business_name: string,
  country: string,
  address: string,
  state: string,
  city: string,
  zipcode: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resgiterCustomer, { email, password, phone_no, first_name, last_name, business_name, country, address, state, city, zipcode });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resendRegisterOtpApi(
  customer_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resendRegisterOtp, { customer_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyRegisterOtpApi(
  customer_id: string,
  otp: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyRegisterOtp, { customer_id, otp });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getDomainsListApi(
  customer_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getDomainsList, { customer_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addNewDomainApi(
  customer_id: string,
  domain_name: string,
  domain_type: string,
  subscription_id: string,
  business_name: string,
  business_email: string,
  license_usage: string,
  plan: string,
  payment_method: string,
  domain_status: Boolean,
  billing_period: string,
  renew_status: Boolean,
  subscription_status: Boolean,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addNewDomain, { customer_id, domain_name, domain_type, subscription_id, business_name, business_email, license_usage, plan, payment_method, domain_status, billing_period, renew_status, subscription_status });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addNewDomainWithoutLoginApi(
  customer_id: string,
  domain_name: string,
  domain_type: string,
  subscription_id: string,
  business_name: string,
  business_email: string,
  license_usage: string,
  plan: string,
  payment_method: string,
  domain_status: Boolean,
  billing_period: string,
  renew_status: Boolean|string,
  subscription_status: Boolean|string,
  token: string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.addNewDomain, { customer_id, domain_name, domain_type, subscription_id, business_name, business_email, license_usage, plan, payment_method, domain_status, billing_period, renew_status, subscription_status }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function cancelDomainApi(
  domain_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.cancelDomain, { domain_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateLicenseUsageApi(
  user_id: string,
  license_usage: string|number,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateLicenseUsage, { user_id, license_usage });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addEmailsApi(
  user_id: string,
  domain_id: string,
  emails: []
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addEmails, { user_id, domain_id, emails });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addEmailsWithoutLoginApi(
  user_id: string,
  domain_id: string,
  emails: [],
  token: string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.addEmails, { user_id, domain_id, emails }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function changeEmailStatusApi(
  domain_id: string,
  email: string,
  status: Boolean
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.changeEmailStatus, { domain_id, email, status });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteEmailApi(
  domain_id: string,
  uuid: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteEmail, { domain_id, uuid });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function makeEmailAdminApi(
  domain_id: string,
  rec_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.makeEmailAdmin, { domain_id, rec_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function makeEmailAdminWithoutLoginApi(
  domain_id: string,
  rec_id: string,
  token: string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.makeEmailAdmin, { domain_id, rec_id }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateEmailUserDataApi(
  domain_id: string,
  uuid: string,
  first_name: string,
  last_name: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateEmailUserData, { domain_id, uuid, first_name, last_name, });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resetEmailPasswordApi(
  domain_id: string,
  rec_id: string,
  password: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resetEmailPassword, { domain_id, rec_id, password });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getCartApi(
  user_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getCart, { user_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addToCartApi(
  user_id: string,
  products: []
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addToCart, { user_id, products });
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

async function addStaffWithoutLoginApi(
  user_id:string,
  first_name:string,
  last_name:string,
  email:string,
  phone_no:string,
  user_type_id:string,
  token:string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.addStaff, { user_id, first_name, last_name, email, phone_no, user_type_id }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addStaffApi(
  user_id:string,
  first_name:string,
  last_name:string,
  email:string,
  phone_no:string,
  user_type_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addStaff, { user_id, first_name, last_name, email, phone_no, user_type_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editStaffApi(
  id:string,
  first_name:string,
  last_name:string,
  email:string,
  phone_no:string,
  user_type_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.editStaff, { id, first_name, last_name, email, phone_no, user_type_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteStaffApi(
  id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteStaff, { id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getSettingsListApi(
  user_type:string,
  user_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getSettingsList, { user_type, user_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addSettingWithoutLoginApi(
  user_type:string,
  user_id:string,
  permissions:[],
  token:string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.addSetting, { user_type, user_id, permissions }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addSettingApi(
  user_type:string,
  user_id:string,
  permissions:[]
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addSetting, { user_type, user_id, permissions });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editSettingApi(
  user_type:string,
  id:string,
  permissions:[],
): Promise<any> {
  try {
    console.log({ id, permissions, user_type })
    const result = await postApiCall(endPoints.editSetting, { id, permissions, user_type });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteSettingApi(
  id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteSetting, { id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getVouchersListApi(
  customer_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getVouchersList, { customer_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function useVoucherApi(
  record_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.useVoucher, { record_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getBillingHistoryApi(
  user_id:string,
  start_date:string,
  end_date:string,
  domain:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getBillingHistory, { user_id, start_date, end_date, domain });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addBillingHistoryApi(
  user_id: string,
  transaction_id: string,
  date: string,
  invoice: string,
  product_type: string,
  description: string,
  domain: string,
  payment_method: string,
  payment_status: string,
  amount: string,
  transaction_data: object,
  subscription_id:string,
  customer_name:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addBillingHistory, {  user_id, transaction_id, date, invoice, product_type, description, domain, payment_method, payment_status, amount, transaction_data,subscription_id, customer_name });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function plansAndPricesListApi(
  subscription_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.plansAndPricesList, { subscription_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getProfileDataApi(
  user_id:string,
  staff_id:string,
  is_staff:Boolean
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getProfileData, { user_id, staff_id, is_staff });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function udpateProfileDataApi(
  user_id:string,
  first_name:string,
  last_name:string,
  email:string,
  phone_no:string,
  address:string,
  state:string,
  city:string,
  country:string,
  password:string,
  business_name:string,
  business_state:string,
  business_city:string,
  zipcode:string,
  staff_id:string,
  is_staff:Boolean,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.udpateProfileData, { user_id, first_name, last_name, email, phone_no, address, state, city, country, password, business_name, business_state, business_city, zipcode, staff_id, is_staff });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function udpateBusinessDataApi(
  user_id:string,
  first_name:string,
  last_name:string,
  email:string,
  phone_no:string,
  address:string,
  state:string,
  city:string,
  country:string,
  password:string,
  business_name:string,
  business_state:string,
  business_city:string,
  business_zip_code:string,
  token:string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.udpateProfileData, { user_id, first_name, last_name, email, phone_no, address, state, city, country, password, business_name, business_state, business_city, business_zip_code }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function uploadProfilePhotoApi(
  image:any,
  user_id:string,
  staff_id:string,
  is_staff:Boolean,
): Promise<any> {
  try {
    const result = await uploadImageApiCall(endPoints.uploadProfilePhoto, image, user_id, staff_id, is_staff);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getPaymentMethodsApi(
  user_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getPaymentMethods, { user_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function makeDefaultPaymentMethodApi(
  user_id:string,
  payment_method_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.makeDefaultPaymentMethod, { user_id, payment_method_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getPaymentMethodsWithoutLoginApi(
  user_id:string,
  token: string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.getPaymentMethods, { user_id }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function makeDefaultPaymentMethodWithoutLoginApi(
  user_id:string,
  payment_method_id:string,
  token: string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.makeDefaultPaymentMethod, { user_id, payment_method_id }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getPaymentSubscriptionsListApi(
  customer_id:string,
  start_date: string,
  end_date: string,
  domain_name:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getPaymentSubscriptionsList, { customer_id, start_date, end_date, domain_name });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addSubscriptionApi(
  product_type:string,
  payment_cycle:string,
  customer_id:string,
  description:string,
  domain:[],
  last_payment:string,
  next_payment:string,
  payment_method:string,
  subscription_status:string,
  plan_name_id:string,
  payment_details:[],
  plan_name:string,
  workspace_status:string | Boolean,
  is_trial:Boolean,
  license_usage: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addSubscription, { product_type, payment_cycle, customer_id, description, domain, last_payment, next_payment, payment_method, subscription_status, plan_name_id, payment_details, plan_name, workspace_status, is_trial, license_usage });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addSubscriptionWithoutLoginApi(
  product_type:string,
  payment_cycle:string,
  customer_id:string,
  description:string,
  domain:[],
  last_payment:string,
  next_payment:string,
  payment_method:string,
  subscription_status:string,
  plan_name_id:string,
  payment_details:[],
  plan_name:string,
  workspace_status:string | Boolean,
  is_trial:Boolean,
  license_usage: string,
  token: string
): Promise<any> {
  try {
    const result = await postApiCall2(endPoints.addSubscription, { product_type, payment_cycle, customer_id, description, domain, last_payment, next_payment, payment_method, subscription_status, plan_name_id, payment_details, plan_name, workspace_status, is_trial, license_usage }, token);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function cancelSubscriptionApi(
  product_type:string,
  subscription_id:string,
  customer_id:string,
  reason:string,
  subscription_status:string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.cancelSubscription, { product_type, subscription_id, customer_id, reason, subscription_status });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function changeAutoRenewApi(
  subscription_id:string,
  status:string,
  product_type:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.changeAutoRenew, { subscription_id, status, product_type });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getNotificationsListApi(
  user_id:string,
  last_id:string,
  per_page:Number
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getNotificationsList, { user_id, last_id, per_page });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function readNotificationApi(
  notification_id:string,
  is_read:Boolean
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.readNotification, { notification_id, is_read });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function toggleNotificationStatusApi(
  user_id:string,
  status:Boolean
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.toggleNotificationStatus, { user_id, status });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function savedCardsListApi(
  user_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.savedCardsList, { user_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function saveCardsApi(
  user_id: string,
  card: []
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.saveCards, { user_id, card });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteCardApi(
  user_id:string,
  rec_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteCard, { user_id, rec_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getLandingPageApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getLandingPage);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getFaqsApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getFaqs);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getBannerApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getBanner);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function contactFormApi(
  first_name:string,
  last_name:string,
  email:string,
  phone_no:string,
  subject:string,
  message:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.contactForm, { first_name, last_name, email, phone_no, subject, message });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getPaymetnMethodsApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getPaymetnMethods);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getPromotionListApi(promotion_id:string): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getPromotionList, { promotion_id });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyReCaptchaApi(re_captcha_token:string): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyReCaptcha, { re_captcha_token });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function stripePayApi(body:object): Promise<any> {
  try {
    const result = await postApiCall(endPoints.stripePay, body);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function paystackPayApi(body:object): Promise<any> {
  try {
    const result = await postApiCall(endPoints.paystackPay, body);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function hereMapSearchApi(address:object): Promise<any> {
  try {
    const result = await postApiCall(endPoints.hereMapSearch, address);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getBase64ImageApi(url:string): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getBase64Image, {url});
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const userApis = {
  userLoginApi,
  resendLoginOtpApi,
  verifyLoginOtpApi,
  verifyStaffLoginOtpApi,

  forgetPasswordApi,
  resendForgetPasswordOtpApi,
  verifyForgetPasswordOtpApi,
  resetPasswordApi,

  resgiterCustomerApi,
  resendRegisterOtpApi,
  verifyRegisterOtpApi,

  getDomainsListApi,
  addNewDomainApi,
  addNewDomainWithoutLoginApi,
  cancelDomainApi,
  updateLicenseUsageApi,

  addEmailsApi,
  addEmailsWithoutLoginApi,
  changeEmailStatusApi,
  deleteEmailApi,
  makeEmailAdminApi,
  makeEmailAdminWithoutLoginApi,
  updateEmailUserDataApi,
  resetEmailPasswordApi,

  getCartApi,
  addToCartApi,

  addStaffWithoutLoginApi,
  getStaffListApi,
  addStaffApi,
  editStaffApi,
  deleteStaffApi,

  addSettingWithoutLoginApi,
  getSettingsListApi,
  addSettingApi,
  editSettingApi,
  deleteSettingApi,

  getVouchersListApi,
  useVoucherApi,

  getBillingHistoryApi,
  addBillingHistoryApi,

  plansAndPricesListApi,

  getProfileDataApi,
  udpateProfileDataApi,
  udpateBusinessDataApi,
  uploadProfilePhotoApi,

  getPaymentMethodsApi,
  makeDefaultPaymentMethodApi,

  getPaymentMethodsWithoutLoginApi,
  makeDefaultPaymentMethodWithoutLoginApi,

  getPaymentSubscriptionsListApi,
  addSubscriptionApi,
  addSubscriptionWithoutLoginApi,
  cancelSubscriptionApi,
  changeAutoRenewApi,

  getNotificationsListApi,
  readNotificationApi,
  toggleNotificationStatusApi,

  savedCardsListApi,
  saveCardsApi,
  deleteCardApi,

  getLandingPageApi,
  getFaqsApi,
  getBannerApi,
  contactFormApi,

  getPaymetnMethodsApi,

  getPromotionListApi,

  verifyReCaptchaApi,

  stripePayApi,
  paystackPayApi,

  hereMapSearchApi,

  getBase64ImageApi,
};