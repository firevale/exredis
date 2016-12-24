import Vue from 'vue'
import utils from '../common/utils'


export const setTransitionName = ({
  commit
}, transitionName) => {
  commit('SET_TRANSITION_NAME', transitionName)
}
