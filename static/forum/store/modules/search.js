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
  ],
}

const mutations = {
  [types.SET_SEARCH_KEYWORD](state, keyword) {
    state.searchKeyword = keyword
    if (keyword) {
      let historyKeywords = []
      if (localStorage.historyKeywords) {
        historyKeywords = JSON.parse(localStorage.historyKeywords)
      }

      if (historyKeywords[0] && historyKeywords[0] != keyword) {
        historyKeywords.unshift(keyword)
      } else if (historyKeywords.length == 0) {
        historyKeywords.unshift(keyword)
      }

      if (historyKeywords.length > 6) {
        historyKeywords.pop()
      }

      localStorage.historyKeywords = JSON.stringify(historyKeywords)
    }
  },

  [types.CLEAR_SEARCH_HISTORY](state) {
    localStorage.removeItem("historyKeywords")
  }
}

export default {
  state,
  mutations,
}
