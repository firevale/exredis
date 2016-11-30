import nativeApi from '../../common/nativeApi'

const state = {
  appId: nativeApi.getAppId(),
  deviceId: nativeApi.getDeviceId(),
  accountExistences: {},
  loginAccount: undefined,
  registerAccount: undefined,
  captchaUrl: undefined,
  retrievePassword: {
    accountId: '',
    verifyToken: '',
  }
}

const mutations = {
  'ADD_ACCOUNT_EXISTENCE' (state, payload) {
    state.accountExistences[payload.account] = payload.exists
  },

  'SET_LOGIN_ACCOUNT' (state, account) {
    state.loginAccount = account
  },

  'SET_REGISTER_ACCOUNT' (state, account) {
    state.registerAccount = account
  },

  'SET_CAPTCHA_URL' (state, captchaUrl) {
    state.captchaUrl = captchaUrl
  },

  'SET_RETRIEVE_PASSWORD_ACCOUNT_ID' (state, accountId) {
    state.retrievePassword.accountId = accountId
  },

  'SET_RETRIEVE_PASSWORD_VERIFY_TOKEN' (state, verifyToken) {
    state.retrievePassword.verifyToken = verifyToken
  },
}

export default {
  state,
  mutations
}