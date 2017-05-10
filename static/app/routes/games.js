export default [{
  path: '/games/error',
  name: 'gamesError',
  component: require('../views/games/error.vue')
}, {
  path: '/games/list',
  name: 'gamesList',
  component: require('../views/games/list.vue')
}, {
  path: '/games/:app_id',
  name: 'gamesIndex',
  component: require('../views/games/main.vue'),
  children: [{
    path: 'activity',
    name: 'gameActivity',
    component: require('../views/games/gameActivity.vue')
  }, {
    path: 'activity/:newsId(\\d+)',
    component: require('../views/games/newsDetail.vue')
  }, {
    path: 'notice',
    name: 'gameNotice',
    component: require('../views/games/gameNotice.vue')
  }, {
    path: 'news',
    name: 'gameNews',
    component: require('../views/games/gameNews.vue')
  }, {
    path: 'news/:newsId(\\d+)',
    component: require('../views/games/newsDetail.vue')
  }, {
    path: '*',
    redirect: 'activity'
  }
 ]
}]