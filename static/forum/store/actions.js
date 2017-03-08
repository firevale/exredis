import Vue from 'vue'
import * as utils from 'common/utils'
import * as types from './mutationTypes'

export const setCurrentSection = ({
  commit
}, sectionId) => {
  commit(types.SET_CURRENT_SECTION, sectionId)
}

export const setPostsOrderByField = ({
  commit
}, fieldName) => {
  commit(types.SET_POSTS_ORDER_BY_FIELD, fieldName)
}

export const setSearchKey = ({
  commit
}, key) => {
  commit('SEARCH_KEY_CHANGE', key)
}

export const clearSearchHis = ({
  commit
}, key) => {
  commit('SEARCH_HIS_CLEAR', key)
}

export const setSearchHis = ({
  commit
}, key) => {
  commit('HISTORY_KEY_ADD', key)
}

export const setSearchPageCount = ({
  commit
}, count) => {
  commit('SEARCH_SET_PAGECOUNT', count)
}

export const setSearchCurrentPage = ({
  commit
}, page) => {
  commit('SEARCH_SET_CURRENTPAGE', page)
}

export const serUserProfile = ({
  commit
}, user) => {
  commit('SET_USER_PROFILE', user)
}

export const setCommonIssues = ({
  commit
}, issues) => {
  commit('COMMON_ISSUES_SET', issues)
}

export const updateForumInfo = ({
  commit
}, forum) => {
  commit(types.UPDATE_FORUM_INFO, forum)
}
