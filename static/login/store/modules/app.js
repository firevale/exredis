import utils from '../../common/utils'

function restoreHistoryAccounts() {
  let jsonAccounts = localStorage.getItem('_acs_history_accounts_')

  if (jsonAccounts) {
    return JSON.parse(jsonAccounts)
  }
  else {
    return []
  }
}

const state = {
  appId: utils.getAppId(), 
  deviceId: utils.getDeviceId(),
  accountExistences: {},
  loginAccount: localStorage.getItem('_acs_login_account_id_'),
  registerAccount: localStorage.getItem('_acs_register_account_id_'),
  captchaUrl: undefined,
  transitionName: 'slide-left',
  historyAccounts: restoreHistoryAccounts(),
  redirectUri: '',
}

const mutations = {
  'ADD_ACCOUNT_EXISTENCE' (state, payload) {
    state.accountExistences[payload.account] = payload.exists
  },

  'SET_LOGIN_ACCOUNT' (state, account) {
    state.loginAccount = account
    localStorage.setItem('_acs_login_account_id_', account)
  },

  'SET_REGISTER_ACCOUNT' (state, account) {
    state.registerAccount = account
    localStorage.setItem('_acs_register_account_id_', account)
  },

  'SET_CAPTCHA_URL' (state, captchaUrl) {
    state.captchaUrl = captchaUrl
  },

  'SET_TRANSITION_NAME' (state, transitionName) {
    state.transitionName = transitionName
  },

  'ADD_LOGINNED_ACCOUNT' (state, account) {
    account.label = account.is_anonymous ? account.nick_name : (account.user_mobile ? account.user_mobile : account.user_email)
    let accounts = state.historyAccounts.slice().filter(v => v.user_id != account.user_id)

    if (accounts.unshift(account) > 4) {
      accounts.pop()
    }

    localStorage.setItem('_acs_history_accounts_', JSON.stringify(accounts))
    state.historyAccounts = accounts.slice()
  },

  'SET_REDIRECT_URI' (state, uri) {
    state.redirectUri = uri
  },
}

export default {
  state,
  mutations
}