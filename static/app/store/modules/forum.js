import * as types from '../mutationTypes'

const state = {
  info: {},
  currentSectionId: 0,
  currentPostTitle: '',
  postsOrderByField: 'inserted_at',
  editingPostData: {
    id: undefined,
    title: '',
    content: '',
    selectedSectionId: 0,
    sectionTitle: '',
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
  },

  [types.RESET_POST_EDITING_DATA](state) {
    state.editingPostData.id = null
    state.editingPostData.title = ''
    state.editingPostData.content = ''
    state.editingPostData.selectedSectionId = 0
    state.editingPostData.sectionTitle = '' 
  }
}

export default {
  state,
  mutations,
}
