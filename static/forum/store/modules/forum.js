import * as types from '../mutationTypes'

const state = {
  info: {},
  currentSection: 0,
  postsOrderByField: 'created_at'
}

const mutations = {
  [types.SET_CURRENT_SECTION](state, type) {
    state.currentSection = type
  },

  [types.SET_POSTS_ORDER_BY_FIELD](state, type) {
    state.postsOrderByField = type.code
  },

  [types.UPDATE_FORUM](state, forum) {
    state.info = forum
  }
}

export default {
  state,
  mutations,
}
