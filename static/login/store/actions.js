import Vue from 'vue'
import * as utils from 'common/js/utils'

export const setLoginAccountId = ({
  commit
}, accountId) => {
  commit('SET_LOGIN_ACCOUNT', accountId)
}

export const setRegisterAccountId = ({
  commit
}, accountId) => {
  commit('SET_REGISTER_ACCOUNT', accountId)
}

export const setCaptchaUrl = ({
  commit
}, imageUrl) => {
  commit('SET_CAPTCHA_URL', imageUrl)
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
