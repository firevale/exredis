export default [{
    path: '/bbs/error',
    name: 'error',
    component: require('../views/bbs/error.vue')
  },
  {
    path: '/bbs/index',
    name: 'bbsList',
    component: require('../views/bbs/forum.vue')
  }, {
    path: '/bbs/:forumId',
    name: 'bbs',
    component: require('../views/bbs/main.vue'),
    children: [{
      path: 'index',
      name: 'postList',
      component: require('../views/bbs/postList.vue')
    }, {
      path: 'search',
      name: 'search',
      component: require('../views/bbs/search.vue')
    }, {
      path: 'detail/:postId',
      name: 'detail',
      component: require('../views/bbs/postDetail.vue'),
    }, {
      path: 'comment/:postId',
      name: 'newComment',
      component: require('../views/bbs/newComment.vue')
    }, {
      path: 'newPost',
      name: 'newPost',
      component: require('../views/bbs/newPost.vue')
    }, {
      path: 'preview',
      name: 'preview',
      component: require('../views/bbs/postPreview.vue')
    }, {
      path: 'personalPage',
      name: 'personalPage',
      component: require('../views/bbs/personalPage.vue')
    }, ]
  },
]