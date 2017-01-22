const notePageCount = state => state.main.pageCount

const noteCurrentPage = state => state.main.currentPage

const noteLoadType = state => state.main.loadType

const noteLoadUrl = state => state.main.loadUrl

const noteOrderType = state => state.main.orderType

const noteOrderTypeStr = state => state.main.orderTypeStr

const searchKey = state => state.search.searchKey

const searchKeyHis = state => state.search.hisKeys

const searchPageCount = state => state.search.pageCount

const searchCurrentPage = state => state.search.currentPage

const userInfo = state => state.user

export {
  notePageCount,
  noteCurrentPage,
  noteLoadType,
  noteLoadUrl,
  noteOrderType,
  noteOrderTypeStr,
  searchKey,
  searchKeyHis,
  searchPageCount,
  searchCurrentPage,
  userInfo,
}