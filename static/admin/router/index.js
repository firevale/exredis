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
      name: 'NewApp',
      path: 'apps/new',
      component: require('../views/apps/newApp')
    }, {
      name: 'EditApp',
      path: 'apps/edit/:appId',
      component: require('../views/apps/editApp')
    }, {
      name: 'Users',
      path: 'users',
      component: require('../views/Users')
    }, {
      name: 'Orders',
      path: 'orders',
      component: require('../views/Orders')
    }, {
      name: 'Forums',
      path: 'forums',
      component: require('../views/forums/forums')
    }, {
      name: 'EditForum',
      path: 'forums/edit/:forumId',
      component: require('../views/forums/editForum')
    }, {
      name: 'EditNews',
      path: 'apps/news/edit',
      component: require('../views/news/editNews')
    },
    {
      name: 'Malls',
      path: 'malls',
      component: require('../views/malls/malls')
    },
    {
      name: 'EditMall',
      path: 'malls/edit/:mallId',
      component: require('../views/malls/editMall')
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