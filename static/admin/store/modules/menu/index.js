import { i18n } from 'admin/vue-i18n'

import * as types from '../../mutation-types'

const state = {
  indexItems: [{
      name: i18n.t('admin.menu.appList'),
      path: '/admin/index',
      meta: {
        icon: 'fa-bars',
      },
    },
    {
      name: i18n.t('admin.menu.settings'),
      path: '/admin/settings',
      meta: {
        icon: 'fa-cog'
      },
    }
  ],

  items: [{
      name: i18n.t('admin.menu.dashboard'),
      path: '/admin/app/:appId/dashboard',
      meta: {
        icon: 'fa-tachometer'
      },
    },
    {
      name: i18n.t('admin.menu.appConfig'),
      path: '/admin/app/:appId/config',
      meta: {
        icon: 'fa-bars',
      },
    },
    {
      name: i18n.t('admin.menu.userManage'),
      path: '/admin/app/:appId/users',
      meta: {
        icon: 'fa-user-circle'
      },
    },
    {
      name: i18n.t('admin.menu.orderManage'),
      path: '/admin/app/:appId/orders',
      meta: {
        icon: 'fa-user-circle'
      },
    },
    {
      name: i18n.t('admin.menu.forumManage'),
      path: '/admin/app/:appId/editforum',
      meta: {
        icon: 'fa-user-circle'
      },
    },
    {
      name: i18n.t('admin.menu.appMalls'),
      path: '/admin/app/:appId/editmall',
      meta: {
        icon: 'fa-shopping-bag'
      },
    },
    {
      name: i18n.t('admin.menu.activityInfo'),
      path: '/admin/app/:appId/activity',
      meta: {
        icon: 'fa-joomla'
      },
    },
    {
      name: i18n.t('admin.menu.noticeInfo'),
      path: '/admin/app/:appId/notice',
      meta: {
        icon: 'fa-bullhorn'
      },
    },
    {
      name: i18n.t('admin.menu.newsInfo'),
      path: '/admin/app/:appId/news',
      meta: {
        icon: 'fa-newspaper-o'
      },
    },
    {
      name: i18n.t('admin.menu.customerService'),
      path: '/admin/app/:appId/customerservice',
      meta: {
        icon: 'fa-comments'
      },
    },
  ]
}

const mutations = {
  [types.EXPAND_MENU](state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  },
}

export default {
  state,
  mutations
}