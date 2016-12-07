import nativeApi from '../../common/nativeApi'

const state = {
  appId: nativeApi.getAppId(),
  deviceId: nativeApi.getDeviceId(),
  accountExistences: {},
  loginAccount: undefined,
  registerAccount: undefined,
  captchaUrl: undefined,
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
}

export default {
  state,
  mutations
}