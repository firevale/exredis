export default [{
  path: '/games/error',
  name: 'gamesError',
  component: require('../views/games/error.vue')
}, {
  path: '/games/index',
  name: 'gamesList',
  component: require('../views/games/list.vue')
}, {
  path: '/games/:app_id',
  name: 'games',
  component: require('../views/games/index.vue'),
  children: [{
    path: 'index',
    name: 'gamesIndex',
    component: require('../views/games/index.vue')
  }, {
    path: 'detail/:newsId',
    name: 'gamesDetail',
    component: require('../views/games/detail.vue'),
  }]
}, ]