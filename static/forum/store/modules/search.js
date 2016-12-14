const state = {
  searchKey: '',
  hisKeys: ['攻略','任务','赚钱','综合讨论','副本攻略','新角色属性'],
  pageCount: 10,
  currentPage: 1,
}

const mutations = {
  'SEARCH_KEY_CHANGE' (state, key) {
    state.searchKey = key
  },

  'HISTORY_KEY_ADD' (state, key) {
    state.hisKeys.unshift(key)
    if (state.hisKeys.length > 6) {
      state.hisKeys.pop()
    }
  },

  'SEARCH_SET_PAGECOUNT' (state, count) {
    state.pageCount = count
  },

  'SEARCH_SET_CURRENTPAGE' (state, page) {
    state.currentPage = page
  }

}

export default {
  state,
  mutations
}