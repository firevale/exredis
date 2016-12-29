import Vue from 'admin/common/vue-i18n'

import * as types from '../../mutation-types'
import apps from './apps'

const state = {
  items: [
    {
      name: Vue.t('admin.menu.dashboard'),
      path: '/admin/dashboard',
      meta: {
        icon: 'fa-tachometer'
      },
      component: require('../../../views/dashboard/index.vue')
    },
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
