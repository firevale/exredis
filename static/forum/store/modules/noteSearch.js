const state = {
  loadType: 'all',
  loadUrl: '/forum/all/',
  orderType: 'create',
  orderTypeStr: '发帖时间排序',
  pageCount: 10,
  currentPage: 1,
}

const mutations = {
  'NOTE_LOADTYPE_CHANGE' (state, type) {
    state.loadType = type
    switch (type) {
      case 'all':
        state.loadUrl = '/forum/all/'
        break;
      case 'discussion':
        state.loadUrl = '/forum/discussion/'
        break;
      case 'experience':
        state.loadUrl = '/forum/experience/'
        break;
      case 'original':
        state.loadUrl = '/forum/original/'
        break;
      case 'ras':
        state.loadUrl = '/forum/ras/'
        break;
      case 'appeal':
        state.loadUrl = '/forum/appeal/'
        break;
    }
  },

  'NOTE_ORDERTYPE_CHANGE' (state, type) {
    state.orderType = type.code
    state.orderTypeStr = type.name
  },

  'NOTE_SET_PAGECOUNT' (state, count) {
    state.pageCount = count
  },

  'NOTE_SET_CURRENTPAGE' (state, count) {
    state.currentPage = count
  }

}

export default{
  state,
  mutations
}