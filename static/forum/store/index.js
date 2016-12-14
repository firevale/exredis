import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import main from './modules/main'
import search from './modules/search'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,  
  actions,
  getters,
  modules: {
    app,
    main,
    search,
  },
  mutations: {
  }
})

export default store
