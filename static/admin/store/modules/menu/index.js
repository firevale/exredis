import { i18n } from 'admin/vue-i18n'

import * as types from '../../mutation-types'

const state = {
  indexItems: [{
      path: '/admin/index',
      meta: {
        icon: 'fa-bars',
        level: '1,2,3,',
        label: i18n.t('admin.menu.appList'),
      },
    },
    {
      path: '/admin/settings',
      meta: {
        icon: 'fa-cog',
        level: '1,',
        label: i18n.t('admin.menu.settings'),
      },
    }
  ],
  items: [{
      path: '/admin/app/:appId/dashboard',
      meta: {
        icon: 'fa-tachometer',
        level: '1,2,',
        label: i18n.t('admin.menu.dashboard'),
      },
    },
    {
      path: '/admin/app/:appId/config/',
      meta: {
        icon: 'fa-bars',
        level: '1,2,',
        label: i18n.t('admin.menu.appConfig'),
      },
    },
    {
      path: '/admin/app/:appId/users',
      meta: {
        icon: 'fa-user',
        level: '1,2,3,',
        label: i18n.t('admin.menu.userManage'),
      },
    },
    {
      meta: {
        must: 'restrict_login',
        icon: 'fa-registered',
        level: '1,2,',
        label: i18n.t('admin.menu.loginCode'),
        expanded: false,
      },

      children: [
        {
          name: 'LoginCodes',
          path: '/admin/app/:appId/loginCodes',
          meta: {
            icon: 'fa-registered',
            level: '1,2,',
            label: i18n.t('admin.menu.loginCodeManage'),
          },          
        },
        {
          name: 'MyLoginCodes',
          path: '/admin/app/:appId/myLoginCodes',
          meta: {
            icon: 'fa-registered',
            level: '1,2,',
            label: i18n.t('admin.menu.myLoginCodes'),
          },          
        },
      ]
    },
    {
      meta: {
        must: 'restrict_login',
        icon: 'fa-wechat',
        level: '1,2,',
        label: i18n.t('admin.menu.wechatPublic'),
        expanded: false,
      },

      children: [
        {
          name: 'WcpRules',
          path: '/admin/app/:appId/wcpRules',
          meta: {
            level: '1,2,',
            label: i18n.t('admin.menu.wcpRules'),
          },          
        }, {
          name: 'WcpMenu',
          path: '/admin/app/:appId/wcpMenu',
          meta: {
            level: '1,2,',
            label: i18n.t('admin.menu.wcpMenu'),
          }
        }, {
          name: 'WcpMessages',
          path: '/admin/app/:appId/wcpMessages',
          meta: {
            level: '1,2,',
            label: i18n.t('admin.menu.wcpMessages'),
          },          
        },{
          name: 'WcpParams',
          path: '/admin/app/:appId/wcpParams',
          meta: {
            icon: 'fa-registered',
            level: '1,2,',
            label: i18n.t('admin.menu.wcpConfig'),
          },          
        },
      ]
    },
    {
      path: '/admin/app/:appId/orders',
      meta: {
        icon: 'fa-star',
        level: '1,2,',
        label: i18n.t('admin.menu.orderManage'),
      },
    },
    {
      path: '/admin/app/:appId/editforum',
      meta: {
        must: 'has_forum',
        icon: 'fa-twitch',
        level: '1,2,',
        label: i18n.t('admin.menu.forumManage'),
      },
    },
    {
      path: '/admin/app/:appId/editmall',
      meta: {
        must: 'has_mall',
        icon: 'fa-shopping-bag',
        level: '1,2,',
        label: i18n.t('admin.menu.appMalls'),
      },
    },
    {
      path: '/admin/app/:appId/activity',
      meta: {
        icon: 'fa-joomla',
        level: '1,2,',
        label: i18n.t('admin.menu.activityInfo'),
      },
    },
    {
      path: '/admin/app/:appId/notice',
      meta: {
        icon: 'fa-bullhorn',
        level: '1,2,',
        label: i18n.t('admin.menu.noticeInfo'),
      },
    },
    {
      path: '/admin/app/:appId/news',
      meta: {
        icon: 'fa-newspaper-o',
        level: '1,2,',
        label: i18n.t('admin.menu.newsInfo'),
      },
    },
    {
      path: '/admin/app/:appId/faq/',
      meta: {
        icon: 'fa-comments',
        level: '1,2,3,',
        label: i18n.t('admin.menu.customerService'),
      },
    },
    {
      path: '/admin/app/:appId/adminusers',
      meta: {
        icon: 'fa-user-circle',
        level: '1,2,',
        label: i18n.t('admin.menu.adminUserManage'),
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