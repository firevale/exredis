export default [{
  path: '/account',
  component: require('../views/account/main.vue'),
  children: [{
    path: 'my_profile',
    name: 'MyProfile',
    component: require('../views/account/myProfile.vue')
  }, ]
}, ]