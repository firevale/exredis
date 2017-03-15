import * as types from '../mutationTypes'

const state = {
  searchKeyword: '',
  historyKeywords: [
    '攻略',
    '任务',
    '赚钱',
    '综合讨论',
    '副本攻略',
    '指南',
  ]
}

const mutations = {
  [types.SET_SEARCH_KEYWORD](state, keyword) {
    state.searchKeyword = keyword
    if (keyword) {
      if (state.historyKeywords[0] && state.historyKeywords[0] != keyword) {
        state.historyKeywords.unshift(keyword)
      } else if (state.historyKeywords.length == 0) {
        state.historyKeywords.unshift(keyword)
      }

      if (state.historyKeywords.length > 6) {
        state.historyKeywords.pop()
      }
    }
  },

  [types.CLEAR_SEARCH_HISTORY](state) {
    state.historyKeywords = []
  },

  'ADD_SEARCH_HISTORY_KEYWORD' (state, key) {
    if (key) {
      if (state.historyKeywords[0] && state.historyKeywords[0] != key) {
        state.historyKeywords.unshift(key)
      } else if (state.historyKeywords.length == 0) {
        state.historyKeywords.unshift(key)
      }

      if (state.historyKeywords.length > 6) {
        state.historyKeywords.pop()
      }
    }
  }
}

export default {
  state,
  mutations
}
