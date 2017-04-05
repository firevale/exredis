export default [{
    path: '/games/error',
    name: 'error',
    component: require('../views/games/error.vue')
  }, {
    path: '/games/index',
    name: 'gamesList',
    component: require('../views/games/index.vue')
  }, {
    path: '/games/detail/:id',
    name: 'gamesDetail',
    component: require('../views/games/detail.vue')
  },
]