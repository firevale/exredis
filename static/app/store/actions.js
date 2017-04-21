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

export const updateUserMobile = ({
  commit
}, mobile) => {
  commit(types.UPDATE_USER_MOBILE, mobile)
}

export const updateUserEmail = ({
  commit
}, email) => {
  commit(types.UPDATE_USER_EMAIL, email)
}

export const updateUserNickname = ({
  commit
}, nickname) => {
  commit(types.UPDATE_USER_NICKNAME, nickname)
}

export const updateUserAvatar = ({
  commit
}, avatar_url) => {
  commit(types.UPDATE_USER_AVATAR, avatar_url)
}

export const updateUserResidentInfo = ({
  commit
}, residentInfo) => {
  commit(types.UPDATE_USER_RESIDENT_INFO, residentInfo)
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
