'use strict';

export default function (VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/mall',
      name: 'mall',
      component: require('./views/main.vue'),
    }, {
      path: '/mall/mine',
      name: 'mine',
      component: require('./views/mine.vue'),
    }, {
      path: '*',
      redirect: '/'
    }]
  });
}