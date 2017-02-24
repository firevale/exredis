import Vue from 'vue'

const app = state => state.app
const deviceId = state => state.app.deviceId
const appId = state => state.app.appId
const transitionName = state => state.app.transitionName
const user = state => state.app.user
const avatarUrl = state => {
  return state.app.user.avatarUrl ? state.app.user.avatarUrl : window.acsConfig.defaultAvatarUrl
}

export {
  app,
  deviceId,
  appId,
  transitionName,
  user,
  avatarUrl
}
