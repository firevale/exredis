import Vue from 'vue'

const app = state => state.app
const deviceId = state => state.app.deviceId
const appId = state => state.app.appId
const accountExistences = state => state.app.accountExistences
const loginAccount = state => state.app.loginAccount
const registerAccount = state => state.app.registerAccount
const captchaUrl = state => state.app.captchaUrl

const invalidAccountIdErrorMessage = state => {
  if (window.acsConfig.isMobileAccountSupported) {
    return Vue.t('account.error.invalidAccountName')
  } else {
    return Vue.t('account.error.invalidEmailAddress')
  }
}

const accountIdPlaceholder = state => {
  if (window.acsConfig.isMobileAccountSupported) {
    return Vue.t('account.loginPage.userPlaceHolder')
  } else {
    return Vue.t('account.loginPage.userOnlyEmailPlaceHolder')
  }
}

export {
  app,
  deviceId,
  appId,
  accountExistences,
  loginAccount,
  registerAccount,
  captchaUrl,
  invalidAccountIdErrorMessage,
  accountIdPlaceholder,
}