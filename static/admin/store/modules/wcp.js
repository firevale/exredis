import * as types from '../mutation-types'

const state = {
  wcpParams: Object,
}

const mutations = {
  [types.UPDATE_WCP_PARAMS](state, params) {
    state.wcpParams = params
  }

}

export default {
  state,
  mutations
}