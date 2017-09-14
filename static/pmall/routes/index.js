export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/pmall/:appId',
      name: 'pmall',
      component: require('../views/main.vue'),
      children: [{
        path: 'index',
        name: 'index',
        component: require('../views/index.vue')
      }]
    }, {
      path: '/pmall/:appId/error',
      name: 'error',
      component: require('../views/error.vue')
    }, ]
  })
}