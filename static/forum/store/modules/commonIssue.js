import * as types from '../mutationTypes'

const state = {
  issues:[
    '闪退1',
    '闪退2'
  ]
}

const mutations = {
  [types.SET_COMMON_ISSUES] (state, issues) {
    state = issues
  }
}

export default {
  state,
  mutations,
}
