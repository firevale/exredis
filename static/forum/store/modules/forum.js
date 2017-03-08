import * as types from '../mutation-types'

const state = {
  info: {}
}

const mutations = {

  [types.UPDATE_FORUM](state, forum) {
    state.info = forum
  }

}

export default {
  state,
  mutations,
}
