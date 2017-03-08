'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/forum/:id',
        name: 'forum',
        component: require('./views/main.vue'),
        children: [
          {
            path: 'index',
            name: 'postList',
            component: require('./views/postList.vue'),
          }, {
            path: 'search',
            name: 'search',
            component: require('./views/search.vue'),
          }, {
            path: 'detail',
            name: 'detail',
            component: require('./views/postDetail.vue'),
          }, {
            path: 'newPost',
            name: 'newPost',
            component: require('./views/newPost.vue'),
          }, {
            path: 'writeComment',
            name: 'writeComment',
            component: require('./views/writeComment.vue'),
          }, {
            path: 'customerService',
            name: 'customerService',
            component: require('./views/customerService.vue'),
          }, {
            path: 'personalPage',
            name: 'personalPage',
            component: require('./views/personalPage.vue'),
          }, {
            path: 'campaign',
            name: 'campaign',
            component: require('./views/campaign.vue'),
          },
        ],
      }
    ],
  });
}
