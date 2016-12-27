'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/login',
      component: require('../views/main.vue'),
      children: [{
        path: '',
        name: 'login',
        component: require('../views/login.vue'),
      }, {
        path: 'quickLogin',
        name: 'quickLogin',
        component: require('../views/quickLogin.vue'),
      }, {
        path: 'selectAccountType',
        name: 'selectAccountType',
        component: require('../views/selectAccountType.vue'),
      }, {
        path: 'registerStep1',
        name: 'registerStep1',
        component: require('../views/registerStep1.vue')
      }, {
        path: 'registerStep2',
        name: 'registerStep2',
        component: require('../views/registerStep2.vue')
      }, {
        path: 'registerStep3',
        name: 'registerStep3',
        component: require('../views/registerStep3.vue')
      }, {
        path: 'retrievePasswordStep1',
        name: 'retrievePasswordStep1',
        component: require('../views/retrievePasswordStep1.vue')
      }, {
        path: 'retrievePasswordStep2',
        name: 'retrievePasswordStep2',
        component: require('../views/retrievePasswordStep2.vue')
      }, {
        path: 'retrievePasswordStep3',
        name: 'retrievePasswordStep3',
        component: require('../views/retrievePasswordStep3.vue')
      }, {
        path: 'personalCenter',
        name: 'personalCenter',
        component: require('../views/personalCenter.vue')
      }, {
        path: 'personalPortrait',
        name: 'personalPortrait',
        component: require('../views/personalPortrait.vue')
      }]
    }, {
      path: '*',
      redirect: '/login/'
    }]
  });
}