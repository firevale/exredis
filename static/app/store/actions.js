import Vue from 'vue'
import * as utils from 'common/js/utils'
import * as types from './mutationTypes'

export const setCurrentSectionId = ({
  commit
}, sectionId) => {
  commit(types.SET_CURRENT_SECTION_ID, sectionId)
}

export const setCurrentPostTitle = ({
  commit
}, title) => {
  commit(types.SET_CURRENT_POST_TITLE, title)
}

export const setPostsOrderByField = ({
  commit
}, fieldName) => {
  commit(types.SET_POSTS_ORDER_BY_FIELD, fieldName)
}

export const addSearchHistory = ({
  commit
}, key) => {
  commit(types.ADD_SEARCH_HISTORY, key)
}

export const clearSearchHistory = ({
  commit
}, key) => {
  commit(types.CLEAR_SEARCH_HISTORY, key)
}

export const setUserProfile = ({
  commit
}, user) => {
  commit(types.SET_USER_PROFILE, user)
}

export const updateUserPostCount = ({
  commit
}, postCount) => {
  commit(types.UPDATE_USER_POST_COUNT, postCount)
}

export const decrUserPostCount = ({
  commit
}) => {
  commit(types.DECR_USER_POST_COUNT)
}

export const setCommonIssues = ({
  commit
}, issues) => {
  commit(types.SET_COMMON_ISSUES, issues)
}

export const updateForumInfo = ({
  commit
}, forum) => {
  commit(types.UPDATE_FORUM_INFO, forum)
}
