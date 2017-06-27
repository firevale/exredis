import * as types from '../mutation-types'

const state = {
  app: undefined,
  sdks: [],
  goods: {},
  myLoginCodes: [],
}

const mutations = {
  [types.UPDATE_SDKS](state, sdks) {
    state.sdks = sdks
  },

  [types.SET_APP](state, app) {
    state.app = app
  },

  [types.SET_MY_LOGIN_CODES](state, codes) {
    state.myLoginCodes = codes
  }
}

export default {
  state,
  mutations
}
