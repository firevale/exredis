import * as types from '../mutationTypes'

const state = {
  info: {},
  currentSectionId: 0,
  currentPostTitle: '',
  postsOrderByField: 'inserted_at',
  editingPostData: {
    title: '',
    content: '',
    selectedSectionId: 0,
  },
}

const mutations = {
  [types.SET_CURRENT_SECTION_ID](state, sectionId) {
    state.currentSectionId = sectionId
  },

  [types.SET_CURRENT_POST_TITLE](state, title) {
    state.currentPostTitle = title
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
