import Vue from 'vue'

const transitionName = state => state.app.transitionName
const currentSectionId = state => state.forum.currentSectionId
const postsOrderByField = state => state.forum.postsOrderByField
const searchKeyword = state => state.search.searchKeyword
const searchKeywordHistory = state => state.search.historyKeywords
const searchPageCount = state => state.search.pageCount
const searchCurrentPage = state => state.search.currentPage
const userInfo = state => state.user
const commonIssues = state => state.commonIssues.issues
const forumInfo = state => state.forum.info

export {
  transitionName,
  currentSectionId,
  postsOrderByField,
  searchKeyword,
  searchKeywordHistory,
  searchPageCount,
  searchCurrentPage,
  userInfo,
  commonIssues,
  forumInfo,
}
