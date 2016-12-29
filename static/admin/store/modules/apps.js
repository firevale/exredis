import * as types from '../mutation-types'

const state = {
}

const mutations = {
  [types.UPDATE_APPS] (state, apps) {
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
