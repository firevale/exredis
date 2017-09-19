export default [{
  path: '/customerService/:appId',
  name: 'customerService',
  component: require('../views/customerService/index.vue'),
  children: [{
    path: 'index',
    name: 'commonIssues',
    component: require('../views/customerService/commonIssues.vue')
  }, {
    path: 'contactService',
    name: 'contactService',
    component: require('../views/customerService/contactService.vue')
  }, {
    path: 'myService',
    name: 'myService',
    component: require('../views/customerService/myService.vue')
  }]
}, ]