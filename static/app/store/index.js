import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import forum from './modules/forum'
import commonIssues from './modules/commonIssue'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  actions,
  getters,
  modules: {
    app,
    search,
    user,
    commonIssues,
    forum
  },
  mutations: {
  }
})

export default store
