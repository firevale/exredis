import * as types from '../mutationTypes'

const state = {
  id: 0,
  points: 0,
  wcp_user: undefined,
}

const mutations = {

  [types.SET_WCP_USER](state, wcp_user) {
    state.wcp_user = wcp_user
  },
  [types.SET_USER_POINT](state, points) {
    state.points = points
  },
  [types.ADD_USER_POINT](state, points) {
    state.points += points
    if (state.points < 0) {
      state.points = 0
    }
  },

}

export default {
  state,
  mutations,
}