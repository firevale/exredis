'use strict';

export default function(VueRouter) {
  return new VueRouter({
    routes: [{
      path: '/main',
      name: 'main',
      component: require('../views/main.vue'),
      children: [{
        path: 'login',
        name: 'login',
        component: require('../views/login.vue'),
      }, {
        path: 'register',
        name: 'register',
        component: require('../views/register.vue')
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
        path: 'retrievePasswordStep4',
        name: 'retrievePasswordStep4',
        component: require('../views/retrievePasswordStep4.vue')
      }, {
        path: '*',
        redirect: 'login'
      }]
    },
    {
      path: '*',
      redirect: '/main/login'
    }]
  });
}