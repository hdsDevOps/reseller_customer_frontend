export const endPoints = {
    //login
    login: 'customerservices/customer/api/v1/login',
    resendLoginOtp: 'customerservices/customer/api/v1/resed_otp_login',
    verifyLoginOtp: 'customerservices/customer/api/v1/otpverify',

    //forget password
    forgetPassword: 'customerservices/customer/api/v1/forgetpassword',
    resendForgetPasswordOtp: 'customerservices/customer/api/v1/resend_forget_password_OTP',
    verifyForgetPasswordOtp: 'customerservices/customer/api/v1/verify_forgetpassword_otp',
    resetPassword: 'customerservices/customer/api/v1/reset_password',

    //resgistration
    resgiterCustomer: 'customerservices/customer/api/v1/registration',
    resendRegisterOtp: 'customerservices/customer/api/v1/resend_otp',
    verifyRegisterOtp: 'customerservices/customer/api/v1/otpverify',

    // domains
    getDomainsList: 'customerservices/domain/api/v1/domain-list',
    addNewDomain: 'customerservices/domain/api/v1/adddomain',
    cancelDomain: 'customerservices/domain/api/v1/delete-domain',
    updateLicenseUsage: 'subscriptionservices/subscription/api/v1/update_license_usage',

    // emails
    addEmails: 'userservices/user/api/v1/addemail',
    changeEmailStatus: 'userservices/user/api/v1/changeemailstatus',
    deleteEmail: 'userservices/user/api/v1/delete_email_account',
    makeEmailAdmin: 'userservices/user/api/v1/makeadmin',
    updateEmailUserData: 'userservices/user/api/v1/update_email_account',
    resetEmailPassword: 'userservices/user/api/v1/resetemailpassword',

    //cart
    getCart: 'userservices/user/api/v1/cartlist',
    addToCart: 'userservices/user/api/v1/addtocart',


    // staff
    getStaffList: 'settingservices/setting/api/v1/staff_list',
    addStaff: 'settingservices/setting/api/v1/add_staff',
    editStaff: 'settingservices/setting/api/v1/edit_staff',
    deleteStaff: 'settingservices/setting/api/v1/delete_staff',

    // settings
    getSettingsList: 'settingservices/setting/api/v1/settings',
    addSetting: 'settingservices/setting/api/v1/addsetting',
    editSetting: 'settingservices/setting/api/v1/edit_setting',
    deleteSetting: 'settingservices/setting/api/v1/delete_setting',

    // voucher lists
    getVouchersList: 'customerservices/setting/api/v1/customer_voucher_list',

    // billing history
    getBillingHistory: 'customerservices/home/api/v1/getbillinghistory',
    addBillingHistory: 'customerservices/home/api/v1/add_billing_data',

    // landing page
    plansAndPricesList: 'customerservices/home/api/v1/getsubscriptiondata',

    // profile
    getProfileData: 'userservices/user/api/v1/get_customer_profile_data',
    udpateProfileData: 'userservices/user/api/v1/updateprofile',
    uploadProfilePhoto: 'userservices/user/api/v1/upload_profile_image',

    // payment methods
    getPaymentMethods: 'settingservices/setting/api/v1/default_payment_method',
    makeDefaultPaymentMethod: 'settingservices/setting/api/v1/make_default_payment_method',

    // payment subscription
    getPaymentSubscriptionsList: 'subscriptionservices/subscription/api/v1/get_customer_subscription',
    addSubscription: 'subscriptionservices/subscription/api/v1/add_customer_subscription',
    cancelSubscription: 'subscriptionservices/subscription/api/v1/update_customer_subscription',
    changeAutoRenew: 'subscriptionservices/subscription/api/v1/change_auto_renewal_status',

    // notifications
    getNotificationsList: 'userservices/user/api/v1/get_notifications',
    readNotification: 'userservices/user/api/v1/get_notifications',
    toggleNotificationStatus: 'userservices/user/api/v1/update_notification_status_on_off',

    // saved cards
    savedCardsList: 'customerservices/user/api/v1/card_list',
    saveCards: 'customerservices/user/api/v1/update_card',


};

export const resellerEndPoints = {
    checkDomain: 'api/v1/reseller/check-domain?customer_domain=',
};