import * as types from '../mutationTypes'

const state = {
  info: {},
  currentSection: 0,
  postOrderByField: 'created_at'
}

const mutations = {
  [types.SET_POST_LIST_TYPE](state, type) {
    state.currentSection = type
  },

  [types.SET_POST_ORDER_TYPE](state, type) {
    state.postOrderByField = type.code
  },

  [types.UPDATE_FORUM](state, forum) {
    state.info = forum
  }
}

export default {
  state,
  mutations,
}
