'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/login',
      name: 'login_main',
      component: require('../views/main.vue'),
      children: [{
        path: '',
        name: 'login',
        component: require('../views/login.vue'),
      },{
        path: 'quickLogin',
        name: 'quickLogin',
        component: require('../views/quickLogin.vue'),
      }, {
        path: 'othersLogin',
        name: 'othersLogin',
        component: require('../views/othersLogin.vue'),
      }, {
        path: 'registerStep1',
        name: 'registerStep1',
        component: require('../views/registerStep1.vue')
      },{
        path: 'registerStep2/:accountId',
        name: 'registerStep2',
        component: require('../views/registerStep2.vue')
      },
      {
        path: 'registerStep3/:accountId/:verifyCode',
        name: 'registerStep3',
        component: require('../views/registerStep3.vue')
      }, {
        path: 'retrievePasswordStep1',
        name: 'retrievePasswordStep1',
        component: require('../views/retrievePasswordStep1.vue')
      }, {
        path: 'retrievePasswordStep2/:accountId',
        name: 'retrievePasswordStep2',
        component: require('../views/retrievePasswordStep2.vue')
      }, {
        path: 'retrievePasswordStep3/:accountId/:verifyCode',
        name: 'retrievePasswordStep3',
        component: require('../views/retrievePasswordStep3.vue')
      }, {
        path: '*',
        redirect: 'login'
      }]
    },
    {
      path: '*',
      redirect: '/login/'
    }]
  });
}