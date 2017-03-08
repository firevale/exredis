import * as types from '../mutationTypes'

const state = {
  info: {},
  postListType: 0,
  postOrderType: 'created_at'
}

const mutations = {
  [types.SET_POST_LIST_TYPE](state, type) {
    state.postListType = type
  },

  [types.SET_POST_ORDER_TYPE](state, type) {
    state.postOrderType = type.code
  },

  [types.UPDATE_FORUM](state, forum) {
    state.info = forum
  }
}

export default {
  state,
  mutations,
}
