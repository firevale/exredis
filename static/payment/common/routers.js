'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/payment',
      component: require('../views/main.vue'),
      children: [{
        path: 'pay_proxy',
        name: 'pay_proxy',
        component: require('../views/selectPaymentChannel.vue'),
      },]
    }, {
      path: '*',
      redirect: '/payment/pay_proxy'
    }]
  });
}