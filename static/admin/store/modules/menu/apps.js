import Vue from 'admin/common/vue-i18n'

export default {
  generateAppMenuItem: function(app) {
    return {
      name: app.name,
      path: '/admin/apps',
      meta: {
        icon: 'fa-bar-chart-o',
        expanded: false
      },
      component: require('admin/views/app/index'),
      children: [{
        name: Vue.t('admin.menu.appInfo'),
        path: `/admin/apps/${app.id}`,
        component: require('admin/views/app/info')
      }, {
        name: Vue.t('admin.menu.appEdit'),
        path: `/admin/apps/edit/${app.id}`,
        component: require('admin/views/app/edit')
      }, {
        name: Vue.t('admin.menu.appGoods'),
        path: `/admin/apps/goods/${app.id}`,
        component: require('admin/views/app/goods')
      }, {
        name: Vue.t('admin.menu.appOrders'),
        path: `/admin/apps/orders/${app.id}`,
        component: require('admin/views/app/orders')
      }, {
        name: Vue.t('admin.menu.appStats'),
        path: `/admin/apps/stats/${app.id}`,
        component: require('admin/views/app/stats')
      }]
    }
  }
}