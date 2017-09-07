export default [{
  path: '/forum/:forumId',
  name: 'forum',
  component: require('../views/mobile/main.vue'),
  children: [{
    path: 'index',
    name: 'index',
    component: require('../views/mobile/index.vue')
  }, {
    path: 'list',
    name: 'list',
    component: require('../views/mobile/postList.vue')
  }, {
    path: 'search',
    name: 'search',
    component: require('../views/mobile/search.vue')
  }, {
    path: 'detail/:postId',
    name: 'detail',
    component: require('../views/mobile/postDetail.vue'),
  }, {
    path: 'comment/:postId',
    name: 'newComment',
    component: require('../views/mobile/newComment.vue')
  }, {
    path: 'newPost',
    name: 'newPost',
    component: require('../views/mobile/newPost.vue')
  }, {
    path: 'preview',
    name: 'preview',
    component: require('../views/mobile/postPreview.vue')
  }, {
    path: 'personalPage',
    name: 'personalPage',
    component: require('../views/mobile/personalPage.vue')
  }, {
    path: 'myProfile',
    name: 'myProfile',
    component: require('../views/mobile/myProfile.vue')
  }, {
    path: 'editMobile',
    name: 'editMobile',
    component: require('../views/mobile/editMobile.vue')
  }, {
    path: 'editEmail',
    name: 'editEmail',
    component: require('../views/mobile/editEmail.vue')
  }, {
    path: 'editResident',
    name: 'editResident',
    component: require('../views/mobile/editResident.vue')
  }]
}, ]