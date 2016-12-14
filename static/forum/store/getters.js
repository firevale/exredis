const notePageCount = state => state.noteSearch.pageCount

const noteCurrentPage = state => state.noteSearch.currentPage

const noteLoadType = state => state.noteSearch.loadType

const noteLoadUrl = state => state.noteSearch.loadUrl

const noteOrderType = state => state.noteSearch.orderType

const noteOrderTypeStr = state => state.noteSearch.orderTypeStr

export {
  notePageCount,
  noteCurrentPage,
  noteLoadType,
  noteLoadUrl,
  noteOrderType,
  noteOrderTypeStr
}