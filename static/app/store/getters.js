import Vue from 'vue'

const transitionName = state => state.app.transitionName
const currentSectionId = state => state.forum.currentSectionId
const postsOrderByField = state => state.forum.postsOrderByField
const searchKeywordHistory = state => state.search.historyKeywords
const userInfo = state => state.user
const commonIssues = state => state.commonIssues.issues
const forumInfo = state => state.forum.info
const currentPostTitle = state => state.forum.currentPostTitle
const editingPostData = state => state.forum.editingPostData
const shoppingCart = state => state.mall.shoppingCart
const selectedAddress = state => state.mall.selectedAddress

export {
  transitionName,
  currentSectionId,
  postsOrderByField,
  searchKeywordHistory,
  userInfo,
  commonIssues,
  forumInfo,
  currentPostTitle,
  editingPostData,
  shoppingCart,
  selectedAddress,
}
