import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import noteSearch from './modules/noteSearch'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,  
  actions,
  getters,
  modules: {
    app,
    noteSearch,
  },
  mutations: {
  }
})

export default store
