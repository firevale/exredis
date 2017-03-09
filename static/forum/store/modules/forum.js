import * as types from '../mutationTypes'

const state = {
  info: {},
  currentSectionId: 0,
  postsOrderByField: 'created_at',
}

const mutations = {
  [types.SET_CURRENT_SECTION_ID](state, sectionId) {
    state.currentSectionId = sectionId
  },

  [types.SET_POSTS_ORDER_BY_FIELD](state, fieldName) {
    state.postsOrderByField = fieldName
  },

  [types.UPDATE_FORUM_INFO](state, forum) {
    state.info = forum
  }
}

export default {
  state,
  mutations,
}
