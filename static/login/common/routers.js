'use strict';

export default function (VueRouter) {
  return new VueRouter({
    routes: [{
      path: '/',
      name: 'login',
      component: require('../views/login.vue'),
      children: []
    }, {
      path: '/register',
      name: 'register',
      component: require('../views/register.vue')
    }, {
      path: '/retrievePassword',
      name: 'retrievePassword',
      component: require('../views/retrivePassword.vue')
    }]
  });
}