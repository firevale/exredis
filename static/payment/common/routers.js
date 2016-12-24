'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/payment',
      name: 'payment_main',
      component: require('../views/main.vue'),
      children: [{
        path: '',
        name: 'selectPaymentChannel',
        component: require('../views/selectPaymentChannel.vue'),
      },]
    }, {
      path: '*',
      redirect: '/payment/selectPaymentChannel'
    }]
  });
}