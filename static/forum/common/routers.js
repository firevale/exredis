'use strict';

export default function (VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/forum',
      name: 'forum',
      component: require('../views/main.vue'),
    }, {
      path: '/forum/search',
      name: 'forum',
      component: require('../views/search.vue'),
    }, {
      path: '*',
      redirect: '/'
    }]
  });
}