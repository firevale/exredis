import Vue from 'vue'

const transitionName = state => state.app.transitionName
const currentSection = state => state.forum.currentSection
const postsOrderByField = state => state.forum.postsOrderByField
const searchKey = state => state.search.searchKey
const searchKeyHis = state => state.search.hisKeys
const searchPageCount = state => state.search.pageCount
const searchCurrentPage = state => state.search.currentPage
const userInfo = state => state.user
const commonIssues = state => state.commonIssues.issues
const forumInfo = state => state.forum.info

export {
  transitionName,
  currentSection,
  postsOrderByField,
  searchKey,
  searchKeyHis,
  searchPageCount,
  searchCurrentPage,
  userInfo,
  commonIssues,
  forumInfo,
}
