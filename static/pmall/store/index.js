import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  actions,
  getters,
  modules: {
    app,
    user,
  },
  mutations: {
  }
})

export default store
