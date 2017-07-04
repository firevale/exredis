import * as acs from 'common/js/acs'

function restoreHistoryAccounts() {
  let jsonAccounts = localStorage.getItem('_acs_history_accounts2_')

  if (jsonAccounts) {
    return JSON.parse(jsonAccounts).filter(v => v.is_anonymous)
  } else {
    return []
  }
}

const state = {
  appId: acs.getAppId(),
  deviceId: acs.getDeviceId(),
  accountExistences: {},
  loginAccountId: localStorage.getItem('_acs_login_account_id_'),
  registerAccountId: localStorage.getItem('_acs_register_account_id_'),
  captchaUrl: undefined,
  transitionName: 'slide-left',
  historyAccounts: restoreHistoryAccounts(),
  redirectUri: ''
}

const mutations = {
  'ADD_ACCOUNT_EXISTENCE' (state, payload) {
    state.accountExistences[payload.account] = payload.exists
  },

  'SET_LOGIN_ACCOUNT' (state, accountId) {
    state.loginAccountId = accountId
    localStorage.setItem('_acs_login_account_id_', accountId)
  },

  'SET_REGISTER_ACCOUNT' (state, accountId) {
    state.registerAccountId = accountId
    localStorage.setItem('_acs_register_account_id_', accountId)
  },

  'SET_CAPTCHA_URL' (state, captchaUrl) {
    state.captchaUrl = captchaUrl
  },

  'SET_TRANSITION_NAME' (state, transitionName) {
    state.transitionName = transitionName
  },

  'ADD_LOGINNED_ACCOUNT' (state, account) {
    // don't add anonymous user to history accounts
    if (!account.is_anonymous) {
      let _account = {
        ...account,
        label: account.is_anonymous
          ? account.nick_name
          : (account.user_mobile
            ? account.user_mobile
            : account.user_email),
      }
      let accounts = state.historyAccounts.slice().filter(v => v.user_id != account.user_id)

      if (accounts.unshift(_account) > 4) {
        accounts.pop()
      }

      localStorage.setItem('_acs_history_accounts2_', JSON.stringify(accounts))
      state.historyAccounts = accounts.slice()
    }
  },

  'SET_REDIRECT_URI' (state, uri) {
    state.redirectUri = uri
  }
}

export default {
  state,
  mutations,
}
