import * as types from '../mutation-types'

const state = {
  app: undefined,
  sdks: [],
  goods: {},
}

const mutations = {
  [types.UPDATE_SDKS](state, sdks) {
    state.sdks = sdks
  },

  [types.SET_APP](state, app) {
    state.app = app
  }

}

export default {
  state,
  mutations
}
