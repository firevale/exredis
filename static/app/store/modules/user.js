import * as types from '../mutationTypes'

const state = {
  id: 0,
  nickName: '',
  avatar_url: '',
  inserted_at: '',
  post_count: 0
}

const mutations = {

  [types.SET_USER_PROFILE] (state, user) {
    state.id = user.id
    state.nickName = user.nickname
    state.avatar_url = user.avatar_url
    state.inserted_at = user.inserted_at
  },

  [types.UPDATE_USER_POST_COUNT] (state, post_count) {
    state.post_count = post_count
  },

  [types.DECR_USER_POST_COUNT] (state) {
    state.post_count = state.post_count - 1 
  },

}

export default {
  state,
  mutations,
}
