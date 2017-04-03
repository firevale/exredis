export default [{
    path: '/forum/error',
    name: 'error',
    component: require('../views/forum/error.vue')
  },
  {
    path: '/forum/index',
    name: 'forumList',
    component: require('../views/forum/forum.vue')
  }, {
    path: '/forum/:forumId',
    name: 'forum',
    component: require('../views/forum/main.vue'),
    children: [{
      path: 'index',
      name: 'postList',
      component: require('../views/forum/postList.vue')
    }, {
      path: 'search',
      name: 'search',
      component: require('../views/forum/search.vue')
    }, {
      path: 'detail/:postId',
      name: 'detail',
      component: require('../views/forum/postDetail.vue'),
    }, {
      path: 'comment/:postId',
      name: 'newComment',
      component: require('../views/forum/newComment.vue')
    }, {
      path: 'newPost',
      name: 'newPost',
      component: require('../views/forum/newPost.vue')
    }, {
      path: 'preview',
      name: 'preview',
      component: require('../views/forum/postPreview.vue')
    }, {
      path: 'personalPage',
      name: 'personalPage',
      component: require('../views/forum/personalPage.vue')
    }, ]
  },
]