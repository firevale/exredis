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
        level: '1,2,3,',
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
      meta: {
        must: 'restrict_login',
        icon: 'fa-flag',
        level: '1,2,',
        label: i18n.t('admin.menu.stats'),
        expanded: false,
      },

      children: [{
          name: 'StatsByDay',
          path: '/admin/app/:appId/statsByDay',
          meta: {
            icon: 'fa-sun-o',
            level: '1,2,',
            label: i18n.t('admin.menu.statsByDay'),
          },
        },
        {
          name: 'StatsRetained',
          path: '/admin/app/:appId/statsRetained',
          meta: {
            icon: 'fa-retweet',
            level: '1,2,',
            label: i18n.t('admin.menu.statsRetained'),
          },
        },
        {
          name: 'StatsDevice',
          path: '/admin/app/:appId/statsDevice',
          meta: {
            icon: 'fa-retweet',
            level: '1,2,',
            label: i18n.t('admin.menu.statsDevice'),
          },
        },
        {
          name: 'StatsTiming',
          path: '/admin/app/:appId/statsTiming',
          meta: {
            icon: 'fa-clock-o',
            level: '1,2,',
            label: i18n.t('admin.menu.statsTiming'),
          },
        },
      ]
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

      children: [{
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
        level: '1,2,3,',
        label: i18n.t('admin.menu.wechatPublic'),
        expanded: false,
      },

      children: [{
        name: 'WcpParams',
        path: '/admin/app/:appId/wcpParams',
        meta: {
          icon: 'fa-registered',
          level: '1,2,',
          label: i18n.t('admin.menu.wcpConfig'),
        },
      }, {
        name: 'WcpMenu',
        path: '/admin/app/:appId/wcpMenu',
        meta: {
          level: '1,2,3,',
          label: i18n.t('admin.menu.wcpMenu'),
        }
      }, {
        name: 'WcpRules',
        path: '/admin/app/:appId/wcpRules',
        meta: {
          level: '1,2,3,',
          label: i18n.t('admin.menu.wcpRules'),
        },
      }, {
        name: 'WcpMessages',
        path: '/admin/app/:appId/wcpMessages',
        meta: {
          level: '1,2,3,',
          label: i18n.t('admin.menu.wcpMessages'),
        },
      }, ]
    },
    {
      path: '/admin/app/:appId/orders',
      meta: {
        icon: 'fa-money',
        level: '1,2,3,',
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
      meta: {
        must: 'has_mall',
        icon: 'fa-shopping-bag',
        level: '1,2,',
        label: i18n.t('admin.menu.pointsMall'),
        expanded: false,
      },
      children: [{
        name: 'PointLog',
        path: '/admin/app/:appId/pointLog',
        meta: {
          level: '1,2,',
          label: i18n.t('admin.menu.pointLog'),
        }
      }, {
        name: 'PointGoods',
        path: '/admin/app/:appId/pointGoods',
        meta: {
          level: '1,2,',
          label: i18n.t('admin.menu.pointGoods'),
        },
      }, {
        name: 'PointOrder',
        path: '/admin/app/:appId/pointOrder',
        meta: {
          level: '1,2,',
          label: i18n.t('admin.menu.pointOrder'),
        },
      }, ]
    },
    {
      meta: {
        must: 'has_mall',
        icon: 'fa-tasks',
        level: '1,2,',
        label: i18n.t('admin.menu.pointTasks'),
        expanded: false,
      },
      children: [{
        name: 'PointSetting',
        path: '/admin/app/:appId/pointSetting',
        meta: {
          icon: 'fa-registered',
          level: '1,2,',
          label: i18n.t('admin.menu.pointSetting'),
        },
      }, {
        name: 'PointTaskbar',
        path: '/admin/app/:appId/pointTaskbar',
        meta: {
          level: '1,2,',
          label: i18n.t('admin.menu.pointTaskbar'),
        }
      }, {
        name: 'PointDaySign',
        path: '/admin/app/:appId/pointDaySign',
        meta: {
          level: '1,2,',
          label: i18n.t('admin.menu.pointDaySign'),
        },
      }, {
        name: 'PointDayQuestion',
        path: '/admin/app/:appId/pointDayQuestion',
        meta: {
          level: '1,2,',
          label: i18n.t('admin.menu.pointDayQuestion'),
        },
      }, {
        name: 'PointRoulette',
        path: '/admin/app/:appId/pointRoulette',
        meta: {
          level: '1,2,',
          label: i18n.t('admin.menu.pointRoulette'),
        },
      },]
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
      path: '/admin/app/:appId/setting',
      meta: {
        icon: 'fa-cog',
        level: '1,2,',
        label: i18n.t('admin.menu.settings'),
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