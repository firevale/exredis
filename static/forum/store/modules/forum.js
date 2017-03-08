import * as types from '../mutationTypes'

const state = {
  info: {},
  loadType: 'all',
  orderType: 'created_at',
  orderTypeStr: '发帖时间排序'
}

const mutations = {
  'NOTE_LOADTYPE_CHANGE' (state, type) {
    state.loadType = type
  },

  'NOTE_ORDERTYPE_CHANGE' (state, type) {
    state.orderType = type.code
    state.orderTypeStr = type.name
  },

  [types.UPDATE_FORUM](state, forum) {
    state.info = forum
  },
}

export default {
  state,
  mutations
}
