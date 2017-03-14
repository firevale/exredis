import * as types from '../mutationTypes'

const state = {
  id: 0,
  nickName: '',
  avatar_url: '',
  reg_at: '',
  post_count: 0
}

const mutations = {

  [types.SET_USER_PROFILE] (state, info) {
    state.id = info.id
    state.nickName = info.nickname
    state.avatar_url = info.avatar_url
    state.reg_at = info.inserted_at
    state.post_count = info.post_count
  }

}

export default {
  state,
  mutations,
}
