import * as types from '../mutation-types'

const state = {
  list: [],
  sdks: [],
}

const mutations = {
  [types.UPDATE_APPS](state, apps) {
    state.list = apps
    for (let index in apps) {
      let app = apps[index]
      state[app.id] = app
    }
  },

  [types.UPDATE_SDKS](state, sdks) {
    state.sdks = sdks 
  }
}

export default {
  state,
  mutations
}