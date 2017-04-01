import * as types from '../mutationTypes'

const state = {
  id: 0,
  nickName: '',
  avatar_url: '',
  reg_at: '',
  post_count: 0
}

const mutations = {

  [types.SET_USER_PROFILE] (state, user) {
    state.id = user.id
    state.nickName = user.nickname
    state.avatar_url = user.avatar_url
    state.reg_at = user.inserted_at
    state.post_count = 0
  }

}

export default {
  state,
  mutations,
}
