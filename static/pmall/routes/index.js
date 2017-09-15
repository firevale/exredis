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
        }, {
          path: 'pmall',
          name: 'pmall',
          component: require('../views/pmall.vue')
        },
        {
          path: 'detail',
          name: 'detail',
          component: require('../views/detail.vue')
        }, {
          path: 'draw',
          name: 'draw',
          component: require('../views/draw.vue')
        },
        {
          path: 'my_conversion',
          name: 'my_conversion',
          component: require('../views/myConversion.vue')
        },
        {
          path: 'new_address',
          name: 'new_address',
          component: require('../views/newAddress.vue')
        }, {
          path: 'sign',
          name: 'sign',
          component: require('../views/index.vue')
        }, {
          path: 'knowledge',
          name: 'knowledge',
          component: require('../views/knowLedge.vue')
        }, {
          path: 'my_point',
          name: 'my_point',
          component: require('../views/myPoint.vue')
        }, {
          path: 'bind_mobile',
          name: 'bind_mobile',
          component: require('../views/bindMobile.vue')
        }
      ]
    }, {
      path: '/pmall/:appId/error',
      name: 'error',
      component: require('../views/error.vue')
    }, ]
  })
}