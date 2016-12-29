import Vue from 'admin/common/vue-i18n'

export default {
  generateAppMenuItem: function(app) {
    return {
      name: app.name,
      path: `/admin/apps/${app.id}`,
      meta: {
        icon: 'fa-asterisk',
        expanded: false
      },
      children: [{
        name: Vue.t('admin.menu.appEdit'),
        path: `/admin/apps/edit/${app.id}`,
      }, {
        name: Vue.t('admin.menu.appGoods'),
        path: `/admin/apps/goods/${app.id}`,
      }, {
        name: Vue.t('admin.menu.appOrders'),
        path: `/admin/apps/orders/${app.id}`,
      }, {
        name: Vue.t('admin.menu.appStats'),
        path: `/admin/apps/stats/${app.id}`,
      }]
    }
  }
}