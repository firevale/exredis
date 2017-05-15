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
    component: require('../views/main'),
    children: [{
      path: 'index',
      name: 'Index',
      component: require('../views/Index'),
    }, {
      name: 'Users',
      path: 'users',
      component: require('../views/app/users')
    }, {
      path: 'settings',
      name: 'Settings',
      component: require('../views/Settings')
    }, {
      path: 'new_app',
      name: 'NewApp',
      component: require('../views/newApp')
    }, {
      path: 'app/:appId([a-zA-Z0-9]+)/',
      component: require('../views/app/main'),
      children: [{
        path: 'dashboard',
        name: 'AppDashboard',
        component: require('../views/app/dashboard')
      }, {
        name: 'AppConfig',
        path: 'config',
        component: require('../views/app/config/main')
      }, {
        name: 'Orders',
        path: 'orders',
        component: require('../views/app/orders')
      }, {
        name: 'EditForum',
        path: 'editforum',
        component: require('../views/app/forum/edit')
      }, {
        name: 'EditNews',
        path: 'news/edit',
        component: require('../views/app/games/editNews')
      }, {
        name: 'EditMall',
        path: 'editmall',
        component: require('../views/app/mall/editMall')
      }, {
        name: 'EditGoods',
        path: 'mall/edit_goods',
        component: require('../views/app/mall/editGoods')
      }, {
        name: 'MallOrderInfo',
        path: 'malls/order/:orderId',
        component: require('../views/app/mall/orderInfo')
      }, {
        name: 'Activity',
        path: 'activity',
        component: require('../views/app/games/activityInfoEditor')
      }, {
        name: 'Notice',
        path: 'notice',
        component: require('../views/app/games/noticeInfoEditor')
      }, {
        name: 'News',
        path: 'news',
        component: require('../views/app/games/newsInfoEditor')
      }, {
        name: 'Faq',
        path: 'faq',
        component: require('../views/app/faq/questionEditor')
      }, ],
    }, {
      path: '*',
      redirect: 'index'
    }]
  }]
})