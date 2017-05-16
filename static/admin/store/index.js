import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import main from './modules/main'
import apps from './modules/apps'
import menu from './modules/menu'
import mall from './modules/mall'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,  // process.env.NODE_ENV !== 'development',
  actions,
  getters,
  modules: {
    main,
    menu,
    apps,
    mall
  },
  state: {
  },
  mutations: {
  }
})

export default store
