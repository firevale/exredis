export default [{
  path: '/mall/:appId',
  name: 'mall',
  component: require('../views/mall/main.vue'),
  children: [{
      path: 'index',
      name: 'mallIndex',
      component: require('../views/mall/index.vue')
    },
    {
      path: 'goods/:goodsId',
      name: 'goodsDetail',
      component: require('../views/mall/goodsDetail.vue')
    }
  ]
}]