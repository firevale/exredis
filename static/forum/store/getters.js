import Vue from 'vue'

const postListType = state => state.forum.postListType
const noteOrderType = state => state.forum.postOrderType
const noteOrderTypeStr = state => state.forum.orderTypeStr
const searchKey = state => state.search.searchKey
const searchKeyHis = state => state.search.hisKeys
const searchPageCount = state => state.search.pageCount
const searchCurrentPage = state => state.search.currentPage
const userInfo = state => state.user
const commonIssues = state => state.commonIssues.issues
const forumInfo = state => state.forum.info

export {
  postListType,
  noteOrderType,
  noteOrderTypeStr,
  searchKey,
  searchKeyHis,
  searchPageCount,
  searchCurrentPage,
  userInfo,
  commonIssues,
  forumInfo,
}
