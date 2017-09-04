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
  historyKeywords: restoreSearchHistorys(),
}

const mutations = {
  [types.ADD_SEARCH_HISTORY](state, keyword) {
    if (keyword) {
      let historyKeywords = state.historyKeywords.filter(v => v != keyword)
      historyKeywords.unshift(keyword)

      if (historyKeywords.length > 8) {
        historyKeywords.pop()
      }

      state.historyKeywords = historyKeywords
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