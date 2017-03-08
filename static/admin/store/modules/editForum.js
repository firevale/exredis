import * as types from '../mutation-types'

const state = {
  list: [],
  hash: {},
  forums: {},
}

const mutations = {

  [types.UPDATE_FORUMS](state, forums) {
    state.list = forums
    let hash = {}
    for (let index in forums) {
      let forum = forums[index]
      hash[forum.id] = forum
    }
    state.hash = hash
  },

  [types.ADD_FORUM](state, forum) {
    state.list.push(forum)
    state.hash[forum.id] = forum
  }

}

export default {
  state,
  mutations
}
