import Vue from 'vue'
import * as utils from 'common/utils'
import * as types from './mutation-types'

export const setNoteLoadType = ({
  commit
}, type) => {
  commit('NOTE_LOADTYPE_CHANGE', type)
}

export const setNoteOrderType = ({
  commit
}, type) => {
  commit('NOTE_ORDERTYPE_CHANGE', type)
}

export const setNotePageCount = ({
  commit
}, type) => {
  commit('NOTE_SET_PAGECOUNT', type)
}

export const setNoteCurrentPage = ({
  commit
}, type) => {
  commit('NOTE_SET_CURRENTPAGE', type)
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

export const setUserInfo = ({
  commit
}, user) => {
  commit('USER_SET_INFO', user)
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
