import * as types from '../mutationTypes'

const state = {
  transitionName: 'slide-left'
}

const mutations = {
  [types.SET_TRANSITION_NAME](state, transitionName) {
    state.transitionName = transitionName
  }
}

export default {
  state,
  mutations
}
