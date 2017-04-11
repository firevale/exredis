import * as types from '../mutation-types'

const state = {
  list: [],
  hash: {},
}

const mutations = {

  [types.UPDATE_MALLS](state, malls) {
    state.list = malls
    let hash = {}
    for (let index in malls) {
      let mall = malls[index]
      hash[mall.app_id] = mall
    }
    state.hash = hash
  },

  [types.ADD_MALL](state, mall) {
    state.list.push(mall)
    state.hash[mall.app_id] = mall
  }

}

export default {
  state,
  mutations
}