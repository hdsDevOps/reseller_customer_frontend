export const endPoints = {
    //login
    login: 'customerservices/customer/api/v1/login',
    verifyLoginOtp: 'customerservices/customer/api/v1/otpverify',
    resendLoginOtp: 'customerservices/customer/api/v1/resed_otp_login',

    //forget password
    forgetPassword: 'customerservices/customer/api/v1/forgetpassword',
    resendForgetPasswordOtp: 'customerservices/customer/api/v1/resend_forget_password_OTP',
    verifyForgetPasswordOtp: 'customerservices/customer/api/v1/verify_forgetpassword_otp',
    resetPassword: 'customerservices/customer/api/v1/reset_password',

    //resgistration
    resgiterCustomer: 'customerservices/customer/api/v1/registration',
    resendRegisterOtp: 'customerservices/customer/api/v1/resend_otp',
    verifyRegisterOtp: 'customerservices/customer/api/v1/otpverify',


    // staff
    getStaffList: 'settingservices/setting/api/v1/staff_list',
};

export const resellerEndPoints = {
    checkDomain: 'api/v1/reseller/check-domain?customer_domain=',
};