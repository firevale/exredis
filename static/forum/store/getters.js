import Vue from 'vue'

const postListType = state => state.forum.postListType
const postOrderType = state => state.forum.postOrderType
const searchKey = state => state.search.searchKey
const searchKeyHis = state => state.search.hisKeys
const searchPageCount = state => state.search.pageCount
const searchCurrentPage = state => state.search.currentPage
const userInfo = state => state.user
const commonIssues = state => state.commonIssues.issues
const forumInfo = state => state.forum.info

export {
  postListType,
  postOrderType,
  searchKey,
  searchKeyHis,
  searchPageCount,
  searchCurrentPage,
  userInfo,
  commonIssues,
  forumInfo,
}
