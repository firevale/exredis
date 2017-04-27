import * as types from '../mutationTypes'

const state = {
  id: 0,
  nickname: '',
  avatar_url: '',
  inserted_at: '',
  email: '',
  mobile: '',
  resident_id: '',
  resident_name: '',
  nil_password: false,
  post_count: 0
}

const mutations = {

  [types.SET_USER_PROFILE](state, user) {
    state.id = user.id
    state.nickname = user.nickname
    state.avatar_url = user.avatar_url
    state.inserted_at = user.inserted_at
    state.nil_password = user.nil_password
    
    if (user.mobile)
      state.mobile = user.mobile
    if (user.email)
      state.email = user.email
    if (user.resident_id)
      state.resident_id = user.resident_id
    if (user.resident_name)
      state.resident_name = user.resident_name
  },

  [types.UPDATE_USER_MOBILE](state, mobile) {
    state.mobile = mobile
  },

  [types.UPDATE_USER_EMAIL](state, email) {
    state.email = email
  },

  [types.UPDATE_USER_NICKNAME](state, nickname) {
    state.nickname = nickname
  },

  [types.UPDATE_USER_AVATAR](state, avatar_url) {
    state.avatar_url = avatar_url
  },

  [types.UPDATE_USER_RESIDENT_INFO](state, residentInfo) {
    state.resident_id = residentInfo.resident_id
    state.resident_name = residentInfo.resident_name
  },

  [types.UPDATE_USER_POST_COUNT](state, post_count) {
    state.post_count = post_count
  },

  [types.DECR_USER_POST_COUNT](state) {
    state.post_count = state.post_count - 1
  },

}

export default {
  state,
  mutations,
}