export default [{
  path: '/mall/:appId/index',
  name: 'mallIndex',
  component: require('../views/mall/index.vue')
}, {
  path: '/mall/:goodId/detail',
  name: 'goodDetail',
  component: require('../views/mall/goodDetail.vue')
}]