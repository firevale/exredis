import * as types from '../mutation-types'

const state = {
  list: null,
}

const mutations = {
  [types.UPDATE_APPS](state, apps) {
    state.list = apps
    for (let index in apps) {
      let app = apps[index]
      state[app.id] = app
    }
  }
}

export default {
  state,
  mutations
}