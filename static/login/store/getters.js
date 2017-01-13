import Vue from 'vue'

const app = state => state.app
const deviceId = state => state.app.deviceId
const appId = state => state.app.appId
const redirectUri = state => state.app.redirectUri
const accountExistences = state => state.app.accountExistences
const loginAccount = state => state.app.loginAccount
const registerAccount = state => state.app.registerAccount
const captchaUrl = state => state.app.captchaUrl
const transitionName = state => state.app.transitionName
const historyAccounts = state => state.app.historyAccounts

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

const colors = state => {
  return {
    danger: "#fb0101",
    success: '#23d160',
    white: "#fff",
    dark: "#cbcbcb",
    black: "#242424",
  }
}

export {
  app,
  deviceId,
  appId,
  redirectUri,
  accountExistences,
  loginAccount,
  registerAccount,
  captchaUrl,
  invalidAccountIdErrorMessage,
  accountIdPlaceholder,
  colors,
  transitionName,
  historyAccounts,
}