import * as types from '../mutation-types'

const state = {
  list: [],
  hash: {},
  sdks: [],
}

const mutations = {
  [types.UPDATE_APPS](state, apps) {
    state.list = apps
    for (let index in apps) {
      let app = apps[index]
      state.hash[app.id] = app
    }
  },

  [types.UPDATE_SDKS](state, sdks) {
    state.sdks = sdks 
  },

  [types.ADD_APP](state, app) {
    state.list.push(app)
    state.hash[app.id] = app
  }

}

export default {
  state,
  mutations
}