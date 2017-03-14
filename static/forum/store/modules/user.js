const state = {
  id: 0,
  nickName: '',
  avatar_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
  reg_at: '',
  posts: 0
}

const mutations = {

  'SET_USER_PROFILE' (state, info) {
    state.id = info.id
    state.nickName = info.nickname
    state.avatar_url = info.avatar_url
    state.reg_at = info.inserted_at
    state.posts = info.posts
  }

}

export default {
  state,
  mutations,
}
