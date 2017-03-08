import Vue from 'vue'

const notePageCount = state => state.forum.pageCount
const noteCurrentPage = state => state.forum.currentPage
const noteLoadType = state => state.forum.loadType
const noteLoadUrl = state => state.forum.loadUrl
const noteOrderType = state => state.forum.orderType
const noteOrderTypeStr = state => state.forum.orderTypeStr
const searchKey = state => state.search.searchKey
const searchKeyHis = state => state.search.hisKeys
const searchPageCount = state => state.search.pageCount
const searchCurrentPage = state => state.search.currentPage
const userInfo = state => state.user
const commonIssues = state => state.commonIssues.issues
const forumInfo = state => state.forum.info

export {
  notePageCount,
  noteCurrentPage,
  noteLoadType,
  noteLoadUrl,
  noteOrderType,
  noteOrderTypeStr,
  searchKey,
  searchKeyHis,
  searchPageCount,
  searchCurrentPage,
  userInfo,
  commonIssues,
  forumInfo
}
