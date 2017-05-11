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
    path: '/admin/index',
    name: 'Index',
    component: require('../views/Index'),
  }, {
    path: '/admin/Settings',
    name: 'settings',
    component: require('../views/Settings')
  }, {
    path: '/admin/NewApp',
    name: 'NewApp',
    component: require('../views/apps/newApp')
  }, {
    path: '/admin/:appId/',
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
        name: 'EditApp',
        path: 'edit',
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
        path: 'forums/:forumId/edit',
        component: require('../views/forums/editForum')
      }, {
        name: 'EditNews',
        path: 'news/edit',
        component: require('../views/news/editNews')
      },{
        name: 'Malls',
        path: 'malls',
        component: require('../views/malls/malls')
      },{
        name: 'EditMall',
        path: 'malls/edit',
        component: require('../views/malls/editMall')
      }, {
        name: 'EditGoods',
        path: 'malls/editGoods',
        component: require('../views/malls/editGoods')
      },
      {
        name: 'MallOrderInfo',
        path: 'malls/order/:orderId',
        component: require('../views/malls/orderInfo')
      }
    ],
  }, {
    path: '*',
    redirect: '/admin/index'
  }]
})