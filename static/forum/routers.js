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
      component: require('./views/noteDetail.vue'),
    }, {
      path: '/forum/newNote',
      name: 'newNote',
      component: require('./views/newNote.vue'),
    }, {
      path: '/forum/replyNote',
      name: 'replyNote',
      component: require('./views/replyNote.vue'),
    }, {
      path: '/forum/customService',
      name: 'customService',
      component: require('./views/customService.vue'),
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
