import {i18n} from 'admin/vue-i18n'

export default {
  generateAppMenuItem: function(app) {
    return {
      name: app.name,
      path: `/admin/apps/${app.id}`,
      meta: {
        icon: 'fa-globe',
        expanded: false
      },
      children: [{
        name: i18n.t('admin.menu.appEdit'),
        path: `/admin/apps/edit/${app.id}`,
      }, {
        name: i18n.t('admin.menu.appGoods'),
        path: `/admin/apps/goods/${app.id}`,
      }, {
        name: i18n.t('admin.menu.appOrders'),
        path: `/admin/apps/orders/${app.id}`,
      }, {
        name: i18n.t('admin.menu.appStats'),
        path: `/admin/apps/stats/${app.id}`,
      }]
    }
  }
}