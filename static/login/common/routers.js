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
        path: 'retrievePassword',
        name: 'retrievePassword',
        component: require('../views/retrievePassword.vue')
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