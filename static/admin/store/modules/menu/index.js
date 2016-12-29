import Vue from 'admin/common/vue-i18n'

import * as types from '../../mutation-types'
import x from './apps.js'

console.log(x)

const state = {
  items: [
    {
      name: Vue.t('admin.menu.dashboard'),
      path: '/admin/dashboard',
      meta: {
        icon: 'fa-tachometer'
      },
    },
    {
      name: Vue.t('admin.menu.appManage'),
      path: '/admin/apps',
      meta: {
        icon: 'fa-bars',
      },
    },
    {
      name: Vue.t('admin.menu.userManage'),
      path: '/admin/users',
      meta: {
        icon: 'fa-user-circle'
      },
    },
    {
      name: Vue.t('admin.menu.settings'),
      path: '/admin/settings',
      meta: {
        icon: 'fa-cog'
      },
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
  },

  [types.UPDATE_APPS] (state, apps) {
    apps.forEach(app => {
      state.items.push(x.generateAppMenuItem(app))  
    })
  },
}

export default {
  state,
  mutations
}
