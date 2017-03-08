'use strict';

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/forum',
      name: 'forum',
      component: require('./views/main.vue'),
    }, {
      path: '/forum/search',
      name: 'search',
      component: require('./views/search.vue'),
    }, {
      path: '/forum/detail',
      name: 'detail',
      component: require('./views/postDetail.vue'),
    }, {
      path: '/forum/newPost',
      name: 'newPost',
      component: require('./views/newPost.vue'),
    }, {
      path: '/forum/writeComment',
      name: 'writeComment',
      component: require('./views/writeComment.vue'),
    }, {
      path: '/forum/customerService',
      name: 'customerService',
      component: require('./views/customerService.vue'),
    }, {
      path: '/forum/personalPage',
      name: 'personalPage',
      component: require('./views/personalPage.vue'),
    }, {
      path: '/forum/campaign',
      name: 'campaign',
      component: require('./views/campaign.vue'),
    }, {
      path: '*',
      redirect: '/'
    }]
  });
}
