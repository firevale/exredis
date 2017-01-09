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
    name: 'Home',
    component: require('../views/Home'),

    children: [{
      name: 'Dashboard',
      path: 'dashboard',
      component: require('../views/dashboard')
    }, {
      name: 'AppManage',
      path: 'apps',
      component: require('../views/apps')
    }, {
      name: 'AppEdit',
      path: 'apps/edit/:appId',
      component: require('../views/apps/editApp')
    }, {
      name: 'Orders',
      path: 'orders',
      component: require('../views/Orders')
    }, {
      name: 'Forums',
      path: 'forums',
      component: require('../views/Forums')
    }, {
      name: 'Settings',
      path: 'settings',
      component: require('../views/Settings')
    }],
  }, {
    path: '*',
    redirect: '/admin/dashboard'
  }]
})