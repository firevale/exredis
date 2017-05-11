import * as types from '../mutation-types'

const state = {
  list: [],
  hash: {},
  forums: {},
  sections: {},
}

const mutations = {

  [types.UPDATE_FORUMS](state, forums) {
    state.list = forums
    let hash = {}
    for (let index in forums) {
      let forum = forums[index]
      hash[forum.app_id] = forum
      if (typeof forum.sections == 'object') {
        for (let j in forum.sections) {
          let section = forum.sections[j]
          state.sections[`${forum.id}-${section.id}`] = section
        }
      }
    }
    state.hash = hash
  },

  [types.ADD_FORUM](state, forum) {
    state.list.push(forum)
    state.hash[forum.app_id] = forum
  }

}

export default {
  state,
  mutations
}
