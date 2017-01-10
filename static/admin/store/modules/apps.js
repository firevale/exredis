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
  },

  [types.ADD_APP](state, app) {
    state.list.push(app)
    state[app.id] = app
  }

}

export default {
  state,
  mutations
}