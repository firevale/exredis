export default [{
  path: '/games/error',
  name: 'gamesError',
  component: require('../views/games/error.vue')
}, {
  path: '/games/list',
  name: 'gamesList',
  component: require('../views/games/list.vue')
},{
  path: '/games/:app_id',
  name: 'gamesIndex',
  component: require('../views/games/index.vue')
}]