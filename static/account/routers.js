'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/account',
      component: require('./views/main.vue'),
      children: [{
        path: 'my_profile',
        name: 'myProfile',
        component: require('./views/myProfile.vue'),
      }, {
        path: 'my_avatar',
        name: 'myAvatar',
        component: require('./views/myAvatar.vue'),
      }]
    }, {
      path: '*',
      redirect: '/account/my_profile'
    }]
  });
}