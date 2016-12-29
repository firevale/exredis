import Vue from 'vue'
import Router from 'vue-router'
import menuModule from '../store/modules/menu'

Vue.use(Router)

export default new Router({
  mode: 'history', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/admin',
    children: [{
      name: 'Home',
      path: 'dashboard',
      component: require('../views/dashboard')
    }, {
      name: 'AppList',
      path: 'apps',
      component: require('../views/apps')
    }, {
      name: 'AppInfo',
      path: 'apps/:appId',
      component: require('../views/apps/info')
    }, {
      name: 'AppEdit',
      path: 'apps/edit/:appId',
      component: require('../views/apps/edit')
    }, {
      name: 'AppGoods',
      path: 'apps/goods/:appId',
      component: require('../views/apps/goods')
    }, {
      name: 'AppOrders',
      path: 'apps/orders/:appId',
      component: require('../views/apps/orders')
    }, {
      name: 'AppStats',
      path: 'apps/stats/:appId',
      component: require('../views/apps/stats')
    }, {
      name: 'Users',
      path: 'users',
      component: require('../views/Users')
    }, {
      name: 'Settings',
      path: 'settings',
      component: require('../views/Settings')
    }],
  }, {
    path: '*',
    redirect: '/admin/'
  }]
})