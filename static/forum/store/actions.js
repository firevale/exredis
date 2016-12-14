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

