import * as types from '../mutationTypes'

const storage_search_history = '_acs_forum_search_historys_'

function restoreSearchHistorys() {
  let storageData = localStorage.getItem(storage_search_history)
  if (storageData) {
    return JSON.parse(storageData)
  } else {
    return []
  }
}

const state = {
  searchKeyword: '',
  historyKeywords: restoreSearchHistorys(),
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

      localStorage.setItem(storage_search_history, JSON.stringify(state.historyKeywords))
    }
  },

  [types.CLEAR_SEARCH_HISTORY](state) {
    state.historyKeywords = []
    localStorage.removeItem(storage_search_history)
  },
}

export default {
  state,
  mutations
}
