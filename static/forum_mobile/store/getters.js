import Vue from 'vue'

const transitionName = state => state.app.transitionName
const currentSectionId = state => state.forum.currentSectionId
const postsOrderByField = state => state.forum.postsOrderByField
const searchKeywordHistory = state => state.search.historyKeywords
const userInfo = state => state.user
const forumInfo = state => state.forum.info
const currentPostTitle = state => state.forum.currentPostTitle
const editingPostData = state => state.forum.editingPostData

export {
  transitionName,
  currentSectionId,
  postsOrderByField,
  searchKeywordHistory,
  userInfo,
  forumInfo,
  currentPostTitle,
  editingPostData,
}