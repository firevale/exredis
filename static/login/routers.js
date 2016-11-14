'use strict';

export default function (VueRouter) {
  return new VueRouter({
    routes: [{
      path: '/',
      name: 'login',
      component: require('./login.vue'),
      children: []
    }, {
      path: '/register',
      name: 'register',
      component: require('./register.vue')
    }, {
      path: '/retrive',
      name: 'retrive',
      component: require('./retrivePassword.vue')
    }]
  });
}