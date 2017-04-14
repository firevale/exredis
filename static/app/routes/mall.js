export default [{
  path: '/mall/:appId',
  name: 'mall',
  component: require('../views/mall/main.vue'),
  children: [{
      path: 'index',
      name: 'goodsIndex',
      component: require('../views/mall/goodsList.vue')
    },
    {
      path: 'goods/:goodsId',
      name: 'goodsDetail',
      component: require('../views/mall/goodsDetail.vue')
    }
  ]
}]