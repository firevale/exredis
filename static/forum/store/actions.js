import Vue from 'vue'
import * as utils from 'common/utils'
import * as types from './mutationTypes'

export const setCurrentSection = ({
  commit
}, type) => {
  commit(types.SET_CURRENT_SECTION, type)
}

export const setPostsOrderByField = ({
  commit
}, type) => {
  commit(types.SET_POSTS_ORDER_BY_FIELD, type)
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

export const updateForum = ({
  commit
}, forum) => {
  commit(types.UPDATE_FORUM, forum)
}
