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
      path: 'order',
      name: 'mallOrder',
      component: require('../views/mall/order.vue')
    },
    {
      path: 'mine',
      name: 'mine',
      component: require('../views/mall/mine.vue')
    },
    {
      path: 'mine/myOrders',
      name: 'myOrders',
      component: require('../views/mall/myOrders.vue')
    },
    {
      path: 'mine/orderDetail/:orderId',
      name: 'myOrderDetail',
      component: require('../views/mall/orderDetail.vue')
    },
    {
      path: 'mine/myAddresses',
      name: 'myAddresses',
      component: require('../views/mall/myAddresses.vue')
    }, {
      path: 'goods/:goodsId',
      name: 'goodsDetail',
      component: require('../views/mall/goodsDetail.vue')
    }, {
      path: 'address/new',
      name: 'newAddress',
      component: require('../views/mall/newAddress.vue')
    }, {
      path: 'address/edit/:addressId',
      name: 'editAddress',
      component: require('../views/mall/editAddress.vue')
    }
  ]
}]