export default [{
  path: '/payment',
  component: require('../views/payment/main.vue'),
  children: [{
    path: 'pay_proxy',
    name: 'payProxy',
    component: require('../views/payment/selectPaymentChannel.vue')
  }, ]
}, ]