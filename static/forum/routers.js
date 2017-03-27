'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/forum/error',
        name: 'error',
        component: require('./views/error.vue')
      }, {
        path: '/forum/index',
        name: 'forumList',
        component: require('./views/forum.vue')
      }, {
        path: '/forum/:forumId',
        name: 'forum',
        component: require('./views/main.vue'),
        children: [
          {
            path: 'index',
            name: 'postList',
            component: require('./views/postList.vue')
          }, {
            path: 'search',
            name: 'search',
            component: require('./views/search.vue')
          }, {
            path: 'detail/:postId',
            name: 'detail',
            component: require('./views/postDetail.vue'),
          }, {
            path: 'comment/:postId',
            name: 'newComment',
            component: require('./views/newComment.vue')
          }, {
            path: 'newPost',
            name: 'newPost',
            component: require('./views/newPost.vue')
          },{
            path: 'preview',
            name: 'preview',
            component: require('./views/postPreview.vue')
          }, {
            path: 'customerService',
            name: 'customerService',
            component: require('./views/customerService.vue')
          }, {
            path: 'personalPage',
            name: 'personalPage',
            component: require('./views/personalPage.vue')
          }, {
            path: 'campaign',
            name: 'campaign',
            component: require('./views/campaign.vue')
          },
        ]
      },
    ],
  });
}
