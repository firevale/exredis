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
      path: '/retrive',
      name: 'retrive',
      component: require('../views/retrivePassword.vue')
    }]
  });
}