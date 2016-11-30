import Vue from 'vue'
import utils from '../common/utils'

export const addAccountExistence = ({
  commit
}, payload) => {
  commit('ADD_ACCOUNT_EXISTENCE', payload)
}

export const setLoginAccount = ({
  commit
}, account) => {
  commit('SET_LOGIN_ACCOUNT', account)
}

export const setRegisterAccount = ({
  commit
}, account) => {
  commit('SET_REGISTER_ACCOUNT', account)
}

export const updateCaptcha = ({
  commit
}) => {
  Vue.http.post('/reset_register_captcha', {}).then(res => res.json()).then(json => {
    if (json.success) {
      commit('SET_CAPTCHA_URL', json.image_url)
    }
  })
}

export const validateAccountId = ({
  commit
}, accountId) => {
  if (window.acsConfig.isMobileAccountSupported) {
    return utils.isValidEmail(accountId) || utils.isValidMobileNumber(accountId)
  } else {
    return utils.isValidEmail(accountId)
  }
}

export const setRetrievePasswordAccountId = ({
  commit
}, accountId) => {
  commit('SET_RETRIEVE_PASSWORD_ACCOUNT_ID', accountId)
}

export const setRetrievePasswordVerifyToken = ({
  commit
}, verifyToken) => {
  commit('SET_RETRIEVE_PASSWORD_VERIFY_TOKEN', verifyToken)
}


