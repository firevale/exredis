import * as types from '../mutation-types'

const state = {
  list: [],
  hash: [],
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

    let hash = state.hash
    hash[app.id] = app
    state.hash = hash
  }

}

export default {
  state,
  mutations
}