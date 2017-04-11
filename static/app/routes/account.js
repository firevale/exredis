export default [{
  path: '/account',
  component: require('../views/account/main.vue'),
  children: [{
    path: 'MyProfile',
    name: 'my_profile',
    component: require('../views/account/myProfile.vue')
  }, ]
}, ]