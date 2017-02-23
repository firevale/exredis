import Vue from 'vue'

export const setTransitionName = ({
  commit
}, transitionName) => {
  commit('SET_TRANSITION_NAME', transitionName)
}
