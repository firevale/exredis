import * as types from '../mutation-types'

const state = {
  list: [],
  hash: {},
  sdks: [],
  goods: {},
}

const mutations = {
  [types.UPDATE_APPS](state, apps) {
    state.list = apps
    let hash = {}
    for (let index in apps) {
      let app = apps[index]
      hash[app.id] = app
      if (typeof app.goods == 'object') {
        for (let j in app.goods) {
          let goods = app.goods[j]
          state.goods[`${app.id}-${goods.id}`] = goods
        }
      }
    }
    state.hash = hash
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
