export default [{
  path: '/mall/:appId/index',
  name: 'mallIndex',
  component: require('../views/mall/index.vue')
}, {
  path: '/goods/:goodsId/detail',
  name: 'goodsDetail',
  component: require('../views/mall/goodsDetail.vue')
}]