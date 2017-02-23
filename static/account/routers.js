'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/account',
      component: require('./views/main.vue'),
      children: [{
        path: 'profile',
        name: 'profile',
        component: require('./views/profile.vue'),
      }, {
        path: 'avatar',
        name: 'avatar',
        component: require('./views/avatar.vue'),
      }]
    }]
  });
}
