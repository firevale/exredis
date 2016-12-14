import Vue from 'vue'
import utils from '../common/utils'

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

