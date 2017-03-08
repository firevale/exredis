const state = {
  userID: 'u001',
  userName: 'firevale',
  portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
  level: 'LV1. 烟雨游友'
}

const mutations = {

  'SET_USER_PROFILE' (state, info) {
    state.userID = info.userID
    state.userName = info.userName
    state.portrait = info.portrait
    state.level = info.level
  }

}

export default {
  state,
  mutations,
}
