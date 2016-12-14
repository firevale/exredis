import utils from '../../common/utils'

const state = {
  transitionName: 'slide-left',
}

const mutations = {
  'SET_TRANSITION_NAME' (state, transitionName) {
    state.transitionName = transitionName
  },
}

export default {
  state,
  mutations
}