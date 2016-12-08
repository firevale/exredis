import utils from '../../common/utils'

const state = {
  appId: utils.getAppId(), 
  deviceId: utils.getDeviceId(),
  accountExistences: {},
  loginAccount: undefined,
  registerAccount: undefined,
  captchaUrl: undefined,
  transitionName: 'slide-left',
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

  'SET_TRANSITION_NAME' (state, transitionName) {
    console.log('SET_TRANSITION_NAME', transitionName)
    state.transitionName = transitionName
  },
}

export default {
  state,
  mutations
}