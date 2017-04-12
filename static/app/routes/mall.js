export default [{
  path: '/mall/:appId',
  name: 'mall',
  component: require('../views/mall/index.vue'),
  children: [{
    path: 'index',
    name: 'index',
    component: require('../views/mall/index.vue')
  }]
}, ]