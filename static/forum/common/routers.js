'use strict';

export default function (VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/forum',
      name: 'forum',
      component: require('../views/main.vue'),
      children: [{
        path: '',
        name: '',
        component: require('../views/main.vue'),
      }]
    }, {
      path: '*',
      redirect: '/'
    }]
  });
}