import * as types from '../mutation-types'

const state = {
  list: [],
}

const mutations = {

  [types.UPDATE_MALLS](state, malls) {
    state.list = malls
  },

  [types.ADD_MALL](state, mall) {
    state.list.push(mall)
  }

}

export default {
  state,
  mutations
}
