import Vue from 'vue'
import * as utils from 'common/utils'

export const setLoginAccountId = ({
  commit
}, account) => {
  commit('SET_LOGIN_ACCOUNT', account)
}

export const setRegisterAccountId = ({
  commit
}, account) => {
  commit('SET_REGISTER_ACCOUNT', account)
}

export const updateCaptcha = async ({commit}) => {
  try {
    let response = await Vue.http.post("/reset_register_captcha", {})
    let result = await response.json()

    if (result.success) {
      commit('SET_CAPTCHA_URL', result.image_url)
    }
  } catch (e) {
    console.error(e)
  }
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

export const setTransitionName = ({
  commit
}, transitionName) => {
  commit('SET_TRANSITION_NAME', transitionName)
}

export const addLoginnedAccount = ({
  commit
}, account) => {
  commit('ADD_LOGINNED_ACCOUNT', account)
}

export const setRedirectUri = ({
  commit
}, uri) => {
  commit('SET_REDIRECT_URI', uri)
}
